"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import type { HerbProduct } from "@/data/herbs";

// ============================================================
// ProductExperience
// The split-screen immersive product view that appears when
// a herb is selected. Left side: punnet + animated herb area.
// Right side: product details, nutrition, usage, add-to-cart.
// ============================================================

interface ProductExperienceProps {
  herb: HerbProduct;
  onClose: () => void;
}

export default function ProductExperience({
  herb,
  onClose,
}: ProductExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Container slides up
    tl.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 }
    );

    // Left panel slides in
    tl.fromTo(
      leftRef.current,
      { x: -60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8 },
      "-=0.3"
    );

    // Right panel slides in
    tl.fromTo(
      rightRef.current,
      { x: 60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8 },
      "-=0.6"
    );

    // Details stagger in
    if (detailsRef.current) {
      const children = detailsRef.current.children;
      tl.fromTo(
        children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
        "-=0.4"
      );
    }

    return () => {
      tl.kill();
    };
  }, [herb]);

  const handleClose = () => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.in" },
      onComplete: onClose,
    });

    tl.to(rightRef.current, { x: 60, opacity: 0, duration: 0.4 });
    tl.to(leftRef.current, { x: -60, opacity: 0, duration: 0.4 }, "-=0.3");
    tl.to(containerRef.current, { opacity: 0, duration: 0.3 }, "-=0.2");
  };

  const handleAddToCart = () => {
    if (!btnRef.current) return;

    const tl = gsap.timeline();

    tl.to(btnRef.current, {
      scale: 0.95,
      duration: 0.1,
      ease: "power2.in",
    });

    tl.to(btnRef.current, {
      scale: 1.05,
      duration: 0.2,
      ease: "back.out(3)",
    });

    tl.to(btnRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });

    // Flash the accent color
    tl.fromTo(
      btnRef.current,
      { boxShadow: `0 0 0 0px ${herb.environment.accent}` },
      {
        boxShadow: `0 0 0 12px ${herb.environment.accent}00`,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.4"
    );
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-30 flex items-center justify-center opacity-0"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Split Layout */}
      <div className="relative z-10 w-full max-w-6xl mx-3 sm:mx-4 h-[92vh] sm:h-[88vh] lg:h-[85vh] max-h-[750px] flex flex-col lg:flex-row rounded-2xl sm:rounded-3xl overflow-hidden border border-white/[0.06]">
        {/* ========== LEFT PANEL — Punnet & Animated Herb ========== */}
        <div
          ref={leftRef}
          className="relative min-h-[200px] sm:min-h-[260px] lg:min-h-0 lg:flex-[3] flex items-center justify-center overflow-hidden opacity-0 shrink-0"
          style={{
            background: `linear-gradient(160deg, ${herb.environment.primary}, ${herb.environment.secondary})`,
          }}
        >
          {/* Ambient floating glow */}
          <div
            className="absolute w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] rounded-full blur-[80px] sm:blur-[120px] opacity-20 animate-pulse"
            style={{ backgroundColor: herb.environment.accent }}
          />

          {/* Punnet Image */}
          <div className="relative z-10 flex flex-col items-center gap-3 sm:gap-6">
            <div className="relative w-40 h-32 sm:w-56 sm:h-40 lg:w-80 lg:h-60">
              <div
                className="absolute inset-[-18%] rounded-[32px] blur-[32px] opacity-70"
                style={{
                  background: `radial-gradient(circle at 40% 40%, ${herb.environment.accent}30, transparent 70%)`,
                  boxShadow: `0 32px 90px ${herb.environment.accent}20`,
                }}
              />
              <Image
                src={herb.image}
                alt={herb.name}
                fill
                className="relative z-10 object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
                sizes="(min-width: 1024px) 320px, 220px"
                priority={herb.slug === "mint"}
              />
            </div>
          </div>

          {/* Decorative corner elements */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 w-6 h-6 sm:w-8 sm:h-8 border-t border-l border-white/10" />
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 w-6 h-6 sm:w-8 sm:h-8 border-b border-r border-white/10" />
        </div>

        {/* ========== RIGHT PANEL — Product Details ========== */}
        <div
          ref={rightRef}
          className="relative flex-1 lg:flex-[2] bg-[#0a0a0a]/95 backdrop-blur-md p-6 sm:p-8 lg:p-12 overflow-y-auto opacity-0 flex flex-col items-center justify-center border-t border-white/5 lg:border-t-0 lg:border-l lg:border-white/5"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border border-white/10 text-white/40 hover:text-white/80 hover:border-white/20 transition-all duration-300 text-base sm:text-lg"
            aria-label="Close"
          >
            ×
          </button>

          <div
            ref={detailsRef}
            className="flex flex-col items-center text-center gap-4 sm:gap-5 lg:gap-6 pt-4 sm:pt-2 w-full max-w-xl"
          >
            {/* Herb Name */}
            <div>
              <span
                className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] font-light"
                style={{ color: herb.environment.accent }}
              >
                {herb.environment.mood}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-white/95 mt-1.5 sm:mt-2 tracking-wide">
                {herb.name}
              </h1>
            </div>

            {/* Tagline */}
            <p className="text-white/50 font-light italic text-base sm:text-lg leading-relaxed">
              &ldquo;{herb.tagline}&rdquo;
            </p>

            {/* Description */}
            <p className="text-white/40 font-light text-xs sm:text-sm leading-relaxed">
              {herb.description}
            </p>

            {/* Divider */}
            <div
              className="h-px w-12 opacity-30"
              style={{ backgroundColor: herb.environment.accent }}
            />

            {/* Nutrition */}
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-3">
                Nutritional Highlights
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(herb.nutrition).map(([key, val]) => (
                  <div key={key} className="space-y-0.5">
                    <span className="text-xs text-white/25 capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                    <p className="text-sm text-white/70 font-light">{val}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Usage */}
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-3">
                How to Use
              </h3>
              <ul className="space-y-2">
                {herb.usage.map((use, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-white/50 font-light"
                  >
                    <span
                      className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                      style={{ backgroundColor: herb.environment.accent }}
                    />
                    {use}
                  </li>
                ))}
              </ul>
            </div>

            {/* Price & Add to Cart */}
            <div className="pt-2 sm:pt-4 flex flex-col gap-3 sm:gap-4">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extralight text-white/90">
                  £{herb.price.toFixed(2)}
                </span>
                <span className="text-[10px] sm:text-xs text-white/25 uppercase tracking-wider">
                  per punnet
                </span>
              </div>

              <button
                ref={btnRef}
                onClick={handleAddToCart}
                className="w-full py-3 sm:py-4 rounded-xl text-xs sm:text-sm uppercase tracking-[0.2em] font-light transition-all duration-500 cursor-pointer"
                style={{
                  backgroundColor: herb.environment.accent + "15",
                  color: herb.environment.accent,
                  border: `1px solid ${herb.environment.accent}30`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    herb.environment.accent + "25";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    herb.environment.accent + "15";
                }}
              >
                Add to Cart
              </button>

              <p className="text-center text-[10px] text-white/20 tracking-wider">
                Shopify checkout integration coming soon
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
