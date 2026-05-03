import React from "react";
import { FaBackward } from "react-icons/fa";
import { Link } from "react-router-dom";

const Blog3 = () => {
  return (
    <div className="bg-green-50 min-h-screen py-10 px-5 md:px-20">

       <Link className="bg-amber-600 " to="/" >
        <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-2xl cursor-pointer active:scale-95 transition transform duration-300"><FaBackward/>
          Back to Home
        </button>
        </Link>
      {/* Hero Section */}
      <h1 className="text-2xl md:text-4xl font-bold text-center text-green-800 leading-snug py-8">
        Make healthy eating easy with fresh, clean, and naturally grown fruits and vegetables.
      </h1>

      <img
        src="https://images.unsplash.com/photo-1490645935967-10de6ba17061"
        alt="Healthy Eating"
        className="w-full h-[`300px`] md:h-[`350px`] object-cover rounded-xl mt-6 shadow-lg"
      />

      {/* Section 1 */}
      <div className="mt-10 grid md:grid-cols-2 gap-6 items-center py-28">
        <div>
          <h2 className="text-3xl font-semibold text-green-700">
            Clean & Natural Produce
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed text-2xl">
            Zayka brings you fresh, clean, and naturally grown fruits and vegetables
            that are free from harmful chemicals. We prioritize your health by
            ensuring safe and hygienic produce straight from farms.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1502741338009-cac2772e18bc"
          alt="Natural Fruits"
          className="w-full rounded-xl shadow-md"
        />
      </div>

      {/* Section 2 */}
      <div className="mt-10 grid md:grid-cols-2 gap-6 items-center py-28">
        <img
          src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
          alt="Healthy Meal"
          className="w-full rounded-xl shadow-md"
        />
        <div>
          <h2 className="text-3xl font-semibold text-green-700">
            Easy Healthy Lifestyle
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed text-2xl">
            Healthy eating doesn't have to be complicated. With Zayka, you get
            access to fresh ingredients that make it easy to cook nutritious and
            delicious meals for you and your family.
          </p>
        </div>
      </div>

      {/* Section 3 */}
      <div className="mt-10 grid md:grid-cols-2 gap-6 items-center py-28">
        <div>
          <h2 className="text-3xl font-semibold text-green-700">
            Freshness in Every Bite
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed text-2xl">
            From farm to table, we ensure that every product retains its natural
            taste and nutrients. Enjoy the goodness of fresh fruits and vegetables
            in every bite with Zayka.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd"
          alt="Fresh Salad"
          className="w-full rounded-xl shadow-md"
        />
      </div>

     

    </div>
  );
};

export default Blog3;