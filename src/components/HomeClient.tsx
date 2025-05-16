'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Canvas = dynamic(() => import('@react-three/fiber').then((mod) => mod.Canvas));
const OrbitControls = dynamic(() => import('@react-three/drei').then((mod) => mod.OrbitControls));
const Model = dynamic(() => import('./Model'));

const HomeClient = () => {
  const [modelPosition, setModelPosition] = useState<[number, number, number]>([0, 0, 0]);

  useEffect(() => {
    const updatePosition = () => {
      const isMobile = window.innerWidth < 640;
      const isFullScreen = window.innerWidth < 1536;
      if (isMobile) {
        setModelPosition([0, 1, 0]);
      } else if (isFullScreen) {
        setModelPosition([3, 3, 1]);
      } else {
        setModelPosition([3, 2, 1]);
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  const cameraPosition: [number, number, number] = [0, 3, 10];
  const modelScale = 2;

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <Canvas style={{ pointerEvents: 'none' }} camera={{ position: cameraPosition, fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1.2} />
        <Model position={modelPosition} scale={modelScale} />
        <OrbitControls enableZoom={false} enableRotate={false} enablePan={false} />
      </Canvas>
    </div>
  );
};

export default HomeClient;
