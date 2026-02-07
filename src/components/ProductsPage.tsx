"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { herbs, type HerbProduct } from "@/data/herbs";
import EnvironmentBackground from "@/components/EnvironmentBackground";
import HerbCard from "@/components/HerbCard";
import ProductExperience from "@/components/ProductExperience";

// ============================================================
// ProductsPage
// The main products grid with environmental animation.
// Selecting a herb triggers the split-screen experience
// and shifts the atmospheric background.
// ============================================================

export default function ProductsPage() {
  const [selectedHerb, setSelectedHerb] = useState<HerbProduct | null>(null);
  const [isEnvironmentActive, setIsEnvironmentActive] = useState(false);

  const handleSelect = useCallback((herb: HerbProduct) => {
    setSelectedHerb(herb);
    setIsEnvironmentActive(true);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedHerb(null);
    setIsEnvironmentActive(false);
  }, []);

  return (
    <>
      {/* Atmospheric Background Canvas */}
      <EnvironmentBackground
        environment={selectedHerb?.environment ?? null}
        isActive={isEnvironmentActive}
      />

      {/* Page Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="pt-8 pb-6 px-4 sm:pt-10 sm:pb-8 sm:px-6 lg:pt-14 lg:pb-10 text-center">
          <div className="flex flex-col items-center gap-3 sm:gap-4">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-white/25 font-light">
              Fresh Herbs · Hand Packed · Delivered
            </span>
            <div className="flex items-center justify-center gap-2 sm:gap-3 opacity-80">
              <div className="relative w-5 h-5 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full border border-white/10 bg-white/0 overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="Secret Sage logo"
                  fill
                  className="object-contain"
                  sizes="48px"
                  priority
                />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight text-white/90 tracking-[0.35em] sm:tracking-[0.4em] uppercase">
                Secret Sage
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-white/30 font-light max-w-xs sm:max-w-md leading-relaxed">
              Select a herb to release its essence. Each transforms the
              atmosphere around you.
            </p>
          </div>
        </header>

        {/* Products Grid */}
        <main className="flex-1 w-full px-4 sm:px-6 lg:px-10 xl:px-14 pb-16 sm:pb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
            {herbs.map((herb, i) => (
              <HerbCard
                key={herb.id}
                herb={herb}
                onSelect={handleSelect}
                index={i}
              />
            ))}
          </div>
        </main>

        {/* Footer (intentionally minimal for now) */}
        <footer className="pb-8 sm:pb-12" />
      </div>

      {/* Product Experience Overlay */}
      {selectedHerb && (
        <ProductExperience herb={selectedHerb} onClose={handleClose} />
      )}
    </>
  );
}
