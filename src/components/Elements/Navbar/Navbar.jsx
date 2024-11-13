import { NavLink } from "react-router-dom";
import Profile from "../assets/Photo.jpeg";
import { useState } from "react";
import MenuNavbar from "./Menu-Navbar";
import { CiMenuBurger } from "react-icons/ci";
import NAVLINK from "../components/Elements/NavLink/NAVLINK";
import link from "../components/Elements/NavLink";
import ButtonProfil from "../components/Elements/Button/Button-Profil";
import FragNavbar from "../components/Fragments/Fragment-Navbar";

const Navbar = () => {
  //untuk navbar samping saat ukurannya kecil
  const [active, setActive] = useState(false);
  const showMenu = () => {
    setActive(!active);
  };

  //style saat kodingannya Aktif
  const NavLinkStyles = ({ isActive }) => {
    return {
      backgroundColor: isActive ? "#FFFFFF" : "",
      color: isActive ? "#197031" : "#ffffff",
      fontWeight: isActive ? "bold" : "",
    };
  };

  return (
    <div className="justify-center items-center w-full mt-5 flex fixed">
      <div className="flex items-center p-2 rounded-md text-white-[90%]  w-[95%] bg-gradient-to-r from-primary to-secondary fix z-20">
        <div className="container ">
          <div className="flex justify-between items-center">
            <div className="relative md:hidden scale-150">
              <CiMenuBurger
                className="text-white scale-150 cursor-pointer"
                onClick={showMenu}
              />
            </div>

            {/* ini untuk logo website */}
            <h1 className="xl:text-4xl md:text-2xl text-2xl font-bold font-body uppercase ">
              Eternity
            </h1>
            <FragNavbar/>
            <ButtonProfil/>
          </div>
          <MenuNavbar showMenu={showMenu} active={active} />
        </div>
        {/* icon tombol navbar samping saat layarnya kecil */}
      </div>
    </div>
  );
};

export default Navbar;
