// import React from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import { Button, Spacer } from "@nextui-org/react";
import { Link, useLocation } from "react-router-dom";
import state from "../contexts/CanvasContext";
import { Card, CardBody } from "@nextui-org/react";
import { Web3Button, useAddress } from "@thirdweb-dev/react";

import axios from "../axios";

import { useGlobalContext } from "../contexts/GlobalContext";

import { Chip } from "@nextui-org/react";
import { FaEthereum } from "react-icons/fa";

import {
  headContainerAnimation,
  headTextAnimation,
  slideAnimation,
} from "../contexts/motion";

const Details = () => {
  const snap = useSnapshot(state);
  const location = useLocation();
  const propData = location.state;
  console.log(location);
  const { user, setUser } = useGlobalContext();

  const handlePayment = async () => {
    const userId = user.result._id;
    const orderId = `${userId}-${Date.now()}`;
    const paymentData = {
      amount: propData?.item.price || 50000,
      orderId: orderId,
      customerName: user.result.name,
      customerEmail: user.result.email,
      customerPhone: "9876543210",
    };
    try {
      const res = await axios.post(`/payment`, paymentData);
      window.location.href = res.data.paymentLink;
    } catch (error) {
      console.error(error);
    }
  };

  const address = useAddress();

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
              <div className="flex mt-2 mb-5 text-3xl font-bold ">
                <img
                  src="https://cdn3d.iconscout.com/3d/premium/thumb/house-5591108-4652885.png?f=webp"
                  className="w-10 mr-3"
                />
                {propData?.item?.title}
              </div>
            </motion.header>
            <motion.div
              {...headContainerAnimation}
              className="ml-5 mr-5 lg:ml-14 "
            >
              <motion.div {...headTextAnimation}>
                <h1 className="flex mt-2 text-2xl font-bold">
                  <img
                    src="https://cdn3d.iconscout.com/3d/premium/thumb/location-pin-2891358-2409769@0.png"
                    className="w-10 mr-3 "
                  />
                  {propData?.item?.location}
                </h1>
              </motion.div>

              <Card className="lg:w-[100%] mt-5 bg-opacity-40">
                <CardBody>
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
              <div className="flex items-center my-4 ">
                <Button
                  onClick={() => {
                    state.intro = false;
                  }}
                  className="flex w-full lg:w-fit lg:ml-0 py-6"
                  color="secondary"
                  variant="shadow"
                  startContent={
                    <img
                      src="https://cdn3d.iconscout.com/3d/premium/thumb/vr-glasses-4035925-3342604.png"
                      className="w-7"
                    />
                  }
                >
                  AR & VR View
                </Button>
                <Spacer x={2} />
                <Link to="/360View">
                  <div className="p-3 text-center rounded-xl bg-secondary w-fit">
                    360 View
                  </div>
                </Link>
              </div>
              <div className="flex">
                <Button
                  color="primary"
                  variant="shadow"
                  className="p-6"
                  onClick={handlePayment}
                >
                  Buy now
                </Button>
                <Spacer x={2} />
                <Web3Button
                  contractAddress="0x7F92b6D61f269f977558AC55F03Ea5C632095a01"
                  action={(contract) => {
                    contract.call("createTransaction", [
                      address,
                      12,
                      3000000000000000,
                    ]);
                  }}
                >
                  Buy with ETH
                  <FaEthereum />
                </Web3Button>
              </div>

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
