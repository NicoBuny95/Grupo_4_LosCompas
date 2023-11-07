import React, { useState } from "react";
import a from "../../images/barra-de-menus.png";
import b from "../../images/carrito.png";
import c from "../../images/perfil.png";
import SearchBar from "./SearchBar";
import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  const path = useLocation().pathname;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="flex flex-wrap max-w-full items-center justify-between mx-auto p-3 h-20">
        <div className="flex items-center w-full justify-between">
          <div className="flex">
            <Link to={"/"}>
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="h-8 mr-3"
                alt="Flowbite Logo"
              />
            </Link>
            <div
              className="inline-flex items-center p-1 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover-bg-gray-700"
              onMouseEnter={() => setIsMenuOpen(true)}
              onMouseLeave={() => setIsMenuOpen(false)}
            >
              <img src={a} alt="" className="w-6 h-6" />
            </div>
          </div>
          <div className="md:w-full justify-center items-center hidden sm:flex">
            {path !== "/login" && <SearchBar />}
          </div>
          <div className="flex">
            <Link to={"/carrito"}>
              <img src={b} alt="carrito" className="w-7 m-1" />
            </Link>
            <Link to={"/login"}>
              <img src={c} alt="perfil" className="w-7 m-1" />
            </Link>
          </div>
        </div>
        <div
          className={`flex relative left-4 w-full ${
            isMenuOpen ? "" : "hidden"
          }`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50">
            <li className="sm:hidden">
              <SearchBar />
            </li>
            <li>
              <Link
                to={"/"}
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover-bg-gray-700"
              >
                Home
              </Link>
            </li>
            <li>
              <Link className="block py-2 pl-3 pr-4 text-gray-900 rounded hover-bg-gray-700">
                About
              </Link>
            </li>
            <li>
              <Link className="block py-2 pl-3 pr-4 text-gray-900 rounded hover-bg-gray-700">
                Services
              </Link>
            </li>
            <li>
              <Link className="block py-2 pl-3 pr-4 text-gray-900 rounded hover-bg-gray-700">
                Pricing
              </Link>
            </li>
            <li>
              <Link className="block py-2 pl-3 pr-4 text-gray-900 rounded hover-bg-gray-700">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
