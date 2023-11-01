import React from "react";
import { useState, useEffect, Fragment } from "react";
import Loader from "../components/Loader";
import { Button, Card, CardBody, Image, Input } from "@nextui-org/react";
import {
  Web3Button,
  useAddress,
  useContract,
  useContractRead,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { HeartIcon } from "../components/HeartIcon";
import axios from "../axios";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import BottomHome from "../components/BottomHome";
import { Layout } from "../components/Layout";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Favourites() {
  const [propertyList, setPropertyList] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const res = await axios.get("/api/v1/fav/GetFav");
        setPropertyList(res.data);
        console.log("fav : " + res.data)
        // setIsLoading(false);
      } catch (err) {
        console.error(err);
        // setIsLoading(false);
      }
    };

    fetchData().then((res) => {
      setIsLoading(false);
    });
    console.log("UseEffect :" + propertyList);
  }, []);

  const addToFav = async (index) => {
    // setIsLoading(true);

    try {
      await axios.post(
        `/api/v1/fav/addFav/:${propertyList?.fetchProp[index]?._id}`
      );
      // setIsLoading(false);
    } catch (err) {
      console.error(err);
      // setIsLoading(false);
    }
  };

  const removeFromFav = async (index) => {
    // setIsLoading(true);

    try {
      await axios.post(
        `/api/v1/fav/remFav/:${propertyList?.fetchProp[index]?._id}`
      );
      // setIsLoading(false);
    } catch (err) {
      console.error(err);
      // setIsLoading(false);
    }
  };
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const address = useAddress();
  const { contract } = useContract(import.meta.env.VITE_CONTRACT_ADDRESS);
  const { data, laoading } = useContractRead(
    contract,
    "getTransactionByProductID",
    [12]
  );
  console.log(data);
  if (data) {
    const amount = ethers.utils.formatUnits(data[2], 0);
    console.log(amount);
  }
  return (
    <><Layout>
      <div className="m-20 ">
        <p className="font-bold text-2xl mb-10">Your Favouites</p>

        {propertyList?.fetchProp?.map((item, index) => {
          return (
            <div key={index} className="mx-2 mb-10 ">
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
                        src={item?.image}
                        width="100%"
                      />
                    </div>

                    <div className="flex flex-col col-span-6 md:col-span-8">
                      <div className="flex items-start justify-between">
                        <div className="flex flex-col gap-0">
                          <h1 className="text-2xl font-medium text-foreground/90">
                            {console.log(propertyList)}
                            {item.title}
                          </h1>
                          <p className="mt-1 text-small text-foreground/80">
                            <ImLocation className="inline-block mr-1" />
                            {item?.location}
                          </p>
                          <p className="mt-1 text-small text-foreground/80">
                            <ImCross className="inline-block mb-4 mr-1" />
                            {item?.size}
                          </p>
                          <Chip
                            color={
                              item?.status == "Listed" ? "success" : "primary"
                            }
                          >
                            Current Status :- {item?.status}
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
                        <p>$ {item?.price}.00 /-</p>
                      </div>

                      <Link to="/details" state={{ item }}>
                        {/* <Button
              radius="full"
              className="bg-gradient-to-tr from-[#1E152D] to-[#7D5CB2] text-white shadow-lg w-full"
            > */}
                        View Details
                        {/* </Button> */}
                      </Link>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          );
        })}
      </div>
      </Layout>
    </>
  );
}
