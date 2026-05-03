/**
 * order route created
 */

import { Router } from "express";
import { authUser } from "../middleware/auth.middleware.js";
import { cancelOrderController, createOrderController, getAllOrdersController, getMyOrdersController, getOrderByIdController, updateOrderStatusController } from "../controller/order.controller.js";
import { authAdmin } from "../middleware/admin.middleware.js";


const orderRouter = Router();

//for users

//create new order route
/**
 * @route POST /api/order/
 * @desc Create a new order
 * @access Private (User)
 * @body {userId,orderItems,shippingAddress,paymentMethod,itemsPrice,taxPrice,shippingPrice,totalPrice}
 */
orderRouter.post('/',authUser,createOrderController);


//get my orders route
/**
 * @route GET /api/order/my-orders
 * @desc Get my orders
 * @access Private (User)
 * 
 */
orderRouter.get('/my-orders',authUser,getMyOrdersController);

//get specific order detail route(user + admin)
/**
 * @route GET /api/order/:id
 * @desc Get order details by ID
 * @access Private (User+Admin)
 */
orderRouter.get('/:id',authUser,getOrderByIdController);

//cancel order route(user + admin)
/**
 * @route PUT /api/order/:id/cancel
 * @desc Cancel an order
 * @access Private (User+Admin)
 */
orderRouter.put('/:id/cancel', authUser, cancelOrderController);


//for admins

//for all orders route(Admin)
/**
 * @route GET /api/order/
 * @desc Get all orders
 * @access Private (Admin)
 */
orderRouter.get('/',authUser,authAdmin,getAllOrdersController);
 
//update order status route(admin)
/**
 * @route PUT /api/order/:id/status
 * @desc Update order status
 * @access Private (Admin)
 */
orderRouter.put('/:id/status',authUser,authAdmin,updateOrderStatusController);


export default orderRouter;