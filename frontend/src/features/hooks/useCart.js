import { CartContext } from "../cartSlice/cart.context";
import { getCart, addToCart, removeFromCart, updateCartQuantity, clearCart } from "../services/cart.api";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";

export const useCart = () => {
  const { cart, setCart } = useContext(CartContext)
  const { user } = useAuth();
  const navigate = useNavigate();

  // GET CART
  const fetchCart = async () => {
    try {
      const data = await getCart();
      setCart(data?.products || []);
    } catch (err) {
      console.error("Error fetching cart:", err);
      setCart([]);
    }
  };

  // AUTO LOAD
  useEffect(() => {
    if (user) fetchCart();
    else setCart([]);
  }, [user]);

  // ADD
  const handleAddToCart = async (productId) => {

    if (!user) {
      toast.error("Please login to add items to your cart");
      navigate("/login");
      return;
    }

    try {
      const data = await addToCart(productId);
      setCart(data.products);
      toast.success("Product added to cart!");
    } catch (error) {
      toast.error("Failed to add product to cart");
      console.error("Add to cart error:", error);
    }
  };

  // REMOVE
  const handleRemove = async (productId) => {
    try {
      const data = await removeFromCart(productId);
      setCart(data.products);
      toast.success("Product removed from cart");
    } catch (error) {
      toast.error("Failed to remove product from cart");
      console.error("Remove from cart error:", error);
    }
  };

  // UPDATE
  const handleQuantity = async (productId, quantity) => {
    if (quantity < 1) return;

    try {
      const data = await updateCartQuantity(productId, quantity);
      setCart(data.products);
      toast.success("Quantity updated");
    } catch (error) {
      toast.error("Failed to update quantity");
      console.error("Update quantity error:", error);
    }
  };

  // CLEAR FULL CART
  const handleClearCart = async () => {
    try {
      const data = await clearCart();
      setCart(data.products);
      toast.success("Cart cleared after successful order");
    } catch (error) {
      toast.error("Failed to clear cart");
      console.error("Clear cart error:", error);
    }
  };

  return {
    cart,
    fetchCart,
    handleAddToCart,
    handleRemove,
    handleQuantity,
    handleClearCart,
  };
};