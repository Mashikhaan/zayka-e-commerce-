import React from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
const BlogCard = ({ img, title, date, author, description,link }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 hover:translate-y-2 hover:bg-green-100/60">
      <img
        src={img}
        alt={title}
        className="w-full h-52 object-cover hover:scale-105 transition duration-300"
      />

      <div className="p-5">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <span className="flex items-center gap-2"><FaUser className="text-amber-500"/> {author}</span>
          <span>📅 {date}</span>
          
        </div>

<hr className="text-red-400/50" />

        <h2 className="text-2xl font-semibold text-gray-800 mb-2 mt-4">
          {title}
        </h2>

        <p className="text-gray-600 text-sm mb-4">
          {description}
        </p>

        <Link to={link} className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white hover:rounded-2xl  transition duration-300 cursor-pointer">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;