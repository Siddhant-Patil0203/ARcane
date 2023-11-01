import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import state from "../contexts/CanvasContext";
import { useThree } from "@react-three/fiber";

const CameraRig = ({ children }) => {
  const group = useRef();
  const snap = useSnapshot(state);
  const { camera, gl } = useThree();
  useFrame((state, delta) => {
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;

    // console.log(state);
    // set the initial position of the model
    let targetPosition = [-0.4, 0, 2];
    let cameraRotation = [0, 0, 0];
    if (snap.intro) {
      if (isBreakpoint) {
        targetPosition = [0, 0, 2];
        cameraRotation = [0, 0, 0];
      }
      if (isMobile) {
        targetPosition = [0, 0.2, 4];
        cameraRotation = [0, 0, 0];
      }
    } else if (snap.start){
      if (isMobile) {
        targetPosition = [0, 0, 4.5];
        cameraRotation = [0, -0.2, 0];
      } else {
        targetPosition = [0, 0, 2];
        cameraRotation = [0, 0, 0];
      }
    } else if (snap.living) {
      targetPosition = [0, 0, 2.4];
      cameraRotation = [0, 3, 0];
    } else if (snap.kitchen) {
      targetPosition = [0.5, 0, -1.2];
      cameraRotation = [0, -0.1, 0];
    }

    // set model camera position
    easing.damp3(state.camera.position, targetPosition, 0.25, delta);
    easing.damp3(state.camera.rotation, cameraRotation, 0.25, delta);

    // set the model rotation smoothly
    // !snap.intro &&
    //   easing.dampE(
    //     group.current.rotation,
    //     [state.pointer.y / 10, -state.pointer.x / 5, 0],
    //     0.25,
    //     delta
    //   );
  });

  return (
    <group ref={group}>
      {children}
    </group>
  );
};

export default CameraRig;
