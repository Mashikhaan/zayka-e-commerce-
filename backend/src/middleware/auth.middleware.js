//auth middleware created

import jwt from 'jsonwebtoken';


export function authUser(req, res, next) {
  try {
    const token =
      req.cookies.token ||
      req.headers.authorization?.split(" ")[1];

    console.log("TOKEN:", token);

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("DECODED:", decoded);

    // 🔥 FORCE SAFE USER OBJECT
  req.user = {
  id: decoded.id,
  username: decoded.username,
  email: decoded.email,
  role: decoded.role, // 👈 ADD THIS
};
    next();
  } catch (err) {
    console.log("AUTH ERROR:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
}