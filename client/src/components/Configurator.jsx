import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import { Button, Textarea } from "@nextui-org/react";

import state from "../contexts/CanvasContext";
import axios from "../axios";

import { fadeAnimation, slideAnimation } from "../contexts/motion";
import { useGlobalContext } from "../contexts/GlobalContext";

const initialForm = {
  prompt: "",
};

const Configurator = () => {
  const snap = useSnapshot(state);
  const [form, setForm] = useState(initialForm);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSumbmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // console.log(form);
      const res = await axios.post("/api/v1/dalle", form);
      state.aiTextureURL = `data:image/png;base64,${res.data.image}`;
      state.white = false;
      state.granite = false;
      state.wood = false;
      state.aiTexture = true;

      
      console.log(snap.aiTextureURL)
      
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <Button
              onClick={() => {
                state.intro = true;
              }}
              className="flex m-2"
              color="danger"
              variant="shadow"
            >
              Back
            </Button>

            {snap.start ? (
              <div className="flex flex-col justify-end">
                <Button
                  onClick={() => {
                    (state.start = false), (state.kitchen = true);
                  }}
                  className="flex m-2"
                  color="secondary"
                  variant="shadow"
                >
                  kitchen
                </Button>
                <Button
                  onClick={() => {
                    state.start = false;
                    state.living = true;
                  }}
                  className="flex m-2"
                  color="default"
                  variant="shadow"
                >
                  living
                </Button>
                <Button
                  onClick={() => {
                    state.granite = true;
                    state.wood = false;
                    state.white = false;
                  }}
                  className="flex m-2"
                  color="primary"
                  variant="shadow"
                >
                  granite
                </Button>
                <Button
                  onClick={() => {
                    state.granite = false;
                    state.wood = true;
                    state.white = false;
                  }}
                  className="flex m-2"
                  color="primary"
                  variant="shadow"
                >
                  wood
                </Button>
                <Button
                  onClick={() => {
                    state.granite = false;
                    state.wood = false;
                    state.white = true;
                  }}
                  className="flex m-2"
                  color="primary"
                  variant="shadow"
                >
                  white
                </Button>
                <Textarea
                  label="AI texture"
                  labelPlacement="inside"
                  placeholder="Enter your description"
                  name="prompt"
                  id="prompt"
                  value={form.prompt}
                  onChange={handleChange}
                />
                <Button
                  onClick={handleSumbmit}
                  className="flex m-2"
                  color="warning"
                  variant="shadow"
                  isLoading={isLoading}
                  disabled
                >
                  {isLoading ? 'Generating Texture...' : 'Send'}
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => {
                  state.start = true;
                  state.living = false;
                  state.kitchen = false;
                }}
                className="flex m-2"
                color="danger"
                variant="shadow"
              >
                center
              </Button>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Configurator;
