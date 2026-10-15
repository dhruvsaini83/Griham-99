/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        forest: "#073B2A",
        "deep-forest": "#041F18",
        "matte-black": "#101210",
        "surface-dark": "#151D18",
        gold: "#C9A24A",
        "gold-light": "#E6C875",
        "gold-dark": "#9B7829",
        ivory: "#F8F3E8",
        cream: "#FAF7F2",
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
        serif: ["'Playfair Display'", "Georgia", "serif"],
        royal: ["'Cinzel'", "serif"],
        hindi: ["'Noto Sans Devanagari'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
