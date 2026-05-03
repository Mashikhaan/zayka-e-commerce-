import DairyCatCard from "../components/DairyCatCard";
import { useEffect, useState } from "react";
import { getProducts } from "../features/services/product.api";

export default function DairyCat() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();

        // filter dairy
        const dairy = data.filter((p) => p.category === "dairy");

        setProducts(dairy);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="px-12 py-10">
      <h1 className="text-4xl text-center mb-8">Dairy Products</h1>

      <div className="grid grid-cols-4 gap-6">
        {products.map((item) => (
          <DairyCatCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}