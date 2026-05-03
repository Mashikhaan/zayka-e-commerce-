import React from "react";

// Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// Swiper modules
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import ProductCard from "../components/ProductCard";
import { useProducts } from "../features/productsSlice/products.context";
import { useCart } from "../features/hooks/useCart";

export function Products() {
  const { products, loading, error } = useProducts();
  const { handleAddToCart } = useCart();

  if (loading) {
    return (
      <section id="products" className="px-12 pt-32 bg-gray-100">
        <h1 className="text-center text-4xl font-bold">
          OUR{" "}
          <span
            className="bg-orange-500 text-white inline-block px-12 py-2"
            style={{
              clipPath:
                "polygon(100% 0, 93% 50%, 100% 99%, 0% 100%, 7% 50%, 0% 0%)",
            }}
          >
            Products
          </span>
        </h1>
        <div className="text-center py-8">Loading products...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="products" className="px-12 pt-32 bg-gray-100">
        <h1 className="text-center text-4xl font-bold">
          OUR{" "}
          <span
            className="bg-orange-500 text-white inline-block px-12 py-2"
            style={{
              clipPath:
                "polygon(100% 0, 93% 50%, 100% 99%, 0% 100%, 7% 50%, 0% 0%)",
            }}
          >
            Products
          </span>
        </h1>
        <div className="text-center py-8 text-red-500">
          Error loading products: {error}
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="px-12 pt-32 bg-gray-100">
      <h1 className="text-center text-4xl font-bold">
        OUR{" "}
        <span
          className="bg-orange-500 text-white inline-block px-12 py-2"
          style={{
            clipPath:
              "polygon(100% 0, 93% 50%, 100% 99%, 0% 100%, 7% 50%, 0% 0%)",
          }}
        >
          Products
        </span>
      </h1>

      {/* FIRST SWIPER */}
      <div className="px-12 mt-10">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            900: { slidesPerView: 3 },
            1200: { slidesPerView: 3 },
          }}
        >
          {products.slice(0, 8).map((product) => (
            <SwiperSlide key={product._id} className="h-full">
              <div className="h-full px-2">
                <ProductCard
                  img={product.image}
                  title={product.name}
                  price={product.price}
                  unit={product.unit}
                  description={product.description}
                  onAddToCart={() => handleAddToCart(product._id)}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* SECOND SWIPER */}
      <div className="px-12 mt-10">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            900: { slidesPerView: 3 },
            1200: { slidesPerView: 3 },
          }}
        >
          {products.slice(8, 16).map((product) => (
            <SwiperSlide key={product._id} className="h-full">
              <div className="h-full px-2">
                <ProductCard
                  img={product.image}
                  title={product.name}
                  price={product.price}
                  unit={product.unit}
                  description={product.description}
                  onAddToCart={() => handleAddToCart(product._id)}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
