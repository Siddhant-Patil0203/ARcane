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
} from "@nextui-org/react";

const initialForm = {
  title: "",
  image: "",
  description: "",
  price: "",
  location: "",
  size: "",
};
import Filter from "../components/Filter";
import { ImQrcode } from "react-icons/im";

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
    } catch (error) {
      setIsLoading(false);
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
      <div>
        <form
          className="space-y-6"
          action="#"
          method="POST"
          onSubmit={handleSumbmit}
        >
          <Input
            type="text"
            label="title"
            name="title"
            id="title"
            value={form.title}
            onChange={handleChange}
            isRequired
            variant="underlined"
            className="m-3 w-[300px]"
          />
          <Textarea
            label="Description"
            labelPlacement="inside"
            placeholder="Enter your Property description"
            name="description"
            id="description"
            value={form.description}
            onChange={handleChange}
            className="m-3 w-[300px]"
          />
          <Input
            type="text"
            label="image"
            name="image"
            id="image"
            value={form.image}
            onChange={handleChange}
            isRequired
            variant="underlined"
            className="m-3 w-[300px]"
          />
          <Input
            type="text"
            label="location"
            name="location"
            id="location"
            value={form.location}
            onChange={handleChange}
            isRequired
            variant="underlined"
            className="m-3 w-[300px]"
          />
          <Input
            type="text"
            label="size"
            name="size"
            id="size"
            value={form.size}
            onChange={handleChange}
            isRequired
            variant="underlined"
            className="m-3 w-[300px]"
          />
          <Button
            type="submit"
            className="flex m-2 "
            color="primary"
            variant="shadow"
            isLoading={isLoading}
          >
            Add Property
          </Button>
        </form>
      </div>

      {/* User created properties */}
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
                    <p className="text-tiny text-white/60">{item.title}</p>
                    <p className="text-tiny text-white/60">{item.location}</p>
                  </div>
                </div>
                <Button
                  color="danger"
                  radius="full"
                  size="sm"
                  onClick={() => deleteProperty(item._id)}
                >
                  Delete Property
                </Button>

                <Link to="/dashboard/seller/update" state={{ item }}>
                  {/* <Button color="primary" radius="full" size="sm"> */}
                    Update
                  {/* </Button> */}
                </Link>
              </CardFooter>
            </Card>
          </div>
        );
      })}

      {/* update property */}
    </Layout>
  );
};

export default Dashboard;
