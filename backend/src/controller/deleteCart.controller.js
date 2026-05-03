/**
 * delete cart controller create
 */
import cartModel from "../models/cart.model.js";

export async function deleteCartController(req,res){
    try {
        const userId = req.user.id;
        const { id } = req.params; // productId to remove
        
        const cart = await cartModel.findOne({userId});
        if(!cart){
            return res.status(404).json({ message: "Cart not found" });
        }
        
        // Remove the product from cart
        cart.products = cart.products.filter(
            p => p.productId.toString() !== id
        );
        
        await cart.save();
        await cart.populate('products.productId');
        
        res.status(200).json({
            message: "Product removed from cart",
            success: true,
            products: cart.products
        });
    } catch (err) {
        console.error("Delete cart error:", err);
        res.status(500).json({ message: err.message });
    }
}

export async function clearCartController(req, res) {
  try {
    const userId = req.user.id;
    const cart = await cartModel.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.products = [];
    await cart.save();
    
    res.status(200).json({
      message: "Cart cleared successfully",
      success: true,
      products: [],
    });
  } catch (err) {
    console.error("Clear cart error:", err);
    res.status(500).json({ message: err.message });
  }
}
