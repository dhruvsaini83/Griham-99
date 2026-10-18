/**
 * Cloudinary & Unsplash Image URL Optimizer
 * Injects automatic format (WebP/AVIF), quality optimization, and max width bounding
 * to prevent multi-megabyte raw camera photo downloads.
 */
export function getOptimizedImageUrl(url, width = 400) {
  if (!url || typeof url !== "string") return url;

  // Cloudinary: deliver WebP/AVIF automatically with quality & width caps
  if (url.includes("res.cloudinary.com") && url.includes("/upload/")) {
    // Avoid double transformation if already present
    if (url.includes("/upload/f_auto,q_auto")) {
      return url;
    }
    return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width},c_limit/`);
  }

  // Unsplash: set format, crop, width and 75% quality
  if (url.includes("images.unsplash.com")) {
    const clean = url.split("?")[0];
    return `${clean}?auto=format&fit=crop&w=${width}&q=75`;
  }

  return url;
}
