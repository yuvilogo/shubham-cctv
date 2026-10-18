import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const HOUSING = '#e6eaef'
const DARK = '#20252d'
const LENS_Z = 0.545

/**
 * A bullet-style CCTV camera assembled from primitives so it loads
 * instantly and picks up the studio lightformers. The head pans on a
 * slow PTZ sweep; anything passed as children is mounted inside the
 * head group so it inherits that motion.
 */
export default function CCTVModel({ headRef, tilt = -0.06, children, ...props }) {
  const localHead = useRef()
  const led = useRef()
  const irRefs = useRef([])
  const pan = headRef || localHead

  const irPositions = useMemo(() => {
    const out = []
    const count = 8
    for (let i = 0; i < count; i += 1) {
      const a = (i / count) * Math.PI * 2
      out.push([Math.cos(a) * 0.083, Math.sin(a) * 0.083])
    }
    return out
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (pan.current) {
      pan.current.rotation.y = Math.sin(t * 0.3) * 0.55
      pan.current.rotation.x = tilt + Math.sin(t * 0.19 + 1.2) * 0.05
    }
    if (led.current) {
      led.current.material.emissiveIntensity =
        1.6 + Math.sin(t * 5.5) * 1.4 + (Math.sin(t * 1.3) > 0.85 ? 2.2 : 0)
    }
    irRefs.current.forEach((mesh, i) => {
      if (!mesh) return
      mesh.material.emissiveIntensity = 1.1 + Math.sin(t * 3 + i * 0.7) * 0.5
    })
  })

  return (
    <group {...props}>
      <mesh position={[0, 0.62, -0.28]} castShadow receiveShadow>
        <boxGeometry args={[0.34, 0.34, 0.05]} />
        <meshStandardMaterial color={DARK} metalness={0.85} roughness={0.42} />
      </mesh>
      {[
        [-0.11, 0.73, -0.31],
        [0.11, 0.73, -0.31],
        [-0.11, 0.51, -0.31],
        [0.11, 0.51, -0.31],
      ].map((p, i) => (
        <mesh key={i} position={p} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.018, 0.018, 0.03, 10]} />
          <meshStandardMaterial color="#8b95a3" metalness={1} roughness={0.3} />
        </mesh>
      ))}

      <mesh position={[0, 0.36, -0.24]} castShadow>
        <boxGeometry args={[0.09, 0.5, 0.09]} />
        <meshStandardMaterial color={HOUSING} metalness={0.5} roughness={0.48} />
      </mesh>
      <mesh position={[0, 0.14, -0.2]} castShadow>
        <sphereGeometry args={[0.088, 24, 24]} />
        <meshStandardMaterial color={DARK} metalness={0.9} roughness={0.3} />
      </mesh>

      <group ref={pan} position={[0, 0.14, -0.2]}>
        <mesh position={[0, 0.02, 0.1]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.062, 0.075, 0.2, 20]} />
          <meshStandardMaterial color={DARK} metalness={0.9} roughness={0.35} />
        </mesh>

        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.24]} castShadow>
          <cylinderGeometry args={[0.135, 0.152, 0.46, 40, 1]} />
          <meshStandardMaterial
            color={HOUSING}
            metalness={0.42}
            roughness={0.4}
            envMapIntensity={1.5}
          />
        </mesh>

        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.005]}>
          <cylinderGeometry args={[0.136, 0.126, 0.04, 40]} />
          <meshStandardMaterial color={DARK} metalness={0.8} roughness={0.4} />
        </mesh>

        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.03, 0.27]}>
          <cylinderGeometry
            args={[0.176, 0.179, 0.42, 32, 1, true, Math.PI * 0.62, Math.PI * 0.76]}
          />
          <meshStandardMaterial
            color="#f2f5f8"
            metalness={0.3}
            roughness={0.55}
            side={THREE.DoubleSide}
          />
        </mesh>

        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.49]} castShadow>
          <cylinderGeometry args={[0.112, 0.118, 0.1, 40]} />
          <meshStandardMaterial color={DARK} metalness={0.92} roughness={0.28} />
        </mesh>

        <mesh position={[0, 0, LENS_Z]}>
          <circleGeometry args={[0.1, 48]} />
          <meshPhysicalMaterial
            color="#04060a"
            metalness={0.15}
            roughness={0.05}
            clearcoat={1}
            clearcoatRoughness={0.03}
            envMapIntensity={3}
          />
        </mesh>
        <mesh position={[0, 0, LENS_Z + 0.002]}>
          <ringGeometry args={[0.072, 0.083, 48]} />
          <meshBasicMaterial color="#0d2033" />
        </mesh>
        <mesh position={[-0.035, 0.035, LENS_Z + 0.006]}>
          <circleGeometry args={[0.026, 24]} />
          <meshBasicMaterial color="#9fe4ff" transparent opacity={0.4} />
        </mesh>

        {irPositions.map((p, i) => (
          <mesh
            key={i}
            position={[p[0], p[1], LENS_Z - 0.012]}
            ref={(el) => {
              irRefs.current[i] = el
            }}
          >
            <sphereGeometry args={[0.019, 12, 12]} />
            <meshStandardMaterial
              color="#3a0505"
              emissive="#ff2d20"
              emissiveIntensity={1.1}
              toneMapped={false}
            />
          </mesh>
        ))}

        <mesh position={[0.088, 0.135, 0.06]} ref={led}>
          <boxGeometry args={[0.026, 0.012, 0.03]} />
          <meshStandardMaterial
            color="#2a0404"
            emissive="#ff3b2f"
            emissiveIntensity={2}
            toneMapped={false}
          />
        </mesh>

        <mesh position={[0, 0.02, 0.3]} rotation={[0, 0, Math.PI / 2]}>
          <planeGeometry args={[0.3, 0.05]} />
          <meshBasicMaterial color="#c3cbd5" transparent opacity={0.8} />
        </mesh>

        {children}
      </group>
    </group>
  )
}

export { LENS_Z }
