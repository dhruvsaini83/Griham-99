const mongoose = require("mongoose");
const dns = require("dns");
const fs = require("fs");
const path = require("path");

// Configure public DNS to resolve Atlas SRV records
try {
  dns.setServers(["8.8.8.8", "1.1.1.1", "8.8.4.4"]);
} catch (e) {
  // Ignore
}

// Load .env.local if present
const envPath = path.resolve(__dirname, "../.env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx !== -1) {
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim();
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("❌ MONGODB_URI is not defined in .env.local");
  process.exit(1);
}

const { PRODUCTS } = require("../data/products");

function sanitizeText(str) {
  if (typeof str !== "string") return "";
  return str.replace(/<[^>]*>?/gm, "").trim();
}

async function seed() {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(uri);
    console.log("Connected successfully!");

    const productSchema = new mongoose.Schema(
      {
        productId: { type: Number, required: true, unique: true },
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        price: { type: Number, required: true },
        originalPrice: { type: Number, required: true },
        discount: { type: Number, default: 0 },
        category: { type: String, required: true },
        image: { type: String, required: true },
        images: { type: [String], default: [] },
        rating: { type: Number, default: 4.8 },
        reviews: { type: Number, default: 120 },
        stock: { type: Number, default: 50 },
        isBestseller: { type: Boolean, default: false },
        bestseller: { type: Boolean, default: false },
        isNew: { type: Boolean, default: false },
        tag: { type: String, default: "" },
        description: { type: String, default: "" },
        specs: { type: Object, default: {} },
      },
      { timestamps: true }
    );

    const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

    await Product.deleteMany({});
    console.log("Cleared existing products from database.");

    const formatted = PRODUCTS.map((item) => ({
      productId: item.id,
      name: sanitizeText(item.name),
      slug:
        item.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "") +
        "-" +
        item.id,
      price: item.price,
      originalPrice: item.originalPrice,
      discount: Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100),
      category: item.category.toLowerCase().trim(),
      image: item.image,
      images: [item.image],
      rating: item.rating,
      reviews: item.reviews,
      stock: 50,
      isBestseller: Boolean(item.bestseller),
      bestseller: Boolean(item.bestseller),
      isNew: Boolean(item.isNew),
      tag: item.tag || "",
      description: item.description || "",
      specs: item.specs || {},
    }));

    const inserted = await Product.insertMany(formatted);
    console.log(`✅ Successfully seeded ${inserted.length} products to MongoDB Atlas!`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed Error:", err);
    process.exit(1);
  }
}

seed();
