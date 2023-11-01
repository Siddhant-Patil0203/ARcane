import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Validator from "../contexts/Validator";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios.js";
import { useGlobalContext } from "../contexts/GlobalContext";

import { useTheme } from "next-themes";
import { Switch, Input, Button } from "@nextui-org/react";
import { MoonIcon } from "../components/MoonIcon";
import { SunIcon } from "../components/SunIcon";
import { ImGoogle } from "react-icons/im";

const initialForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const { theme, setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [serverMsg, setServerMsg] = useState("");
  const navigateTo = useNavigate();
  const { user, setUser } = useGlobalContext();

  useEffect(() => {
    console.log(user);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    const validationErrors = Validator({
      ...form,
      [e.target.name]: e.target.value,
    });
    setErrors(validationErrors);
  };

  const handleSumbmit = async (e) => {
    e.preventDefault();

    const validationErrors = Validator(form);
    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);

      try {
        const res = await axios.post("/user/signup", form);
        const result = res.data;
        localStorage.setItem("user", JSON.stringify({ ...result }));
        setUser(JSON.parse(localStorage.getItem("user")));

        setIsLoading(false);
        navigateTo("/");
      } catch (error) {
        setIsLoading(false);
        setServerMsg(
          error.response.data.message || "Server error please try again later"
        );
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const googleSignin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    window.location.href = "http://localhost:5000/auth/google";
  };
    //Google Auth Redirect
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");
    const userResult = queryParams.get("result");
    // console.log(token, userResult);
    if (token && userResult) {
      useEffect(() => {
        setIsLoading(true);
        const userG = {};
        userG.result = JSON.parse(userResult); // Parse the userResult JSON string into an object
        userG.token = token;
        localStorage.setItem("user", JSON.stringify(userG));
        setUser(JSON.parse(localStorage.getItem("user")));
        
        setIsLoading(false);
        navigateTo("/");
      }, []);
    }

  return (
    <>
      {isLoading ? <Loader width="500px" height="250px" /> : null}
      <div className="flex justify-between m-5 text-2xl text-center">
        Register
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
      </div>
      <form onSubmit={handleSumbmit}>
        <Input
          type="name"
          label="Name"
          name="name"
          id="name"
          value={form.name}
          onChange={handleChange}
          isInvalid={errors.name ? true : false}
          isRequired
          className="m-2 w-[300px]"
        />
        {errors.name && <div className="m-2 text-red-500">{errors.name}</div>}
        <Input
          type="email"
          label="Email"
          name="email"
          id="email"
          value={form.email}
          onChange={handleChange}
          isInvalid={errors.email ? true : false}
          isRequired
          className="m-2 w-[300px]"
        />
        {errors.email && <div className="m-2 text-red-500">{errors.email}</div>}
        <Input
          type="password"
          label="Password"
          name="password"
          id="password"
          value={form.password}
          onChange={handleChange}
          isInvalid={errors.password ? true : false}
          isRequired
          className="m-2 w-[300px]"
        />
        {errors.password && (
          <div className="p-1 m-2 text-red-500">{errors.password}</div>
        )}
        <Input
          type="password"
          label="Confirm Password"
          name="confirmPassword"
          id="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          isInvalid={errors.confirmPassword ? true : false}
          isRequired
          className="m-2 w-[300px]"
        />
        {errors.confirmPassword && (
          <div className="p-1 m-2 text-red-500">{errors.confirmPassword}</div>
        )}
        <Button
          type="submit"
          className="flex m-2 "
          color="primary"
          variant="shadow"
          isLoading={isLoading}
        >
          Sign up
        </Button>

        {serverMsg && <div className="p-1 m-2 text-red-500">{serverMsg}</div>}
      </form>

      <Button
        onClick={googleSignin}
        className="flex m-2"
        color="primary"
        variant="shadow"
        isLoading={isLoading}
        startContent={<ImGoogle />}
      >
        Sign in with Google
      </Button>
      <Link to="/login" className="p-2 m-2 text-primary">
        Login ?
      </Link>
    </>
  );
};

export default Register;
