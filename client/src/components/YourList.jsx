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

const YourList = () => {
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
      const res = await axios.delete(`/api/v1/fav/remFav/${id}`);
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
        const res = await axios.get("/api/v1/fav/getFav");
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
      <div className="m-2 text-2xl text-center">Your Favourite</div>
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
                  Remove Favourite 
                </Button>

                {/* <Link to="/dashboard/seller/update" state={{ item }}> */}
                  {/* <Button color="primary" radius="full" size="sm"> */}
                    {/* Update */}
                  {/* </Button> */}
                {/* </Link> */}
              </CardFooter>
            </Card>
          </div>
        );
      })}

    </Layout>
  );
};

export default YourList;
