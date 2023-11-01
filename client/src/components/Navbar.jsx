import React from "react";
import { useTheme } from "next-themes";

import {
  Navbar,
  Switch,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { MoonIcon } from "../components/MoonIcon";
import { SunIcon } from "../components/SunIcon";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useEffect, useState } from "react";
import { RiLogoutCircleLine } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import Loader from "../components/Loader";
import axios from "../axios";

export default function App() {
  const { theme, setTheme } = useTheme();
  const navigateTo = useNavigate();
  const { user, setUser } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(user);
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
  return (
    <Navbar isBordered className="">
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand className="mr-4">
          <p className="hidden sm:block font-bold text-inherit">ARcane</p>
        </NavbarBrand>
        <NavbarItem>
          <Link color="foreground" href="#">
            Buy
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Sell
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            About
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button
            onClick={logout}
            className="flex m-2"
            color="danger"
            variant="bordered"
            startContent={<RiLogoutCircleLine />}
          >
            logout
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            onClick={deleteUser}
            className="flex m-2"
            color="danger"
            variant="shadow"
            startContent={<MdDeleteOutline />}
          >
            Delete Account        
          </Button>
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
      </NavbarContent>
    </Navbar>
  );
}
