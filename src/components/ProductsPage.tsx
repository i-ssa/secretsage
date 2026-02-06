"use client";

import { useState, useCallback } from "react";
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
        <header className="pt-10 pb-8 px-4 sm:pt-14 sm:pb-10 sm:px-6 lg:pt-16 lg:pb-12 text-center">
          <div className="flex flex-col items-center gap-3 sm:gap-4">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-white/25 font-light">
              Fresh Herbs · Hand Packed · Delivered
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight text-white/90 tracking-wider">
              Secret Sage
            </h1>
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

        {/* Footer */}
        <footer className="pb-8 sm:pb-12 text-center">
          <p className="text-[9px] sm:text-[10px] text-white/15 uppercase tracking-[0.3em]">
            Assets are provided · Experience is engineered
          </p>
        </footer>
      </div>

      {/* Product Experience Overlay */}
      {selectedHerb && (
        <ProductExperience herb={selectedHerb} onClose={handleClose} />
      )}
    </>
  );
}
