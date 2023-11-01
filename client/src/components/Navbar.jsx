import React from "react";
import { useTheme } from "next-themes";


import {
  Navbar,
  Switch,
  NavbarBrand,
  NavbarContent,
  NavbarItem,

  Input,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useEffect, useState } from "react";
import { RiLogoutCircleLine } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import axios from "../axios";
import { User } from "@nextui-org/react";
import Logo from "../assets/logo(Short).png";
import { Link } from "react-router-dom";


export default function NavBar() {
  const MapboxAPIKey =
    "pk.eyJ1IjoiZGV2LXZpc2hhbCIsImEiOiJjbG52ejNqZWEwM2xyMmpvNjhneDNybjB5In0.vxw4utUDHbwyqJHgMr0Q4g";
  const { theme, setTheme } = useTheme();
  const navigateTo = useNavigate();
  const { user, setUser } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const { location, setLocation } = useTheme();

  useEffect(() => {
    // console.log(user);
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
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  function success(pos) {
    var crd = pos.coords;
    // console.log("Your current position is:");
    // console.log(`Latitude : ${crd.latitude}`);
    // console.log(`Longitude: ${crd.longitude}`);
  }

  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  const [cityName, setCityName] = useState("");
  useEffect(() => {
    const longitude = 21.2544841;
    const latitude = 81.6139649;
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          // console.log(result);
          if (result.state === "granted") {
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "prompt") {
            //If prompt then the user will be asked to give permission
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
        });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }

    // axios
    //   .get(
    //     `https://api.mapbox.com/geocoding/v5/mapbox.places/-73.989,40.733.json?access_token=pk.eyJ1Ijoic2lkZDAyMDMiLCJhIjoiY2xudnoxejQ2MDRtZjJqbnc3ejY3dWZ6bSJ9.sMTwpGbl-wpTEJRCAe6Qeg`,
    //   )
    //   .then((response) => {
    //     console.log("vishal bhauuuuu");
    //     const data = response.data;
    //     let cityFound = false;
    //     // console.log(data);

    //     for (const feature of data.features) {
    //       console.log("vishal bhauuuuu");
    //       if (feature.place_type.includes("city") && feature.text) {
    //         setCityName(feature.text);
    //         cityFound = true;
    //         console.log(cityName);
    //         break;
    //       }
    //     }

    //     if (!cityFound) {
    //       setCityName("City not found");
    //     } else {
    //       console.log("cityName");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching data from Mapbox API:", error);
    //   });
  }, []);
  return (
    <Navbar isBordered className="">
      <NavbarBrand className="mr-4 space-x-3">
        <img src={Logo} className=" w-9" />
        <p className="hidden font-bold sm:block text-inherit ">ARcane</p>
      </NavbarBrand>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Buy
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" color="foreground" aria-current="page">
            Rent
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" color="foreground" aria-current="page">
            Sell
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            About
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
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
        </NavbarItem>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <NavbarItem>
              <User
                name={user.result.name}
                description={user.result.email}
                avatarProps={{
                  src:
                    (user && user.result.picture) ||
                    "https://img.icons8.com/?size=256&id=kDoeg22e5jUY&format=png",
                }}
              />
            </NavbarItem>
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="gap-2 h-14">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{user.result.email}</p>
            </DropdownItem>
            <DropdownItem key="settings"><Link to="/dashboard/seller">My Dashboard</Link></DropdownItem>
            <DropdownItem key="configurations"> <Link to="/user/favourites">Favourites</Link></DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              <Button
                onClick={logout}
                className="flex "
                color="danger"
                variant="bordered"
                startContent={<RiLogoutCircleLine />}
              >
                logout
              </Button>
            </DropdownItem>
            <DropdownItem>
              <Button
                onClick={deleteUser}
                className="flex mt-3"
                color="danger"
                variant="shadow"
                startContent={<MdDeleteOutline />}
              >
               Delete Account
              </Button>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Input
          type="location"
          placeholder="Get Your Location"
          labelPlacement="outside"
          variant="bordered"
          color="success"
          startContent={
            <img
              className="w-4"
              src="https://static.vecteezy.com/system/resources/thumbnails/009/385/892/small/pin-location-icon-sign-free-png.png"
            />
          }
        />
              
      </NavbarContent>
    </Navbar>
  );
}
