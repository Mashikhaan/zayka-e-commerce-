import api from "./api";

/**
 * Get orders for current logged-in user
 * @returns {Object} orders list response
 */
export const getMyOrders = async () => {
  try {
    const response = await api.get("/order/my-orders");
    return response.data;
  } catch (error) {
    console.error("Get My Orders Error:", error);
    throw error;
  }
};

/**
 * Get order details by ID
 * @param {string} orderId
 * @returns {Object} order detail response
 */
export const getOrderById = async (orderId) => {
  try {
    const response = await api.get(`/order/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Get Order By ID Error:", error);
    throw error;
  }
};
