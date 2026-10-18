import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  Environment,
  Lightformer,
  ContactShadows,
  MeshReflectorMaterial,
  Float,
} from '@react-three/drei'
import * as THREE from 'three'
import CCTVModel from './CCTVModel.jsx'
import ScanCone from './ScanCone.jsx'

/**
 * Per-breakpoint staging. The head sits upper-right and is yawed
 * down-left so the lens faces the viewer and the vision cone sweeps
 * across the empty centre of the frame instead of fighting the
 * headline. Narrow screens need a closer camera and a taller stance,
 * otherwise the model shrinks into the corner.
 */
function layoutFor(width) {
  if (width < 700) {
    return {
      pos: [0.62, 0.95, 0.45],
      rot: [0.3, -0.8, 0.06],
      scale: 2.3,
      z: 5.2,
      fov: 42,
      look: [0.1, 0.4, 0],
    }
  }
  if (width < 1024) {
    return {
      pos: [1.0, 0.55, 0.55],
      rot: [0.24, -0.85, 0.05],
      scale: 2.8,
      z: 5.7,
      fov: 34,
      look: [0.2, 0.15, 0],
    }
  }
  return {
    pos: [1.5, 0.08, 0.62],
    rot: [0.2, -0.95, 0.05],
    scale: 3.0,
    z: 6.1,
    fov: 32,
    look: [0.3, -0.05, 0],
  }
}

function Rig({ children, baseZ, look }) {
  const group = useRef()
  const pointer = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useFrame((state, delta) => {
    if (!group.current) return
    const scroll = window.scrollY / Math.max(1, window.innerHeight)
    const ease = 1 - Math.pow(0.0018, delta)

    const wantRotY = pointer.current.x * 0.22 + scroll * 0.2
    const wantRotX = pointer.current.y * 0.1 - scroll * 0.14

    group.current.rotation.y += (wantRotY - group.current.rotation.y) * ease
    group.current.rotation.x += (wantRotX - group.current.rotation.x) * ease
    group.current.position.y += (scroll * 0.9 - group.current.position.y) * ease
    state.camera.position.z += (baseZ + scroll * 1.5 - state.camera.position.z) * ease
    state.camera.lookAt(look[0], look[1], look[2])
  })

  return <group ref={group}>{children}</group>
}

function Motes({ count = 220 }) {
  const points = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      arr[i * 3] = (Math.random() - 0.5) * 16
      arr[i * 3 + 1] = (Math.random() - 0.5) * 9
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return arr
  }, [count])

  useFrame((state) => {
    if (!points.current) return
    const t = state.clock.elapsedTime
    points.current.rotation.y = t * 0.03
    points.current.position.y = Math.sin(t * 0.22) * 0.4
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.024}
        color="#7fe6ff"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function Floor() {
  return (
    <group position={[0, -2.5, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[80, 80]} />
        <MeshReflectorMaterial
          resolution={1024}
          mixBlur={1.2}
          mixStrength={22}
          roughness={0.85}
          depthScale={1.1}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#0a0d12"
          metalness={0.7}
          mirror={0.5}
          blur={[400, 120]}
        />
      </mesh>
      <gridHelper
        args={[80, 80, '#1d2734', '#121924']}
        position={[0, 0.012, 0]}
        material-transparent
        material-opacity={0.5}
      />
    </group>
  )
}

function SceneContent() {
  const { camera, size } = useThree()
  const layout = layoutFor(size.width)

  useEffect(() => {
    camera.position.set(0, 0.1, layout.z)
    camera.fov = layout.fov
    camera.updateProjectionMatrix()
  }, [camera, layout.z, layout.fov])

  return (
    <>
      <color attach="background" args={['#07090c']} />
      <fog attach="fog" args={['#07090c', 11, 30]} />

      <ambientLight intensity={0.22} />
      <spotLight
        position={[7, 9, 7]}
        angle={0.45}
        penumbra={1}
        intensity={85}
        color="#cfe6ff"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <spotLight position={[-8, 4, -2]} angle={0.65} penumbra={1} intensity={45} color="#ff6a4a" />
      <pointLight position={[2.5, -1.6, 4]} intensity={16} color="#38d6ff" />

      <Rig baseZ={layout.z} look={layout.look}>
        <group position={layout.pos} rotation={layout.rot}>
          <Float speed={1.05} rotationIntensity={0.1} floatIntensity={0.35}>
            <CCTVModel scale={layout.scale} tilt={-0.05}>
              {/* mounted inside the panning head, so the cone sweeps with the lens */}
              <ScanCone length={5.4} radius={1.75} origin={[0, 0, 0.6]} />
            </CCTVModel>
          </Float>
        </group>

        <Motes />
        <Floor />

        <ContactShadows
          position={[0, -2.45, 0]}
          opacity={0.5}
          scale={26}
          blur={2.8}
          far={9}
          color="#000000"
        />
      </Rig>

      <Environment resolution={256}>
        <Lightformer
          form="rect"
          intensity={3.2}
          position={[0, 6, -6]}
          scale={[14, 7, 1]}
          color="#9fc4ff"
        />
        <Lightformer
          form="rect"
          intensity={2.0}
          position={[-7, 2, 3]}
          rotation-y={Math.PI / 2}
          scale={[9, 6, 1]}
          color="#ffffff"
        />
        <Lightformer
          form="rect"
          intensity={1.9}
          position={[7, 1, 2]}
          rotation-y={-Math.PI / 2}
          scale={[9, 6, 1]}
          color="#ff8a6a"
        />
        <Lightformer form="ring" intensity={4} position={[3, 4, 5]} scale={3} color="#39ff88" />
        <Lightformer
          form="rect"
          intensity={1.8}
          position={[0, -5, 0]}
          rotation-x={Math.PI / 2}
          scale={[16, 16, 1]}
          color="#0d3a55"
        />
      </Environment>
    </>
  )
}

export default function Hero3D() {
  const [supported, setSupported] = useState(true)

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl =
        canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl')
      setSupported(Boolean(gl))
    } catch {
      setSupported(false)
    }
  }, [])

  if (!supported) {
    return (
      <div className="hero3d-fallback">
        <span className="eyebrow">// WebGL unavailable</span>
      </div>
    )
  }

  return (
    <Canvas
      dpr={[1, 1.75]}
      shadows
      gl={{ antialias: true, powerPreference: 'high-performance', alpha: false }}
      camera={{ position: [0, 0.1, 6.1], fov: 32, near: 0.1, far: 80 }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping
        gl.toneMappingExposure = 0.92
      }}
    >
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
    </Canvas>
  )
}
