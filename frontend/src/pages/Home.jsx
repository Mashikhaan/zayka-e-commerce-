import Hero from "../components/Hero";
import { Features } from "../sections/Features";
import { Products } from "../sections/Products";
import { Categories } from "../sections/Categories";
import { Reviews } from "../sections/Reviews";
import Blog from "../sections/Blog";

export default function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <Products />
      <Categories />
      <Reviews />
      <Blog />
    </div>
  );
}
