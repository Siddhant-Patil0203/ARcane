import { useEffect, useState } from "react";
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
import { Toaster, toast } from "react-hot-toast";
import Navbar from "../components/Navbar";

const initialForm = {
  email: "",
  password: "",
};

const Login = () => {
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
        const res = await axios.post("/user/signin", form);
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

    window.location.href = "http://locolhost:5000/auth/google";
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

      <div className="w-screen h-screen">
        <div className="flex flex-col justify-center px-6 py-5 mx-5 lg:mx-0 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
            <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-white ">
            <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center  dark:text-white">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={handleSumbmit}
            >
              <Input
                label="Email"
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                isInvalid={errors.email ? true : false}
                isRequired

                //   onChange={(e) => setUser({ ...user, email: e.target.value })}
              />

              <Input
                id="password"
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={form.password}
                onChange={handleChange}
                isInvalid={errors.password ? true : false}
                isRequired
              />

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-[#25C07F] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#399770] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                  // onClick={onSignup}
                >
                  Log in
                </button>
                <Button
                  onClick={googleSignin}
                  className="flex w-full mt-3"
                  color="primary"
                  radius="sm"
                  // variant="shadow"
                  isLoading={isLoading}
                  startContent={<ImGoogle />}
                >
                  Sign in with Google
                </Button>
                {serverMsg && (
                  <div className="p-1 m-2 text-red-500">{serverMsg}</div>
                )}
              </div>
            </form>
            <div className="flex mt-5 ">
              New User ? {"  "}
              <Link to="/register" className="text-primary">
                <center>&nbsp; Signup</center>
              </Link>
            </div>
          </div>
        </div>{" "}
        <div>
          <Toaster />
        </div>
      </div>
    </>
  );
};

export default Login;
