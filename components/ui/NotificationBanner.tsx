"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export function NotificationBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleDismiss = () => {
    localStorage.setItem("episode-banner-dismissed", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm"
        onClick={handleDismiss}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
        <div className="relative w-full max-w-2xl bg-[#0e1a14] border border-[#1e3028] rounded-2xl p-6 md:p-10 shadow-2xl">

          {/* Top section */}
          <div className="flex items-start justify-between gap-4">

            {/* Left: Text */}
            <div className="flex-1">
              <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight">
                Video episodes are currently{" "}
                <span className="text-green-400">unavailable!!!</span>
              </h2>

              <p className="mt-5 text-sm md:text-base text-gray-400 leading-relaxed">
                Video content is temporarily unavailable as we optimize resources
                and platform performance. Right now, we're focused on providing the
                best possible web experience.
              </p>

              <p className="mt-4 text-sm md:text-base text-green-400 font-medium">
                Stay tuned — videos are coming soon.
              </p>
            </div>

            {/* Right: GIF — desktop only */}
            <div className="hidden md:block shrink-0">
              <div className="w-44 h-36 rounded-2xl overflow-hidden border border-[#1e3028]">
                <img
                    src="/gojo.gif"
                    alt="Anime character"
                    className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>

          {/* OK Button */}
          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={handleDismiss}
              className="bg-green-500 hover:bg-green-400 active:scale-95 text-black font-semibold text-base px-12 py-3 rounded-full transition-all duration-200"
            >
              OK
            </button>
          </div>

        </div>
      </div>
    </>
  );
}