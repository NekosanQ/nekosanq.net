"use client";

import React, { useEffect, useRef, useState } from "react";

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, className = "", delay = 0 }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = element.getBoundingClientRect();
    const isInitiallyInView = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;

    setIsReady(true);
    setIsVisible(isInitiallyInView);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      className={`scroll-reveal ${isReady ? "scroll-reveal--ready" : ""} ${isVisible ? "scroll-reveal--visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
