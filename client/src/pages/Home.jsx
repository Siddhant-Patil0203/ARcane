import { useState, useEffect, use } from "react";
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
import { Layout } from "../components/Layout";
import axios from "../axios";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
// import BottomHome from "../components/BottomHome";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { Chip } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import Filter from "../components/Filter";
import { ImCalendar, ImCross, ImLocation } from "react-icons/im";

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

  const addToFav = async (id) => {
    // setIsLoading(true);

    console.log(id);
    try {
      const res = await axios.post(`/api/v1/fav/addFav/${id}`);
      const result = res.data;
      console.log(result);
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
  const userLocation = "Raipur";
  console.log(data);
  if (data) {
    const amount = ethers.utils.formatUnits(data[2], 0);
    console.log(amount);
  }

  return (
    <Layout>
      <p className="font-bold text-xl m-9 ">Recommended Houses </p>
      <div className="flex flex-row m-9 lg:justify-start justify-center overflow-x-auto space-x-5">
        {propertyList?.fetchProp?.map((item, index) => {
          return (
            <div key={index} className="mx-2 mb-10 w-1/3">
              {item?.location == userLocation ? (
                <Card
                  isBlurred
                  className=" min-w-[300px] border-none bg-background/60 dark:bg-default-100/50 "
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
                            color="danger"
                            variant="shadow"
                            className="w-[100px]"
                            onClick={() => addToFav(item._id)}
                          >
                            add to fav
                          </Button>
                        </div>

                        <div className="flex flex-col gap-1 mt-3">
                          <p> {`${item?.price} .00 /-`}</p>
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
              ) : null}
            </div>
          );
        })}
      </div>
      <p className="font-bold text-xl m-9 ">Houses Around {userLocation} </p>
      <div className="flex flex-row m-9 lg:justify-start justify-center overflow-x-auto space-x-5">
        {propertyList?.fetchProp?.map((item, index) => {
          return (
            <div key={index} className="mx-2 mb-10 w-1/3">
              {item?.location == userLocation ? (
                <Card
                  isBlurred
                  className=" min-w-[300px] border-none bg-background/60 dark:bg-default-100/50 "
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
                            color="danger"
                            variant="shadow"
                            className="w-[100px]"
                            onClick={() => addToFav(item._id)}
                          >
                            add to fav
                          </Button>
                        </div>

                        <div className="flex flex-col gap-1 mt-3">
                          <p> {`${item?.price} .00 /-`}</p>
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
              ) : (
                <></>
              )}
            </div>
          );
        })}
      </div>
      {isLoading ? <Loader width="500px" height="250px" /> : null}
      <Filter>
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
                          color="danger"
                          variant="shadow"
                          className="w-[100px]"
                          onClick={() => addToFav(item._id)}
                        >
                          add to fav
                        </Button>
                      </div>

                      <div className="flex flex-col gap-1 mt-3">
                        <p> {`${item?.price} .00 /-`}</p>
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
      </Filter>
    </Layout>
  );
};

export default Home;
