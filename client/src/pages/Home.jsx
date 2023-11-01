import { useState, useEffect, Fragment } from "react";
import Loader from "../components/Loader";
import { Button, Card, CardBody, Image } from "@nextui-org/react";
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
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import Filter from "../components/Filter";

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];
const subCategories = [
  { name: "Totes", href: "#" },
  { name: "Backpacks", href: "#" },
  { name: "Travel Bags", href: "#" },
  { name: "Hip Bags", href: "#" },
  { name: "Laptop Sleeves", href: "#" },
];
const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White", checked: false },
      { value: "beige", label: "Beige", checked: false },
      { value: "blue", label: "Blue", checked: true },
      { value: "brown", label: "Brown", checked: false },
      { value: "green", label: "Green", checked: false },
      { value: "purple", label: "Purple", checked: false },
    ],
  },
  {
    id: "category",
    name: "Category",
    options: [
      { value: "new-arrivals", label: "New Arrivals", checked: false },
      { value: "sale", label: "Sale", checked: false },
      { value: "travel", label: "Travel", checked: true },
      { value: "organization", label: "Organization", checked: false },
      { value: "accessories", label: "Accessories", checked: false },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "2l", label: "2L", checked: false },
      { value: "6l", label: "6L", checked: false },
      { value: "12l", label: "12L", checked: false },
      { value: "18l", label: "18L", checked: false },
      { value: "20l", label: "20L", checked: false },
      { value: "40l", label: "40L", checked: true },
    ],
  },
];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

const Home = () => {
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
  console.log(data);
  if (data) {
    const amount = ethers.utils.formatUnits(data[2], 0);
    console.log(amount);
  }

  return (
    <Layout>
      {isLoading ? <Loader width="500px" height="250px" /> : null}
      <Filter>
        {[1, 2, 3, 4].map((item, index) => {
          return (
            <div key={index} className="mx-2 mb-10 ">
              {Cards(propertyList, setLiked, liked, address)}
            </div>
          );
        })}
      </Filter>
    </Layout>
  );
};

export default Home;
function Cards(propertyList, setLiked, liked, address) {
  return (
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
              src={propertyList?.fetchProp[14]?.image}
              width="100%"
            />
          </div>

            <div className="flex flex-col col-span-6 md:col-span-8">
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-0">
                  <h3 className="font-semibold text-foreground/90">
                    {console.log(propertyList)}
                    {propertyList?.fetchProp[14]?.title}
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
  );
}
