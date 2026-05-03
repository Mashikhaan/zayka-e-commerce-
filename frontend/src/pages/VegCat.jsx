import VegCatCard from "../components/VegCatCard";
import React, { useState, useEffect } from "react";
import { FaBackward } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../features/hooks/useCart";
import { useProducts } from "../features/productsSlice/products.context";

const vegData = [
  // Vegetables
  {
    id: 1,
    name: "Red Onions",
    price: 35,
    unit: "kg",
    image: "../public/product-2.png",
  },
  {
    id: 2,
    name: "Cabbage",
    price: 25,
    oldPrice: 40,
    unit: "kg",
    image: "../public/product-4.png",
  },
  {
    id: 3,
    name: "Potatoes",
    price: 30,
    unit: "kg",
    image: "../public/product-5.png",
  },
  {
    id: 4,
    name: "Carrots",
    price: 40,
    unit: "kg",
    image: "../public/product-7.png",
  },
  {
    id: 5,
    name: "Green Lemons",
    price: 60,
    unit: "kg",
    image: "../public/product-8.png",
  },
  {
    id: 6,
    name: "Cauliflower",
    price: 50,
    unit: "kg",
    image: "../public/product-9.jpg",
  },
  {
    id: 7,
    name: "Brinjal",
    price: 45,
    unit: "kg",
    image: "../public/product-10.jpg",
  },
  {
    id: 8,
    name: "Red Chilli",
    price: 60,
    unit: "kg",
    image: "../public/product-11.jpg",
  },
  {
    id: 9,
    name: "Coriander",
    price: 15,
    unit: "bunch",
    image: "../public/product-12.jpg",
  },
  {
    id: 10,
    name: "Tomatoes",
    price: 30,
    unit: "kg",
    image: "../public/product-13.jpg",
  },
  {
    id: 11,
    name: "Cucumber",
    price: 25,
    unit: "kg",
    image: "../public/product-14.jpg",
  },
  {
    id: 12,
    name: "Ladies Finger",
    price: 55,
    unit: "kg",
    image: "../public/product-15.jpg",
  },

];

export default function VegCat() {
  const { handleAddToCart } = useCart();
  const { products, loading, error } = useProducts();

  // Filter vegetables from products
  const vegetables = products.filter(product => product.category === 'vegetables');

  if (loading) {
    return (
      <div className="px-12 py-10">
        <h1 className="text-4xl font-medium flex justify-center mb-8 bg-green-300 px-12 py-4 rounded-2xl">
          Fresh Vegetables
        </h1>
        <div className="text-center py-8">Loading vegetables...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-12 py-10">
        <h1 className="text-4xl font-medium flex justify-center mb-8 bg-green-300 px-12 py-4 rounded-2xl">
          Fresh Vegetables
        </h1>
        <div className="text-center py-8 text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="px-12 py-10">
      
        <h1 className="text-4xl font-medium flex justify-center  mb-8 bg-green-300  px-12 py-4 rounded-2xl">Fresh Vegetables</h1>
<div>
<Link to="/" className="flex items-center gap-2 hover:text-shadow-white bg-red-600 hover:bg-red-550 text-white w-fit px-12 py-2 mb-6 rounded-2xl transition-colors duration-300 hover:scale-102 hover:border-none active:scale-95">
  <FaBackward />
  Back to Home
</Link>

</div>
    

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {vegetables.map((item) => (
          <VegCatCard key={item._id} item={item} addToCart={() => handleAddToCart(item._id)} />
        ))}
      </div>
    </div>
  );
}