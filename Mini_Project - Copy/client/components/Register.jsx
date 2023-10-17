"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Register = () => {
  const router = useRouter();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [address, setAddress] = useState({
    building: "",
    sector: "",
    town: "",
    city: "",
    pin: "",
  });
  const [errors, setErrors] = useState({});

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const errors = {};

      if (!email) {
        errors.email = "Email is required";
      }

      if (!password) {
        errors.password = "Password is required";
      }

      setErrors(errors);
      const res = await axios.post(
        "http://localhost:8080/api/v1/authorization/register",
        {
          firstname,
          lastname,
          email,
          password,
          phone,
        }
      );
      if (res && res.data.success) {
        console.log("Successful register");
        router.push("/profile/login");
      } else {
        console.log("Error in registering");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };
  return (
    <>
      <div className="flex mt-10 lg:mt-14 min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="text-[4rem] lg:text-[5rem] font-thin text-center font-title text-white select-none">
            Elysium
          </h1>
          <h2 className="mt-3 text-center text-2xl lg:text-4xl font-medium leading-9 tracking-tight text-white font-navlinks">
            Register your account
          </h2>
        </div>

        <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div className="flex space-x-4">
              <div className="flex-1">
                <label
                  htmlFor="firstname"
                  className="block text-base font-medium leading-6 text-white"
                >
                  First Name
                </label>
                <input
                  id="firstname"
                  name="firstname"
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="lastname"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Last Name
                </label>
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium  text-white"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-base font-medium text-white"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
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

            <div>
              <label
                htmlFor="phone"
                className="block text-base font-medium text-white"
              >
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
            </div>

            {/*<div className="flex space-x-4">
              <div className="flex-1">
                <label
                  htmlFor="building"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Building
                </label>
                <input
                  id="building"
                  name="building"
                  type="text"
                  value={address.building}
                  onChange={handleAddressChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="sector"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Sector
                </label>
                <input
                  id="sector"
                  name="sector"
                  type="text"
                  value={address.sector}
                  onChange={handleAddressChange}
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>*/}

            <div className="flex justify-center space-x-20">
              <Link href="./login" passHref>
                <button className="flex justify-center w-[7em] rounded-lg bg-white px-3 py-2 text-lg font-medium leading-6 text-black shadow-sm hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                  Sign In
                </button>
              </Link>
              <button
                type="submit"
                className="flex justify-center w-[7em] rounded-lg bg-white px-3 py-2 text-lg font-medium leading-6 text-black shadow-sm hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                onClick={handleSubmit}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;


