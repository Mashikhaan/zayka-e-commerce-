import { useCart } from "../features/hooks/useCart";

export default function AddToCartButton({ productId }) {
  const { handleAddToCart } = useCart();

  return (
    <button
      onClick={() => handleAddToCart(productId)}
      
      className="border px-6 py-2 rounded-md hover:bg-amber-400 cursor-pointer"
    >
      Add To Cart
    </button>
    
  );
}
