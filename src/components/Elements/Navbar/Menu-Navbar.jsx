import { IoCloseOutline } from "react-icons/io5";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import NAVLINK from "../components/Elements/NavLink/NAVLINK";

const MenuNavbar = ({ showMenu, active }) => {
  //Style Navbar saat Active
  const NavStyles = ({ isActive }) => {
    return {
      backgroundColor: isActive ? "#FFFFFF" : "",
      color: isActive ? "#197031" : "#ffffff",
      fontWeight: isActive ? "bold" : "",
    };
  };

  return (
    <div>
      <ul
        className={
          active
            ? "flex-col flex left-1/4 fixed uppercase p-8 backdrop-blur-lg gap-8 bg-black/20 inset-0  md:hidden"
            : "hidden"
        }
      >
        <div className="hover:bg-white/30 rounded-md w-fit h-fit p-1 ">
          <IoCloseOutline
            className="text-white hover:text-primary text-3xl"
            onClick={showMenu}
          />
        </div>
        <div className="flex flex-col items-center gap-16 text-2xl">
          <NAVLINK to="/" text="Dashboard" />
          <NAVLINK to="/pemesanan" text="Pemesanan" />
          <NAVLINK to="/pemesanan" text="Pemesanan" />
          <NAVLINK to="/riwayat" text="Riwayat" />
        </div>
      </ul>
    </div>
  );
};

export default MenuNavbar;
