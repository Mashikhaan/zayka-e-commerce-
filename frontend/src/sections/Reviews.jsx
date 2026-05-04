 
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
// import Swiper core and required modules
import { FreeMode,Navigation, Pagination,Autoplay, Thumbs } from 'swiper/modules';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import ReviewCard from '../components/ReviewCard';


export function Reviews() {
  return (
    <section  id="reviews" className="px-12 pt-18 bg-gray-100 ">
       <h1 className="text-center text-4xl font-bold">Customer's
        <span   className="bg-orange-500 text-white inline-block px-12 py-2"
  style={{
    clipPath:
      "polygon(100% 0, 93% 50%, 100% 99%, 0% 100%, 7% 50%, 0% 0%)",
  }}>Reviews</span>
      </h1>

     <div className=' md:px-12'>
         <Swiper 
         modules={[Autoplay,Pagination,Thumbs]}
      spaceBetween={40}
      slidesPerView={3}
        grabCursor={true}
          allowTouchMove={true} 
       autoplay={{
    delay: 3000, // 3 seconds
    disableOnInteraction: false,
  }}
  loop={true}  
   breakpoints={{
    320: {
      slidesPerView: 1, // mobile
    },
    480: {
      slidesPerView: 2, // small devices
    },
    768: {
      slidesPerView: 3, // tablets
    },
    1024: {
      slidesPerView: 4, // desktops
    },
  }}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      
    >
      <SwiperSlide><ReviewCard img={'/pic-1.png'} comment={'"Fresh produce with great taste and quality. Delivery is always on time and neatly packed."'}  name={"Rohit"}/></SwiperSlide>
      <SwiperSlide><ReviewCard img={'/pic-2.png'} comment={'"Reliable delivery and excellent quality. Makes healthy eating easy.Clean, fresh, and well-packed items."'}  name={"Riya"}/></SwiperSlide>
      <SwiperSlide><ReviewCard img={'/pic-3.png'} comment={'“Great quality produce with natural taste and freshness. Packaging is neat, everything arrives in perfect condition.”'}  name={"Aman Verma"}/></SwiperSlide>
      <SwiperSlide><ReviewCard img={'/pic-4.png'} comment={'"Very satisfied with the service. Fruits are juicy, vegetables stay fresh longer. Worth the price."'}  name={"Neha"}/></SwiperSlide>
      <SwiperSlide><ReviewCard img={'/pic-5.jpg'} comment={'"Consistent quality and timely delivery. No damaged items. Perfect for fresh, raw food at home."'}  name={"Rahul"}/></SwiperSlide>
    
     
    </Swiper>
     </div>
   
    </section>
  );
}