import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import { PRODUCTS } from "@/data/products";
import CategoryPageClient from "@/components/CategoryPageClient";

const BASE_URL = "https://griham99.com";

const CATEGORY_SEO_DATA = {
  home: {
    title: "Home Essentials",
    description:
      "Welcome to Griham 99+ Jaipur's curated collection of Home Essentials under ₹99. From festive warm white LED rice lights and copper wire fairy lights to decorative temple diyas, door mats, and daily room accents, we bring you genuine durable home utility finds. All products are sourced directly from verified Indian artisans and manufacturers, eliminating middleman costs to offer honest wholesale pricing to households across Tonk Phatak, Mansarovar, Malviya Nagar, and all Jaipur locations. Enjoy same-day dispatch and free home delivery on orders above ₹499.",
  },
  kitchen: {
    title: "Kitchen & Dining",
    description:
      "Upgrade your cooking and dining experience with Griham 99+'s Kitchen & Dining essentials under ₹99. Discover heavy-gauge stainless steel storage dabbas, manual vegetable pull choppers, silicone basting brushes, egg whisks, spice containers, and unbreakable dining bowls. Designed specifically for Indian kitchens, our utensils withstand heavy daily usage while maintaining food safety standards. Order directly online for fast delivery in Jaipur or visit our Barkat Nagar retail store to explore over 99+ kitchenware varieties starting at just ₹49.",
  },
  beauty: {
    title: "Beauty & Personal Care",
    description:
      "Indulge in pure herbal wellness with our Beauty & Personal Care collection under ₹99 at Griham 99+ Jaipur. Explore authentic steam-distilled rose water facial mists, pure neem wood anti-static wide tooth detangling combs, and handcrafted Ayurvedic vetiver (khus) and sandalwood soaps. Every item is free from harsh adulterants and tailored for everyday grooming. Experience traditional Indian self-care rituals at accessible pricing with swift doorstep delivery across Jaipur and convenient Cash on Delivery (COD) payment.",
  },
  toys: {
    title: "Toys & Kids Items",
    description:
      "Keep your little ones entertained and learning with Griham 99+'s Toys & Kids collection under ₹99 in Jaipur. Our inventory features non-toxic magic slate writing boards, vibrant 24-piece wooden jigsaw puzzles, friction-powered cartoon cars, and interactive brain teaser games. Built with smooth child-safe plastic and durable wood, these toys nurture fine motor skills and creativity without straining your family budget. Order online with quick Jaipur dispatch or visit our Tonk Phatak outlet today.",
  },
  gifts: {
    title: "Gifts & Festive Decor",
    description:
      "Celebrate Indian festivals and special occasions with Griham 99+'s handcrafted Gifts & Decor under ₹99. Explore pure brass Akhand diyas, scented soy wax jar candles, peacock metal incense stick holders, miniature Ganesha idols, and decorative return gifts. Perfect for Diwali, housewarming Griha Pravesh, Rakhi, and family celebrations in Jaipur. Beautifully finished with premium artisan detailing, our gift selections prove that thoughtful, auspicious presents do not require extravagant spending.",
  },
  lifestyle: {
    title: "Lifestyle Accessories",
    description:
      "Add convenience to your daily routine with Lifestyle Accessories under ₹99 from Griham 99+ Jaipur. Featuring adjustable non-slip aluminum phone and tablet desktop stands, double-walled thermal travel mugs, premium vegan leather keychains, and compact card wallets. Built for modern working professionals and students in Jaipur seeking durable, aesthetically sleek lifestyle utilities. Enjoy reliable doorstep delivery with instant UPI and cash on delivery payment options.",
  },
  storage: {
    title: "Storage & Organization",
    description:
      "De-clutter your living spaces effortlessly with Storage & Organization essentials under ₹99 at Griham 99+. Browse our popular 3-piece modular airtight fridge containers, multi-compartment medicine organizer boxes, heavy-duty foldable wardrobe garment organizers, and space-saving hangers. Maximize your kitchen shelves and bedroom closets with sturdy BPA-free containers that keep items dust-free and neatly arranged. Fast, reliable delivery across all Jaipur pincodes.",
  },
  utility: {
    title: "Everyday Utility Products",
    description:
      "Tackle household chores with ease using Griham 99+'s Everyday Utility Products under ₹99 in Jaipur. Discover high-absorbency microfiber cleaning cloths, stainless steel wire scouring pads, compact multi-bit magnetic screwdriver toolsets, and flexible drain unclogging tools. Practical, long-lasting, and priced affordably so you never have to overspend on essential home maintenance tools. Free local Jaipur delivery on orders over ₹499.",
  },
};

async function fetchCategoryProducts(catKey) {
  let products = [];
  try {
    if (process.env.MONGODB_URI) {
      await connectToDatabase();
      products = await Product.find({ category: catKey.toLowerCase().trim() })
        .sort({ productId: 1, createdAt: -1 })
        .lean();
    }
  } catch (err) {
    console.warn("Category products fetch note:", err.message);
  }

  if (!products || products.length === 0) {
    products = PRODUCTS.filter(
      (p) => p.category.toLowerCase().trim() === catKey.toLowerCase().trim()
    );
  }

  return products;
}

export async function generateMetadata({ params }) {
  const catKey = (params.slug || "").toLowerCase().trim();
  const catInfo = CATEGORY_SEO_DATA[catKey];

  if (!catInfo) {
    return {
      title: "Category | Griham 99+ Jaipur",
      description: "Browse 99+ product varieties at Griham 99+ Jaipur.",
    };
  }

  const canonicalUrl = `${BASE_URL}/category/${catKey}`;
  const title = `${catInfo.title} Under ₹99 | Griham 99+ Jaipur`;
  const description = `Shop best ${catInfo.title.toLowerCase()} starting at ₹99 in Jaipur. Free delivery across Jaipur on ₹499+. Kitchen, home, and storage finds at Griham 99+.`;

  return {
    title,
    description,
    keywords: [
      `${catInfo.title} under 99`,
      `${catInfo.title} Jaipur`,
      "99 store Jaipur",
      "Griham 99+",
      "home essentials under 99",
      "kitchen storage 99 rupees",
      "Jaipur free delivery 99 store",
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
          url: "https://griham99.com/assets/logo.svg",
          width: 1200,
          height: 630,
          alt: `${catInfo.title} Under ₹99 - Griham 99+ Jaipur`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://griham99.com/assets/logo.svg"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function CategoryPage({ params }) {
  const catKey = (params.slug || "").toLowerCase().trim();
  const catInfo = CATEGORY_SEO_DATA[catKey];

  if (!catInfo) {
    notFound();
  }

  const products = await fetchCategoryProducts(catKey);
  const canonicalUrl = `${BASE_URL}/category/${catKey}`;

  // 1. Structured Data: CollectionPage & ItemList Schema
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${canonicalUrl}#collection`,
    "name": `${catInfo.title} Under ₹99 | Griham 99+ Jaipur`,
    "description": catInfo.description,
    "url": canonicalUrl,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": products.map((item, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "item": {
          "@type": "Product",
          "name": item.name,
          "image": item.image,
          "description": item.description,
          "offers": {
            "@type": "Offer",
            "price": item.price,
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock",
          },
        },
      })),
    },
  };

  // 2. Structured Data: BreadcrumbList Schema
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
        "name": catInfo.title,
        "item": canonicalUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CategoryPageClient
        categoryKey={catKey}
        title={catInfo.title}
        descriptionText={catInfo.description}
        products={products}
      />
    </>
  );
}
