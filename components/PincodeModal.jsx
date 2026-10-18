"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useShop } from "@/context/ShopContext";
import { luxuryEase } from "@/lib/animations";

export default function PincodeModal() {
  const { isPincodeOpen, setIsPincodeOpen, setPincode, language } = useShop();
  const [inputVal, setInputVal] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);

  const handleApply = async () => {
    const trimmed = inputVal.trim();
    if (!/^[1-9][0-9]{5}$/.test(trimmed)) {
      setError("Please enter a valid 6-digit Indian PIN code.");
      return;
    }
    setError("");
    setChecking(true);
    try {
      const res = await fetch(`/api/pincode/${trimmed}`);
      const data = await res.json();
      if (data && data.deliverable) {
        setPincode(`${trimmed}`);
        setIsPincodeOpen(false);
      } else {
        setError(data?.message || "Delivery currently not available to this pincode.");
      }
    } catch (e) {
      setPincode(`${trimmed}`);
      setIsPincodeOpen(false);
    } finally {
      setChecking(false);
    }
  };

  const handleDirect = (pin, city) => {
    setError("");
    setPincode(`${pin} (${city})`);
    setIsPincodeOpen(false);
  };

  return (
    <AnimatePresence>
      {isPincodeOpen && (
        <motion.div
          key="pincode-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="modal-backdrop active fixed inset-0 z-[600] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsPincodeOpen(false)}
        >
          <motion.div
            key="pincode-dialog"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3, ease: luxuryEase }}
            className="product-modal-dialog w-full sm:h-auto max-w-md rounded-2xl overflow-y-auto bg-white p-5 sm:p-7 relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="modal-close-corner-btn absolute top-3 right-3 z-20 min-h-[44px] min-w-[44px] rounded-full flex items-center justify-center bg-stone-100 hover:bg-stone-200 text-stone-700 text-2xl font-bold transition-colors shadow-sm"
              onClick={() => setIsPincodeOpen(false)}
              aria-label="Close"
            >
              &times;
            </motion.button>

            <h3
              style={{
                fontFamily: "var(--font-royal)",
                fontSize: "1.25rem",
                color: "var(--color-forest)",
                marginBottom: "6px",
              }}
            >
              {language === "hi"
                ? "डिलीवरी पिनकोड चुनें"
                : "Select Delivery Pincode"}
            </h3>
            <p
              style={{
                fontSize: "0.82rem",
                color: "var(--color-text-muted)",
                marginBottom: "16px",
              }}
            >
              {language === "hi"
                ? "डिलीवरी स्पीड और सीओडी जांचने के लिए 6 अंकों का पिनकोड दर्ज करें।"
                : "Enter your 6-digit PIN code to check shipping speed and COD availability."}
            </p>

            <div className="flex gap-2">
              <input
                type="text"
                className="form-control min-h-[44px] flex-1 px-3 border border-[#E7E1D5] rounded-lg text-sm"
                placeholder="e.g. 110001, 400001"
                maxLength={6}
                inputMode="numeric"
                value={inputVal}
                onChange={(e) => {
                  setInputVal(e.target.value);
                  if (error) setError("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleApply();
                  }
                }}
              />
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="btn-gold-primary min-h-[44px] px-5 font-bold rounded-lg disabled:opacity-50"
                onClick={handleApply}
                disabled={checking}
              >
                {checking ? "Checking..." : "Apply"}
              </motion.button>
            </div>

            {error && (
              <div
                className="form-error-msg"
                style={{ display: "flex", marginTop: "6px" }}
              >
                <span>⚠️</span>
                <span className="err-text">{error}</span>
              </div>
            )}

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "6px",
                marginTop: "14px",
              }}
            >
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "var(--color-text-muted)",
                  width: "100%",
                }}
              >
                Popular Cities:
              </span>
              <button
                type="button"
                className="search-tag"
                onClick={() => handleDirect("110001", "Delhi")}
              >
                110001 (Delhi)
              </button>
              <button
                type="button"
                className="search-tag"
                onClick={() => handleDirect("400001", "Mumbai")}
              >
                400001 (Mumbai)
              </button>
              <button
                type="button"
                className="search-tag"
                onClick={() => handleDirect("560001", "Bengaluru")}
              >
                560001 (Bengaluru)
              </button>
              <button
                type="button"
                className="search-tag"
                onClick={() => handleDirect("302001", "Jaipur")}
              >
                302001 (Jaipur)
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
