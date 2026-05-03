import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOrderStatus } from "../features/services/payment.api";
import { toast } from "react-toastify";

const OrderSuccess = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderStatus(orderId);
        setOrder(data.order);
      } catch (err) {
        console.error("Order fetch error:", err);
        setError("Unable to load order details. Please try again.");
        toast.error("Unable to load order details.");
      } finally {
        setLoading(false);
      }
    };

    if (orderId) fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center text-gray-600">Loading order details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-10 text-center">
          <h1 className="text-3xl font-bold mb-4">Order status unavailable</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition"
            onClick={() => navigate("/shop")}
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Order Success</h1>
          <p className="text-gray-600">Your order has been processed successfully.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <div className="rounded-2xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Order ID:</span> {order._id}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Total:</span> ₹{order.totalPrice.toFixed(2)}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Payment Status:</span> {order.paymentResult?.status || "Pending"}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Order Status:</span> {order.status}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Paid:</span> {order.isPaid ? "Yes" : "No"}
            </p>
            {order.paidAt && (
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Paid At:</span> {new Date(order.paidAt).toLocaleString()}
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
            <p className="text-gray-700 mb-2">{order.shippingAddress.address}</p>
            <p className="text-gray-700 mb-2">{order.shippingAddress.city}</p>
            <p className="text-gray-700 mb-2">{order.shippingAddress.postalCode}</p>
            <p className="text-gray-700 mb-2">{order.shippingAddress.country}</p>
          </div>
        </div>

        <div className="rounded-3xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Products in this order</h2>
          <div className="space-y-4">
            {order.orderItems.map((item) => (
              <div key={item.product} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <div>
                  <p className="font-semibold text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-600">Qty: {item.qty}</p>
                </div>
                <p className="font-semibold text-gray-800">₹{item.price * item.qty}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition"
            onClick={() => navigate("/shop")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
