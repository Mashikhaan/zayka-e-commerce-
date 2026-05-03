/**
 * Payment Controller for Razorpay Integration
 */
import orderModel from "../models/order.model.js";
import cartModel from "../models/cart.model.js";
import {
  createRazorpayOrder,
  verifyRazorpaySignature,
  fetchPaymentDetails,
} from "../services/razorpay.service.js";

/**
 * @route POST /api/payment/create-order
 * @desc Create a Razorpay order (called before payment)
 * @access Private (User)
 * @body {orderItems, shippingAddress, itemsPrice, taxPrice, shippingPrice, totalPrice}
 */
export async function createPaymentOrderController(req, res) {
  try {
    const { orderItems, shippingAddress, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    // Step 1: Save order in DB with status "Pending"
    const dbOrder = new orderModel({
      user: req.user.id,
      orderItems,
      shippingAddress,
      paymentMethod: "Razorpay",
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      status: "Pending",
    });

    const savedOrder = await dbOrder.save();

    // Step 2: Create Razorpay order
    const razorpayOrder = await createRazorpayOrder(totalPrice, savedOrder._id);

    // Step 3: Return both order details
    res.status(201).json({
      message: "Order created successfully",
      orderId: savedOrder._id,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: process.env.RAZOR_API_KEY, // Frontend ke liye
    });
  } catch (error) {
    console.error("Payment Order Creation Error:", error);
    res.status(500).json({ message: error.message });
  }
}

/**
 * @route POST /api/payment/verify
 * @desc Verify Razorpay payment signature
 * @access Private (User)
 * @body {razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId}
 */
export async function verifyPaymentController(req, res) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

    // Validate inputs
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !orderId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Step 1: Verify signature
    const isSignatureValid = verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isSignatureValid) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    // Step 2: Fetch payment details from Razorpay
    const paymentDetails = await fetchPaymentDetails(razorpay_payment_id);

    // Step 3: Update order in DB with payment status
    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      {
        status: paymentDetails.status === "captured" ? "Processing" : "Failed",
        isPaid: paymentDetails.status === "captured",
        paidAt: paymentDetails.status === "captured" ? Date.now() : undefined,
        paymentResult: {
          id: razorpay_payment_id,
          status: paymentDetails.status,
          update_time: new Date(),
          email_address: paymentDetails.email,
        },
      },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Step 4: Clear the user's cart after successful payment
    if (paymentDetails.status === "captured") {
      await cartModel.findOneAndUpdate(
        { userId: req.user.id },
        { products: [] }
      );
    }

    res.status(200).json({
      message: "Payment verified successfully",
      order: updatedOrder,
      paymentStatus: paymentDetails.status,
    });
  } catch (error) {
    console.error("Payment Verification Error:", error);
    res.status(500).json({ message: error.message });
  }
}

/**
 * @route GET /api/payment/order/:orderId
 * @desc Get payment status of an order
 * @access Private (User)
 */
export async function getPaymentStatusController(req, res) {
  try {
    const { orderId } = req.params;

    const order = await orderModel.findById(orderId).populate("user", "name email");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if user is owner of order
    if (order.user._id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to view this order" });
    }

    res.status(200).json({
      message: "Order status retrieved",
      order,
      paymentStatus: order.paymentResult?.status || "pending",
    });
  } catch (error) {
    console.error("Get Payment Status Error:", error);
    res.status(500).json({ message: error.message });
  }
}
