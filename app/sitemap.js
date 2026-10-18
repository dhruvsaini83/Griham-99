import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import { PRODUCTS } from "@/data/products";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://griham-99.vercel.app";

const CATEGORIES = [
  "home",
  "kitchen",
  "beauty",
  "toys",
  "gifts",
  "lifestyle",
  "storage",
  "utility",
];

export default async function sitemap() {
  const currentDate = new Date().toISOString();

  // 1. Static Core Landing Pages
  const staticRoutes = [
    {
      url: `${BASE_URL}/`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/return-policy`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/shipping-policy`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  // 2. Category Hub Pages
  const categoryRoutes = CATEGORIES.map((slug) => ({
    url: `${BASE_URL}/category/${slug}`,
    lastModified: currentDate,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  // 3. Dynamic Products from MongoDB (with graceful fallback to static catalog)
  let products = [];
  try {
    if (process.env.MONGODB_URI) {
      await connectToDatabase();
      products = await Product.find({}, "productId slug updatedAt createdAt").lean();
    }
  } catch (err) {
    console.warn("Sitemap MongoDB fetch fallback:", err.message);
  }

  if (!products || products.length === 0) {
    products = PRODUCTS.map((p) => ({
      productId: p.id,
      slug:
        p.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "") +
        "-" +
        p.id,
      updatedAt: new Date(),
    }));
  }

  const productRoutes = products.map((item) => {
    const routeIdentifier = item.slug || item.productId;
    return {
      url: `${BASE_URL}/products/${routeIdentifier}`,
      lastModified: item.updatedAt ? new Date(item.updatedAt).toISOString() : currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    };
  });

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
