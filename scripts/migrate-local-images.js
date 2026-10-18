/**
 * Migration Script: Clean Legacy /uploads/* Local Paths in MongoDB
 * Run with: node scripts/migrate-local-images.js
 *
 * This script identifies any products referencing ephemeral /uploads/... paths
 * that would return 404 on Vercel and replaces them with reliable Unsplash catalog images.
 */
import mongoose from "mongoose";
import dns from "dns";
import fs from "fs";

// Fix DNS if needed
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {}

let uri = process.env.MONGODB_URI;
if (!uri && fs.existsSync(".env.local")) {
  const envContent = fs.readFileSync(".env.local", "utf8");
  const match = envContent.match(/MONGODB_URI=(.*)/);
  if (match) uri = match[1].trim();
}

if (!uri) {
  console.error("MONGODB_URI not found. Please set MONGODB_URI in .env.local");
  process.exit(1);
}

const FALLBACK_CATEGORY_IMAGES = {
  kitchen: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80",
  storage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80",
  decor: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80",
  pooja: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=600&auto=format&fit=crop&q=80",
  bathroom: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80",
  cleaning: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=80",
};

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80";

async function run() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(uri);
  console.log("Connected successfully!");

  const db = mongoose.connection.db;
  const productsCollection = db.collection("products");

  const localProducts = await productsCollection
    .find({
      $or: [
        { image: { $regex: "^/uploads/" } },
        { images: { $elemMatch: { $regex: "^/uploads/" } } },
      ],
    })
    .toArray();

  console.log(`Found ${localProducts.length} products with legacy local /uploads/ paths.`);

  for (const prod of localProducts) {
    const fallback = FALLBACK_CATEGORY_IMAGES[prod.category?.toLowerCase()] || DEFAULT_IMAGE;
    const newImage = prod.image?.startsWith("/uploads/") ? fallback : prod.image;
    const newImages = (prod.images || []).map((img) =>
      img?.startsWith("/uploads/") ? fallback : img
    );

    await productsCollection.updateOne(
      { _id: prod._id },
      {
        $set: {
          image: newImage,
          images: newImages.length > 0 ? newImages : [newImage],
        },
      }
    );
    console.log(`Updated Product #${prod.productId} (${prod.name}) with safe fallback image.`);
  }

  console.log("Migration complete!");
  process.exit(0);
}

run().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
