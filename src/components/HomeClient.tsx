'use client'

import dynamic from 'next/dynamic'

const Canvas = dynamic(() => import('@react-three/fiber').then(mod => mod.Canvas))
const OrbitControls = dynamic(() => import('@react-three/drei').then(mod => mod.OrbitControls))
const Model = dynamic(() => import('./Model'))

const HomeClient = () => (
  <div className="fixed inset-0 z-10">
    <Canvas camera={{ position: [0, 2, 10], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 0, 0]} intensity={1} />
      <Model position={[3, 2, 0]} scale={2} />
      <OrbitControls enableZoom={false} enableRotate={false} enablePan={false} />
    </Canvas>
  </div>
)

export default HomeClient;
