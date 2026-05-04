/**
 * admin auth controllers create register and login
 * admin register me userModel me role: "admin" set karna hai
 * admin login me check karna hai ki user ka role "admin" hai ya nahi
 */


import userModel from "../models/user.model.js";
import {sendEmail} from '../services/mail.service.js';
import jwt from 'jsonwebtoken';

/**
 * Admin Authentication Controller
 * @route /api/admin/auth/admin/register
 * @desc Register a new admin
 * @access Public (or restricted)
 * @body {username,email,password}
 */
export const adminRegisterController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = await userModel.create({
      username,
      email,
      password,
      role: "admin"   // 🔥 force admin role
    });
    
        //verification email send link generate token
        const emailVerificationToken = jwt.sign({
            email: user.email
        },process.env.JWT_SECRET)
    
        //send welcome email to user after registration
        await sendEmail({
            to: email,
            subject: "Welcome to the Zayka!",
            html: `<h1>Welcome to Zayka, ${username}!</h1>
            <p>Thank you for registering with us. We're excited to have you on board!</p>
            <p>Please verify your email address by clicking the link below:</p>
            <a href="https://zayka-e-commerce.onrender.com/api/auth/verify-email?token=${emailVerificationToken}">Verify Email</a>
            <p>If you did not create an account, please ignore this email.</p>
            <p>Best regards,<br/>The Zayka Team</p>`
        })
    
    res.status(201).json({
        message:"User registered successfully,Please verify your email",
        success:true,
        user:{
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    })
    

   res.status(201).json({
        message:"Admin registered successfully",
        success:true,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    });  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//verify email controller
/**
 * @route GET /api/auth/verify-email
 * @desc Verify user's email address
 * @access Public
 * @query {token}
 */
export async function verifyEmailController(req,res){
    const {token} = req.query;
//read token and verify
try{


    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findOne({email: decoded.email});
    if(!user){
        return res.status(400).json({
            message:"Invalid token",
            success:false,
            err: "user not found"
        })
    }

    user.verified = true;

    //jo change object me kiya hai verified ko false se true, use database me likh do
    await user.save();

    const html = `<h1>Email Verified</h1>
    <p>Your email has been successfully verified. You can now log in to your account.</p>
    <a href="https://zayka-e-commerce.onrender.com/api/auth/get-me">Go to Login</a>
    <p>Best regards,<br/>The Zayka Team</p>`

   return res.send(html);
}catch(err){
    return res.status(400).json({
        message:"Invalid token",
        success:false,
        err: err.message
    })
}
}

/**
 * Admin Login Controller
 * @route /api/admin/auth/admin/login
 * @desc Login admin and return JWT token
 * @access Public
 * @body {email,password}
 */


export const adminLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // ❌ must check password
    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ❌ admin check AFTER password verify
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Not an admin" });
    }

    // 🔐 JWT generate (ROLE MUST BE INCLUDED)
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role, // 👈 IMPORTANT
      },
      process.env.JWT_SECRET
    );

    // 🍪 set cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // production me true (https)
    });

    return res.status(200).json({
      message: "Admin logged in successfully",
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};