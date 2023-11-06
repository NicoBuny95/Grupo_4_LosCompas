import React, { useState } from "react";
import a from "../../images/barra-de-menus.png";
import b from "../../images/carrito.png";
import c from "../../images/perfil.png";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="flex flex-wrap max-w-full items-center justify-between mx-auto p-4">
        <div className="flex items-center w-full justify-between">
          <div>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center p-1   justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-expanded={isMenuOpen ? "true" : "false"}
            >
              <img src={a} alt="" className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center">
            <Link to={"/"}>
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8 mr-3"
              alt="Flowbite Logo"
              />
              </Link>
          </div>
          <SearchBar />
          <Link to={"/cart"}>
            <img src={b} alt="carrito" className="w-7" />
          </Link>
          <Link to={"/perfil"}>
            <img src={c} alt="perfil" className="w-7" />
          </Link>
        </div>
        <div
          className={`flex relative left-4 w-full ${
            isMenuOpen ? "" : "hidden"
          }`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50">
            <li>
              <Link
                to={"/"}
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                Home
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover-bg-gray-700"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover-bg-gray-700"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
