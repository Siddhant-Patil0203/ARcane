import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import { Button, Textarea } from "@nextui-org/react";

import state from "../contexts/CanvasContext";
import axios from "../axios";
// import {GrFormPreviousLink} from "react-icons/gr"
import { fadeAnimation, slideAnimation } from "../contexts/motion";
import { useGlobalContext } from "../contexts/GlobalContext";
import Granite from "../assets/granite.png";
import Kitchen from "../assets/kitchen.png";
import Living from "../assets/living.png";
import White from "../assets/white.png";
import Wood from "../assets/wood.png";

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

      console.log(snap.aiTextureURL);

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
              className="flex w-fit lg:w-full m-2 "
              color="danger"
              variant="ghost"
              startContent={
                <img
                  src="https://icons.veryicon.com/png/o/miscellaneous/eva-icon-fill/arrow-back-8.png"
                  className="w-5"
                />
              }
            >
              <p className="hidden lg:block ">Back</p>
            </Button>

            {snap.start ? (
              <div className="flex flex-col justify-end">
                <Button
                  onClick={() => {
                    (state.start = false), (state.kitchen = true);
                  }}
                  className="flex w-fit lg:w-full m-2"
                  color="secondary"
                  variant="shadow"
                  startContent={<img className="w-10" src={Kitchen} />}
                >
                  <p className="hidden lg:block ">Kitchen</p>
                </Button>
                <Button
                  onClick={() => {
                    state.start = false;
                    state.living = true;
                  }}
                  className="flex w-fit lg:w-full m-2"
                  color="default"
                  variant="shadow"
                  startContent={<img className="w-7" src={Living} />}
                >
                  <p className="hidden lg:block ">Living</p>
                </Button>
                <Button
                  onClick={() => {
                    state.granite = true;
                    state.wood = false;
                    state.white = false;
                  }}
                  className="flex w-fit lg:w-full m-2"
                  color="primary"
                  variant="shadow"
                  startContent={<img className="w-10" src={Granite} />}
                >
                  <p className="hidden lg:block ">Granite</p>
                </Button>
                <Button
                  onClick={() => {
                    state.granite = false;
                    state.wood = true;
                    state.white = false;
                  }}
                  className="flex w-fit lg:w-full m-2"
                  color="primary"
                  variant="shadow"
                  startContent={<img className="w-10" src={Wood} />}
                >
                  <p className="hidden lg:block ">Wood</p>
                </Button>
                <Button
                  onClick={() => {
                    state.granite = false;
                    state.wood = false;
                    state.white = true;
                  }}
                  className="flex w-fit  lg:w-full m-2"
                  color="primary"
                  variant="shadow"
                  startContent={<img className="w-10" src={White} />}
                >
                  <p className="hidden lg:block ">White</p>
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
                  className="flex w-fit lg:w-full m-2"
                  color="warning"
                  variant="shadow"
                  isLoading={isLoading}
                  startContent={
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3106/3106856.png"
                      className=" w-8"
                    />
                  }
                  // disabled
                >
                  <p className="hidden lg:block ">
                    {isLoading ? "Generating Texture..." : "Send"}
                  </p>
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
                Center
              </Button>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Configurator;
