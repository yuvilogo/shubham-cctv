import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * The camera's field of view: a translucent cone whose apex sits at the
 * lens and which opens along the head's forward (+Z) axis, plus a ring
 * that travels down the cone like a scanning pulse. Mounted inside the
 * panning head group, so it sweeps with the camera.
 */
export default function ScanCone({ length = 6.5, radius = 2.2, origin = [0, 0, 0.55] }) {
  const sweep = useRef()
  const cone = useRef()
  const glow = useRef()

  const geo = useMemo(
    () => ({
      cone: new THREE.ConeGeometry(radius, length, 56, 1, true),
      wire: new THREE.ConeGeometry(radius, length, 28, 1, true),
      sweep: new THREE.RingGeometry(0.35, 1, 72),
      disc: new THREE.CircleGeometry(radius, 56),
    }),
    [length, radius],
  )

  useFrame((state) => {
    const t = state.clock.elapsedTime

    if (sweep.current) {
      const cycle = (t * 0.22) % 1
      sweep.current.position.z = origin[2] + cycle * length
      sweep.current.material.opacity = 0.5 * Math.sin(cycle * Math.PI)
      const s = radius * (0.12 + cycle * 0.92)
      sweep.current.scale.set(s, s, 1)
    }
    if (cone.current) {
      cone.current.material.opacity = 0.055 + Math.sin(t * 0.9) * 0.016
    }
    if (glow.current) {
      glow.current.material.opacity = 0.05 + Math.sin(t * 0.7) * 0.02
    }
  })

  return (
    <group>
      <mesh
        ref={cone}
        geometry={geo.cone}
        rotation={[Math.PI / 2, 0, 0]}
        position={[origin[0], origin[1], origin[2] + length / 2]}
      >
        <meshBasicMaterial
          color="#38d6ff"
          transparent
          opacity={0.06}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh
        geometry={geo.wire}
        rotation={[Math.PI / 2, 0, 0]}
        position={[origin[0], origin[1], origin[2] + length / 2]}
      >
        <meshBasicMaterial
          color="#5fe3ff"
          wireframe
          transparent
          opacity={0.05}
          depthWrite={false}
        />
      </mesh>

      <mesh
        ref={glow}
        geometry={geo.disc}
        position={[origin[0], origin[1], origin[2] + length]}
      >
        <meshBasicMaterial
          color="#39ff88"
          transparent
          opacity={0.06}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh ref={sweep} geometry={geo.sweep} position={[origin[0], origin[1], origin[2]]}>
        <meshBasicMaterial
          color="#39ff88"
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}
