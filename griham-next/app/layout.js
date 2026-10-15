import "./globals.css";

export const metadata = {
  title: "गृहम 99+ | Griham 99+ — 99+ Product Varieties | Starting at ₹49",
  description:
    "Explore 99+ varieties of everyday essentials, useful finds, kitchenware, gifts, decor and more at Griham 99+. Affordable Indian retail shopping starting at just ₹49.",
  keywords:
    "Griham 99+, गृहम 99, 99 store, everyday essentials, kitchenware starting at 49, home decor under 99, Indian retail store",
  openGraph: {
    type: "website",
    title: "गृहम 99+ | Griham 99+ — Shop More. Save More.",
    description:
      "99+ product varieties of home, kitchen, beauty, gifts & utility essentials starting at ₹49.",
    siteName: "Griham 99+",
  },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='48' fill='%23073B2A' stroke='%23C9A24A' stroke-width='4'/%3E%3Cpath d='M50 18 L24 40 L30 40 L30 76 L70 76 L70 40 L76 40 Z' fill='none' stroke='%23C9A24A' stroke-width='4' stroke-linejoin='round'/%3E%3Cpath d='M50 44 Q50 32 50 30 Q54 36 50 44' fill='%23E6C875'/%3E%3Ccircle cx='50' cy='56' r='5' fill='%23C9A24A'/%3E%3C/svg%3E",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
