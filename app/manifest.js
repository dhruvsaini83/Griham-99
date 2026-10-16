export default function manifest() {
  return {
    name: "Griham 99+ | All Products Under ₹99 in Jaipur",
    short_name: "Griham99",
    description: "Shop 99+ varieties of everyday home, kitchen, and storage essentials at just ₹99 in Jaipur with fast delivery.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF7F2",
    theme_color: "#FF6B00",
    icons: [
      {
        src: "/assets/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any maskable",
      },
      {
        src: "/icon.svg",
        sizes: "512x512",
        type: "image/svg+xml",
      },
    ],
  };
}
