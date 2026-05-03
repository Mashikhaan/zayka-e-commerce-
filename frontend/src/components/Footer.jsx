import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaShoppingBasket } from "react-icons/fa";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const Footer = () => {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <footer className="bg-gray-20 shadow-lg text-gray-700 pt-20 pb-4 px-12 ">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8 ">

        {/* Logo + About */}
        <div >
      <div className='flex items-center gap-2 cursor-pointer pb-4' onClick={() => {navigate('/') ;
        window.scrollTo(0, 0)}}>
              <span className='text-orange-500 text-3xl'><FaShoppingBasket /></span>
              <h1 className='text-2xl text-black '>Zayka</h1>
             </div>
        <p className="text-sm mb-4">
  We deliver fresh, organic fruits and vegetables straight from farms to your doorstep, ensuring quality, taste, and a healthy lifestyle every day.
</p>

          <div className="flex gap-3 pt-4">
            <span className="p-2 bg-gray-200 material-symbols-outlined cursor-pointer  rounded-full hover:bg-amber-500 hover:text-white transition duration-300"><FaFacebookF /></span>
            <span className="p-2 bg-gray-200 material-symbols-outlined cursor-pointer  rounded-full hover:bg-amber-500 hover:text-white transition duration-300"><FaTwitter /></span>
            <span className="p-2 bg-gray-200 material-symbols-outlined cursor-pointer  rounded-full hover:bg-amber-500 hover:text-white transition duration-300"><FaInstagram /></span>
            <span className="p-2 bg-gray-200 material-symbols-outlined cursor-pointer  rounded-full hover:bg-amber-500 hover:text-white transition duration-300"><FaLinkedin /></span>
          </div>
        </div>

        {/* Contact Info */}
        <div>
  <h3 className="text-lg font-semibold mb-4">Contact Info</h3>

  <div className="space-y-3 text-sm">

    {/* Phone 1 */}
    <div className="flex items-center gap-2 group cursor-pointer">
      <FaPhone className="text-orange-500" />
      <span className="transition-transform duration-300 group-hover:translate-x-2">
        +918006194***
      </span>
    </div>

    {/* Phone 2 */}
    <div className="flex items-center gap-2 group cursor-pointer">
      <FaPhone className="text-orange-500" />
      <span className="transition-transform duration-300 group-hover:translate-x-2">
        +918057143***
      </span>
    </div>

    {/* Phone 3 */}
    <div className="flex items-center gap-2 group cursor-pointer">
      <FaPhone className="text-orange-500" />
      <span className="transition-transform duration-300 group-hover:translate-x-2">
        +919084794***
      </span>
    </div>

    {/* Email */}
    <div className="flex items-center gap-2 group cursor-pointer">
      <FaEnvelope className="text-orange-500" />
      <span className="transition-transform duration-300 group-hover:translate-x-2">
        zaykaa@gmail.com
      </span>
    </div>

    {/* Address */}
    <div className="flex items-center gap-2 group cursor-pointer">
      <FaMapMarkerAlt className="text-orange-500" />
      <span className="transition-transform duration-300 group-hover:translate-x-2">
        Muzaffarnagar, India - 251003
      </span>
    </div>

  </div>
</div>

        {/* Quick Links */}
     <div>
  <h3 className="text-lg font-semibold mb-4">Quick Links</h3>

  <ul className="space-y-3 text-sm">

 {[
  { name: "Home", id: "home" },
  { name: "Features", id: "features" },
  { name: "Products", id: "products" },
  { name: "Categories", id: "categories" },
  { name: "Review", id: "reviews" },
  { name: "Blogs", id: "blog" }
].map((link, index) => (
  <li
    key={index}
    onClick={() => {
      if (link.id === "home") {
        navigate("/");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        scrollToSection(link.id);
      }
    }}
    className="flex items-center gap-2 group cursor-pointer"
  >
    <FaArrowRight className="text-orange-500" />

    <span className="transition-transform duration-300 group-hover:translate-x-2 group-hover:text-orange-500">
      {link.name}
    </span>
  </li>
))}

  </ul>
</div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
          <p className="text-sm mb-3">Subscribe for latest updates</p>

          <input
            type="email"
            placeholder="your email"
            className="w-full px-3 py-2 mb-3 border rounded-md outline-none"
          />

          <button className="border border-gray-800 px-4 py-2 rounded-md hover:bg-gray-800 hover:text-white transition duration-300 cursor-pointer hover:rounded">
            Subscribe
          </button>
        </div>
      </div>

<hr className="mx-60 mt-10 text-black/40" />
      {/* Bottom */}
      <div className="  py-4 text-center text-sm">
        Created By <span className="text-orange-500">A M S</span> | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;