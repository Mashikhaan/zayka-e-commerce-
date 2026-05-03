import { createContext, useContext, useState, useEffect } from "react";
import { getProducts } from "../services/product.api";

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);


  // Add new product to state (after successful creation)
  const addProduct = (newProduct) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  return (
    <ProductsContext.Provider value={{
      products,
      loading,
      error,
      fetchProducts,
      addProduct
    }}>
      {children}
    </ProductsContext.Provider>
  );
}

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within ProductsProvider");
  }
  return context;
};