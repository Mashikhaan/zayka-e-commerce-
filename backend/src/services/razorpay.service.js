import razorpay from "../utils/razorpay.js";
import crypto from "crypto";

/**
 * Create Razorpay Order
 * @param {number} amount - Amount in paise (amount * 100)
 * @param {string} orderId - Your database order ID
 * @returns {Object} Razorpay order response
 */
export async function createRazorpayOrder(amount, orderId) {
  try {
    const options = {
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: String(orderId), // Your order ID as receipt
      payment_capture: 1, // Auto capture payment
    };

    const order = await razorpay.orders.create(options);
    return order;
  } catch (error) {
    console.error("Razorpay Order Creation Error:", error);
    throw new Error(`Failed to create Razorpay order: ${error.message}`);
  }
}

/**
 * Verify Razorpay Payment Signature
 * @param {string} razorpay_order_id - Order ID from Razorpay
 * @param {string} razorpay_payment_id - Payment ID from Razorpay
 * @param {string} razorpay_signature - Signature from Razorpay
 * @returns {boolean} True if signature is valid
 */
export function verifyRazorpaySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature) {
  try {
    // Create the signature body
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    // Generate signature using secret key
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZOR_SECRET_KEY)
      .update(body)
      .digest("hex");

    // Compare signatures
    const isValid = expectedSignature === razorpay_signature;
    return isValid;
  } catch (error) {
    console.error("Signature Verification Error:", error);
    return false;
  }
}

/**
 * Fetch Payment Details from Razorpay
 * @param {string} payment_id - Payment ID from Razorpay
 * @returns {Object} Payment details
 */
export async function fetchPaymentDetails(payment_id) {
  try {
    const payment = await razorpay.payments.fetch(payment_id);
    return payment;
  } catch (error) {
    console.error("Fetch Payment Error:", error);
    throw new Error(`Failed to fetch payment: ${error.message}`);
  }
}
