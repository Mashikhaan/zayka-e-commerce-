import React from 'react'
import BlogCard from '../components/BlogCard'

function Blog() {
  return (
  <section id="blog" className="px-12 pt-32 pb-18 bg-gray-100 font-bold  ">
       <h1 className="text-center text-4xl">OUR
         <span   className="bg-orange-500 text-white inline-block px-12 py-2"
   style={{
     clipPath:
       "polygon(100% 0, 93% 50%, 100% 99%, 0% 100%, 7% 50%, 0% 0%)",
   }}>Blog</span>
       </h1>

    <div  className='bg-gray-100 px-12 py-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-14 md:gap-18'>
          <BlogCard img={'../public/blog-1.jpg'} author={"Abdul Rahman"} date={'13/03/2025'}
          title={"Fresh and Organic Vegetables and Fruits"} description={"Enjoy farm-fresh vegetables and fruits delivered to your home, ensuring quality, nutrition, and great taste every day"} link={'/blog1'} />
          <BlogCard img={'../public/blog-2.jpg'} author={"Anand Kumar"} date={'18/05/2025'}
          title={"Farm Fresh Produce Delivered Daily"} description={"Get handpicked, fresh produce straight from farms with reliable delivery and long-lasting freshness."} link={"/blog2"}/>
          <BlogCard img={'../public/blog-3.jpg'} author={"Atul Verma"} date={'05/09/2025'}
          title={"Healthy Living with Fresh Fruits & Veggies"} description={"Make healthy eating easy with fresh, clean, and naturally grown fruits and vegetables."} link={'/blog3'} />
     
    </div>
     </section>
  )
}

export default Blog