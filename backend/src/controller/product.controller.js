import productModel from "../models/product.model.js";
import cloudinary from "../config/cloudinary.js";
import mongoose from "mongoose";

//create new product controller(admin)
export async function createProductController(req, res) {
try {
const { name, price, category, unit, brand, description, countInStock, freshness } = req.body;


let image = "";

// 🔥 Cloudinary Upload
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

// ✅ Validation
if (!name || !image || !price || !category || !unit || !description || !freshness) {
  return res.status(400).json({
    message: "Please provide all required fields",
  });
}

// ✅ Freshness validation
if (freshness < 0 || freshness > 100) {
  return res.status(400).json({
    message: "Freshness must be between 0 and 100",
  });
}

// ✅ Create Product
const product = await productModel.create({
  name,
  image,
  price,
  category,
  unit,
  brand: brand || "Generic",
  description,
  countInStock,
  freshness, // ✅ ADDED
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
//get all products controller(public)
export async function getAllProductsController(req, res) {
  try {
    const page = req.query.page ? parseInt(req.query.page) : null;
    const limit = req.query.limit ? parseInt(req.query.limit) : null;
    const search = req.query.search ? req.query.search.trim() : null;

    let query = { isActive: true };

    // 🔍 Search filter (name + category)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } }
      ];
    }

    // 🔥 CHANGED: Added category priority sorting logic
    // Reason: MongoDB does NOT guarantee insertion order or category order
    // So we manually define order: Vegetables → Fruits → Dairy → Meat (last)
    let productsQuery = productModel.aggregate([
      { $match: query },

      // 🧠 Assign priority to categories
      {
        $addFields: {
          categoryOrder: {
            $switch: {
              branches: [
                { case: { $eq: ["$category", "Vegetables"] }, then: 1 },
                { case: { $eq: ["$category", "Fruits"] }, then: 2 },
                { case: { $eq: ["$category", "Dairy"] }, then: 3 },
                { case: { $eq: ["$category", "Meat"] }, then: 4 }
              ],
              default: 99
            }
          }
        }
      },

      //  Sort by category priority first, then latest products
      { $sort: { categoryOrder: 1, createdAt: -1 } },

      //❌ Remove helper field from final output
      { $project: { __v: 0, categoryOrder: 0 } }
    ]);

    // 📄 Pagination (applied after aggregation)
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
export async function getSingleProductController(req, res) {
  try {
    const { id } = req.params;

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
export async function updateProductController(req, res) {
try {
const { id } = req.params;
const { name, price, category, brand, description, freshness } = req.body;


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

// ✅ Freshness validation (if updating)
if (freshness && (freshness < 0 || freshness > 100)) {
  return res.status(400).json({
    message: "Freshness must be between 0 and 100",
  });
}

const product = await productModel.findByIdAndUpdate(
  id,
  {
    name,
    price,
    category,
    brand,
    description,
    ...(image && { image }),
    ...(freshness && { freshness }), // ✅ ADDED
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
export async function deleteProductController(req,res){
try {
const { id } = req.params;


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
