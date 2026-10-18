"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");

  // Delete modal state
  const [productToDelete, setProductToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to fetch products");
      }
      setProducts(data.products || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleDelete = async () => {
    if (!productToDelete) return;
    setIsDeleting(true);

    try {
      const id = productToDelete.productId || productToDelete._id;
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Delete failed");
      }

      setProducts((prev) => prev.filter((p) => (p.productId || p._id) !== id));
      showToast(`"${productToDelete.name}" safaltapoorvak delete ho gaya.`);
      setProductToDelete(null);
    } catch (err) {
      alert("Error deleting product: " + err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  // Extract all categories dynamically
  const categories = useMemo(() => {
    const set = new Set();
    products.forEach((p) => {
      if (p.category) set.add(p.category.toLowerCase());
    });
    return ["all", ...Array.from(set)];
  }, [products]);

  // Filtered list
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Search filter
      const matchesSearch =
        !search ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        (item.productId && item.productId.toString().includes(search)) ||
        (item.category && item.category.toLowerCase().includes(search.toLowerCase()));

      // Category filter
      const matchesCategory =
        selectedCategory === "all" ||
        item.category?.toLowerCase() === selectedCategory.toLowerCase();

      // Stock filter
      let matchesStock = true;
      if (stockFilter === "in_stock") matchesStock = item.stock > 10;
      if (stockFilter === "low_stock") matchesStock = item.stock > 0 && item.stock <= 10;
      if (stockFilter === "out_of_stock") matchesStock = item.stock === 0;

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [products, search, selectedCategory, stockFilter]);

  return (
    <div className="space-y-5">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-sm font-bold animate-in slide-in-from-top-4">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header and Top Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">
              All Products (सारे सामान)
            </h1>
            <span className="px-2.5 py-0.5 bg-orange-100 text-[#FF6B00] text-xs font-black rounded-full">
              {filteredProducts.length} items
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            Dukaan ke sabhi products yahan dekhein, daam badlein ya naye photo upload karein.
          </p>
        </div>

        <Link
          href="/admin/products/add"
          className="inline-flex items-center justify-center gap-2 bg-[#FF6B00] hover:bg-[#E05300] active:scale-95 text-white font-bold px-5 py-3 rounded-xl shadow-lg shadow-orange-500/20 text-sm min-h-[44px] transition-all"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          <span>+ Naya Product Dalein</span>
        </Link>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, category, or ID (e.g. Masala, Kitchen, 101)..."
              className="w-full h-11 pl-10 pr-10 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent transition-all"
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
              >
                ✕
              </button>
            )}
          </div>

          {/* Stock Filter Select */}
          <div className="w-full sm:w-48">
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-semibold text-gray-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
            >
              <option value="all">Sabhi Stock (All)</option>
              <option value="in_stock">In Stock (&gt;10)</option>
              <option value="low_stock">Low Stock (1-10)</option>
              <option value="out_of_stock">Out of Stock (0)</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="text-gray-400 font-bold flex-shrink-0">Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-bold capitalize transition-all whitespace-nowrap min-h-[32px] ${
                selectedCategory === cat
                  ? "bg-[#FF6B00] text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat === "all" ? "Sabhi (All)" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="py-20 text-center">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-orange-500 border-t-transparent"></div>
          <p className="mt-3 text-sm font-bold text-gray-500">MongoDB se products load ho rahe hain...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-center">
          <p className="text-red-700 font-bold text-sm">Failed to load products: {error}</p>
          <button
            onClick={fetchProducts}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredProducts.length === 0 && (
        <div className="bg-white rounded-2xl p-10 border border-gray-200 text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-orange-100 text-[#FF6B00] flex items-center justify-center mx-auto text-2xl">
            📦
          </div>
          <h3 className="text-lg font-black text-gray-900">Koi Product Nahi Mila</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Aapke search ya category filter ke mutabiq koi product nahi mila. Filter reset karein ya naya product add karein.
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("all");
                setStockFilter("all");
              }}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-xs font-bold text-gray-700 mr-2 min-h-[44px]"
            >
              Filters Clear Karein
            </button>
            <Link
              href="/admin/products/add"
              className="px-4 py-2 bg-[#FF6B00] text-white rounded-xl text-xs font-bold min-h-[44px] inline-flex items-center"
            >
              + Naya Product Add Karein
            </Link>
          </div>
        </div>
      )}

      {/* Products List: Mobile Card View (< 768px) */}
      {!loading && !error && filteredProducts.length > 0 && (
        <div className="space-y-3 md:hidden">
          {filteredProducts.map((p) => {
            const pId = p.productId || p._id;
            return (
              <div
                key={p._id}
                className="bg-white rounded-2xl p-4 border border-gray-200/90 shadow-sm space-y-3"
              >
                <div className="flex gap-3">
                  {/* Thumbnail */}
                  <div className="w-20 h-20 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0 relative border border-gray-200">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs font-bold">
                        No Photo
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-gray-400">
                        #{p.productId || p._id.toString().slice(-4)}
                      </span>
                      {p.bestseller && (
                        <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded text-[9px] font-black uppercase">
                          Bestseller
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-gray-900 text-sm line-clamp-2 mt-0.5 leading-snug">
                      {p.name}
                    </h3>

                    {/* Price with ₹99 badge */}
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="px-2 py-0.5 bg-orange-100 text-[#FF6B00] rounded-md text-xs font-black shadow-xs">
                        ₹{p.price || 99}
                      </span>
                      {p.originalPrice && p.originalPrice > p.price && (
                        <span className="text-xs text-gray-400 line-through">
                          ₹{p.originalPrice}
                        </span>
                      )}
                      <span className="text-[11px] text-gray-500 capitalize bg-gray-100 px-2 py-0.5 rounded">
                        {p.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stock info and Actions row */}
                <div className="pt-2.5 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-gray-500 font-medium">Stock:</span>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        p.stock > 10
                          ? "bg-emerald-100 text-emerald-800"
                          : p.stock > 0
                          ? "bg-amber-100 text-amber-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {p.stock} units
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/products/edit/${pId}`}
                      className="px-3.5 py-2 min-h-[44px] min-w-[44px] bg-gray-100 hover:bg-orange-100 hover:text-[#FF6B00] rounded-xl text-xs font-bold text-gray-700 transition-colors flex items-center justify-center gap-1"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      <span>Edit</span>
                    </Link>

                    <button
                      onClick={() => setProductToDelete(p)}
                      className="px-3 py-2 min-h-[44px] min-w-[44px] bg-red-50 hover:bg-red-100 rounded-xl text-xs font-bold text-red-600 transition-colors flex items-center justify-center gap-1"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Products Table: Desktop & Tablet View (>= 768px) */}
      {!loading && !error && filteredProducts.length > 0 && (
        <div className="hidden md:block bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">
                <th className="py-3.5 px-4">Photo</th>
                <th className="py-3.5 px-4">Product Details</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Stock</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredProducts.map((p) => {
                const pId = p.productId || p._id;
                return (
                  <tr key={p._id} className="hover:bg-orange-50/30 transition-colors">
                    {/* Thumbnail */}
                    <td className="py-3 px-4">
                      <div className="w-14 h-14 rounded-xl bg-gray-100 overflow-hidden relative border border-gray-200">
                        {p.image ? (
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                            No Pic
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Name & ID */}
                    <td className="py-3 px-4 max-w-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-bold text-gray-400">
                          #{p.productId || p._id.toString().slice(-4)}
                        </span>
                        {p.bestseller && (
                          <span className="px-1.5 py-0.2 bg-amber-100 text-amber-800 text-[10px] font-bold rounded">
                            Bestseller
                          </span>
                        )}
                      </div>
                      <div className="font-bold text-gray-900 truncate mt-0.5">{p.name}</div>
                      <div className="text-xs text-gray-400 truncate">{p.slug}</div>
                    </td>

                    {/* Price with ₹99 badge */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 bg-orange-100 text-[#FF6B00] rounded-lg text-xs font-black">
                          ₹{p.price || 99}
                        </span>
                        {p.originalPrice && p.originalPrice > p.price && (
                          <span className="text-xs text-gray-400 line-through">
                            ₹{p.originalPrice}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium capitalize">
                        {p.category}
                      </span>
                    </td>

                    {/* Stock Status */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          p.stock > 10
                            ? "bg-emerald-100 text-emerald-800"
                            : p.stock > 0
                            ? "bg-amber-100 text-amber-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {p.stock} in stock
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-2">
                        <Link
                          href={`/admin/products/edit/${pId}`}
                          className="px-3 py-1.5 bg-gray-100 hover:bg-orange-100 hover:text-[#FF6B00] rounded-lg text-xs font-bold text-gray-700 transition-colors"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => setProductToDelete(p)}
                          className="px-3 py-1.5 bg-red-50 hover:bg-red-100 rounded-lg text-xs font-bold text-red-600 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl animate-in fade-in zoom-in-95">
            <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
            <h3 className="text-lg font-black text-gray-900">Product Delete Karein?</h3>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              Kya aap sach me{" "}
              <span className="font-bold text-gray-800">
                &ldquo;{productToDelete.name}&rdquo;
              </span>{" "}
              ko MongoDB store se hamesha ke liye delete karna chahte hain?
            </p>

            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setProductToDelete(null)}
                disabled={isDeleting}
                className="flex-1 py-3 min-h-[44px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold text-sm transition-colors"
              >
                Rukien (Cancel)
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 py-3 min-h-[44px] bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-sm shadow-md shadow-red-600/25 transition-all flex items-center justify-center gap-1.5"
              >
                {isDeleting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Haan, Delete Karo</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
