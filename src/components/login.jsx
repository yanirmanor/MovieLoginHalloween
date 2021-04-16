import React, { useState } from "react";
import PumpkinIcon from "../assets/pumpkin.svg";

export const Login = ({ send }) => {
  const [loginFrm, setLoginFrm] = useState({
    username: "freddy",
    password: "ElmStreet2019",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    send({ type: "LOGIN", data: loginFrm });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setLoginFrm((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap items-center flex-col">
        <div className="mt-10 w-6/12 sm:w-4/12 px-4">
          <img
            className="shadow-lg rounded-full max-w-full h-auto align-middle border-none"
            src={PumpkinIcon}
            alt="Pumpkin"
          />
        </div>
        <div className="mt-5 w-6/12 sm:w-6/12 text-2xl text-center font-bold uppercase tracking-widest">
          Welcome to Freddys Halloween candy shop
        </div>
      </div>
      <form className="m-8" onSubmit={handleSubmit}>
        <div className="m-8">
          <div className="flex justify-between items-center">
            <div className="text-sm font-bold text-gray-700 tracking-wide">
              User Name
            </div>
          </div>
          <input
            className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            placeholder="freddy"
            value={loginFrm.username}
            onChange={handleChange}
          ></input>
        </div>
        <div className="m-8">
          <div className="flex justify-between items-center">
            <div className="text-sm font-bold text-gray-700 tracking-wide">
              Password
            </div>
          </div>
          <input
            className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
            type="password"
            placeholder="Enter your password"
            value={loginFrm.password}
            onChange={handleChange}
          />
        </div>
        <div className="mx-8">
          <button
            value="submit"
            type="submit"
            className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                                shadow-lg"
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};
