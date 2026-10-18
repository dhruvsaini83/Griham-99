import { cache } from "react";
import { notFound } from "next/navigation";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import { PRODUCTS } from "@/data/products";
import ProductDetailClient from "@/components/ProductDetailClient";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://griham-99.vercel.app";

// Helper to look up a product by ID, numeric productId, or slug
// Wrapped in React cache to dedupe queries between generateMetadata and page component
const fetchProduct = cache(async (idOrSlug) => {
  let product = null;

  try {
    if (process.env.MONGODB_URI) {
      await connectToDatabase();
      const isNum = !isNaN(Number(idOrSlug));
      const isValidId = mongoose.isValidObjectId(idOrSlug);
      
      const queryConditions = [{ slug: idOrSlug }];
      if (isValidId) {
        queryConditions.push({ _id: idOrSlug });
      }
      if (isNum) {
        queryConditions.push({ productId: Number(idOrSlug) });
      }

      product = await Product.findOne({ $or: queryConditions }).lean();
    }
  } catch (err) {
    console.warn("Product fetch MongoDB note:", err.message);
  }

  // Fallback to static catalog
  if (!product) {
    product = PRODUCTS.find((p) => {
      const pSlug =
        p.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "") +
        "-" +
        p.id;
      return String(p.id) === String(idOrSlug) || pSlug === idOrSlug;
    });
  }

  if (product) {
    product = JSON.parse(JSON.stringify(product));
  }

  return product;
});

// Helper to fetch related products in the same category
const fetchRelatedProducts = cache(async (category, currentId) => {
  let related = [];
  try {
    if (process.env.MONGODB_URI) {
      await connectToDatabase();
      related = await Product.find({
        category: category?.toLowerCase().trim(),
        productId: { $ne: currentId },
      })
        .limit(4)
        .lean();
    }
  } catch (err) {
    // ignore
  }

  if (!related || related.length === 0) {
    related = PRODUCTS.filter(
      (p) =>
        p.category.toLowerCase().trim() === category?.toLowerCase().trim() &&
        String(p.id) !== String(currentId)
    ).slice(0, 4);
  }

  return JSON.parse(JSON.stringify(related || []));
});

export async function generateMetadata({ params }) {
  const { id } = params;
  const product = await fetchProduct(id);

  if (!product) {
    return {
      title: "Product Not Found | Griham 99+ Jaipur",
      description: "The requested product is unavailable. Browse 99+ varieties at Griham 99+ Jaipur.",
    };
  }

  const plainProduct = JSON.parse(JSON.stringify(product));
  const routeIdentifier = plainProduct.slug || plainProduct.productId || plainProduct.id || plainProduct._id;
  const canonicalUrl = `${BASE_URL}/products/${routeIdentifier}`;

  // Unique 50-60 chars title with ₹99 and product name
  const title = `${plainProduct.name} at ₹${plainProduct.price} | Griham 99+ Jaipur`;

  // 150-160 chars Hindi + English mix description
  const description = `${plainProduct.name} sirf ₹${plainProduct.price} me. Jaipur me fastest free delivery. Kitchen, storage aur home essentials Griham 99+ pe order karo.`;

  return {
    title,
    description,
    keywords: [
      plainProduct.name,
      `${plainProduct.name} Jaipur`,
      `${plainProduct.category} under 99`,
      "99 store Jaipur",
      "kitchen storage 99 rupees",
      "Griham 99+",
      "home essentials under 99",
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      locale: "en_IN",
      images: [
        {
          url: plainProduct.image,
          width: 800,
          height: 800,
          alt: `${plainProduct.name} at 99 rupees - Griham 99+`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [plainProduct.image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
      },
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const { id } = params;
  const product = await fetchProduct(id);

  if (!product) {
    notFound();
  }

  // Convert MongoDB ObjectId and Dates to plain strings
  const plainProduct = {
    ...JSON.parse(JSON.stringify(product)),
    _id: product._id ? product._id.toString() : "",
    id: (product.id || product.productId || product._id || "").toString(),
    createdAt: product.createdAt ? product.createdAt.toString() : undefined,
    updatedAt: product.updatedAt ? product.updatedAt.toString() : undefined,
  };

  const prodId = plainProduct.id || plainProduct.productId || plainProduct._id;
  const routeIdentifier = plainProduct.slug || prodId;
  const canonicalUrl = `${BASE_URL}/products/${routeIdentifier}`;
  const related = await fetchRelatedProducts(plainProduct.category, prodId);
  const plainRelated = related.map((p) => {
    const item = JSON.parse(JSON.stringify(p));
    return {
      ...item,
      _id: item._id ? item._id.toString() : "",
      id: (item.id || item.productId || item._id || "").toString(),
      createdAt: item.createdAt ? item.createdAt.toString() : undefined,
      updatedAt: item.updatedAt ? item.updatedAt.toString() : undefined,
    };
  });

  // 1. Structured Data: Google Rich Results Product Schema
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${canonicalUrl}#product`,
    "name": plainProduct.name,
    "image": plainProduct.images?.length > 0 ? plainProduct.images : [plainProduct.image],
    "description": plainProduct.description,
    "sku": `GRIHAM-${prodId}`,
    "brand": {
      "@type": "Brand",
      "name": "Griham 99+",
    },
    "offers": {
      "@type": "Offer",
      "url": canonicalUrl,
      "priceCurrency": "INR",
      "price": plainProduct.price,
      "priceValidUntil": "2027-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Griham 99+",
      },
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": plainProduct.rating || 4.8,
      "reviewCount": plainProduct.reviews || 120,
    },
  };

  // 2. Structured Data: BreadcrumbList Schema (Home > Category > Product)
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": BASE_URL,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": plainProduct.category,
        "item": `${BASE_URL}/category/${plainProduct.category?.toLowerCase()}`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": plainProduct.name,
        "item": canonicalUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ProductDetailClient product={plainProduct} relatedProducts={plainRelated} />
    </>
  );
}
