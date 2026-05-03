/**
 * controller for auth created
 */

import userModel from "../models/user.model.js";
import { sendEmail } from "../services/mail.service.js";
import jwt from "jsonwebtoken";

//register controller

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 * @body {username,email,password}
 */
export async function registerController(req, res) {
  const { username, email, password } = req.body;

  //exist user check

  const isUserExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserExist) {
    return res.status(400).json({
      message: "Username or email already exists",
      success: false,
      err: "user already exists",
    });
  }

  const user = await userModel.create({ username, email, password });

  //verification email send link generate token
  const emailVerificationToken = jwt.sign(
    {
      email: user.email,
    },
    process.env.JWT_SECRET,
  );

  //send welcome email to user after registration
  await sendEmail({
    to: email,
    subject: "Welcome to the Zayka!",
    html: `<h1>Welcome to Zayka, ${username}!</h1>
        <p>Thank you for registering with us. We're excited to have you on board!</p>
        <p>Please verify your email address by clicking the link below:</p>
        <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">Verify Email</a>
        <p>If you did not create an account, please ignore this email.</p>
        <p>Best regards,<br/>The Zayka Team</p>`,
  });

  res.status(201).json({
    message: "User registered successfully,Please verify your email",
    success: true,
   user:{
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    avatar: user.avatar // 👈 optional
}
  });
}

//verify email controller
/**
 * @route GET /api/auth/verify-email
 * @desc Verify user's email address
 * @access Public
 * @query {token}
 */
export async function verifyEmailController(req, res) {
  const { token } = req.query;
  //read token and verify
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findOne({ email: decoded.email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid token",
        success: false,
        err: "user not found",
      });
    }

    user.verified = true;

    //jo change object me kiya hai verified ko false se true, use database me likh do
    await user.save();

    const html = `<h1>Email Verified</h1>
    <p>Your email has been successfully verified. You can now log in to your account.</p>
    <a href="http://localhost:5173/login">Go to Login</a>
    <p>Best regards,<br/>The Zayka Team</p>`;

    return res.send(html);
  } catch (err) {
    return res.status(400).json({
      message: "Invalid token",
      success: false,
      err: err.message,
    });
  }
}

//login controller
/**
 * @route POST /api/auth/login
 * @desc Login user and return JWT token
 * @access Public
 * @body {email,password}
 */

export async function loginController(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "User not found",
      success: false,
      err: "user not found",
    });
  }

  if (!user.verified) {
    return res.status(400).json({
      message: "Email not verified",
      success: false,
      err: "Please verify your email before logging in",
    });
  }

  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    return res.status(400).json({
      message: "Invalid credentials",
      success: false,
      err: "Invalid credentials",
    });
  }

  const token = jwt.sign(
  {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role, // 👈 THIS IS REQUIRED
  },
  process.env.JWT_SECRET
);

  //set token in cookie
res.cookie("token", token, {
  httpOnly: true,
  sameSite: "lax",   // 👈 IMPORTANT
  secure: false      // 👈 dev ke liye
});

  res.status(200).json({
    message: "User logged in successfully",
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      avatar: user.avatar, // 👈 ADD THIS
    },
  });
}

//getMe controller
/**
 * @route GET /api/auth/get-me
 * @desc Get current logged in user details
 * @access Private
 */
export async function getMeController(req, res) {
  const userId = req.user.id;

  const user = await userModel.findById(userId).select("-password"); //password field ko exclude kar do
  if (!user) {
    return res.status(400).json({
      message: "User not found",
      success: false,
      err: "user not found",
    });
  }

  res.status(200).json({
    message: "User details fetched successfully",
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar, // 👈 ADD THIS
      role: user.role, // 👈 ADD THIS - ROLE FIELD MISSING!
    },
  });
}

//logout controller
/**
 * @route POST /api/auth/logout
 * @desc Logout user by clearing token cookie
 * @access Private
 */
export async function logOutController(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "User logged out successfully",
    success: true,
  });
}
