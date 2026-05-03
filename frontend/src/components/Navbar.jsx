import React, { useState, useEffect } from 'react'
import { CiShoppingCart } from 'react-icons/ci';
import { FaShoppingBasket } from "react-icons/fa";
import { IoSearchSharp } from 'react-icons/io5';
import { MdAccountCircle } from 'react-icons/md';
import { HiMenu, HiX } from "react-icons/hi";
import { Link, useNavigate } from 'react-router-dom';
import AccountMenu from './AccountMenu';
import { useCart } from '../features/hooks/useCart';
import { searchProducts } from '../features/services/product.api';


function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
const [searchResults, setSearchResults] = useState([]);
const [isSearchOpen, setIsSearchOpen] = useState(false);

// useEffect for API CALL (Debounce)
useEffect(() => {
  if (searchQuery.trim()) {
    const timeoutId = setTimeout(async () => {
      try {
        const results = await searchProducts(searchQuery);
        setSearchResults(results);
      } catch (error) {
        console.error('Search error:', error);
      }
    }, 300); // 300ms debounce
    return () => clearTimeout(timeoutId);
  } else {
    setSearchResults([]);
  }
}, [searchQuery]);

  const totalCartItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const handleNavClick = () => {
    setIsOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <>
      {/* Overlay Blur */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/5 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <header className="sticky top-0 z-50 backdrop-blur-xl shadow h-[10vh]">
        <nav className="flex justify-between items-center px-6 md:px-20 py-5 bg-white">

          {/* Logo */}
          <div 
            onClick={() => {
              navigate("/");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }} 
            className='flex items-center gap-2 cursor-pointer'
          >
            <span className='text-orange-500 text-3xl'><FaShoppingBasket /></span>
            <h1 className='text-2xl text-black'>Zayka</h1>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-8 font-semibold">
            <Link to='/' className='text-black hover:text-amber-500' onClick={handleNavClick}>Home</Link>
            <Link to='/#features' className='text-black hover:text-amber-500'>Features</Link>
            <Link to='/#products' className='text-black hover:text-amber-500'>Products</Link>
            <Link to='/#categories' className='text-black hover:text-amber-500'>Categories</Link>
            <Link to='/#reviews' className='text-black hover:text-amber-500'>Review</Link>
            <Link to='/#blog' className='text-black hover:text-amber-500'>Blog</Link>
          </div>

          {/* Icons + Hamburger */}
          <div className="flex items-center gap-3">

            <span 
             onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-400/30 text-xl hover:bg-amber-500 cursor-pointer">
              <IoSearchSharp />
            </span>

          <span
      onClick={() => navigate("/cart")}
      className="relative w-10 h-10 flex justify-center items-center rounded-full bg-gray-400/30 text-xl hover:bg-amber-500 cursor-pointer"
    >
      <CiShoppingCart />
      {totalCartItems > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[`18px`] h-5 rounded-full bg-red-500 text-white text-[11px] font-bold flex items-center justify-center px-[5px]">
          {totalCartItems}
        </span>
      )}

    </span>
            <AccountMenu />

            {/* Hamburger */}
            <div 
              className="md:hidden text-3xl cursor-pointer" 
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <HiX /> : <HiMenu />}
            </div>
          </div>
        </nav>

        {/* Search Dropdown */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg z-50 p-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border rounded"
            />
            {searchResults.length > 0 && (
              <div className="mt-2 max-h-60 overflow-y-auto">
                {searchResults.map((product) => (
                  <div key={product._id} className="p-2 border-b hover:bg-gray-100 cursor-pointer" onClick={() => { navigate('/shop', { state: { productId: product._id } }); setIsSearchOpen(false); }}>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.category}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Mobile Menu */}
        <div className={`md:hidden fixed top-[10vh] left-0 w-full bg-white z-50 shadow-lg transition-all duration-300 
          ${isOpen ? "max-h-96 py-4" : "max-h-0 overflow-hidden"}`}>

          <div className="flex flex-col items-center gap-4 font-semibold">
            <Link to='/' className='text-black hover:text-amber-500' onClick={handleNavClick}>Home</Link>
            <Link to='/#features' className='text-black hover:text-amber-500' onClick={handleNavClick}>Features</Link>
            <Link to='/#products' className='text-black hover:text-amber-500' onClick={handleNavClick}>Products</Link>
            <Link to='/#categories' className='text-black hover:text-amber-500' onClick={handleNavClick}>Categories</Link>
            <Link to='/#reviews' className='text-black hover:text-amber-500' onClick={handleNavClick}>Review</Link>
            <Link to='/#blog' className='text-black hover:text-amber-500' onClick={handleNavClick}>Blog</Link>
          </div>
        </div>
      </header>
    </>
  )
}

export default Navbar;