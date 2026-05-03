import axios from "axios";
import api from "./api";
// -------------------------
// ADD TO CART API CALL
// -------------------------
export async function addToCart(productId){
    try {
        const response = await api.post("/cart/add", { productId });
        return response.data;
    } catch (error) {
        console.error("Error adding to cart:", error);
        throw error;
    }
}

// -------------------------
// GET CART API CALL
// -------------------------
export async function getCart(){
    try {
        const response = await api.get("/cart");
        return response.data;
    } catch (error) {
        console.error("Error getting cart:", error);
        throw error;
    }
}

// -------------------------
// REMOVE FROM CART API CALL
// -------------------------
// REMOVE ITEM
export const removeFromCart = async (productId) => {
  const res = await api.delete(`/cart/remove/${productId}`);
  return res.data;
};

// -------------------------
// UPDATE QUANTITY API CALL
// -------------------------
export const updateCartQuantity = async (productId, quantity) => {
  const res = await api.put("/cart/update", { productId, quantity });
  return res.data;
};

// -------------------------
// CLEAR CART API CALL
// -------------------------
export const clearCart = async () => {
  const res = await api.delete("/cart/clear");
  return res.data;
};