"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function AdminDashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/stats", {
        credentials: "include",
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to load dashboard metrics");
      }
      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#FF6B00] via-[#FF8533] to-[#FFA05E] rounded-3xl p-6 sm:p-8 text-white shadow-lg shadow-orange-500/15 relative overflow-hidden">
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold mb-3">
            <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
            <span>Griham 99+ Live Store Admin</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
            Namaste Retailer Ji! 🙏
          </h1>
          <p className="mt-1 text-orange-100 text-sm sm:text-base font-medium">
            Apne store ke products, categories aur stock yahan se direct manage karein.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              href="/admin/products/add"
              className="inline-flex items-center gap-2 bg-white text-[#FF6B00] hover:bg-orange-50 font-bold px-4 py-2.5 rounded-xl shadow-md min-h-[44px] transition-transform active:scale-95 text-sm"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              <span>+ Naya Product Dalein</span>
            </Link>

            <Link
              href="/admin/products"
              className="inline-flex items-center gap-2 bg-black/20 hover:bg-black/30 backdrop-blur-sm text-white font-semibold px-4 py-2.5 rounded-xl min-h-[44px] transition-colors text-sm"
            >
              <span>View All Products</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Decorative Graphic Element */}
        <div className="absolute -right-6 -bottom-8 opacity-15 pointer-events-none text-white font-black text-9xl tracking-tighter select-none">
          99+
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-white rounded-2xl border border-gray-100 p-5">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      )}

      {/* Error Alert */}
      {error && !loading && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>Stats load karne me samasya: {error}</span>
          </div>
          <button
            onClick={fetchStats}
            className="px-3 py-1 bg-red-100 hover:bg-red-200 rounded-lg text-xs font-bold"
          >
            Retry
          </button>
        </div>
      )}

      {/* Metric Cards */}
      {data && !loading && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Total Products */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Total Products
                </span>
                <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#FF6B00] flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
              </div>
              <div className="mt-3">
                <span className="text-2xl sm:text-3xl font-black text-gray-900">
                  {data.stats.totalProducts}
                </span>
                <span className="text-xs text-gray-500 ml-1.5 font-medium">सामान live</span>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <span>In Stock:</span>
                <span className="font-bold">{data.stats.inStock}</span>
              </div>
            </div>

            {/* Total Categories */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Categories
                </span>
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                </div>
              </div>
              <div className="mt-3">
                <span className="text-2xl sm:text-3xl font-black text-gray-900">
                  {data.stats.totalCategories}
                </span>
                <span className="text-xs text-gray-500 ml-1.5 font-medium">श्रेणियां</span>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500 truncate">
                Kitchen, Storage, Home...
              </div>
            </div>

            {/* Low / Out of Stock */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Stock Alert
                </span>
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
              </div>
              <div className="mt-3">
                <span className="text-2xl sm:text-3xl font-black text-amber-600">
                  {data.stats.lowStock + data.stats.outOfStock}
                </span>
                <span className="text-xs text-gray-500 ml-1.5 font-medium">items</span>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500 flex justify-between">
                <span>Low: {data.stats.lowStock}</span>
                <span className="text-red-500 font-bold">Out: {data.stats.outOfStock}</span>
              </div>
            </div>

            {/* Total Orders */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Total Orders
                </span>
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
              </div>
              <div className="mt-3">
                <span className="text-2xl sm:text-3xl font-black text-gray-900">
                  {data.stats.totalOrders || 0}
                </span>
                <span className="text-xs text-gray-500 ml-1.5 font-medium">ऑर्डर्स</span>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-blue-600 font-semibold">
                WhatsApp + DB Synced
              </div>
            </div>
          </div>

          {/* Quick Action Navigation Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <Link
              href="/admin/products/add"
              className="bg-white rounded-2xl p-5 border-2 border-orange-200 hover:border-[#FF6B00] shadow-sm hover:shadow-md transition-all group flex items-start gap-4 min-h-[80px]"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-500 text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-md shadow-orange-500/20">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-base group-hover:text-[#FF6B00] transition-colors">
                  Add Product (नया सामान)
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Phone ke camera se photo kheench ke turant add karein.
                </p>
              </div>
            </Link>

            <Link
              href="/admin/products"
              className="bg-white rounded-2xl p-5 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md transition-all group flex items-start gap-4 min-h-[80px]"
            >
              <div className="w-12 h-12 rounded-xl bg-gray-900 text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-base">View All Products</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Sabhi {data.stats.totalProducts} items dekhein, edit karein ya delete karein.
                </p>
              </div>
            </Link>

            <button
              onClick={() => setShowOrderModal(true)}
              className="bg-white rounded-2xl p-5 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md transition-all group flex items-start gap-4 text-left min-h-[80px]"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-gray-900 text-base">Manage Orders</h3>
                  <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded">
                    Future
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  Customer orders tracking aur dispatch management.
                </p>
              </div>
            </button>
          </div>

          {/* Recently Added Products List */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-gray-900 text-base sm:text-lg">
                  Recent Products (ताज़ा सामान)
                </h2>
                <p className="text-xs text-gray-500">
                  MongoDB Atlas me haal hi me add kiye gaye items
                </p>
              </div>
              <Link
                href="/admin/products"
                className="text-xs font-bold text-[#073B2A] hover:text-[#C9A24A] hover:underline"
              >
                Sabhi Dekhein →
              </Link>
            </div>

            <div className="divide-y divide-gray-100">
              {data.recentProducts?.map((product) => (
                <div
                  key={product._id}
                  className="p-3.5 sm:p-4 hover:bg-orange-50/40 transition-colors flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-14 h-14 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0 relative border border-gray-200">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                          No Pic
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-gray-400">
                          #{product.productId || "---"}
                        </span>
                        <span className="px-2 py-0.5 bg-orange-100 text-[#FF6B00] rounded-md text-[10px] font-black">
                          ₹{product.price || 99}
                        </span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-xs text-gray-400 line-through">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-gray-900 truncate mt-0.5">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[11px] text-gray-500 capitalize bg-gray-100 px-2 py-0.5 rounded">
                          {product.category}
                        </span>
                        <span
                          className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                            product.stock > 10
                              ? "bg-emerald-50 text-emerald-700"
                              : product.stock > 0
                              ? "bg-amber-50 text-amber-700"
                              : "bg-red-50 text-red-700"
                          }`}
                        >
                          Stock: {product.stock}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/admin/products/edit/${product.productId || product._id}`}
                    className="px-3.5 py-2 min-h-[44px] bg-gray-100 hover:bg-orange-100 hover:text-[#FF6B00] rounded-xl text-xs font-bold text-gray-700 transition-colors flex items-center gap-1 flex-shrink-0"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    <span>Edit</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Orders Future Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl animate-in fade-in zoom-in-95">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-xl font-black text-gray-900">Manage Orders</h3>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              Customer orders direct MongoDB Atlas me save ho rahe hain aur WhatsApp notification bhi generate ho raha hai. Full admin order dispatch console agle update me live hoga!
            </p>
            <button
              onClick={() => setShowOrderModal(false)}
              className="mt-6 w-full py-3 min-h-[44px] bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-black transition-colors"
            >
              Theek Hai (Close)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
