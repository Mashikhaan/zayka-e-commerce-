/**
 * upload route create
 */
import express from "express";
import upload from "../middleware/upload.middleware.js";
import { Router } from "express";
import uploadImage from "../controller/upload.controller.js";
import { authUser } from "../middleware/auth.middleware.js";

const uploadRouter = Router();

/**
 * @route POST api/upload/avatar
 * @desc Upload user avatar
 * @access Private
 */
uploadRouter.put('/avatar',authUser,upload.single('avatar'),uploadImage)





export default uploadRouter;