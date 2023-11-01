import { useState } from "react";
import Loader from "../components/Loader";
import { Rate } from "antd";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
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
import { HeartIcon } from "../components/HeartIcon";
import { Layout } from "../components/Layout";
import { SearchIcon } from "../components/SearchIcon";

const BottomHome = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [liked, setLiked] = useState(false);

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
    <>
      {isLoading ? <Loader width="500px" height="250px" /> : null}

      <center>
        <div className="space-x-3 flex justify-center">
          <Input
            classNames={{
              base: "max-w-full w-[60%]  h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Type to search..."
            size="sm"
            startContent={<SearchIcon size={18} />}
            type="search"
          />
          <Button variant="solid" color="primary">
            Search
          </Button>
        </div>
      </center>

      <div className="flex flex-col m-9 space-y-5">
        <p className="font-bold text-xl ">Recommended Houses </p>
        <Card
          isBlurred
          className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
          shadow="sm"
        >
          <CardBody>
            <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
              <div className="relative col-span-6 md:col-span-4">
                <Image
                  alt="Album cover"
                  className="object-cover"
                  height={200}
                  shadow="md"
                  src="/images/album-cover.png"
                  width="100%"
                />
              </div>

              <div className="flex flex-col col-span-6 md:col-span-8">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-0">
                    <h3 className="font-semibold text-foreground/90">
                      Daily Mix
                    </h3>
                    <p className="text-small text-foreground/80">12 Tracks</p>
                    <h1 className="text-large font-medium mt-2">
                      Frontend Radio
                    </h1>
                  </div>
                  <Button
                    isIconOnly
                    className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                    radius="full"
                    variant="light"
                    onPress={() => setLiked((v) => !v)}
                  >
                    <HeartIcon
                      className={liked ? "[&>path]:stroke-transparent" : ""}
                      fill={liked ? "currentColor" : "none"}
                    />
                  </Button>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
        <div className="justify-items-center lg:items-start grid sm:grid-col-1 sm:grid-row-5 mr-14 grid-col-5 border-solid border-2 border-gray rounded-md p-5">
          <Card radius="lg" className="border-none col-start-1 col-end-2">
            <Image
              alt="house1"
              className="object-cover w-64 h-40"
              src="https://img.staticmb.com/mbphoto/property/cropped_images/2023/Aug/16/Photo_h300_w450/68630295_10_PropertyImage395-32165206157674_300_450.jpg"
            />
            <CardHeader className="justify-start before:bg-white/10 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <Button
                className="text-tiny text-white bg-black                                          "
                variant="flat"
                color="default"
                radius="lg"
                size="sm"
              >
                View 3D
              </Button>
            </CardHeader>
          </Card>
          <div className="lg:col-start-2 col-end-3 lg:ml-5 sm:ml-3 sm:mr-3 pt-4 lg:pt-0 col-start-1">
            <h3 className="font-semibold text-foreground/90">Daily Mix</h3>
            <p className="text-small underline text-foreground/80">12 Tracks</p>
            <div className="mx-1 lg:mx-0 my-3 bg-gray-500 rounded-lg bg-opacity-50 p-3 justify-items-center grid grid-col-3 w-full">
              <div className="col-start-1 col-end-2">
                CARPET AREA <br />
                462 Sqft
              </div>
              <div className="col-start-2 col-end-3 flex-row">
                <span>STATUS</span>
                <br />
                <span>Ready to Move</span>
              </div>
              <div className="col-start-3 col-end-4">
                FLOOR
                <br />4
              </div>
              <div className="col-start-1 col-end-2 mt-2">
                FURNISHING <br />
                Furnished
              </div>
              <div className="col-start-2 col-end-3 mt-2">
                FACING
                <br />
                West
              </div>
            </div>
            <h3 className="font-semibold text-foreground/90">Description</h3>
            <p className="text-small text-foreground/80">
              Creatively planned and constructed is a 1 BHK flat for sale in
              Charkop, Mumbai. Take the experience of contemporary living to a
              new high, with exquisitely designed apartments at Mapkhan Lilac
              Garden. This flat for resale is a choice property. This
              contemporary apartment is semi-furnished.
            </p>
            <Rate allowHalf disabled defaultValue={2.5} className="" />
          </div>
          <div className="lg:col-start-4 col-end-5 col-start-1 ml-5 ">
            <Button
              isIconOnly
              className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
              radius="full"
              variant="light"
              onPress={() => setLiked((v) => !v)}
            >
              <HeartIcon
                className={liked ? "[&>path]:stroke-transparent" : ""}
                fill={liked ? "currentColor" : "none"}
              />
            </Button>
            <p className="text-small text-foreground/80">12 Tracks</p>
          </div>
          <div className="lg:col-start-5 col-end-6 col-start-1 bg-blue-400 h-full rounded-md ml-5 p-5  bg-opacity-50">
            <center>
              <h1 className="font-semibold text-foreground/90 mb-3">
                ₹ 1.2 Lac{" "}
              </h1>
            </center>
            <Button
              radius="full"
              className="bg-red-600 text-white font-bold text-md shadow-lg"
            >
              Contact Seller
            </Button>
            <br />
            <center>
              {" "}
              <Button
                color="primary"
                variant="ghost"
                className="items-center m-3"
              >
                Buy
              </Button>
            </center>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
