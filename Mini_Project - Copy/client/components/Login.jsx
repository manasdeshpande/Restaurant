"use client";

import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "@/context/auth";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [auth, setAuth] = useAuth();
  const router = useRouter()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Perform validation
      const errors = {};

      if (!email) {
        errors.email = "Email is required";
      }

      if (!password) {
        errors.password = "Password is required";
      }

      setErrors(errors);
      const res = await axios.post(
        "http://localhost:8080/api/v1/authorization/login",
        {
          email,
          password,
        }
      );
      if (res && res.data.success) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
          id: res.data.id,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        console.log("login successful", res.data);
        router.push('/')
      } else {
        console.log("Invalid Credentials");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex mt-10 lg:mt-16 min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-[4rem] lg:text-[5rem] font-thin text-center font-title text-white select-none">Elysium</h1>
          <h2 className="mt-3 text-center text-2xl lg:text-4xl font-medium leading-9 tracking-tight text-white font-navlinks">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-base font-medium leading-6 text-white"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-grey-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-base font-medium leading-6 text-white"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-white hover:text-white"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-grey-600 sm:text-sm sm:leading-6"
                />
                                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center px-2 focus:outline-none"
                >
                  {showPassword ? (<><VisibilityIcon/></>) : (<><VisibilityOffIcon/></>)}
                </button>
              </div>
            </div>

            <div className="flex justify-center space-x-20">
            <Link href="./register" passHref>
                <button
                  type="submit"
                  className="flex justify-center w-[7em] rounded-lg bg-white px-3 py-2 text-lg font-medium leading-6 text-black shadow-sm hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                >
                  Register
                </button>
              </Link>
              <button
                type="submit"
                className="flex justify-center w-[7em] rounded-lg bg-white px-3 py-2 text-lg font-medium leading-6 text-black shadow-sm hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                onClick={handleSubmit}
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
