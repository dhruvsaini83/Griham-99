import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    qty: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    image: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    userMobile: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    items: {
      type: [OrderItemSchema],
      required: true,
      validate: [(val) => val.length > 0, "Order must have at least one item"],
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    subtotal: {
      type: Number,
      default: 0,
    },
    shippingCharge: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    paymentMode: {
      type: String,
      enum: ["COD", "UPI", "CARD"],
      default: "COD",
    },
    status: {
      type: String,
      enum: ["Placed", "Packed", "Shipped", "Delivered"],
      default: "Placed",
    },
    shippingAddress: {
      fullName: String,
      house: String,
      street: String,
      landmark: String,
      city: String,
      state: String,
      pincode: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
