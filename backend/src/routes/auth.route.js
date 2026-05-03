/**
 * auth routes created
 */
 
import { Router } from "express";
import { loginValidation, registerValidation } from "../validator/auth.validator.js";
import {loginController, registerController, verifyEmailController, getMeController, logOutController} from "../controller/auth.controller.js";
import {authUser} from '../middleware/auth.middleware.js';
import { authAdmin } from "../middleware/admin.middleware.js";
import { adminLoginController, adminRegisterController } from "../controller/admin.auth.controller.js";

const authRouter = Router();

//Register route
/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 * @body {username,email,password}
 */
authRouter.post('/register',registerValidation,registerController);

//email verification link
/**
 * @route GET /api/auth/verify-email
 * @desc Verify user's email address
 * @access Public
 * @query {token}
 */
authRouter.get('/verify-email',verifyEmailController)

//Login route
/**
 * @route POST /api/auth/login
 * @desc Login user and return JWT token
 * @access Public
 * @body {email,password}
 */

authRouter.post('/login',loginValidation,loginController)



//get me route
/**
 * @route GET /api/auth/get-me
 * @desc Get current logged in user details
 * @access Private
 */
authRouter.get('/get-me',authUser,getMeController)

//logout route
/**
 * @route POST /api/auth/logout
 * @desc Logout user by clearing token cookie
 * @access Private
 */
authRouter.post('/logout',authUser,logOutController);




//admin register route
/**
 * @route POST /api/auth/admin/register
 * @desc Register admin
 * @access Public (or restricted)
 */
authRouter.post('/admin/register',registerValidation, adminRegisterController);


//admin login route
/**
 * @route POST /api/auth/admin/login
 * @desc Login admin
 * @access Public
 */
authRouter.post('/admin/login',loginValidation, adminLoginController);




export default authRouter;