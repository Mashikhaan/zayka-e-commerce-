import React from 'react'
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from 'react-router-dom';

function Hero() {
  return (
  <section className='bg-[#f3f9e2] h-[90vh]  '>
<div 
  className='w-full h-full bg-center bg-cover flex items-center justify-center  '
  style={{ backgroundImage: "url('/banner-bg.webp')" }}
>
  {/* Blur Overlay */}
  <div className=' flex flex-col items-center justify-center text-center'>
    <h1 className=' capitalize text-5xl font-bold   text-[#130F40] px-6 py-12 '>fresh and <span className='text-orange-400'>organic</span> products for you</h1>
    <p className='w-2xl text-2xl text-[#1f1f1e]'>Discover the finest quality fruits, vegetables, and daily essentials handpicked from trusted farms to ensure purity and freshness in every bite..</p>
  <Link to="/shop" className="group relative bg-transparent flex items-center  text-black border-2 hover:bg-amber-400  px-6 py-2  overflow-hidden transition-colors duration-300  mt-8 rounded-[10px]">
  
  <span className='text-2xl  hover:text-black'>Shop Now</span>

  <span className="absolute -right-0.5 text-4xl opacity-0 -translate-x-1 transition-all duration-300ms group-hover:translate-x-1
  group-hover:opacity-100 ">
    <IoIosArrowRoundForward />
  </span>

</Link>
  </div>
</div>
  </section>
  );
}

export default Hero