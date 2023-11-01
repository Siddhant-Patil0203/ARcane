// import React from 'react'
import { Canvas } from "@react-three/fiber";
import { Environment, Center, PresentationControls } from "@react-three/drei";
import { useSnapshot } from "valtio";
import { useSpring } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { XR, VRButton, ARButton, Controllers } from "@react-three/xr";

import Neusa from "./Models/Neusa_frois";
import Backdrop from "./Backdrop";
import CameraRig from "./CameraRig";

import state from "../contexts/CanvasContext";

const CanvasModel = () => {
  const snap = useSnapshot(state);

  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

  // Set the drag hook and define component movement based on gesture data.
  const bind = useDrag(({ down, movement: [mx, my] }) => {
    api.start({ x: down ? mx : 0, y: down ? my : 0 });
  });

  return (
    <div className="w-full h-[100vh]">
      {!snap.intro && (
        <>
          <div onClick={() => setEnv(!env)} className="relative top-[90vh]">
            <VRButton />
          </div>
          <div onClick={() => setEnv(!env)} className="relative top-[82vh]">
            <ARButton />
          </div>
        </>
      )}
      <Canvas {...bind()} style={{ x, y, touchAction: "none" }}>
        <XR referenceSpace="local">
          <ambientLight intensity={0.5} />
          <Environment preset="forest" background />

          <CameraRig>
            {/* <Backdrop /> */}
            <PresentationControls
              enabled={!snap.intro}
              global={true}
              zoom={0.8}
              polar={[0, Math.PI / 12]}
              snap={true}
            >
              <Center>
                <Neusa />
              </Center>
            </PresentationControls>
          </CameraRig>
          <Controllers />
        </XR>
      </Canvas>
    </div>
  );
};

export default CanvasModel;
