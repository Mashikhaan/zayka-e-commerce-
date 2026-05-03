/**
 * razor pay setup
 */
import Razorpay from "razorpay";

export default new Razorpay({
  key_id: process.env.RAZOR_API_KEY,
  key_secret: process.env.RAZOR_SECRET_KEY,
});