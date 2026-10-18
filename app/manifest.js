export default function manifest() {
  return {
    name: "Griham 99+ - Jaipur Handicrafts & Home Decor",
    short_name: "Griham99",
    description: "Jaipur handicrafts, pooja essentials and home decor under ₹99",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0B3D2E",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      {
        src: "/assets/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any maskable",
      },
    ],
  };
}
