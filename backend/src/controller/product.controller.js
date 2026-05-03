/**
 * product controllers create
 */
import productModel from "../models/product.model.js";
import cloudinary from "../config/cloudinary.js";

//create new product controller(admin)
/**
 * @route POST /api/product/create
 * @desc Create a new product
 * @access Private (Admin)
 */
export async function createProductController(req, res) {
  try {
    const { name, price, category, unit, brand, description, countInStock } = req.body;

    let image = "";

    // -----------------------------
    // 🔥 Cloudinary Upload (FIXED)
    // -----------------------------
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "products" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        stream.end(req.file.buffer);
      });

      image = result.secure_url;
    } else {
      image = req.body.image;
    }

    // -----------------------------
    // Validation
    // -----------------------------
    if (!name || !image || !price || !category || !unit || !description) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    // -----------------------------
    // Create Product
    // -----------------------------
    const product = await productModel.create({
      name,
      image,
      price,
      category,
      unit,
      brand: brand || "Generic",
      description,
      countInStock,
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

//get all products controller(public)
/**
 * @route GET /api/product/all-products
 * @desc Get all products
 * @access Public
 */
export async function getAllProductsController(req, res) {
  try {
    const page = req.query.page ? parseInt(req.query.page) : null;
    const limit = req.query.limit ? parseInt(req.query.limit) : null;
    const search = req.query.search ? req.query.search.trim() : null;

    let query = { isActive: true };

    // Agar search query hai, to filter add 
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },  // Case-insensitive name search
        { category: { $regex: search, $options: 'i' } }  // Category search 
      ];
    }

    let productsQuery = productModel.find(query).sort({ createdAt: -1 }).select("-__v").lean();

    if (page && limit) {
      const skip = (page - 1) * limit;
      productsQuery = productsQuery.skip(skip).limit(limit);
    } else if (limit) {
      productsQuery = productsQuery.limit(limit);
    }

    const products = await productsQuery;
    const total = await productModel.countDocuments(query);

    res.status(200).json({
      message: "Products retrieved successfully",
      total,
      page: page || 1,
      products,
    });
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

//get single product controller(public)
/**
 * @route GET /api/product/:id
 * @desc Get product details by ID
 * @access Public
 */
export async function getSingleProductController(req, res) {
  try {
    const { id } = req.params;

    // ✅ ID validation
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await productModel
      .findOne({ _id: id, isActive: true })
      .select("-__v")
      .lean();

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product retrieved successfully",
      product
    });

  } catch (error) {
    console.error("Error retrieving product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

//update product controller(admin)
/**
 * @route PUT /api/product/:id
 * @desc Update product details by ID
 * @access Private (Admin)
 * @body {name,image,price,category,brand,description}
 */
export async function updateProductController(req, res) {
  try {
    const { id } = req.params;
    const { name, price, category, brand, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    let image;

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "products" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        stream.end(req.file.buffer);
      });

      image = result.secure_url;
    }

    const product = await productModel.findByIdAndUpdate(
      id,
      {
        name,
        price,
        category,
        brand,
        description,
        ...(image && { image }), // only update if new image
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

//delete product controller(admin)
/**
 * @route DELETE /api/product/:id
 * @desc Delete a product by ID
 * @access Private (Admin)
 */
export async function deleteProductController(req,res){
    try {
        const { id } = req.params;
        // ✅ ID validation
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }
        const product = await productModel.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({
            message: "Product deleted successfully",
            product
        })
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}