/**
 * cart route create
 */
import express from 'express';
import { Router } from 'express';
import { authUser } from '../middleware/auth.middleware.js';
import validateCart from '../middleware/validate.middleware.js';
import { addCartController } from '../controller/addCart.controller.js';
import { get } from 'mongoose';
import { getCartController } from '../controller/getCart.controller.js';
import { deleteCartController } from '../controller/deleteCart.controller.js';
import { updateQuantityController } from '../controller/updateQuantity.controller.js';

const cartRouter = Router();

//add to cart route
/**
 * @route POST /api/cart/add
 * @desc Add product to cart
 * @access Private
 */
cartRouter.post('/add',authUser,validateCart,addCartController);


//get cart route
/**
 * @route GET /api/cart
 * @desc Get current user's cart
 * @access Private
 */
cartRouter.get('/',authUser,getCartController);

//delete cart route
 /**
  * @route DELETE /api/cart
  * @desc Delete current user's cart
  * @access Private
  */
 cartRouter.delete('/remove/:id',authUser,deleteCartController);

//update cart route
 /**
  * @route PUT /api/cart/update
  * @desc Update current user's cart
  * @access Private
  */
 cartRouter.put('/update',authUser,updateQuantityController);

export default cartRouter;