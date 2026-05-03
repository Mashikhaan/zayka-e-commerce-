/**
 * update quantity of cart item
 */
import cartModel from "../models/cart.model.js";

export async function updateQuantityController(req,res){
   try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    if (!productId || quantity === undefined) {
      return res.status(400).json({ message: "productId and quantity required" });
    }

    const cart = await cartModel.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.products.find(
      (p) => p.productId.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    item.quantity = quantity;
    await cart.save();
    await cart.populate('products.productId');

    res.status(200).json({
      message: "Quantity updated",
      success: true,
      products: cart.products
    });
  } catch (err) {
    console.error("Update quantity error:", err);
    res.status(500).json({ message: err.message });
  }
}