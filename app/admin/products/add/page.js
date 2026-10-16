"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CATEGORY_OPTIONS = [
  { value: "kitchen", label: "Kitchen (रसोई का सामान)" },
  { value: "storage", label: "Storage & Organizers (स्टोरेज डिब्बे)" },
  { value: "home", label: "Home Essentials (घर की जरूरतें)" },
  { value: "cleaning", label: "Cleaning & Utility (सफाई का सामान)" },
  { value: "bathroom", label: "Bathroom Accessories (बाथरूम)" },
  { value: "decor", label: "Home Decor & Dining (सजावट)" },
  { value: "pooja", label: "Pooja Items (पूजा सामग्री)" },
];

export default function AddProductPage() {
  const router = useRouter();

  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  // Form states
  const [name, setName] = useState("");
  const [price, setPrice] = useState(99);
  const [originalPrice, setOriginalPrice] = useState(199);
  const [category, setCategory] = useState("kitchen");
  const [stock, setStock] = useState(50);
  const [description, setDescription] = useState("");
  const [bestseller, setBestseller] = useState(false);
  const [images, setImages] = useState([]);
  const [manualImageUrl, setManualImageUrl] = useState("");

  // UI states
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successToast, setSuccessToast] = useState("");

  // Calculate discount percentage
  const discountPercent =
    originalPrice && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  // Image Upload Handler
  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setErrorMessage("");

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/admin/upload", {
          method: "POST",
          headers: {
            "x-admin-secret-key": "griham_admin_secret_99",
          },
          body: formData,
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || "Photo upload nahi ho payi.");
        }

        if (data.url) {
          setImages((prev) => [...prev, data.url]);
        }
      }
    } catch (err) {
      setErrorMessage("Upload Error: " + err.message);
    } finally {
      setIsUploading(false);
      // Reset input values so same file can be re-selected if needed
      if (cameraInputRef.current) cameraInputRef.current.value = "";
      if (galleryInputRef.current) galleryInputRef.current.value = "";
    }
  };

  const handleAddManualUrl = () => {
    if (!manualImageUrl.trim()) return;
    setImages((prev) => [...prev, manualImageUrl.trim()]);
    setManualImageUrl("");
  };

  const removeImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("Kripya product ka naam darj karein.");
      return;
    }

    if (images.length === 0) {
      setErrorMessage("Kam se kam ek photo upload karein ya camera se kheencho.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: name.trim(),
        price: Number(price) || 99,
        originalPrice: Number(originalPrice) || Number(price) || 99,
        category: category.toLowerCase().trim(),
        stock: Number(stock) >= 0 ? Number(stock) : 50,
        description: description.trim(),
        image: images[0],
        images: images,
        bestseller: Boolean(bestseller),
        tag: Number(price) <= 99 ? "FLAT ₹99" : "",
      };

      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret-key": "griham_admin_secret_99",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Product save karne me dikkat aayi.");
      }

      setSuccessToast("Badhai! Naya product safaltapoorvak jud gaya! 🎉");

      // Redirect to products list after short delay for user feedback
      setTimeout(() => {
        router.push("/admin/products");
        router.refresh();
      }, 1200);
    } catch (err) {
      setErrorMessage(err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Toast Alert */}
      {successToast && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-sm font-bold animate-in slide-in-from-top-4">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          <span>{successToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              Add New Product (नया सामान जोड़ें)
            </h1>
            <p className="text-xs text-gray-500">
              Retailer Fast Entry Form &bull; Camera se turant photo lein
            </p>
          </div>
        </div>
      </div>

      {/* Error Banner */}
      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-xs sm:text-sm font-medium flex items-start gap-2.5">
          <svg className="w-5 h-5 flex-shrink-0 text-red-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <span className="font-bold">Error:</span> {errorMessage}
          </div>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-200/90 shadow-sm p-5 sm:p-7 space-y-6">
        {/* Section 1: Photos (Most Important for Retailer Mobile) */}
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
            Product Photos (फोटो खींचें या अपलोड करें) <span className="text-red-500">*</span>
          </label>

          {/* Action Buttons: Camera + Gallery */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {/* Native Camera Capture Button */}
            <input
              type="file"
              accept="image/*"
              capture="environment"
              ref={cameraInputRef}
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              type="button"
              disabled={isUploading}
              onClick={() => cameraInputRef.current?.click()}
              className="h-16 rounded-2xl bg-gradient-to-r from-[#FF6B00] to-[#E05300] hover:from-[#E05300] hover:to-[#C94700] text-white font-bold text-sm shadow-md shadow-orange-500/20 active:scale-95 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer disabled:opacity-50"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Photo Kheencho 📸</span>
            </button>

            {/* Gallery File Upload Button */}
            <input
              type="file"
              accept="image/*"
              multiple
              ref={galleryInputRef}
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              type="button"
              disabled={isUploading}
              onClick={() => galleryInputRef.current?.click()}
              className="h-16 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-sm active:scale-95 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer disabled:opacity-50 border border-gray-200"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Gallery Se Upload 🖼️</span>
            </button>
          </div>

          {/* Uploading Spinner */}
          {isUploading && (
            <div className="p-3 bg-orange-50 border border-orange-200 rounded-xl text-[#FF6B00] text-xs font-bold flex items-center justify-center gap-2 animate-pulse mb-3">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Photo upload ho rahi hai...</span>
            </div>
          )}

          {/* Image Previews */}
          {images.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative group rounded-xl overflow-hidden border-2 border-orange-200 aspect-square bg-gray-100"
                >
                  <img src={img} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                  {idx === 0 && (
                    <span className="absolute top-1 left-1 bg-[#FF6B00] text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow">
                      Main Photo
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/70 hover:bg-red-600 text-white flex items-center justify-center text-xs transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-400 italic">
              Abhi koi photo select nahi ki hai. Kripya camera ya gallery se photo upload karein.
            </p>
          )}

          {/* Manual URL fallback */}
          <div className="mt-3 flex gap-2">
            <input
              type="url"
              placeholder="Ya online photo link (URL) paste karein..."
              value={manualImageUrl}
              onChange={(e) => setManualImageUrl(e.target.value)}
              className="flex-1 h-10 px-3 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#FF6B00]"
            />
            <button
              type="button"
              onClick={handleAddManualUrl}
              className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-xs font-bold text-gray-700 min-h-[40px]"
            >
              + Add Link
            </button>
          </div>
        </div>

        {/* Section 2: Product Name */}
        <div>
          <label htmlFor="pname" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
            Product Ka Naam (सामान का नाम) <span className="text-red-500">*</span>
          </label>
          <input
            id="pname"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jaise: Stainless Steel Masala Box / Water Bottle 1L"
            className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 text-base font-semibold text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B00] transition-all"
          />
        </div>

        {/* Section 3: Pricing & MRP */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label htmlFor="pprice" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Daam / Price (₹) <span className="text-[#FF6B00] font-bold">(Flat 99)</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base font-bold text-gray-500">
                ₹
              </span>
              <input
                id="pprice"
                type="number"
                min="0"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full h-12 pl-8 pr-3 rounded-xl bg-orange-50/50 border border-orange-200 text-base font-black text-[#FF6B00] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
              />
            </div>
            <p className="text-[10px] text-gray-400 mt-1">Default 99 for all Griham items</p>
          </div>

          <div>
            <label htmlFor="pmrp" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Asli Daam / MRP (₹)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base font-bold text-gray-400">
                ₹
              </span>
              <input
                id="pmrp"
                type="number"
                min="0"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                placeholder="199"
                className="w-full h-12 pl-8 pr-3 rounded-xl bg-gray-50 border border-gray-200 text-base font-semibold text-gray-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
              />
            </div>
            {discountPercent > 0 && (
              <p className="text-[10px] text-emerald-600 font-bold mt-1">
                {discountPercent}% OFF customer ko dikhega!
              </p>
            )}
          </div>
        </div>

        {/* Section 4: Category & Stock */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label htmlFor="pcat" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Category (श्रेणी चुनें) <span className="text-red-500">*</span>
            </label>
            <select
              id="pcat"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-12 px-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-bold text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
            >
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="pstock" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Stock Quantity (कितना सामान है?)
            </label>
            <input
              id="pstock"
              type="number"
              min="0"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 text-base font-bold text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
            />
          </div>
        </div>

        {/* Section 5: Bestseller Toggle */}
        <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <span className="font-bold text-sm text-gray-900 block">
              Bestseller Tag (क्या ये सबसे ज्यादा बिकने वाला है?)
            </span>
            <span className="text-xs text-gray-500">
              Customer website ke homepage pe Bestseller section me highlight hoga.
            </span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer min-h-[44px]">
            <input
              type="checkbox"
              checked={bestseller}
              onChange={(e) => setBestseller(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[12px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF6B00]"></div>
          </label>
        </div>

        {/* Section 6: Description */}
        <div>
          <label htmlFor="pdesc" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
            Product Ki Jankari (Description)
          </label>
          <textarea
            id="pdesc"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="सामान की खासियत, साइज़ या मटीरियल (Optional)..."
            className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B00] transition-all"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || isUploading}
          className="w-full h-14 min-h-[52px] bg-gradient-to-r from-[#FF6B00] to-[#E05300] hover:from-[#E05300] hover:to-[#C94700] text-white font-black text-lg rounded-2xl shadow-xl shadow-orange-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>MongoDB me Save Ho Raha Hai...</span>
            </>
          ) : (
            <>
              <span>Product Save Karein (सामान जोड़ें)</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
