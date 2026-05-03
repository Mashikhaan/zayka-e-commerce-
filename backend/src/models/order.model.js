import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // 👤 User who placed the order
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },

    // 🛒 Products in the order
    orderItems: [
      {
        name: String,
        qty: Number,
        image: String,
        price: Number,
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],

    // 🚚 Shipping details
    shippingAddress: {
      address: String,
      city: String,
      postalCode: String,
      country: String,
    },

    // 💳 Payment method (COD, Razorpay, Stripe etc.)
    paymentMethod: {
      type: String,
      required: true,
    },

    // 💳 Payment gateway response
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },

    // 💰 Pricing breakdown
    itemsPrice: {
      type: Number,
      required: true,
      default: 0,
    },

    taxPrice: {
      type: Number,
      required: true,
      default: 0,
    },

    shippingPrice: {
      type: Number,
      required: true,
      default: 0,
    },

    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },

    // 🔥 SINGLE SOURCE OF TRUTH (NO DUPLICATION)
    status: {
      type: String,
      enum: [
        "Pending",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
        "Failed",
      ],
      default: "Pending",
    },

    // 💳 payment tracking
    isPaid: {
      type: Boolean,
      default: false,
    },

    paidAt: Date,

    // 🚚 delivery tracking (only timestamp, not boolean flag)
    deliveredAt: Date,
  },
  {
    timestamps: true,
  }
);

const orderModel = mongoose.model("order", orderSchema);

export default orderModel;