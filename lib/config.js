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
  // Store WhatsApp dispatch number (country code + 10 digits without + or spaces)
  whatsappNumber: "919352456169",
  // Display support phone number
  supportPhone: "+91 93524 56169",
  supportHours: "Mon-Sat, 10 AM - 7 PM",
  // Free delivery threshold in INR
  freeShippingThreshold: 499,
  // Currency symbol
  currency: "₹",
};

export default siteConfig;
