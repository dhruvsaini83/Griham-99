import "./globals.css";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-jakarta",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-playfair",
});

export const viewport = {
  themeColor: "#FF6B00",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://griham-99.vercel.app";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Griham 99+ | Jaipur Handicrafts & Home Decor Under ₹99",
    template: "%s | Griham 99+",
  },
  description:
    "Jaipur se handmade home decor, diyas, toran, pooja essentials under ₹99. Free delivery in Jaipur. Cash on Delivery available. Shop Griham 99+",
  keywords: [
    "Jaipur handicrafts",
    "home decor under 99",
    "pooja essentials",
    "Griham 99+",
    "Griham 99",
    "Jaipur diya",
    "toran",
    "99 store Jaipur",
    "kitchen storage 99 rupees",
    "kitchen organizers under 99",
    "affordable home utility Jaipur",
  ],
  applicationName: "Griham 99+",
  authors: [{ name: "Griham 99+" }],
  creator: "Griham 99+",
  publisher: "Griham 99+",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    alternateLocale: "hi_IN",
    url: siteUrl,
    title: "Griham 99+ - Jaipur Handicrafts Under ₹99",
    description: "Jaipur ke best handicrafts, daily essentials aur home decor under ₹99. Free delivery in Jaipur.",
    siteName: "Griham 99+",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Griham 99+ Jaipur Handicrafts & Home Decor Under ₹99",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Griham 99+ | Jaipur Handicrafts Under ₹99",
    description: "Handmade decor, pooja essentials & kitchen finds under ₹99 from Jaipur",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/assets/logo.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/assets/logo.svg",
    apple: "/assets/logo.svg",
  },
  verification: {
    google: "your-google-verification-code",
  },
};

const storeJsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  "name": "Griham 99+",
  "image": `${siteUrl}/assets/logo.svg`,
  "@id": siteUrl,
  "url": siteUrl,
  "telephone": "+919352456169",
  "priceRange": "₹99+",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Gali No. 15, Sachivalaya Colony, Adarsh Bazar, Barkat Nagar, Tonk Phatak",
    "addressLocality": "Jaipur",
    "addressRegion": "Rajasthan",
    "postalCode": "302015",
    "addressCountry": "IN",
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "26.8788685",
    "longitude": "75.7926009",
  },
  "openingHours": "Mo-Su 09:00-21:00",
  "paymentAccepted": "Cash, UPI, Credit Card, Debit Card",
  "currenciesAccepted": "INR",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  "name": "Griham 99+",
  "alternateName": ["Griham 99 Plus", "गृहम 99+ Store Jaipur"],
  "url": siteUrl,
  "logo": `${siteUrl}/assets/logo.svg`,
  "image": `${siteUrl}/assets/logo.svg`,
  "telephone": "+919352456169",
  "email": "support@griham99.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Gali No. 15, Sachivalaya Colony, Adarsh Bazar, Barkat Nagar, Tonk Phatak",
    "addressLocality": "Jaipur",
    "addressRegion": "Rajasthan",
    "postalCode": "302015",
    "addressCountry": "IN",
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+919352456169",
    "contactType": "customer service",
    "areaServed": "IN",
    "availableLanguage": ["Hindi", "English"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/logo.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/assets/logo.svg" />
        <meta name="theme-color" content="#FF6B00" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(storeJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`${jakarta.variable} ${playfair.variable} font-sans`}>{children}</body>
    </html>
  );
}
