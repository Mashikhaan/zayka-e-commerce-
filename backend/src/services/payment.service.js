/**
 * razor pay service create
 */
import razorpay from "../utils/razorpay";

exports.createOrder = async (amount) => {
  const options = {
    amount: amount * 100, // paise
    currency: "INR",
    receipt: "receipt_" + Date.now(),
  };

  return await razorpay.orders.create(options);
};