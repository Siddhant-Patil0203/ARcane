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
            className="absolute z-10 top-20 right-5"
            {...fadeAnimation}
          >
            <Button
              onClick={() => {
                state.intro = true;
              }}
              className="flex w-full m-2 "
              color="danger"
              variant="ghost"
            >
              Back
            </Button>

            {snap.start ? (
              <div className="flex flex-col justify-end">
                <Button
                  onClick={() => {
                    (state.start = false), (state.kitchen = true);
                  }}
                  className="flex w-full m-2"
                  color="secondary"
                  variant="shadow"
                  startContent={
                    <img className="w-10" src="https://o.remove.bg/downloads/3757ab79-17df-4f06-956d-87a34211b5b6/108564669-simple-chef-hat-icon-kitchen-logo-white-icon-with-shadow-on-transparent-background-removebg-preview.png"/>
                  }
                >
                  kitchen
                </Button>
                <Button
                  onClick={() => {
                    state.start = false;
                    state.living = true;
                  }}
                  className="flex w-full m-2"
                  color="default"
                  variant="shadow"
                  startContent={
                    <img className="w-7" src="https://o.remove.bg/downloads/82cb33f1-2891-4e4e-a6ef-b5451c984259/transparent-living-room-icon-interior-design-icon-sofa-icon-5fa62a09c04ae1.9178272616047252577876-removebg-preview.png"/>
                  }
                >
                  living
                </Button>
                <Button
                  onClick={() => {
                    state.granite = true;
                    state.wood = false;
                    state.white = false;
                  }}
                  className="flex w-full m-2"
                  color="primary"
                  variant="shadow"
                  startContent={
                    <img className="w-10" src="https://o.remove.bg/downloads/1a4bf324-a16d-48f1-8c26-322e54c7396f/istockphoto-1423505904-612x612-removebg-preview.png"/>
                  }
                >
                  granite
                </Button>
                <Button
                  onClick={() => {
                    state.granite = false;
                    state.wood = true;
                    state.white = false;
                  }}
                  className="flex w-full m-2"
                  color="primary"
                  variant="shadow"
                  startContent={
                    <img className="w-10" src="https://o.remove.bg/downloads/caae8241-2b02-44fa-ac01-a7863ffcc246/9670421ff0e6d07a338de451fe54369a-removebg-preview.png"/>
                  }
                >
                  wood
                </Button>
                <Button
                  onClick={() => {
                    state.granite = false;
                    state.wood = false;
                    state.white = true;
                  }}
                  className="flex w-full m-2"
                  color="primary"
                  variant="shadow"
                  startContent={
                    <img className="w-10" src="https://o.remove.bg/downloads/61fd3acd-9ec5-4972-bd17-b15c40c9b9b7/png-transparent-mosaic-tile-glass-material-solidworks-corp-new-material-miscellaneous-glass-blue-removebg-preview.png"/>
                  }
                >
                  white
                </Button>
                <Textarea
                  label="AI texture"
                  labelPlacement="inside"
                  placeholder="Enter your description"
                  className="w-full m-2"
                  name="prompt"
                  id="prompt"
                  value={form.prompt}
                  onChange={handleChange}
                />
                <Button
                  onClick={handleSumbmit}
                  className="flex w-full m-2"
                  color="warning"
                  variant="shadow"
                  isLoading={isLoading}
                  // disabled
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
                className="flex w-full m-2"
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
