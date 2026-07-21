"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const ThreeScene = dynamic(() => import("./ThreeScene"), { ssr: false });

const HomeClient = () => {
  const [modelPosition, setModelPosition] = useState<[number, number, number]>([0, 0, 0]);
  const [isSceneReady, setIsSceneReady] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePosition = () => {
      if (window.innerWidth < 834) {
        setModelPosition([0, 1, 0]);
      } else {
        setModelPosition([3, 3, 1]);
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), { threshold: 0.01 });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);
    const updateVisibility = () => setIsDocumentVisible(document.visibilityState === "visible");

    updateMotionPreference();
    updateVisibility();
    mediaQuery.addEventListener("change", updateMotionPreference);
    document.addEventListener("visibilitychange", updateVisibility);

    return () => {
      mediaQuery.removeEventListener("change", updateMotionPreference);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    const loadScene = () => setIsSceneReady(true);

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(loadScene, { timeout: 2000 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = setTimeout(loadScene, 800);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-10 pointer-events-none" aria-hidden="true">
      {isSceneReady && (
        <ThreeScene modelPosition={modelPosition} isActive={isInView && isDocumentVisible} prefersReducedMotion={prefersReducedMotion} />
      )}
    </div>
  );
};

export default HomeClient;
