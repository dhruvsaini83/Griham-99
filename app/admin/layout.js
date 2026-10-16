"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  // If on login page, render clean layout without navigation shells
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    if (confirm("Kya aap Admin portal se logout karna chahte hain?")) {
      setLoggingOut(true);
      try {
        await fetch("/api/admin/logout", { method: "POST" });
        router.push("/admin/login");
        router.refresh();
      } catch (err) {
        console.error("Logout error:", err);
      } finally {
        setLoggingOut(false);
      }
    }
  };

  const navItems = [
    {
      name: "Dashboard",
      labelHi: "डैशबोर्ड",
      href: "/admin",
      exact: true,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
      ),
    },
    {
      name: "Products",
      labelHi: "प्रोडक्ट्स",
      href: "/admin/products",
      exact: true,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
    },
    {
      name: "Add Item",
      labelHi: "+ नया सामान",
      href: "/admin/products/add",
      exact: false,
      highlight: true,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
        </svg>
      ),
    },
  ];

  const isActive = (item) => {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-gray-900 flex flex-col font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-orange-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF6B00] to-[#FF8C38] flex items-center justify-center shadow-md shadow-orange-500/20 text-white font-black text-lg">
              99+
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg tracking-tight text-gray-900">
                  Griham <span className="text-[#FF6B00]">99+</span>
                </span>
                <span className="hidden xs:inline-block px-1.5 py-0.5 bg-orange-100 text-[#FF6B00] text-[10px] font-extrabold rounded uppercase tracking-wider">
                  Admin
                </span>
              </div>
              <p className="text-[10px] text-gray-500 font-medium leading-none">
                दुकानदार पोर्टल (Retailer Panel)
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/admin"
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                pathname === "/admin"
                  ? "bg-orange-50 text-[#FF6B00]"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              Dashboard (डैशबोर्ड)
            </Link>
            <Link
              href="/admin/products"
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                pathname === "/admin/products"
                  ? "bg-orange-50 text-[#FF6B00]"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              All Products (सारे सामान)
            </Link>
            <Link
              href="/admin/products/add"
              className="ml-2 px-4 py-2 rounded-xl text-sm font-bold bg-[#FF6B00] hover:bg-[#E05300] text-white shadow-sm flex items-center gap-1.5 transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              <span>+ Add Product (नया सामान)</span>
            </Link>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
              title="Open Live Customer Store"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              <span>Live Store</span>
            </a>

            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="px-3 py-1.5 min-h-[44px] rounded-lg text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-colors flex items-center gap-1"
              title="Logout from Admin"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span className="hidden xs:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 pb-24 md:pb-12">
        {children}
      </main>

      {/* Mobile Sticky Bottom Navigation Bar (Retailer Fast Actions) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg px-3 py-2 flex items-center justify-around">
        {navItems.map((item) => {
          const active = isActive(item);
          if (item.highlight) {
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex flex-col items-center justify-center -mt-5 bg-gradient-to-tr from-[#FF6B00] to-[#FF8C38] text-white p-3.5 rounded-full shadow-lg shadow-orange-500/40 active:scale-95 transition-transform min-w-[54px] min-h-[54px]"
              >
                {item.icon}
                <span className="text-[10px] font-black mt-0.5 tracking-tight">{item.labelHi}</span>
              </Link>
            );
          }
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg min-h-[44px] transition-colors ${
                active ? "text-[#FF6B00] font-bold" : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {item.icon}
              <span className="text-[11px] mt-0.5 font-medium">{item.labelHi}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
