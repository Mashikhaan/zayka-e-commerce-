/**
 * admin middleware create
 */

import jwt from 'jsonwebtoken';

export function authAdmin(req, res, next)  {
  // maan lo req.user me user info already hai (JWT ya login se aayi hui)

  if (req.user && req.user.role === "admin") {
    next(); // admin hai → allow karo
  } else {
    return res.status(403).json({
      message: "Access denied. Admin only."
    });
  }
};

