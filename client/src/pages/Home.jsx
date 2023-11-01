import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useEffect, useState } from "react";

import { RiLogoutCircleLine } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";

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
import { MoonIcon } from "../components/MoonIcon";
import { SunIcon } from "../components/SunIcon";

import {
  ConnectWallet,
  Web3Button,
  useAddress,
  useContract,
  useContractRead,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const Home = () => {
  const { theme, setTheme } = useTheme();
  const navigateTo = useNavigate();
  const { user, setUser, propertyList, setPropertyList } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);

  const getPropertyList = async () => {
    setIsLoading(true);

    try {
      const res = await axios.get("/api/v1/properties/fetch");
      setPropertyList(res.data);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPropertyList();
    console.log("useEffect is running");
    console.log(propertyList);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    navigateTo("/");
    setUser(null);
  };

  const deleteUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post("/user/delete");
      setIsLoading(false);
      logout();
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

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
      <div className="flex justify-between m-2">
        <div className="m-2 text-2xl text-center">Home</div>
        <User
          name={user.result.name}
          description={user.result.email}
          avatarProps={{
            src:
              (user && user.result.picture) ||
              "https://img.icons8.com/?size=256&id=kDoeg22e5jUY&format=png",
          }}
        />
        <div className="flex justify-between">
          <Switch
            defaultSelected
            size="lg"
            color="primary"
            thumbIcon={({ isSelected, className }) =>
              !isSelected ? (
                <SunIcon className={className} />
              ) : (
                <MoonIcon className={className} />
              )
            }
            onClick={() => {
              if (theme === "light") {
                setTheme("dark");
              } else if (theme === "dark") {
                setTheme("light");
              }
            }}
          />
          <Button
            onClick={logout}
            className="flex m-2"
            color="danger"
            variant="bordered"
            startContent={<RiLogoutCircleLine />}
          >
            logout
          </Button>
          <Button
            onClick={deleteUser}
            className="flex m-2"
            color="danger"
            variant="shadow"
            startContent={<MdDeleteOutline />}
          >
            Delete Account
          </Button>
        </div>
      </div>
      {propertyList.fetchprop.map((item, index) => (
        <div key={index}>
          <Card
            isFooterBlurred
            className="w-[300px] h-[300px] col-span-12 sm:col-span-5"
          >
            <CardHeader className="absolute z-10 flex-col items-start top-1">
              <p className="font-bold uppercase text-tiny text-black/60">
                {item[index].size}
              </p>
              <h4 className="text-2xl font-medium text-gray">{item[index].city}</h4>
            </CardHeader>

            <Image
              removeWrapper
              alt="Card example background"
              className="z-0 object-cover w-full h-full scale-125 -translate-y-6"
              src="https://images.unsplash.com/photo-1564078516393-cf04bd966897?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <CardFooter className="absolute bottom-0 z-10 justify-between bg-white/30 border-t-1 border-zinc-100/50">
              <div>
                <p className="text-black text-tiny">Available.</p>
                <p className="text-black text-tiny">Get notified.</p>
              </div>
              <Button
                onClick={() => navigateTo("/details")}
                className="text-tiny"
                color="primary"
                radius="full"
                size="sm"
              >
                Visit Home
              </Button>
            </CardFooter>
          </Card>
        </div>
      ))}
      <main className="main">
        <div className="container">
          <div className="header">
            <div className="connect">
              <ConnectWallet
                dropdownPosition={{
                  side: "bottom",
                  align: "center",
                }}
              />
            </div>
            {/* <input
            value={args}
            onChange={(value) => setArgs(value.target.value)}
          /> */}
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
              Buy
            </Web3Button>
          </div>
          <div className="content">
            <div className="card" style={{}}>
              {/* {laoading ? (
                  "Loading..."
                ) : (
                  <>
                    <div className="card__header">
                      <h2>Product Details :-</h2>
                    </div>
                    <div className="card__body">
                      <p>Amount :- {ethers.utils.formatUnits(data[3], 18)}</p>
                      <p>
                        Product Id :- {ethers.utils.formatUnits(data[2], 0)}
                      </p>
                      <p>Product seller :- {data[1]}</p>
                      <p>Product buyer :- {data[0]}</p>
                    </div>
                  </>
                )} */}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
