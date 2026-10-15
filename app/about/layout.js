import { siteConfig } from "@/lib/config";

export const metadata = {
  title: "About Us & Store Location (Jaipur)",
  description:
    "Visit Griham 99 Store at Gali No. 15, Sachivalaya Colony, Adarsh Bazar, Barkat Nagar, Tonk Phatak, Jaipur - 302015. Apka apna ghar ka store offering 99+ varieties of home essentials, kitchenware, and gifts starting at ₹49.",
  keywords: [
    "Griham 99 store Jaipur",
    "Griham 99 Barkat Nagar",
    "Griham 99 Tonk Phatak",
    "Sachivalaya Colony Adarsh Bazar store",
    "99 store in Jaipur",
    "everyday home essentials Jaipur 302015",
    "kitchenware store Tonk Phatak",
    "affordable shopping Jaipur Rajasthan",
    "Griham 99 store location",
    "retail store Jaipur directions",
  ],
  alternates: {
    canonical: "https://griham99.com/about",
  },
  openGraph: {
    title: "About Griham 99 Store — Apka Apna Ghar Ka Store | Barkat Nagar, Tonk Phatak, Jaipur",
    description:
      "Visit our store at Gali No. 15, Sachivalaya Colony, Adarsh Bazar, Barkat Nagar, Tonk Phatak, Jaipur (302015). 99+ varieties starting at honest ₹49.",
    url: "https://griham99.com/about",
    siteName: "Griham 99+",
    type: "website",
    images: [
      {
        url: "/assets/IMG-20261006-WA0023.jpg",
        width: 1200,
        height: 630,
        alt: "Griham 99 Store Jaipur",
      },
    ],
  },
};

export default function AboutLayout({ children }) {
  return children;
}
