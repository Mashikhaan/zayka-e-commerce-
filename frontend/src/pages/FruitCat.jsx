import FruitCatCard from "../components/FruitCatCard";
import React, { useState, useEffect } from "react";
import { FaBackward } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../features/hooks/useCart";
import { useProducts } from "../features/productsSlice/products.context";

const fruitData = [
 // Fruits
  {
    id: 13,
    name: "Orange",
    price: 80,
    unit: "kg",
    image: "../public/product-1.png",
  },
  {
    id: 14,
    name: "Strawberry",
    price: 150,
    oldPrice: 200,
    unit: "box",
    image: "../public/product-16.jpg",
  },
  {
    id: 15,
    name: "Apple",
    price: 120,
    unit: "kg",
    image: "../public/product-17.jpg",
  },
  {
    id: 16,
    name: "Pineapple",
    price: 60,
    unit: "piece",
    image: "../public/product-18.jpg",
  },
  {
    id: 17,
    name: "Pomegranate",
    price: 140,
    unit: "kg",
    image: "../public/product-19.jpg",
  },
  {
    id: 18,
    name: "Banana",
    price: 40,
    unit: "dozen",
    image: "../public/product-20.jpg",
  },
  {
    id: 19,
    name: "Watermelon",
    price: 50,
    unit: "piece",
    image: "../public/product-21.jpg",
  },
  {
    id: 20,
    name: "Papaya",
    price: 45,
    unit: "piece",
    image: "../public/product-22.jpg",
  },
  {
    id: 21,
    name: "Grapes",
    price: 110,
    unit: "kg",
    image: "../public/product-23.jpg",
  },
  {
    id: 22,
    name: "Cherry",
    price: 200,
    unit: "box",
    image: "../public/product-24.jpg",
  },
  {
    id: 23,
    name: "Kiwi",
    price: 160,
    unit: "kg",
    image: "../public/product-25.jpg",
  },
  {
    id: 24,
    name: "Mango",
    price: 90,
    unit: "kg",
    image: "../public/product-26.jpg",
  },
];

export default function FruitCat() {
  const { handleAddToCart } = useCart();
  const { products, loading, error } = useProducts();

  // Filter fruits from products
  const fruits = products.filter(product => product.category === 'fruits');

  if (loading) {
    return (
      <div className="px-12 py-10">
        <h1 className="text-4xl font-medium flex justify-center mb-8 bg-green-300 px-12 py-4 rounded-2xl">
          Fresh Fruits
        </h1>
        <div className="text-center py-8">Loading fruits...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-12 py-10">
        <h1 className="text-4xl font-medium flex justify-center mb-8 bg-green-300 px-12 py-4 rounded-2xl">
          Fresh Fruits
        </h1>
        <div className="text-center py-8 text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="px-12 py-10">
      
        <h1 className="text-4xl font-medium flex justify-center  mb-8 bg-green-300  px-12 py-4 rounded-2xl">Fresh Fruits</h1>
<div>
<Link to="/" className="flex items-center gap-2 hover:text-shadow-white bg-red-600 hover:bg-red-550 text-white w-fit px-12 py-2 mb-6 rounded-2xl transition-colors duration-300 hover:scale-102 hover:border-none active:scale-95">
  <FaBackward />
  Back to Home
</Link>

</div>
    

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {fruits.map((item) => (
          <FruitCatCard key={item._id} item={item} addToCart={() => handleAddToCart(item._id)} />
        ))}
      </div>
    </div>
  );
}