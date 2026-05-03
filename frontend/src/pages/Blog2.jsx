import React from "react";
import { FaBackward } from "react-icons/fa";
import { Link } from "react-router-dom";

const Blog2 = () => {
  return (
    <div className="bg-green-50 min-h-screen py-10 px-5 md:px-20">
         <Link className="bg-amber-600 " to="/" >
        <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-2xl cursor-pointer active:scale-95 transition transform duration-300"><FaBackward/>
          Back to Home
        </button>
        </Link>
      
      {/* Hero Section */}
      <h1 className="text-2xl md:text-4xl font-bold text-center text-green-800 leading-snug py-8">
        Get handpicked, fresh produce straight from farms with reliable delivery and long-lasting freshness.
      </h1>

      <img
        src="../public/handpick.jpg"
        alt="Fresh Produce"
        className="w-full h-[`300px`] md:h-[`350px`] object-cover rounded-xl mt-6 shadow-lg"
      />

      {/* Section 1 */}
      <div className="mt-10 grid md:grid-cols-2 gap-6 items-center py-28">
        <div>
          <h2 className="text-3xl font-semibold text-green-700">
            Handpicked with Care
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed text-2xl">
            At Zayka, every fruit and vegetable is carefully handpicked to ensure
            the highest quality. We focus on freshness right from the farm so you
            receive only the best produce at your doorstep.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1471193945509-9ad0617afabf"
          alt="Handpicked Fruits"
          className="w-full rounded-xl shadow-md"
        />
      </div>

      {/* Section 2 */}
      <div className="mt-10 grid md:grid-cols-2 gap-6 items-center py-28">
        <img
          src="https://images.unsplash.com/photo-1518843875459-f738682238a6"
          alt="Delivery"
          className="w-full rounded-xl shadow-md"
        />
        <div>
          <h2 className="text-3xl font-semibold text-green-700">
            Reliable & Fast Delivery
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed text-2xl">
            We ensure quick and reliable delivery so your produce reaches you
            fresh and on time. Our efficient system maintains the quality and
            freshness throughout the journey.
          </p>
        </div>
      </div>

      {/* Section 3 */}
      <div className="mt-10 grid md:grid-cols-2 gap-6 items-center py-28">
        <div>
          <h2 className="text-3xl font-semibold text-green-700">
            Long-Lasting Freshness
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed text-2xl">
            Our smart packaging and direct farm sourcing help retain the natural
            freshness of fruits and vegetables for a longer time, reducing waste
            and improving your daily food quality.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1466637574441-749b8f19452f"
          alt="Fresh Vegetables"
          className="w-full rounded-xl shadow-md"
        />
      </div>

     

    </div>
  );
};

export default Blog2;