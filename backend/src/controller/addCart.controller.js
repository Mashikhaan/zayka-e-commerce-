/**
 * add to cart controller create
 */
import cartModel from "../models/cart.model.js";

export async function addCartController(req,res){
  try {
    const userId = req.user.id; // ✅ From auth middleware
    const { productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ message: "Missing userId or productId" });
    }

    let cart = await cartModel.findOne({ userId });

    if (!cart) {
      cart = new cartModel({
        userId,
        products: [{ productId, quantity: 1 }],
      });
    } else {
      const itemIndex = cart.products.findIndex(
        (p) => p.productId.toString() === productId
      );

      if (itemIndex > -1) {
        cart.products[itemIndex].quantity += 1;
      } else {
        cart.products.push({ productId, quantity: 1 });
      }
    }

    await cart.save();
    
    // ✅ Populate product details before returning
    await cart.populate('products.productId');

    res.status(200).json({
      message: "Product added to cart",
      success: true,
      products: cart.products
    });

  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
}