import { useState, useEffect } from "react";
import Loader from "./Loader";
import { Rate } from "antd";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Input,
} from "@nextui-org/react";
import {
  Web3Button,
  useAddress,
  useContract,
  useContractRead,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { HeartIcon } from ".//HeartIcon";

import { Layout } from "./Layout";
import { SearchIcon } from ".//SearchIcon";
import axios from "axios";

import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";

const BottomHome = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [liked, setLiked] = useState(false);
  const [propertyList, setPropertyList] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const res = await axios.get("/api/v1/properties/fetch");
        setPropertyList(res.data);
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

  if (data) {
    const amount = ethers.utils.formatUnits(data[2], 0);
    console.log(amount);
    // const userLocation = "NGP";
  }
     useEffect(() => {console.log("vvvvvvvvv")
  //     const userLocation = "NGP";
  //     const matchingHouses = (propertyList||[]).filter(
  //         (propertyList) =>
  //           propertyList?.item?.location === userLocation
  //       );

    const today = new Date();
      console.log(propertyList)
    const recentHouses =( propertyList || []).filter((propertyList) => {
      const listedDate = new Date(propertyList?.item?.listingDate);
      const daysDiff = Math.floor((today - listedDate) / (1000 * 60 * 60 * 24));
      return daysDiff <= 1; // Filter houses listed within the last 30 days.
    });
    console.log("matching"+recentHouses)
  }, []);

  return (
    <>
      {isLoading ? <Loader width="500px" height="250px" /> : null}

      <p className="font-bold text-xl m-9 ">Recommended Houses </p>

      <div className="flex flex-row m-9 lg:justify-start justify-center overflow-x-auto space-x-5">
        {propertyList?.fetchProp?.map((item, index) => {
          return (
            <Card
              isFooterBlurred
              className=" min-w-[300px]  h-[300px] col-span-12 sm:col-span-5"
            >
              <CardHeader className="absolute z-10 top-1 flex-col items-start">
                <p className="text-tiny text-white/60 uppercase font-bold">
                  {item.title}
                </p>
                <h4 className="text-white font-medium text-2xl">Acme camera</h4>
              </CardHeader>
              <Image
                removeWrapper
                alt="Card example background"
                className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                src="https://img.staticmb.com/mbimages/project/Photo_h310_w462/2019/05/15/Project-Photo-14-Aarambh-Mumbai-5112263_747_1440_310_462.jpg"
              />
              <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                <div>
                  <p className="text-black text-tiny">Rated 5⭐</p>
                  <p className="text-black text-tiny">Nagpur</p>
                </div>
                <Button
                  className="text-tiny"
                  color="primary"
                  radius="full"
                  size="sm"
                >
                  View More
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      <p className="font-bold text-xl m-9 ">Houses in  </p>
      <div className="flex flex-row m-9 lg:justify-start justify-center overflow-x-auto space-x-5">
        {propertyList?.fetchProp?.map((item, index) => {
          return (
            <Card
              isFooterBlurred
              className=" min-w-[300px]  h-[300px] col-span-12 sm:col-span-5"
            >
              <CardHeader className="absolute z-10 top-1 flex-col items-start">
                <p className="text-tiny text-white/60 uppercase font-bold">
                  {item.title}
                </p>
                <h4 className="text-white font-medium text-2xl">Acme camera</h4>
              </CardHeader>
              <Image
                removeWrapper
                alt="Card example background"
                className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                src="https://img.staticmb.com/mbimages/project/Photo_h310_w462/2019/05/15/Project-Photo-14-Aarambh-Mumbai-5112263_747_1440_310_462.jpg"
              />
              <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                <div>
                  <p className="text-black text-tiny">Rated 5⭐</p>
                  <p className="text-black text-tiny">Nagpur</p>
                </div>
                <Button
                  className="text-tiny"
                  color="primary"
                  radius="full"
                  size="sm"
                >
                  View More
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
   
    </>
  );
};

export default BottomHome;
