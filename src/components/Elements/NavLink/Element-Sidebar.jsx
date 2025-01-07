import Link from "next/link";
import React, { Children } from "react";
// import { NavLink } from "react-router-dom";

const ElementSidebar = ({ to, children, text, toggle }) => {
  const navLinkStyles = ({ isActive }) => {
    return {
      backgroundColor: isActive ? "#14112E" : "",
      color: isActive ? "#ffffff" : "#ffffff",
      fontWeight: isActive ? "bold" : "",
    };
  };
  return (
    <Link href={to} className="w-full">
      <div className="inline-flex gap-4 items-center p-4 hover:bg-white rounded-md w-full ">
      {children}
      <h3 className="text-base font-semibold text-white hover:text-black">{text}</h3>
      </div>
      
    </Link>
  );
};

export default ElementSidebar;
