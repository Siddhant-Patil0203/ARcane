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
  DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar
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
import Logo from "../assets/logo.png";

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
      <NavbarBrand className="mr-4">
        <img src={Logo} className=" w-16 " />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
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

      <NavbarContent as="div" className="items-center" justify="end">
       
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
