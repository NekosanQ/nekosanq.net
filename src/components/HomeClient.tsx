"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ThreeScene = dynamic(() => import("./ThreeScene"), { ssr: false });

const HomeClient = () => {
  const [modelPosition, setModelPosition] = useState<[number, number, number]>([0, 0, 0]);
  const [isSceneReady, setIsSceneReady] = useState(false);

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
    const loadScene = () => setIsSceneReady(true);

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(loadScene, { timeout: 2000 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = setTimeout(loadScene, 800);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none" aria-hidden="true">
      {isSceneReady && <ThreeScene modelPosition={modelPosition} />}
    </div>
  );
};

export default HomeClient;
