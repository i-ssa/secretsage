"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import type { HerbProduct } from "@/data/herbs";

// ============================================================
// HerbCard
// A single product card in the grid. Renders a placeholder
// punnet image area with the herb name and tagline.
// Hover triggers a subtle scale + sway animation.
// ============================================================

interface HerbCardProps {
  herb: HerbProduct;
  onSelect: (herb: HerbProduct) => void;
  index: number;
}

export default function HerbCard({ herb, onSelect, index }: HerbCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    // Staggered entrance animation
    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: "power3.out",
      }
    );
  }, [index]);

  const handleMouseEnter = () => {
    if (!cardRef.current || !imageRef.current) return;

    gsap.to(cardRef.current, {
      scale: 1.02,
      duration: 0.6,
      ease: "power2.out",
    });

    gsap.to(imageRef.current, {
      y: -4,
      rotation: 1,
      duration: 0.8,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || !imageRef.current) return;

    gsap.to(cardRef.current, {
      scale: 1,
      duration: 0.6,
      ease: "power2.out",
    });

    gsap.to(imageRef.current, {
      y: 0,
      rotation: 0,
      duration: 0.8,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={cardRef}
      className="group cursor-pointer opacity-0"
      onClick={() => onSelect(herb)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative flex flex-col overflow-hidden rounded-xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] transition-colors duration-500 hover:border-white/[0.10] h-full">
        {/* Punnet Image Placeholder */}
        <div
          ref={imageRef}
          className="relative aspect-[5/4] flex items-center justify-center overflow-hidden"
        >
          {/* Ambient glow behind product */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background: `radial-gradient(circle at 50% 60%, ${herb.environment.accent}12, transparent 70%)`,
            }}
          />

          {/* Real punnet image */}
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <div className="relative w-[70%] h-[70%] max-w-[150px] max-h-[120px]">
              <Image
                src={herb.image}
                alt={herb.name}
                fill
                className="object-contain drop-shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
                sizes="(min-width: 1024px) 220px, 160px"
                priority={herb.slug === "mint"}
              />
            </div>
          </div>
        </div>

        {/* Card Info */}
        <div className="flex flex-col flex-1 px-3 py-2.5 sm:px-4 sm:py-3 gap-1 items-center text-center">
          <h3 className="text-[13px] sm:text-sm font-light text-white/90 tracking-wide">
            {herb.name}
          </h3>
          <p className="text-[10px] text-white/35 font-light italic leading-relaxed flex-1">
            {herb.tagline}
          </p>
          <div className="flex flex-col items-center gap-1 pt-1 mt-auto">
            <span
              className="text-xs font-light"
              style={{ color: herb.environment.accent }}
            >
              £{herb.price.toFixed(2)}
            </span>
            <span className="text-[8px] uppercase tracking-[0.12em] text-white/20 group-hover:text-white/45 transition-colors duration-500">
              Explore →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
