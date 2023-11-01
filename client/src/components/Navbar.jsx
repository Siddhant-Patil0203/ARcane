import React from "react";
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
  return (
    <Navbar isBordered className="">
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
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
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
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
