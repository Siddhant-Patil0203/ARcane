// import React from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import { Button } from "@nextui-org/react";

import state from "../contexts/CanvasContext";


import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from "../contexts/motion";

const Details = () => {
  const snap = useSnapshot(state);

  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className="absolute z-50 m-3" {...slideAnimation("left")}>
          <motion.header {...slideAnimation("down")}>
            <div className="m-2">Sidd</div>
          </motion.header>
          <motion.div {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className="m-2 text-4xl font-bold">Let's Have a Tour.</h1>
            </motion.div>
            <Button
              onClick={() => {
                state.intro = false;
              }}
              className="flex m-2"
              color="primary"
              variant="shadow"
            >
              Lets Go
            </Button>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Details;
