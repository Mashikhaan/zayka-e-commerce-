/**
 * auth validator created middleware
 */

import {body, validationResult} from 'express-validator';

//validate function

const validate = (req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        });
    }
    next();
}

//register validation rules

export const registerValidation = [
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter a valid email")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

   validate //call validate function after all validation rules
];


//login validation rules

export const loginValidation = [
    body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter a valid email")
    .normalizeEmail(),

    body("password")
    .notEmpty()
    .withMessage("Password is required"),

    validate
]