import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import type { DressVisual, HotspotAnchor } from "../data/lookbookDresses";
import { useTheme, type Theme } from "../theme/ThemeContext";

const VIEWER_PALETTE: Record<
  Theme,
  { bg: string; cream: string; accent: string; shadow: string }
> = {
  dark: { bg: "#1f1d1b", cream: "#e8e4dc", accent: "#9a8b7a", shadow: "#1f1d1b" },
  light: { bg: "#faf9f7", cream: "#2c2825", accent: "#9a8b7a", shadow: "#e8e2d8" },
};

type SilhouetteType = DressVisual["silhouette"];

function getProfile(type: SilhouetteType): THREE.Vector2[] {
  const pts: [number, number][] = (() => {
    switch (type) {
      case "sheath":
        return [
          [0.36, 0], [0.34, 0.35], [0.3, 0.65], [0.27, 0.95], [0.25, 1.25], [0.23, 1.55], [0.22, 1.78],
        ];
      case "aline":
        return [
          [0.3, 0], [0.52, 0.12], [0.58, 0.35], [0.54, 0.6], [0.42, 0.85], [0.3, 1.15], [0.26, 1.45], [0.24, 1.72],
        ];
      case "ballgown":
        return [
          [0.62, 0], [0.68, 0.18], [0.64, 0.42], [0.38, 0.62], [0.3, 0.85], [0.27, 1.1], [0.25, 1.35], [0.23, 1.65],
        ];
      case "mermaid":
        return [
          [0.4, 0], [0.38, 0.28], [0.36, 0.52], [0.35, 0.72], [0.34, 0.88], [0.52, 0.98], [0.34, 1.15], [0.28, 1.4], [0.26, 1.68],
        ];
      case "architectural":
        return [
          [0.32, 0], [0.48, 0.06], [0.42, 0.22], [0.3, 0.5], [0.28, 0.78], [0.27, 1.05], [0.26, 1.32], [0.24, 1.58], [0.23, 1.75],
        ];
    }
  })();
  return pts.map(([x, y]) => new THREE.Vector2(x, y));
}

function DressMesh({ visual }: { visual: DressVisual }) {
  const geometry = useMemo(() => {
    const profile = getProfile(visual.silhouette);
    return new THREE.LatheGeometry(profile, 64);
  }, [visual.silhouette]);

  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: visual.colorHex,
        roughness: visual.roughness,
        metalness: visual.metalness,
        sheen: visual.sheen,
        sheenRoughness: 0.4,
        clearcoat: visual.clearcoat,
        clearcoatRoughness: 0.2,
        emissive: visual.emissive ?? "#000000",
        emissiveIntensity: visual.emissiveIntensity ?? 0,
        side: THREE.DoubleSide,
      }),
    [visual],
  );

  return (
    <group position={[0, -0.9, 0]}>
      <mesh geometry={geometry} material={material} castShadow receiveShadow />
      {visual.silhouette === "architectural" && (
        <mesh position={[0, 0.02, -0.42]} rotation={[-Math.PI / 2 + 0.08, 0, 0]} castShadow>
          <planeGeometry args={[0.55, 1.1, 1, 1]} />
          <meshPhysicalMaterial
            color={visual.colorHex}
            roughness={visual.roughness}
            metalness={visual.metalness}
            sheen={visual.sheen}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
}

function HotspotMarker({
  position,
  active,
  onSelect,
  palette,
}: {
  position: [number, number, number];
  active: boolean;
  onSelect: () => void;
  palette: (typeof VIEWER_PALETTE)[Theme];
}) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ringRef.current) {
      const s = 1 + Math.sin(clock.elapsedTime * 2.5) * 0.12;
      ringRef.current.scale.setScalar(active ? s * 1.15 : s);
    }
  });

  return (
    <group position={position}>
      <mesh ref={ringRef}>
        <ringGeometry args={[0.035, 0.048, 32]} />
        <meshBasicMaterial color="#c9a962" transparent opacity={active ? 0.9 : 0.45} side={THREE.DoubleSide} />
      </mesh>
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "";
        }}
      >
        <sphereGeometry args={[0.022, 16, 16]} />
        <meshBasicMaterial color={active ? palette.cream : palette.accent} />
      </mesh>
    </group>
  );
}

function Scene({
  visual,
  hotspots,
  activeHotspot,
  onHotspotChange,
  palette,
}: {
  visual: DressVisual;
  hotspots: HotspotAnchor[];
  activeHotspot: string | null;
  onHotspotChange: (id: string) => void;
  palette: (typeof VIEWER_PALETTE)[Theme];
}) {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 5, 4]} intensity={1.1} castShadow shadow-mapSize={[512, 512]} />
      <directionalLight position={[-4, 2, -2]} intensity={0.4} color={palette.accent} />
      <pointLight position={[0, 2.5, 2]} intensity={0.5} color={palette.cream} />

      <DressMesh visual={visual} />

      {hotspots.map((h) => (
        <HotspotMarker
          key={h.id}
          position={h.position}
          active={activeHotspot === h.id}
          onSelect={() => onHotspotChange(h.id)}
          palette={palette}
        />
      ))}

      <ContactShadows
        position={[0, -0.9, 0]}
        opacity={0.45}
        scale={2.5}
        blur={2.5}
        far={1.2}
        color={palette.shadow}
      />
      <Environment preset="studio" environmentIntensity={0.35} />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.6}
        minAzimuthAngle={-Math.PI / 3}
        maxAzimuthAngle={Math.PI / 3}
        autoRotate
        autoRotateSpeed={0.6}
      />
    </>
  );
}

type DressViewer3DProps = {
  visual: DressVisual;
  hotspots: HotspotAnchor[];
  activeHotspot: string | null;
  onHotspotChange: (id: string) => void;
};

export function DressViewer3D({ visual, hotspots, activeHotspot, onHotspotChange }: DressViewer3DProps) {
  const { theme } = useTheme();
  const palette = VIEWER_PALETTE[theme];

  return (
    <Canvas
      className="dress-viewer__canvas"
      camera={{ position: [0, 0.85, 2.8], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <color attach="background" args={[palette.bg]} />
      <fog attach="fog" args={[palette.bg, 4, 8]} />
      <Scene
        visual={visual}
        hotspots={hotspots}
        activeHotspot={activeHotspot}
        onHotspotChange={onHotspotChange}
        palette={palette}
      />
    </Canvas>
  );
}
