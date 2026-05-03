import MeatCatCard from "../components/MeatCatCard";
import React, { useState, useEffect } from "react";
import { FaBackward } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../features/hooks/useCart";
import { useProducts } from "../features/productsSlice/products.context";

const meatData = [

  // Meat
  {
    id: 37,
    name: "Chicken",
    price: 240,
    unit: "kg",
    image: "../public/product-39.jpg",
  },
  {
    id: 38,
    name: "Mutton",
    price: 700,
    unit: "kg",
    image: "../public/product-40.jpg",
  },
  {
    id: 39,
    name: "Fish",
    price: 280,
    unit: "kg",
    image: "../public/product-41.jpg",
  },
  {
    id: 40,
    name: "Eggs",
    price: 70,
    unit: "dozen",
    image: "../public/product-42.jpg",
  },
];
export default function MeatCat() {
  const { handleAddToCart } = useCart();
  const { products, loading, error } = useProducts();

  // Filter meat products from products
  const meatProducts = products.filter(product => product.category === 'meat');

  if (loading) {
    return (
      <div className="px-12 py-10">
        <h1 className="text-4xl font-medium flex justify-center mb-8 bg-green-300 px-12 py-4 rounded-2xl">
          Fresh Meat Products
        </h1>
        <div className="text-center py-8">Loading meat products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-12 py-10">
        <h1 className="text-4xl font-medium flex justify-center mb-8 bg-green-300 px-12 py-4 rounded-2xl">
          Fresh Meat Products
        </h1>
        <div className="text-center py-8 text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="px-12 py-10">
      
        <h1 className="text-4xl font-medium flex justify-center  mb-8 bg-green-300  px-12 py-4 rounded-2xl">Fresh Meat Products</h1>
<div>
<Link to="/" className="flex items-center gap-2 hover:text-shadow-white bg-red-600 hover:bg-red-550 text-white w-fit px-12 py-2 mb-6 rounded-2xl transition-colors duration-300 hover:scale-102 hover:border-none active:scale-95">
  <FaBackward />
  Back to Home
</Link>

</div>
    

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {meatProducts.map((item) => (
          <MeatCatCard key={item._id} item={item} addToCart={() => handleAddToCart(item._id)} />
        ))}
      </div>
    </div>
  );
}