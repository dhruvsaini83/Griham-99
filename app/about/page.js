import AboutClient from "@/components/AboutClient";
import { siteConfig } from "@/lib/config";

export const metadata = {
  title: "About Griham 99+ Store Jaipur | Apka Apna Ghar Ka 99 Store",
  description:
    "Griham 99+ Store at Barkat Nagar, Tonk Phatak, Jaipur. 99+ everyday home & kitchen utility essentials starting at ₹49. Free Jaipur delivery. Visit us today!",
  keywords: [
    "Griham 99+ Jaipur",
    "99 store Barkat Nagar",
    "99 store Tonk Phatak",
    "Griham 99 store address",
    "home essentials Jaipur",
    "kitchen shop Jaipur",
    "affordable shopping Jaipur",
    "Griham 99 Store Jaipur",
  ],
  alternates: {
    canonical: "https://griham99.com/about",
  },
  openGraph: {
    title: "About Griham 99+ Store Jaipur | Apka Apna Ghar Ka 99 Store",
    description:
      "Visit Griham 99 Store in Barkat Nagar, Tonk Phatak, Jaipur. Quality home, kitchen, and festive decor under ₹99.",
    url: "https://griham99.com/about",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "https://griham99.com/assets/logo.svg",
        width: 1200,
        height: 630,
        alt: "Griham 99+ Store Jaipur Location",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Griham 99+ Store Jaipur | Apka Apna Ghar Ka 99 Store",
    description:
      "Griham 99+ Store at Barkat Nagar, Tonk Phatak, Jaipur. 99+ everyday essentials starting at ₹49.",
    images: ["https://griham99.com/assets/logo.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const storeSchema = {
  "@context": "https://schema.org",
  "@type": "Store",
  "@id": "https://griham99.com/about#store",
  name: "Griham 99 Store (गृहम 99)",
  alternateName: ["Griham 99+", "Griham 99 Plus Store Jaipur"],
  description:
    "Griham 99 Store - Apka Apna Ghar Ka Store at Gali No. 15, Sachivalaya Colony, Adarsh Bazar, Barkat Nagar, Tonk Phatak, Jaipur, Rajasthan 302015. Jaipur based store providing 99+ everyday home, kitchen, festive and storage essentials starting at ₹49.",
  image: [
    "https://griham99.com/assets/logo.svg",
    "https://griham99.com/assets/IMG-20261006-WA0023.jpg",
  ],
  logo: "https://griham99.com/assets/logo.svg",
  url: "https://griham99.com/about",
  telephone: siteConfig.supportPhone,
  email: siteConfig.supportEmail,
  priceRange: "₹49 - ₹99",
  currenciesAccepted: "INR",
  paymentAccepted: "Cash, UPI, Google Pay, PhonePe, Paytm, Debit Card, Credit Card",
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.fullAddress,
    addressLocality: "Jaipur",
    addressRegion: "Rajasthan",
    postalCode: "302015",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: siteConfig.geo.latitude,
    longitude: siteConfig.geo.longitude,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "10:00",
      closes: "21:00",
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://griham99.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "About Store",
      item: "https://griham99.com/about",
    },
  ],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(storeSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AboutClient />
    </>
  );
}
