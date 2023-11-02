import * as THREE from "three";
import { Suspense, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { Html, Preload, OrbitControls } from "@react-three/drei";
// import { Popconfirm } from 'antd'
import { Link, useLocation } from "react-router-dom";

const store = [
  {
    name: "inside",
    color: "lightpink",
    position: [50, 0, -15],
    url: "https://upcdn.io/kW15bkg/raw/20231102_052623.jpg",
    link: 1,
  },
  {
    name: "front",
    color: "lightblue",
    position: [40, 20, 60],
    url: "https://upcdn.io/kW15bkg/raw/20231102_052729.jpg",
    link: 2,
  },
  {
    name: "left",
    color: "lightpink",
    position: [50, 10, 20],
    url: "https://upcdn.io/kW15bkg/raw/20231102_052809.jpg",
    link: 3,
  },
  {
    name: "outside",
    color: "lightblue",
    position: [15, 0, 0],
    url: "https://upcdn.io/kW15bkg/raw/20231102_052939.jpg",
    link: 0,
  },
];

function Dome({ name, position, texture, onClickt }) {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[500, 60, 40]} />
        <meshBasicMaterial map={texture} side={THREE.BackSide} />
      </mesh>
      <mesh position={position}>
        <sphereGeometry args={[1.25, 32, 32]} />
        <meshBasicMaterial color="white" />
        <Html center>
          <div className="text-black" onClick={onClickt}>
            <a href="#">{name}</a>
          </div>
        </Html>
      </mesh>
    </group>
  );
}

function Portals() {
  const [which, set] = useState(0);
  const { link, ...props } = store[which];
  const maps = useLoader(THREE.TextureLoader, store.map((entry) => entry.url)) // prettier-ignore
  return <Dome onClickt={() => set(link)} {...props} texture={maps[which]} />;
}

export default function Paranoma() {
  const location = useLocation();
  const propData = location.state;
  console.log(location);
  return (
    <div className="w-full h-[100vh]">
      <Canvas frameloop="demand" camera={{ position: [0, 0, 0.1] }}>
        <OrbitControls
          enableZoom={false}
          enablePan={true}
          enableDamping
          dampingFactor={0.2}
          autoRotate={false}
          rotateSpeed={-0.5}
        />
        <Suspense fallback={null}>
          <Preload all />
          <Portals />
        </Suspense>
      </Canvas>
    </div>
  );
}
