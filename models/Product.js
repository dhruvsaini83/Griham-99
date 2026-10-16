import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    productId: {
      type: Number,
      index: true,
    },
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    originalPrice: {
      type: Number,
      min: [0, "Original price cannot be negative"],
    },
    discount: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      lowercase: true,
    },
    image: {
      type: String,
      required: [true, "Primary image URL is required"],
    },
    images: {
      type: [String],
      default: [],
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 50,
      min: 0,
    },
    isBestseller: {
      type: Boolean,
      default: false,
    },
    bestseller: {
      type: Boolean,
      default: false,
    },
    isNew: {
      type: Boolean,
      default: false,
    },
    tag: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    specs: {
      type: Map,
      of: String,
      default: {},
    },
  },
  {
    timestamps: true,
    suppressReservedKeysWarning: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for id to ensure compatibility with frontend `product.id`
ProductSchema.virtual("id").get(function () {
  return this.productId || this._id.toString();
});

// Auto-generate slug and sync bestseller / discount before saving
ProductSchema.pre("save", function () {
  if (!this.slug && this.name) {
    this.slug =
      this.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "") +
      "-" +
      Math.floor(1000 + Math.random() * 9000);
  }

  if (this.bestseller && !this.isBestseller) {
    this.isBestseller = true;
  }
  if (this.isBestseller && !this.bestseller) {
    this.bestseller = true;
  }

  if (this.originalPrice && this.price && this.originalPrice > this.price) {
    this.discount = Math.round(
      ((this.originalPrice - this.price) / this.originalPrice) * 100
    );
  }
});

// Export existing or compile new model
export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
