import orderModel from "../models/order.model.js";

//for users

//create order controller
/**
 * @route POST /api/order/create
 * @desc Create a new order
 * @access Private (User)
 * @body {userId,orderItems,shippingAddress,paymentMethod,itemsPrice,taxPrice,shippingPrice,totalPrice}
 */
export async function createOrderController(req, res) {
  console.log("req.user:", req.user);
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    const order = new orderModel({
      user: req.user.id, // ✅ from auth middleware
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json({
      message: "Order created successfully",
      order: createdOrder,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//get my orders controller
/**
 * @route GET /api/order/my-orders
 * @desc Get all orders of a user
 * @access Private (User)
 */
export async function getMyOrdersController(req, res) {
  try {
    const orders = await orderModel
      .find({ user: req.user.id })
      .select(
        "totalPrice isPaid isDelivered paymentMethod createdAt"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Orders fetched successfully",
      orders,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//get order details by ID controller(user + admin)
/**
 * @route GET /api/order/:id
 * @desc Get order details by ID
 * @access Private (User + Admin)
 */
export async function getOrderByIdController(req, res) {
  try {
    const order = await orderModel.findById(req.params.id)
      .populate('user', 'username email');

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // 🔐 ROLE BASED ACCESS CONTROL
    const isOwner = order.user._id.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    // ❌ agar na owner hai aur na admin
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Not authorized to view this order" });
    }

    res.status(200).json({
      message: "Order details fetched successfully",
      order,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//cancel order controller(user + admin)
/**
 * @route PUT /api/order/:id/cancel
 * @desc Cancel an order
 * @access Private (User + Admin)
 */
export const cancelOrderController = async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // 🔐 role check
    const isOwner = order.user.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // ❌ already cancelled
    if (order.status === "Cancelled") {
      return res.status(400).json({ message: "Order already cancelled" });
    }

    // ❌ delivered order cancel nahi ho sakta
    if (order.status === "Delivered") {
      return res.status(400).json({ message: "Delivered order cannot be cancelled" });
    }

    // 💡 update order (single source of truth)
    order.status = "Cancelled";

    await order.save();

    res.status(200).json({
      message: "Order cancelled successfully",
      order,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// for admins
//get all orders controller
/**
 * @route GET /api/order/
 * @desc Get all orders
 * @access Private (Admin)
 */
export async function getAllOrdersController(req,res){
  try {
    const orders = await orderModel.find({}).populate('user', 'username email').sort({ createdAt: -1 });
    if (!orders) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json({
      message: "All  Orders of users fetched successfully",
      orders,
    })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//update order status controller(admin)
/**
 * @route PUT /api/order/:id/status
 * @desc Update order status
 * @access Private (Admin)
 */
export const updateOrderStatusController = async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const { status } = req.body;

    // validate enum manually (extra safety)
    if (!orderSchema.path("status").enumValues.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    order.status = status;

    // timestamps handling
    if (status === "Delivered") {
      order.deliveredAt = Date.now();
    }

    await order.save();

    res.status(200).json({
      message: "Order status updated successfully",
      order,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};