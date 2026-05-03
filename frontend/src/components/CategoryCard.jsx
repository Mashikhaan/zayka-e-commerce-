import { Link } from "react-router-dom";
export default function CategoryCard({ title, discount, img, onClick }) {
  return (
    <div className="bg-white border rounded-lg p-6 text-center shadow-sm hover:shadow-md transition mt-10 hover:scale-105 duration-300 mb-20">
      
      <img
        src={img}
        alt={title}
        className="mx-auto h-48 object-contain"
      />

      <h2 className="text-2xl font-bold text-gray-800">
        {title}
      </h2>

      <p className="text-gray-500 my-2 text-[20px] mb-4">
        {discount}% Off
      </p>

      <button
        onClick={onClick}
        className="border border-indigo-900 text-indigo-900 px-4 py-2 rounded hover:bg-amber-500 hover:text-black transition cursor-pointer"
      >
        Shop Now
      </button>
    </div>
  );
}