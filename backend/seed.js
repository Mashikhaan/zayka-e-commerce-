/**
 * seed data to the database 
 */
import mongoose from "mongoose";
import productModel from "./src/models/product.model";
import { products } from "./data/products";


// old delete
await productModel.deleteMany();

// insert
await productModel.insertMany(products);

console.log("Products inserted ✅");
process.exit();