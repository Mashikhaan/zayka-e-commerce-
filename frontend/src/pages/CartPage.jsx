
import { useCart } from "../features/hooks/useCart";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { createPaymentOrder, verifyPayment } from "../features/services/payment.api";
import { useState, useEffect } from "react";
const CartPage = () => {
  const { cart, handleRemove, handleQuantity, handleClearCart } = useCart();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [mobile, setMobile] = useState("9999999999");

  // Load Razorpay Script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Handle Checkout
  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      // Step 1: Calculate totals using only product price
      const itemsPrice = cart.reduce((total, item) => {
        return total + item.productId.price * item.quantity;
      }, 0);
      const totalPrice = itemsPrice;

      // Validate mobile number before checkout
      if (!/^[0-9]{10}$/.test(mobile)) {
        toast.error("Please enter a valid 10-digit mobile number.");
        setIsLoading(false);
        return;
      }

      // Step 2: Prepare order data (dummy values for testing)
      const orderData = {
        orderItems: cart.map(item => ({
          product: item.productId._id,
          name: item.productId.name,
          qty: item.quantity,
          price: item.productId.price,
          image: item.productId.image,
        })),
        shippingAddress: {
          address: "123 Test Lane",
          city: "Test City",
          postalCode: "123456",
          country: "India",
        },
        itemsPrice,
        taxPrice: 0,
        shippingPrice: 0,
        totalPrice,
      };

      // Step 3: Create Razorpay Order
      const paymentResponse = await createPaymentOrder(orderData);
      
      if (!paymentResponse.razorpayOrderId) {
        toast.error("Failed to create order");
        setIsLoading(false);
        return;
      }

      // Step 4: Open Razorpay Checkout
      const options = {
        key: paymentResponse.key,
        amount: paymentResponse.amount, // Amount in paise
        currency: paymentResponse.currency,
        order_id: paymentResponse.razorpayOrderId,
        name: "Test User",
        description: "Test Checkout - Zayka",
        image: "https://via.placeholder.com/150",
        handler: async (response) => {
          // Step 5: Payment Success - Verify on Backend
          try {
            const verifyResponse = await verifyPayment({
              orderId: paymentResponse.orderId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            // Step 6: Clear cart after successful payment
            await handleClearCart();

            toast.success("Payment successful! ✅ Order placed.");

            // Go to order success page and pass order id in URL
            navigate(`/order-success/${verifyResponse.order._id}`);
          } catch (error) {
            toast.error("Payment verification failed");
            console.error("Verification Error:", error);
          }
        },
        prefill: {
          name: "Test User",
          email: "testuser@example.com",
          contact: mobile,
        },
        theme: {
          color: "#f59e0b", // Amber color like your app
        },
      };

      // Open Razorpay
      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        toast.error(`Payment failed: ${response.error.description}`);
        setIsLoading(false);
      });
      rzp.open();
    } catch (error) {
      console.error("Checkout Error:", error);
      toast.error(error.response?.data?.message || "Checkout failed");
    } finally {
      setIsLoading(false);
    }
  };

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

              <div className="mb-4 text-left">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number for Test Payment
                </label>
                <input
                  type="text"
                  maxLength={10}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/[^0-9]/g, ""))}
                  className="w-full md:w-64 px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-amber-400"
                  placeholder="Enter 10-digit mobile number"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Use any 10-digit number for test mode. No real OTP is required.
                </p>
              </div>

              <button
                className="bg-green-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-600 transition duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed
                cursor-pointer"
                onClick={handleCheckout}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Proceed to Checkout"}
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