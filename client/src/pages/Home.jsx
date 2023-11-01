import { useState } from "react";
import Loader from "../components/Loader";
import { Button, Card, CardBody, Image } from "@nextui-org/react";
import Navbar from "../components/Navbar";
import {
  Web3Button,
  useAddress,
  useContract,
  useContractRead,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { HeartIcon } from "../components/HeartIcon";

const Home = () => {
  const { theme, setTheme } = useTheme();
  const navigateTo = useNavigate();
  const { user, setUser, propertyList, setPropertyList } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const [liked, setLiked] = useState(false);

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
      <Navbar />
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
      <Card
        isFooterBlurred
        className="w-[300px] h-[300px] col-span-12 sm:col-span-5"
      >
        <CardHeader className="absolute z-10 flex-col items-start top-1">
          <p className="font-bold uppercase text-tiny text-black/60">2BHK</p>
          <h4 className="text-2xl font-medium text-gray">Nagpur</h4>
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
            disabled
          >
            Visit Home
          </Button>
        </CardFooter>
      </Card>
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

            <div className="flex flex-col col-span-6 md:col-span-8">
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-0">
                  <h3 className="font-semibold text-foreground/90">
                    Daily Mix
                  </h3>
                  <p className="text-small text-foreground/80">12 Tracks</p>
                  <h1 className="mt-2 font-medium text-large">
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

              <div className="flex flex-col gap-1 mt-3">
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
