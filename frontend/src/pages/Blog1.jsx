import React from "react";
import { FaBackward } from "react-icons/fa";
import { Link } from "react-router-dom";

const Blog1 = () => {
  return (
    
    <div className="bg-green-50 min-h-screen py-10 px-5 md:px-20">
        <Link className="bg-amber-600 " to="/" >
        <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-2xl cursor-pointer active:scale-95 transition transform duration-300"><FaBackward/>
          Back to Home
        </button>
        </Link>
      
      {/* Hero Section */}
      <h1 className="text-2xl md:text-4xl font-bold text-center text-green-800 leading-snug py-8">
        Enjoy farm-fresh vegetables and fruits delivered to your home, ensuring quality, nutrition, and great taste every day.
      </h1>

      <img
        src="https://images.unsplash.com/photo-1610832958506-aa56368176cf"
        alt="Fresh Fruits"
        className="w-full h-[`300px`] md:h-[`350px`] object-cover rounded-xl mt-6  shadow-lg "
      />

      {/* Section 1 */}
      <div className="mt-10 grid md:grid-cols-2 gap-6 items-center py-28 ">
        <div >
          <h2 className="text-3xl font-semibold text-green-700">
            Why Choose Zayka?
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed text-2xl">
            Zayka is your trusted raw food delivery platform that brings
            farm-fresh vegetables and fruits directly to your doorstep. We
            collaborate with local farmers to ensure every product is fresh,
            organic, and rich in nutrients.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854"
          alt="Farm"
          className="w-full rounded-xl shadow-md"
        />
      </div>

      {/* Section 2 */}
      <div className="mt-10 grid md:grid-cols-2 gap-6 items-center py-28">
        <img
          src="https://images.unsplash.com/photo-1542838132-92c53300491e"
          alt="Vegetables"
          className="w-full rounded-xl shadow-md"
        />
        <div>
          <h2 className="text-3xl font-semibold text-green-700">
            Freshness You Can Trust
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed text-2xl">
            Our products are carefully selected and delivered quickly to
            preserve their natural taste and quality. From leafy greens to juicy
            fruits, Zayka ensures top freshness every time.
          </p>
        </div>
      </div>

      {/* Section 3 */}
      <div className="mt-10 grid md:grid-cols-2 gap-6 items-center py-28">
        <div>
          <h2 className="text-3xl font-semibold text-green-700">
            Healthy Living Starts Here
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed text-2xl">
            Daily consumption of fresh fruits and vegetables boosts immunity,
            improves health, and keeps you energetic. Zayka makes healthy living
            simple and accessible.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1498837167922-ddd27525d352"
          alt="Healthy Food"
          className="w-full rounded-xl shadow-md"
        />
      </div>

      

    </div>
  );
};

export default Blog1;