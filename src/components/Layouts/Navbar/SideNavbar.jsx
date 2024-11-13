import Link from "next/link";
import React, { Children } from "react";

const SideNavbar = ({ to, children, text, toggle }) => {
    const navLinkStyles = ({ isActive }) => {
        return {
            backgroundColor: isActive ? "#14112E" : "",
            color: isActive ? "#ffffff" : "#ffffff",
            fontWeight: isActive ? "bold" : "",
        };
    };
    return (
        <Link
            className={`w-full flex flex-row ${!toggle ? "justify-center" : "justify-start"
                } items-center gap-x-2 p-4 rounded-lg cursor-pointer hover:bg-white/20 transition-all duration-150 `}
            href="#"
        >
            {/* {children} */}
            asd
            {/* <label className={`${!toggle ? "hidden" : ""} text-lg`}>{text}</label> */}
        </Link>
    );
};

export default SideNavbar;
