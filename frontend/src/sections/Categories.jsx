import { useState, useMemo } from "react";
import { useProducts } from "../features/productsSlice/products.context";
import AllProductsCard from "../components/AllProductsCard";
import CategoryCard from "../components/CategoryCard";
import { useCart } from "../features/hooks/useCart";

export function Categories() {
  const { handleAddToCart } = useCart();
  const { products } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = ["Vegetables", "Fruits", "Dairy", "Meat"];

  // filter logic
  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return [];
    return products.filter(
      (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [products, selectedCategory]);

  return (
    <section id="categories" className=" px-12 pt-32 bg-gray-100 font-bold">
      <h1 className="text-center text-4xl">
        OUR
          <span   className="bg-orange-500 text-white inline-block px-12 py-2"
  style={{
    clipPath:
      "polygon(100% 0, 93% 50%, 100% 99%, 0% 100%, 7% 50%, 0% 0%)",
  }}>Categories</span>
      </h1>

      {/* CATEGORY CARDS */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-12">
        
       <CategoryCard
  title="Fresh Vegetables"
  discount="45"
  img="/cat-1.png"
  onClick={() => setSelectedCategory("Vegetables")
  }
/>

<CategoryCard
  title="Fresh Fruits"
  discount="40"
  img="/cat-2.png"
  onClick={() => setSelectedCategory("Fruits")}
/>

              <CategoryCard
  title="Fresh Dairy Products"
  discount="45"
  img="/cat-3.png"
  onClick={() => setSelectedCategory("Dairy")}
/>

<CategoryCard
  title="Fresh Meat"
  discount="40"
  img="/cat-4.png"
  onClick={() => setSelectedCategory("Meat")}
/>

      </div>

      {/* SHOW PRODUCTS */}
      {selectedCategory && (
        <div className="pb-16">
          <h2 className="text-2xl text-center mb-6">
            {selectedCategory} Products
          </h2>

          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-500">
              No products found
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
               <AllProductsCard
  key={product._id}
  item={product}
  addToCart={() => handleAddToCart(product._id)}
/>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}