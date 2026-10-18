/**
 * Site & Store Configuration
 * Centralized configuration for public store settings, contact numbers, and branding.
 * Eliminates reliance on framework public environment variables.
 */
export const siteConfig = {
  name: "Griham 99+",
  hindiName: "गृहम 99+",
  tagline: "Shop More. Save More.",
  hindiTagline: "किफायती भारतीय खुदरा स्टोर",
  logo: "/assets/logo.svg",
  // Store Location & Address (Jaipur, Rajasthan)
  storeName: "Griham 99 Store (गृहम 99)",
  storeHeadline: "Apka Apna Ghar Ka Store",
  hindiStoreHeadline: "आपका अपना घर का स्टोर",
  address: {
    line1: "Gali No. 15, Sachivalaya Colony, Adarsh Bazar",
    landmark: "Near Adarsh Bazar, Tonk Phatak",
    locality: "Barkat Nagar, Tonk Phatak",
    city: "Jaipur",
    state: "Rajasthan",
    pincode: "302015",
    country: "India",
    plusCode: "VQHV+G3R, Jaipur",
    fullAddress: "Gali No. 15, Sachivalaya Colony, Adarsh Bazar, Barkat Nagar, Tonk Phatak, Jaipur, Rajasthan - 302015",
  },
  geo: {
    latitude: "26.8788685",
    longitude: "75.7926009",
  },
  storeHours: "10:00 AM - 9:00 PM (Mon - Sun)",
  storeHoursHindi: "सुबह 10:00 बजे से रात 9:00 बजे तक (सोमवार - रविवार)",
  googleMapsDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=26.8788685,75.7926009",
  googleMapsSearchUrl: "https://www.google.com/maps/place/%E0%A4%97%E0%A5%83%E0%A4%B9%E0%A4%AE+99+store/@26.8788685,75.7926009,17z",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2095.791513237451!2d75.79157261046888!3d26.878628667218138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db50053729d01%3A0x357ed32dd27c4ee4!2z4KSX4KWD4KS54KSuIDk5IHN0b3Jl!5e0!3m2!1sen!2sin!4v1792087577113!5m2!1sen!2sin",

  // Store WhatsApp dispatch number (country code + 10 digits without + or spaces)
  whatsappNumber:
    (typeof process !== "undefined" &&
      process.env.NEXT_PUBLIC_WHATSAPP?.replace(/\D/g, "")) ||
    "919352456169",
  // Display support phone number
  supportPhone: "+91 93524 56169",
  supportPhoneTel: "+919352456169",
  // Official support email
  supportEmail: "support@griham99.com",
  supportHours: "Mon-Sun, 10 AM - 9 PM",
  // Free delivery threshold in INR
  freeShippingThreshold: 499,
  // Currency symbol
  currency: "₹",
  // Maximum allowed quantity per item in cart
  maxItemQuantity: 10,
};

export const MAX_ITEM_QUANTITY = 10;

export default siteConfig;

