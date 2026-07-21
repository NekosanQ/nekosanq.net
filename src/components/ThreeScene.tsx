"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Model from "./Model";

interface ThreeSceneProps {
  modelPosition: [number, number, number];
  isActive: boolean;
  prefersReducedMotion: boolean;
}

const ThreeScene = ({ modelPosition, isActive, prefersReducedMotion }: ThreeSceneProps) => (
  <Canvas
    camera={{ position: [0, 3, 10], fov: 45 }}
    dpr={[1, 1.5]}
    frameloop={isActive && !prefersReducedMotion ? "always" : "demand"}
    gl={{ antialias: false, powerPreference: "high-performance" }}
  >
    <ambientLight intensity={0.5} />
    <directionalLight position={[5, 10, 5]} intensity={1.2} />
    <Suspense fallback={null}>
      <Model position={modelPosition} scale={2} shouldRotate={!prefersReducedMotion} />
    </Suspense>
  </Canvas>
);

export default ThreeScene;
