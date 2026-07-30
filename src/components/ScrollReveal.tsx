"use client";

import gsap from "gsap";
import React, { useLayoutEffect, useRef } from "react";

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: "default" | "card" | "stage" | "safeCard";
};

const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, className = "", delay = 0, variant = "default" }) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const element = elementRef.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let observer: IntersectionObserver | null = null;
    let safetyTimer: ReturnType<typeof setTimeout> | null = null;

    const context = gsap.context(() => {
      const isCard = variant === "card";
      const isSafeCard = variant === "safeCard";
      const isStage = variant === "stage";
      const direction = Math.round(delay / 100) % 2 === 0 ? -1 : 1;

      gsap.set(element, {
        autoAlpha: isSafeCard ? 1 : 0,
        y: isStage ? 180 : isCard ? 110 : isSafeCard ? 84 : 48,
        scale: isStage ? 0.82 : isCard ? 0.88 : isSafeCard ? 0.92 : 0.97,
        rotateX: isStage ? 18 : isCard ? 13 : isSafeCard ? 9 : 0,
        rotateY: isStage ? direction * 9 : isCard ? direction * 6 : isSafeCard ? direction * 4 : 0,
        filter: isStage ? "blur(14px)" : isCard ? "blur(8px)" : isSafeCard ? "blur(5px)" : "blur(3px)",
        transformPerspective: 1100,
        transformOrigin: "50% 75%"
      });

      let revealed = false;
      const reveal = () => {
        if (revealed) return;
        revealed = true;
        if (safetyTimer) clearTimeout(safetyTimer);
        gsap.to(element, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          rotateY: 0,
          filter: "blur(0px)",
          duration: isStage ? 1.55 : isSafeCard ? 1.85 : isCard ? 1.25 : 0.9,
          delay: delay / 1000,
          ease: "power4.out"
        });
      };

      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          reveal();
          observer?.unobserve(entry.target);
        },
        {
          threshold: isSafeCard ? 0.18 : isStage ? 0.12 : 0.06,
          rootMargin: isSafeCard ? "0px 0px -12% 0px" : isStage ? "0px 0px -10% 0px" : "0px 0px 12% 0px"
        }
      );

      observer?.observe(element);
      if (!isSafeCard && !isStage) safetyTimer = setTimeout(reveal, 2400);

      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.94 && rect.bottom > 0) {
        reveal();
        observer?.disconnect();
      }
    }, element);

    return () => {
      observer?.disconnect();
      if (safetyTimer) clearTimeout(safetyTimer);
      context.revert();
    };
  }, [delay, variant]);

  return (
    <div ref={elementRef} className={`scroll-reveal ${variant === "card" || variant === "safeCard" ? "scroll-reveal--card" : ""} ${className}`}>
      {children}
    </div>
  );
};

export default ScrollReveal;
