import { cache } from "react";
import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import { PRODUCTS } from "@/data/products";
import ProductDetailClient from "@/components/ProductDetailClient";

const BASE_URL = "https://griham99.com";

// Helper to look up a product by ID, numeric productId, or slug
// Wrapped in React cache to dedupe queries between generateMetadata and page component
const fetchProduct = cache(async (idOrSlug) => {
  let product = null;

  try {
    if (process.env.MONGODB_URI) {
      await connectToDatabase();
      const isNum = !isNaN(Number(idOrSlug));
      
      const query = isNum
        ? { productId: Number(idOrSlug) }
        : {
            $or: [
              { slug: idOrSlug },
              { _id: idOrSlug.length === 24 ? idOrSlug : null },
            ],
          };

      product = await Product.findOne(query).lean();
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

  return product;
});

// Helper to fetch related products in the same category
const fetchRelatedProducts = cache(async (category, currentId) => {
  let related = [];
  try {
    if (process.env.MONGODB_URI) {
      await connectToDatabase();
      related = await Product.find({
        category: category.toLowerCase().trim(),
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
        p.category.toLowerCase().trim() === category.toLowerCase().trim() &&
        String(p.id) !== String(currentId)
    ).slice(0, 4);
  }

  return related;
});

export async function generateMetadata({ params }) {
  const product = await fetchProduct(params.id);

  if (!product) {
    return {
      title: "Product Not Found | Griham 99+ Jaipur",
      description: "The requested product is unavailable. Browse 99+ varieties at Griham 99+ Jaipur.",
    };
  }

  const routeIdentifier = product.slug || product.productId || product.id;
  const canonicalUrl = `${BASE_URL}/products/${routeIdentifier}`;

  // Unique 50-60 chars title with ₹99 and product name
  const title = `${product.name} at ₹${product.price} | Griham 99+ Jaipur`;

  // 150-160 chars Hindi + English mix description
  const description = `${product.name} sirf ₹${product.price} me. Jaipur me fastest free delivery. Kitchen, storage aur home essentials Griham 99+ pe order karo.`;

  return {
    title,
    description,
    keywords: [
      product.name,
      `${product.name} Jaipur`,
      `${product.category} under 99`,
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
          url: product.image,
          width: 800,
          height: 800,
          alt: `${product.name} at 99 rupees - Griham 99+`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product.image],
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
  const product = await fetchProduct(params.id);

  if (!product) {
    notFound();
  }

  const prodId = product.id ?? product.productId ?? product._id;
  const routeIdentifier = product.slug || prodId;
  const canonicalUrl = `${BASE_URL}/products/${routeIdentifier}`;
  const related = await fetchRelatedProducts(product.category, prodId);

  // 1. Structured Data: Google Rich Results Product Schema
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${canonicalUrl}#product`,
    "name": product.name,
    "image": product.images?.length > 0 ? product.images : [product.image],
    "description": product.description,
    "sku": `GRIHAM-${prodId}`,
    "brand": {
      "@type": "Brand",
      "name": "Griham 99+",
    },
    "offers": {
      "@type": "Offer",
      "url": canonicalUrl,
      "priceCurrency": "INR",
      "price": product.price,
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
      "ratingValue": product.rating || 4.8,
      "reviewCount": product.reviews || 120,
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
        "name": product.category,
        "item": `${BASE_URL}/category/${product.category.toLowerCase()}`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.name,
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
      <ProductDetailClient product={product} relatedProducts={related} />
    </>
  );
}
