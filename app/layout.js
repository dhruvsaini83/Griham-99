import "./globals.css";

export const viewport = {
  themeColor: "#FF6B00",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  metadataBase: new URL("https://griham99.com"),
  title: {
    default: "All Home & Kitchen Essentials at ₹99 in Jaipur | Griham 99+",
    template: "%s | Griham 99+",
  },
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
    "kitchen organizers under 99",
    "affordable home utility Jaipur",
  ],
  applicationName: "Griham 99+",
  authors: [{ name: "Griham 99+ Store Jaipur" }],
  creator: "Griham 99+",
  publisher: "Griham 99+",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  alternates: {
    canonical: "https://griham99.com",
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
    url: "https://griham99.com",
    title: "All Home & Kitchen Essentials at ₹99 in Jaipur | Griham 99+",
    description:
      "Ghar ke liye mazboot kitchen storage, daily essentials aur decor sirf ₹99 me. Jaipur me free delivery. Griham 99+ pe order karo.",
    siteName: "Griham 99+",
    images: [
      {
        url: "https://griham99.com/assets/logo.svg",
        width: 1200,
        height: 630,
        alt: "Griham 99+ - All Home Essentials at ₹99 in Jaipur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "All Home & Kitchen Essentials at ₹99 in Jaipur | Griham 99+",
    description:
      "Ghar ke liye mazboot kitchen storage, daily essentials aur decor sirf ₹99 me. Jaipur me free delivery.",
    images: ["https://griham99.com/assets/logo.svg"],
  },
  icons: {
    icon: [
      { url: "/assets/logo.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/assets/logo.svg",
    apple: "/assets/logo.svg",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://griham99.com/#organization",
  name: "Griham 99+",
  alternateName: ["Griham 99 Plus", "गृहम 99+ Store Jaipur"],
  url: "https://griham99.com",
  logo: "https://griham99.com/assets/logo.svg",
  image: "https://griham99.com/assets/logo.svg",
  telephone: "+919352456169",
  email: "support@griham99.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Gali No. 15, Sachivalaya Colony, Adarsh Bazar, Barkat Nagar, Tonk Phatak",
    addressLocality: "Jaipur",
    addressRegion: "Rajasthan",
    postalCode: "302015",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+919352456169",
    contactType: "customer service",
    areaServed: "IN",
    availableLanguage: ["Hindi", "English"],
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
