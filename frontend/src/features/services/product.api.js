
import api from "./api";

// GET ALL PRODUCTS
export const getProducts = async () => {
  const res = await api.get("/product/all-products");
  return res.data.products;
};

// CREATE PRODUCT (Cloudinary upload)
export const createProduct = async (formData) => {
  const res = await api.post("/product/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true, // 👈 IMPORTANT
  });

  return res.data;
};

//search products
export const searchProducts = async(query) =>{
  const response = await api.get(`/product/all-products?search=${encodeURIComponent(query)}`);
  return response.data.products;
}