const validateCart = (req, res, next) => {
  if (!req.body.productId) {
    return res.status(400).json({ msg: "productId required" });
  }
  next();
};

export default validateCart;