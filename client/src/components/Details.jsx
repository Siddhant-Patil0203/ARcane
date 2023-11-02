// import React from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import { Button } from "@nextui-org/react";
import { Link, useLocation } from "react-router-dom";
import { Form, Mentions, Space } from "antd";
const { getMentions } = Mentions;
import Reviews from "./Reviews";
import state from "../contexts/CanvasContext";
import { Tooltip, Card, CardBody, Image, Input } from "@nextui-org/react";
import {
  Web3Button,
  useAddress,
  useContract,
  useContractRead,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { HeartIcon } from "../components/HeartIcon";
import { Layout } from "../components/Layout";
import axios from "../axios";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import BottomHome from "../components/BottomHome";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";

import { Chip } from "@nextui-org/react";
import Filter from "../components/Filter";
import { ImCalendar, ImCross, ImLocation } from "react-icons/im";

import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from "../contexts/motion";

const Details = () => {
  const snap = useSnapshot(state);
  const location = useLocation();
  const propData = location.state;
  console.log(location);

  return (
    <AnimatePresence>
      <div className="text-white">
        {snap.intro && (
          <motion.section
            className="absolute z-50 m-3"
            {...slideAnimation("left")}
          >
            <motion.header
              {...slideAnimation("down")}
              className="ml-5 lg:ml-14"
            >
              <p className="text-3xl font-bold">Property Name:</p>
              <div className="mt-2 mb-5 text-3xl font-bold">
                {propData?.item?.title}
              </div>
            </motion.header>
            <motion.div
              {...headContainerAnimation}
              className="ml-5 mr-5 lg:ml-14 lg:mr-0"
            >
              <motion.div {...headTextAnimation}>
                <h1 className="mt-2 text-2xl font-bold">
                  Location:&nbsp;
                  {propData?.item?.location}
                </h1>
              </motion.div>
              <Button
                onClick={() => {
                  state.intro = false;
                }}
                className="flex w-full mt-2 lg:w-fit lg:ml-0 lg:mt-2"
                color="secondary"
                variant="shadow"
              >
                Lets Go
              </Button>
              <Link to="/360View" state={{ item: propData }}>
                {/* <Button
                  className="flex w-full mt-2 lg:w-fit lg:ml-0 lg:mt-2"
                  color="secondary"
                  variant="shadow"
                > */}
                <div className="p-3 m-2 text-center bg-secondary rounded-xl w-fit">360View</div>
                  {/* 360View */}
                {/* </Button> */}
              </Link>

              <Card className="lg:w-[50%] mt-5 bg-opacity-40">
                <CardBody>
                  <Image
                    alt="Album cover"
                    className="object-cover"
                    height={200}
                    shadow="md"
                    // src=""
                    src={propData?.item?.image}
                    width="10%"
                  />
                  <Chip
                    className="p-4 lg:text-xl text-xsm "
                    color={
                      propData?.item?.status == "Listed" ? "success" : "primary"
                    }
                  >
                    Current Status :- {propData?.item?.status}
                  </Chip>
                  <p className="mt-5 text-xl font-bold">Description</p>
                  <div>{propData?.item?.description}</div>
                  <p className="mt-5 text-xl font-bold">Price</p>
                  <p className="mt-2 text-3xl font-extrabold">$1 LAC</p>
                </CardBody>
              </Card>

              {/* Property Details */}
              {/* Property details */}
              {/* <motion.div>
                <div className="mx-2 mb-10 ">
                  <Card
                    isBlurred
                    className="border-none bg-background/60 dark:bg-default-100/50 "
                    shadow="sm"
                  >
                    <CardBody>
                      <div className="grid items-center justify-center grid-cols-6 gap-6 md:grid-cols-12 md:gap-4">
                        <div className="relative col-span-6 md:col-span-4">
                          <Image
                            alt="Album cover"
                            className="object-cover"
                            height={200}
                            shadow="md"
                            // src=""
                            src={propData?.item?.image}
                            width="100%"
                          />
                        </div>

                        <div className="flex flex-col col-span-6 md:col-span-8">
                          <div className="flex items-start justify-between">
                            <div className="flex flex-col gap-0">
                              <h1 className="text-2xl font-medium text-foreground/90">
                                {propData?.item?.title}
                              </h1>
                              <p className="mt-1 text-small text-foreground/80">
                                <ImLocation className="inline-block mr-1" />
                                {propData?.item?.location}
                              </p>
                              <p className="mt-1 text-small text-foreground/80">
                                <ImCross className="inline-block mb-4 mr-1" />
                                {propData?.item?.size}
                              </p>
                              <Chip
                                color={
                                  propData?.item?.status == "Listed"
                                    ? "success"
                                    : "primary"
                                }
                              >
                                Current Status :- {propData?.item?.status}
                              </Chip>
                            </div>
                            <Button
                              isIconOnly
                              className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                              radius="full"
                              variant="light"
                              onPress={() => setLiked((v) => !v)}
                            >
                              <HeartIcon
                                className={
                                  liked ? "[&>path]:stroke-transparent" : ""
                                }
                                fill={liked ? "currentColor" : "none"}
                              />
                            </Button>
                          </div>

                          <div className="flex flex-col gap-1 mt-3">
                            <p>$ {propData?.item?.price}.00 /-</p>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </motion.div> */}
            </motion.div>
          </motion.section>
        )}
      </div>
    </AnimatePresence>
  );
};

export default Details;
