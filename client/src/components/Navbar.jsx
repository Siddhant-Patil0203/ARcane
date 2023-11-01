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

export default function App() {
  const { theme, setTheme } = useTheme();
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
