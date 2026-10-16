"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/admin";

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password.trim()) {
      setError("Kripya password ya secret key darj karein.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: password.trim() }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Ghalat password. Dobara koshish karein.");
        setIsLoading(false);
        return;
      }

      // Login successful -> Redirect to dashboard or previous URL
      router.push(from);
      router.refresh();
    } catch (err) {
      setError("Network error. Kripya apna internet connection check karein.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF7ED] via-white to-[#F0FDF4] flex flex-col justify-center items-center px-4 py-8">
      {/* Brand Header */}
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#FF6B00] to-[#FF8C38] shadow-lg shadow-orange-500/20 mb-4 p-3">
            <span className="text-white text-3xl font-black tracking-tighter">99+</span>
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Griham <span className="text-[#FF6B00]">99+</span>
          </h1>
          <p className="text-sm font-semibold text-gray-500 mt-1 uppercase tracking-wider">
            Retailer & Store Admin Panel
          </p>
          <div className="inline-block mt-2 px-3 py-1 bg-orange-100 text-[#FF6B00] rounded-full text-xs font-bold">
            दुकान प्रबंधन पोर्टल
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-orange-950/5 border border-orange-100 p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">Admin Sign In</h2>
            <p className="text-xs text-gray-500 mt-1">
              Store manage karne ke liye apna Admin Password ya Secret Key darj karein.
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs sm:text-sm font-medium flex items-start gap-2 animate-shake">
              <svg
                className="w-5 h-5 flex-shrink-0 text-red-500 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2"
              >
                Admin Password / Secret Key (पासवर्ड)
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Admin Password..."
                  required
                  autoFocus
                  className="w-full h-12 px-4 pr-12 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 font-medium text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                      />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 min-h-[48px] bg-gradient-to-r from-[#FF6B00] to-[#E05300] hover:from-[#E05300] hover:to-[#C94700] text-white font-bold text-base rounded-xl shadow-lg shadow-orange-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Verification ho raha hai...</span>
                </>
              ) : (
                <>
                  <span>Login Karein</span>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Quick Info */}
          <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              MongoDB Atlas Live
            </span>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="text-[#FF6B00] hover:underline font-medium"
            >
              Customer Store &rarr;
            </a>
          </div>
        </div>

        {/* Security Note */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Griham 99+ Jaipur &bull; Unauthorized access strictly forbidden.
        </p>
      </div>
    </div>
  );
}
