import { useState, useEffect } from "react";
import axios from "../axios.js";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../contexts/GlobalContext";
import { Layout } from "../components/Layout";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Switch,
  Input,
  Button,
  Textarea,
  Tabs,
  Tab,
  Spacer,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { toast } from "react-hot-toast";

const initialForm = {
  title: "",
  image: "",
  description: "",
  price: "",
  location: "",
  size: "",
};
import PropertyForm from "../components/PropertyForm.jsx";
import QrCode from "../components/QrCode.jsx";
import StatsTable from "../components/Stats.jsx";
import StatisticsChart from "../components/Chart.jsx";
import { MdArrowUpward } from "react-icons/md";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [propertyList, setPropertyList] = useState();
  const navigateTo = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSumbmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log(form);
      const res = await axios.post("/api/v1/properties/Add", form);
      const result = res.data;
      console.log(result);
      setIsLoading(false);
      toast.success("Property added successfully");
    } catch (error) {
      setIsLoading(false);
      toast.error("Error adding property");
    }
  };

  const deleteProperty = async (id) => {
    setIsLoading(true);

    try {
      // console.log(form);
      const res = await axios.delete(`/api/v1/properties/delete/${id}`);
      const result = res.data;
      console.log(result);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const updateProperty = async (id) => {
    setIsLoading(true);

    try {
      // console.log(form);
      const res = await axios.put(`/api/v1/properties/update/${id}`);
      const result = res.data;
      console.log(result);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const res = await axios.get("/api/v1/properties/fetch/user");
        setPropertyList(res.data);
        console.log(res.data);
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
  }, [setIsLoading]);

  return (
    <Layout>
      <div className="m-2 text-2xl text-center">Dashboard - seller</div>
      {/* add property */}
      <div className="flex px-5">
        <div className="w-[20%] flex flex-col items-center">
          <Dropdown>
            <DropdownTrigger>
              <Button className="w-full mb-5 font-bold" color="success">
                Showing Performance of xyz{" "}
                <IoMdArrowDropdownCircle className="inline-block" size={30} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="new">New file</DropdownItem>
              <DropdownItem key="copy">Copy link</DropdownItem>
              <DropdownItem key="edit">Edit file</DropdownItem>
              <DropdownItem key="delete" className="text-danger" color="danger">
                Delete file
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <QrCode />
          <PropertyForm
            form={form}
            handleChange={handleChange}
            handleSumbmit={handleSumbmit}
            isLoading={isLoading}
          />
          <div className="m-4">
            <StatsTable />
          </div>
        </div>
        <div className="w-[85%] px-5 m-0">
          <div className="rounded-lg bg-[#212121] px-10 py-4">
            <div className="flex justify-between items-center">
              <p className="text-white text-xl font-bold">Total Sales</p>
              <p>
                <div className="flex w-full">
                  <Tabs aria-label="Options">
                    <Tab key="Week" title="Week"></Tab>
                    <Tab key="Month" title="Month"></Tab>
                    <Tab key="Year" title="Year"></Tab>
                  </Tabs>
                  <Spacer x={10} />
                  <select className="bg-[#212121] text-white text-sm font-medium">
                    <option>Week</option>
                    <option>Week</option>
                    <option>Week</option>
                  </select>
                </div>
              </p>
            </div>
            <div className="flex justify-between items-center text-center">
              <p className="text-[#25C07F] text-[40px] font-bold">500</p>
              <p className="text-[#25C07F] text-[20px] flex items-baseline justify-start relative">
                54% <MdArrowUpward className="absolute bottom-[5px] left-10" />
              </p>
            </div>
            <p className="text-white text-sm font-medium">QR SCANS OVER TIME</p>
            <StatisticsChart />
          </div>
          <div className="flex flex-wrap justify-between ">
            {propertyList?.fetchProp?.map((item, index) => {
              console.log(item);
              return (
                <div className="flex m-5" key={index}>
                  <Card
                    isFooterBlurred
                    className="w-[300px] h-[300px] col-span-12 sm:col-span-7"
                  >
                    <CardHeader className="absolute z-10 flex-col items-start top-1">
                      <p className="font-bold uppercase text-tiny text-white/60">
                        {item.location}
                      </p>
                      <h4 className="text-xl font-medium text-white/90">
                        {item.title}
                      </h4>
                    </CardHeader>
                    <Image
                      removeWrapper
                      alt="Relaxing app background"
                      className="z-0 object-cover w-full h-full"
                      src={item?.image}
                    />
                    <CardFooter className="absolute bottom-0 z-10 bg-black/40 border-t-1 border-default-600 dark:border-default-100">
                      <div className="flex items-center flex-grow gap-2">
                        <Image
                          alt="Breathing app icon"
                          className="w-10 bg-black rounded-full h-11"
                          src={item?.image}
                        />
                        <div className="flex flex-col">
                          <p className="text-tiny text-white/60">
                            {item.title}
                          </p>
                          <p className="text-tiny text-white/60">
                            {item.location}
                          </p>
                        </div>
                      </div>
                      <Button
                        color="danger"
                        radius="full"
                        size="sm"
                        onClick={() =>
                          toast.promise(deleteProperty(item._id), {
                            loading: "Deleting...",
                            success: "Deleted successfully",
                            error: "Error deleting property",
                          })
                        }
                      >
                        Delete Property
                      </Button>

                      <Button color="primary" radius="full" size="sm">
                        Update
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* User created properties */}

      {/* update property */}
    </Layout>
  );
};

export default Dashboard;
