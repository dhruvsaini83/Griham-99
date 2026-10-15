import mongoose from "mongoose";

const SubscriberSchema = new mongoose.Schema(
  {
    contact: {
      type: String,
      required: [true, "Contact (email or mobile) is required"],
      trim: true,
      unique: true,
    },
    type: {
      type: String,
      enum: ["email", "mobile"],
      default: "email",
    },
    subscribedAt: {
      type: Date,
      default: Date.now,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Subscriber ||
  mongoose.model("Subscriber", SubscriberSchema);
