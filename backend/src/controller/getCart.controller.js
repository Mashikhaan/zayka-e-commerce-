/**
 * get cart controller create
 */
import cartModel from "../models/cart.model.js";

export async function getCartController(req,res){
    try {
        const userId = req.user.id;
        const cart = await cartModel.findOne({userId}).populate('products.productId');
        
        if(!cart){
            return res.status(200).json({
                message: "Cart is empty",
                success: true,
                products: []
            });
        }
        
        res.status(200).json({
            message: "Cart fetched successfully",
            success: true,
            products: cart.products
        });
    } catch (err) {
        console.error("Get cart error:", err);
        res.status(500).json({ message: err.message });
    }
}