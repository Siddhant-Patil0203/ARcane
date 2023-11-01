import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import axios from "../axios";

import { useTheme } from "next-themes";

import {
  Switch,
  Button,
  User,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
} from "@nextui-org/react";
import Navbar from "../components/Navbar";

import {
  ConnectWallet,
  Web3Button,
  useAddress,
  useContract,
  useContractRead,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

import { HeartIcon } from "../components/HeartIcon";

const Home = () => {
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
      <Navbar />
      {isLoading ? <Loader width="500px" height="250px" /> : null}
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
                src="https://images.unsplash.com/photo-1564078516393-cf04bd966897?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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

              <div className="flex flex-col mt-3 gap-1">
                <div className="flex justify-between">
                  <p className="text-small">1:23</p>
                  <p className="text-small text-foreground/50">4:32</p>
                </div>
                <Web3Button
                  contractAddress={import.meta.env.VITE_CONTRACT_ADDRESS}
                  action={(contract) => {
                    contract.call("createTransaction", [
                      address,
                      12,
                      3000000000000000,
                    ]);
                  }}
                >
                  Buy Now
                </Web3Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default Home;
