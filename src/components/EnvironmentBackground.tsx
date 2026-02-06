"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import type { HerbEnvironment } from "@/data/herbs";

// ============================================================
// EnvironmentBackground
// Renders a full-viewport atmospheric canvas that reacts to
// the currently selected herb. Handles mist, leaf sway,
// particle drift, and vertical motion presets.
// ============================================================

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  life: number;
  maxLife: number;
}

interface EnvironmentBackgroundProps {
  environment: HerbEnvironment | null;
  isActive: boolean;
}

export default function EnvironmentBackground({
  environment,
  isActive,
}: EnvironmentBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const gradientRef = useRef({ primary: "#0a0a0a", secondary: "#111111" });
  const opacityRef = useRef(0);

  const createParticle = useCallback(
    (width: number, height: number, type: string): Particle => {
      const base: Particle = {
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1,
        speedX: 0,
        speedY: 0,
        opacity: Math.random() * 0.3 + 0.1,
        life: 0,
        maxLife: Math.random() * 400 + 200,
      };

      switch (type) {
        case "mist":
          base.size = Math.random() * 60 + 20;
          base.speedX = (Math.random() - 0.5) * 0.3;
          base.speedY = -(Math.random() * 0.5 + 0.2);
          base.opacity = Math.random() * 0.06 + 0.02;
          base.y = height + base.size;
          break;
        case "leafSway":
          base.size = Math.random() * 8 + 3;
          base.speedX = Math.sin(Math.random() * Math.PI * 2) * 0.4;
          base.speedY = Math.random() * 0.3 + 0.1;
          base.opacity = Math.random() * 0.15 + 0.05;
          base.y = -base.size;
          break;
        case "particles":
          base.size = Math.random() * 3 + 1;
          base.speedX = (Math.random() - 0.5) * 0.8;
          base.speedY = (Math.random() - 0.5) * 0.8;
          base.opacity = Math.random() * 0.2 + 0.05;
          break;
        case "verticalDrift":
          base.size = Math.random() * 4 + 1;
          base.speedX = (Math.random() - 0.5) * 0.15;
          base.speedY = -(Math.random() * 0.8 + 0.3);
          base.opacity = Math.random() * 0.15 + 0.05;
          base.y = height + base.size;
          break;
      }

      return base;
    },
    []
  );

  useEffect(() => {
    if (!environment) return;

    // Animate gradient transition
    gsap.to(gradientRef.current, {
      primary: environment.primary,
      secondary: environment.secondary,
      duration: 1.8,
      ease: "power2.inOut",
    });

    gsap.to(opacityRef, {
      current: isActive ? 1 : 0,
      duration: 1.2,
      ease: "power2.inOut",
    });
  }, [environment, isActive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      const { width, height } = canvas;
      const particleColor = environment?.particleColor ?? "rgba(255,255,255,0.05)";
      const animType = environment?.animationType ?? "mist";

      // Draw gradient background
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, gradientRef.current.primary);
      grad.addColorStop(1, gradientRef.current.secondary);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      if (isActive && opacityRef.current > 0.01) {
        // Spawn particles
        if (particlesRef.current.length < 80) {
          particlesRef.current.push(createParticle(width, height, animType));
        }

        // Update & draw particles
        particlesRef.current = particlesRef.current.filter((p) => {
          p.life++;
          p.x += p.speedX;
          p.y += p.speedY;

          // Leaf sway oscillation
          if (animType === "leafSway") {
            p.speedX = Math.sin(p.life * 0.02) * 0.5;
          }

          const lifeRatio = p.life / p.maxLife;
          const fadeOpacity =
            lifeRatio < 0.2
              ? lifeRatio * 5
              : lifeRatio > 0.8
              ? (1 - lifeRatio) * 5
              : 1;

          ctx.save();
          ctx.globalAlpha = p.opacity * fadeOpacity * opacityRef.current;

          if (animType === "mist") {
            // Soft radial gradient circles for mist
            const grd = ctx.createRadialGradient(
              p.x, p.y, 0,
              p.x, p.y, p.size
            );
            grd.addColorStop(0, particleColor);
            grd.addColorStop(1, "transparent");
            ctx.fillStyle = grd;
            ctx.fillRect(p.x - p.size, p.y - p.size, p.size * 2, p.size * 2);
          } else if (animType === "leafSway") {
            // Ellipse for leaf shapes
            ctx.fillStyle = particleColor;
            ctx.beginPath();
            ctx.ellipse(p.x, p.y, p.size, p.size * 0.5, p.life * 0.01, 0, Math.PI * 2);
            ctx.fill();
          } else {
            // Circle for particles / vertical drift
            ctx.fillStyle = particleColor;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.restore();

          // Remove particles that have expired or left viewport
          return (
            p.life < p.maxLife &&
            p.x > -p.size * 2 &&
            p.x < width + p.size * 2 &&
            p.y > -p.size * 2 &&
            p.y < height + p.size * 2
          );
        });
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [environment, isActive, createParticle]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
