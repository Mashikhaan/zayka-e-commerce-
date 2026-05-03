
import Hero from "../components/Hero";
import { Features } from "../sections/Features";
import { Products } from "../sections/Products";
import { Categories } from "../sections/Categories";
import { Reviews } from "../sections/Reviews";
import { useState } from "react";
import Blog from "../sections/Blog";

export default function Home() {
  const [cart, setCart] = useState([]);

  // add to cart logic
  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  return (
    <div>

      <Hero />
      <Features />
      <Products />
      <Categories />
      <Reviews/>
      <Blog />
    
    </div>
  );
}
