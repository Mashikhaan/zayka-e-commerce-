
import { useCart } from "../features/hooks/useCart";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const CartPage = () => {
  const { cart, handleRemove, handleQuantity } = useCart();

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => {
    return total + (item.productId.price * item.quantity);
  }, 0);

  // Calculate total items
  const totalItems = cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Your Shopping Cart
          </h1>

          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-6">🛒</div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link
              to="/shop"
              className="inline-block bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
            Your Shopping Cart
          </h1>
          <p className="text-center text-gray-600">
            {totalItems} item{totalItems !== 1 ? 's' : ''} in your cart
          </p>
        </div>

        {/* Cart Items Grid - 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {cart.map((item) => (
            <div
              key={item.productId._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden"
            >
              {/* Product Image */}
              <div className="h-48 bg-gray-100 flex items-center justify-center p-4">
                <img
                  src={item.productId.image}
                  alt={item.productId.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Product Details */}
              <div className="p-6">
                <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
                  {item.productId.name}
                </h3>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {item.productId.description}
                </p>

                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-orange-600">
                    ₹{item.productId.price}
                  </span>
                  <span className="text-sm text-gray-500">
                    per {item.productId.unit}
                  </span>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center border rounded-full overflow-hidden">
                    {/* // decrement button */}
                    <button
                      onClick={() => handleQuantity(item.productId._id, item.quantity - 1)}
                      className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition duration-200 cursor-pointer"
                      disabled={item.quantity <= 1}
                    >
                      <span className="text-xl font-bold text-gray-600 ">-</span>
                    </button>

                    <span className="px-4 py-2 font-semibold text-gray-800 min-w-[`50px`] text-center">
                      {item.quantity}
                    </span>

                    {/* // increment button */}
                    <button
                      onClick={() => handleQuantity(item.productId._id, item.quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition duration-200 cursor-pointer"
                    >
                      <span className="text-xl font-bold text-gray-600 ">+</span>
                    </button>
                  </div>

                  <span className="font-semibold text-gray-700">
                    ₹{item.productId.price * item.quantity}
                  </span>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => handleRemove(item.productId._id)}
                  className="w-full bg-red-500 text-white py-2 rounded-full font-semibold hover:bg-red-600 transition duration-300 cursor-pointer"
                >
                  Remove from Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Cart Summary</h3>
              <p className="text-gray-600">
                Total Items: <span className="font-semibold">{totalItems}</span>
              </p>
            </div>

            <div className="text-center md:text-right">
              <p className="text-lg text-gray-600 mb-2">Total Amount:</p>
              <p className="text-4xl font-bold text-orange-600 mb-4">
                ₹{totalPrice.toFixed(2)}
              </p>

              <button
                className="bg-green-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-600 transition duration-300 shadow-lg"
                onClick={() => toast.info("Checkout feature coming soon!")}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>

        {/* Continue Shopping */}
        <div className="text-center mt-8">
          <Link
            to="/shop"
            className="inline-block bg-gray-800 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-900 transition duration-300"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;