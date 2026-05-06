import React, { useState, useContext } from "react";
import { createProduct } from "../../services/product.api";
import { AuthContext } from "../../auth/auth.context";
import { useProducts } from "../../productsSlice/products.context";
import { toast } from "react-toastify";

export default function CreateProduct() {
const { loading, setLoading } = useContext(AuthContext);
const { addProduct } = useProducts();

const [form, setForm] = useState({
name: "",
price: "",
category: "",
unit: "",
description: "",
countInStock: "",
freshness: "", // ✅ added
});

const [image, setImage] = useState(null);

const handleChange = (e) => {
setForm({ ...form, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
e.preventDefault();

```
if (
  !form.name ||
  !form.price ||
  !form.category ||
  !form.unit ||
  !form.description ||
  !form.countInStock ||
  !form.freshness || // ✅ added
  !image
) {
  toast.error("Please fill all fields");
  return;
}

// extra safety validation
if (form.freshness < 0 || form.freshness > 100) {
  toast.error("Freshness must be between 0 and 100");
  return;
}

const formData = new FormData();

formData.append("name", form.name);
formData.append("price", form.price);
formData.append("category", form.category);
formData.append("unit", form.unit);
formData.append("description", form.description);
formData.append("countInStock", form.countInStock);
formData.append("freshness", form.freshness); // ✅ added
formData.append("image", image);

try {
  setLoading(true);

  const res = await createProduct(formData);

  console.log("Product created:", res);
  toast.success(res.message || "Product Added Successfully");

  if (res.product) {
    addProduct(res.product);
  }

  // reset form
  setForm({
    name: "",
    price: "",
    category: "",
    unit: "",
    description: "",
    countInStock: "",
    freshness: "", // ✅ reset
  });

  setImage(null);
} catch (error) {
  console.log(error);
  toast.error(error?.response?.data?.message || "Error creating product");
} finally {
  setLoading(false);
}
```

};

return ( <div className="p-10 max-w-xl mx-auto"> <h1 className="text-2xl font-bold mb-5">Add Product</h1>

```
  <form onSubmit={handleSubmit} className="flex flex-col gap-3">
    <input
      name="name"
      placeholder="Product Name"
      value={form.name}
      onChange={handleChange}
      className="border p-2"
    />

    <input
      name="price"
      type="number"
      placeholder="Price"
      value={form.price}
      onChange={handleChange}
      className="border p-2"
    />

    <input
      name="category"
      placeholder="Category"
      value={form.category}
      onChange={handleChange}
      className="border p-2"
    />

    <input
      name="unit"
      placeholder="Unit (kg, litre, pcs, packets)"
      value={form.unit}
      onChange={handleChange}
      className="border p-2"
    />

    <textarea
      name="description"
      placeholder="Description"
      value={form.description}
      onChange={handleChange}
      className="border p-2"
    />

    <input
      name="countInStock"
      type="number"
      placeholder="Stock"
      value={form.countInStock}
      onChange={handleChange}
      className="border p-2"
    />

    {/* ✅ NEW FIELD */}
    <input
      name="freshness"
      type="number"
      min="0"
      max="100"
      placeholder="Freshness (%)"
      value={form.freshness}
      onChange={handleChange}
      className="border p-2"
    />

    <input
      type="file"
      onChange={(e) => setImage(e.target.files[0])}
    />

    <button
      type="submit"
      disabled={loading}
      className="bg-green-600 text-white p-2 rounded cursor-pointer"
    >
      {loading ? "Adding..." : "Add Product"}
    </button>
  </form>
</div>

);
}
