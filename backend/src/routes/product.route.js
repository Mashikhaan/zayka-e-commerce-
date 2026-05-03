/**
 * product route create
 */
import { Router } from "express";
import { authUser } from "../middleware/auth.middleware.js";
import { createProductController, deleteProductController, getAllProductsController, getSingleProductController, updateProductController } from "../controller/product.controller.js";
import { get } from "mongoose";
import { authAdmin } from "../middleware/admin.middleware.js";
import upload from "../middleware/upload.middleware.js";

const productRouter = Router();

//create new product route(admin)
/**
 * @route POST /api/product/create
 * @desc Create a new product
 * @access Private (Admin)
 * @body {name,image,price,category,brand,description}
 */
productRouter.post('/create',authUser,authAdmin,upload.single("image"),createProductController);

//get all products route(public)
/**
 * @route GET /api/product/all-products
 * @desc Get all products
 * @access Public
 */
productRouter.get('/all-products',getAllProductsController);

//get single product route(public)
/**
 * @route GET /api/product/:id
 * @desc Get product details by ID
 * @access Public
 */
productRouter.get('/:id',getSingleProductController);

//update product route(admin)
/**
 * @route PUT /api/product/:id
 * @desc Update product details by ID
 * @access Private (Admin)
 * @body {name,image,price,category,brand,description}
 */
productRouter.put('/:id', authUser, authAdmin, updateProductController);
 
//delete product route(admin)
/**
 * @route DELETE /api/product/:id
 * @desc Delete a product by ID
 * @access Private (Admin)
*/
productRouter.delete('/:id',authUser,authAdmin,deleteProductController);


export default productRouter;