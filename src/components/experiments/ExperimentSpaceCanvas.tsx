'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Float, Stars } from '@react-three/drei'

function OrbitRing() {
  return (
    <Float speed={2} rotationIntensity={0.35} floatIntensity={0.6}>
      <mesh rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[3.2, 0.06, 16, 96]} />
        <meshStandardMaterial
          color="#7c3aed"
          emissive="#4c1d95"
          emissiveIntensity={0.45}
          metalness={0.4}
          roughness={0.35}
        />
      </mesh>
    </Float>
  )
}

function InnerScene() {
  return (
    <>
      <color attach="background" args={['#07060f']} />
      <ambientLight intensity={0.35} />
      <pointLight position={[8, 6, 10]} intensity={1.1} color="#c4b5fd" />
      <pointLight position={[-10, -4, -6]} intensity={0.45} color="#22d3ee" />
      <Stars radius={90} depth={60} count={4800} factor={3.2} saturation={0.12} fade speed={0.6} />
      <OrbitRing />
      <mesh position={[0, 0.2, -6]} rotation={[0.2, 0.5, 0]}>
        <icosahedronGeometry args={[1.15, 0]} />
        <meshStandardMaterial
          color="#312e81"
          emissive="#5b21b6"
          emissiveIntensity={0.35}
          metalness={0.55}
          roughness={0.25}
        />
      </mesh>
    </>
  )
}

export default function ExperimentSpaceCanvas() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0.2, 9], fov: 48 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <InnerScene />
        </Suspense>
      </Canvas>
    </div>
  )
}
