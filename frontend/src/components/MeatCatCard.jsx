import React from "react";

export default function FruitCatCard({ item, addToCart }) {
  return (
    <div className="bg-gray-100 rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
      
      <img
        src={item.image}
        alt={item.name}
        className="w-60 h-60 object-contain mx-auto mb-4 hover:scale-105 transition duration-300"
      />

      <h2 className="font-semibold text-2xl">{item.name}</h2>

      <div className="mt-2 mb-4">
        {item.oldPrice && (
          <span className="line-through text-gray-400 mr-2">
            ₹{item.oldPrice}/kg
          </span>
        )}
        <span className="font-medium">₹{item.price}/kg</span>
      </div>

      <button
        onClick={addToCart}
        className="border px-6 py-2 rounded-md hover:bg-amber-400 transition cursor-pointer"
      >
        Add To Cart
      </button>
    </div>
  );
}