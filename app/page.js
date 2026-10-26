import HomeClient from "@/components/HomeClient";
import { PRODUCTS } from "@/data/products";
import { FAQS } from "@/data/faqs";

export const metadata = {
  title: "All Home Essentials at Just ₹99 in Jaipur | Griham 99+",
  description:
    "Ghar ke har zaroori items sirf ₹99 me. Jaipur me fastest free delivery. Explore 99+ kitchen storage, organizers, home decor & utility products at Griham 99+.",
  keywords: [
    "99 store Jaipur",
    "home essentials under 99",
    "kitchen storage 99 rupees",
    "Griham 99",
    "Griham 99+",
    "Griham 99 Plus",
    "99 store Tonk Phatak",
    "Jaipur online shopping 99",
  ],
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://griham-99.vercel.app",
  },
  openGraph: {
    title: "All Home Essentials at Just ₹99 in Jaipur | Griham 99+",
    description:
      "Ghar ke har zaroori items sirf ₹99 me. Jaipur me free delivery. Kitchen storage, home decor and utility essentials at Griham 99+.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://griham-99.vercel.app",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://griham-99.vercel.app"}/assets/logo.svg`,
        width: 1200,
        height: 630,
        alt: "Griham 99+ - 99 Store Jaipur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "All Home Essentials at Just ₹99 in Jaipur | Griham 99+",
    description:
      "Ghar ke har zaroori items sirf ₹99 me. Jaipur me fastest free delivery.",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL || "https://griham-99.vercel.app"}/assets/logo.svg`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HomePage() {
  // 1. Structured Data: ItemList schema for top featured products
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": PRODUCTS.slice(0, 10).map((product, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": "Product",
        "name": product.name,
        "image": product.image,
        "description": product.description,
        "offers": {
          "@type": "Offer",
          "price": product.price,
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
        },
      },
    })),
  };

  // 2. Structured Data: FAQPage schema for Google Search Rich Results
  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map((faq) => ({
      "@type": "Question",
      "name": faq.qEn,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.aEn,
      },
    })),
  };

  return (
    <>
      <link
        rel="preload"
        as="image"
        href="https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=1200&q=80"
        fetchPriority="high"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />
      <HomeClient />
    </>
  );
}
