import React from "react";

export default function AllProductsCard({ item, addToCart }) {

// ✅ Dynamic color logic
const getColor = (value) => {
if (value > 75) return "bg-green-500";
if (value > 40) return "bg-orange-400";
return "bg-red-500";
};

return ( <div id={item._id} className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">

```
  {/* Product Image */}
  <img
    src={item.image}
    alt={item.name}
    className="w-60 h-60 object-contain mx-auto mb-4 hover:scale-105 transition duration-300"
  />

  {/* Name */}
  <h2 className="font-semibold text-2xl">{item.name}</h2>

  {/* Description */}
  <p className="text-gray-600 text-sm mt-2 mb-3 h-10 overflow-hidden">
    {item.description}
  </p>

  {/* ✅ Freshness Progress Bar */}
  <div className="mt-3 mb-3 text-left">
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        className={`h-full ${getColor(item.freshness || 0)} transition-all duration-500`}
        style={{ width: `${item.freshness || 0}%` }}
      ></div>
    </div>
    <p className="text-xs mt-1 font-medium text-gray-600">
      {item.freshness || 0}% Fresh
    </p>
  </div>

  {/* Price Section */}
  <div className="mt-2 mb-4">
    {item.oldPrice && (
      <span className="line-through text-gray-400 mr-2">
        ₹{item.oldPrice}/{item.unit}
      </span>
    )}

    <span className="font-medium">
      ₹{item.price}/{item.unit}
    </span>
  </div>

  {/* Add to Cart Button */}
  <button
    onClick={addToCart}
    className="border px-6 py-2 rounded-md hover:bg-amber-400 transition cursor-pointer"
  >
    Add To Cart
  </button>
</div>


);
}
