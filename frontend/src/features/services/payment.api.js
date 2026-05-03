import api from "./api";

/**
 * Create Payment Order
 * @param {Object} orderData - Order details
 * @returns {Object} Razorpay order details
 */
export const createPaymentOrder = async (orderData) => {
  try {
    const response = await api.post("/payment/create-order", orderData);
    return response.data;
  } catch (error) {
    console.error("Create Order Error:", error);
    throw error;
  }
};

/**
 * Verify Payment
 * @param {Object} paymentData - Payment verification data
 * @returns {Object} Verified order data
 */
export const verifyPayment = async (paymentData) => {
  try {
    const response = await api.post("/payment/verify", paymentData);
    return response.data;
  } catch (error) {
    console.error("Verify Payment Error:", error);
    throw error;
  }
};

/**
 * Get Order Status
 * @param {String} orderId - Order ID from database
 * @returns {Object} Order details with payment status
 */
export const getOrderStatus = async (orderId) => {
  try {
    const response = await api.get(`/payment/order/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Get Order Status Error:", error);
    throw error;
  }
};
