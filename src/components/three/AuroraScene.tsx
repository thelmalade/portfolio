import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  AdaptiveDpr,
  Environment,
  Float,
  Html,
  Lightformer,
  MeshDistortMaterial,
  OrbitControls,
  Sparkles,
  Stars,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import type { Group } from "three";

type SceneProps = {
  reduced: boolean;
  isMobile: boolean;
};

function Orb({ reduced }: { reduced: boolean }) {
  const groupRef = useRef<Group>(null);

  // Gentle idle spin (in addition to OrbitControls autoRotate) for life.
  useFrame((_, delta) => {
    if (!groupRef.current || reduced) return;
    groupRef.current.rotation.y += delta * 0.05;
  });

  return (
    <group ref={groupRef}>
      <Float
        speed={reduced ? 0 : 1.4}
        rotationIntensity={reduced ? 0 : 0.4}
        floatIntensity={reduced ? 0 : 0.9}
      >
        <mesh castShadow>
          <icosahedronGeometry args={[1.4, 64]} />
          <MeshDistortMaterial
            color="#6E57C8"
            envMapIntensity={2.2}
            metalness={1}
            roughness={0.08}
            distort={reduced ? 0.12 : 0.42}
            speed={reduced ? 0.3 : 1.8}
          />
        </mesh>
      </Float>
    </group>
  );
}

function Loader() {
  return (
    <Html center>
      <span className="whitespace-nowrap text-xs uppercase tracking-[0.3em] text-muted">
        Loading scene…
      </span>
    </Html>
  );
}

export default function AuroraScene({ reduced, isMobile }: SceneProps) {
  return (
    <Canvas
      dpr={isMobile ? 1 : [1, 2]}
      camera={{ position: [0, 0, 4.6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      performance={{ min: 0.5 }}
    >
      <color attach="background" args={["#0a0a0a"]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 5, 5]} intensity={1.1} />

      <Suspense fallback={<Loader />}>
        <Orb reduced={reduced} />

        {/* Deep starfield for depth */}
        <Stars
          radius={70}
          depth={50}
          count={isMobile ? 2500 : 6000}
          factor={4}
          saturation={0}
          fade
          speed={reduced ? 0 : 1}
        />

        {/* Closer, brighter glints layered over the orb */}
        <Sparkles
          count={isMobile ? 120 : 350}
          scale={10}
          size={2.5}
          speed={reduced ? 0 : 0.5}
          opacity={0.8}
          color="#cdb8ff"
        />
        <Sparkles
          count={isMobile ? 60 : 160}
          scale={6}
          size={4}
          speed={reduced ? 0 : 0.3}
          opacity={0.6}
          color="#89e7ff"
        />

        {/* Self-contained studio environment — multicoloured light panels give
            the orb an iridescent sheen without fetching an external HDR. */}
        <Environment resolution={256}>
          <Lightformer
            intensity={2.4}
            position={[0, 2, 4]}
            scale={[7, 7, 1]}
            color="#89AACC"
          />
          <Lightformer
            intensity={2}
            position={[-4, 1, 2]}
            scale={[4, 4, 1]}
            color="#ff5fb0"
          />
          <Lightformer
            intensity={2}
            position={[4, -1, 2]}
            scale={[4, 4, 1]}
            color="#46e0d0"
          />
          <Lightformer
            intensity={1.8}
            position={[2, 3, -2]}
            scale={[5, 3, 1]}
            color="#7c5cff"
          />
          <Lightformer
            intensity={1.4}
            position={[-3, -3, 1]}
            scale={[4, 4, 1]}
            color="#ffd27a"
          />
        </Environment>

        <EffectComposer>
          <Bloom
            mipmapBlur
            luminanceThreshold={0.2}
            intensity={reduced ? 0.4 : 0.85}
            radius={0.75}
          />
        </EffectComposer>
      </Suspense>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={!reduced}
        autoRotateSpeed={0.6}
        rotateSpeed={0.4}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={(2 * Math.PI) / 3}
      />
      <AdaptiveDpr pixelated />
    </Canvas>
  );
}
