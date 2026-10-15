import "./globals.css";
export const viewport = {
  themeColor: "#073B2A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  metadataBase: new URL("https://griham99.com"),
  title: {
    default: "गृहम 99+ | Griham 99+ — 99+ Product Varieties | Starting at ₹49",
    template: "%s | Griham 99+",
  },
  description:
    "Explore 99+ varieties of everyday essentials, useful finds, kitchenware, gifts, festive decor and more at Griham 99+. Affordable Indian retail shopping starting at just ₹49.",
  keywords: [
    "Griham 99+",
    "गृहम 99",
    "99 store India",
    "everyday essentials",
    "kitchenware starting at 49",
    "home decor under 99",
    "Indian retail store",
    "Diwali diyas and lights",
    "affordable home utility",
  ],
  applicationName: "Griham 99+",
  authors: [{ name: "Griham 99+ Retail" }],
  creator: "Griham 99+",
  publisher: "Griham 99+",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    alternateLocale: "hi_IN",
    url: "https://griham99.com",
    title: "गृहम 99+ | Griham 99+ — Shop More. Save More. Starting at ₹49",
    description:
      "99+ product varieties of home, kitchen, beauty, gifts & utility essentials starting at ₹49. Express delivery & COD across India.",
    siteName: "Griham 99+",
  },
  twitter: {
    card: "summary_large_image",
    title: "गृहम 99+ | Griham 99+ — 99+ Varieties From ₹49",
    description:
      "Explore 99+ varieties of everyday essentials, kitchen finds & gifts starting at ₹49.",
  },
  icons: {
    icon: [
      { url: "/assets/logo.svg", type: "image/svg+xml" },
      { url: "/assets/logo.svg", sizes: "any" },
    ],
    shortcut: "/assets/logo.svg",
    apple: "/assets/logo.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/logo.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/assets/logo.svg" />
        <link rel="apple-touch-icon" href="/assets/logo.svg" />
        <meta name="theme-color" content="#073B2A" />
      </head>
      <body>{children}</body>
    </html>
  );
}
