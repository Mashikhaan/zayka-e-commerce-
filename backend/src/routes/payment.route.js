/**
 * Payment Routes for Razorpay Integration
 */
import { Router } from "express";
import { authUser } from "../middleware/auth.middleware.js";
import {
  createPaymentOrderController,
  verifyPaymentController,
  getPaymentStatusController,
} from "../controller/payment.controller.js";

const paymentRouter = Router();

/**
 * @route POST /api/payment/create-order
 * @desc Create a Razorpay order
 * @access Private (User)
 * @body {orderItems, shippingAddress, itemsPrice, taxPrice, shippingPrice, totalPrice}
 */
paymentRouter.post("/create-order", authUser, createPaymentOrderController);

/**
 * @route POST /api/payment/verify
 * @desc Verify Razorpay payment
 * @access Private (User)
 * @body {razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId}
 */
paymentRouter.post("/verify", authUser, verifyPaymentController);

/**
 * @route GET /api/payment/order/:orderId
 * @desc Get payment status of an order
 * @access Private (User)
 */
paymentRouter.get("/order/:orderId", authUser, getPaymentStatusController);

export default paymentRouter;
