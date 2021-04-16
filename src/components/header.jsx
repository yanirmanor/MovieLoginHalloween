import React from "react";
import { useToggle } from "../hooks/useToggle";

export const Header = ({ send }) => {
  const [isOn, setIsOn] = useToggle();

  return (
    <div className="flex justify-between items-center p-3 bg-yellow-500 font-bold uppercase tracking-widest text-white text-center">
      <div className="font-bold text-lg">Halloween candy shop</div>

      <div className="ml-3 relative">
        <div>
          <button
            type="button"
            className="bg-gray-800 flex text-sm rounded-full"
            id="user-menu"
            onClick={setIsOn}
            aria-expanded="false"
            aria-haspopup="true"
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="h-14 w-14 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </button>
        </div>

        <div
          className={`${
            isOn
              ? "visible translate-x-0 ease-out transition-medium"
              : "invisible -translate-x-20 ease-in transition-medium"
          } transform transition ease-in-out duration-200 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu"
        >
          <a
            href="#"
            onClick={() => send("LOGOUT")}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
          >
            Sign out
          </a>
        </div>
      </div>
    </div>
  );
};
