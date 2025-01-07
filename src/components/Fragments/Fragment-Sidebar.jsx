import React from "react";
import { GoHome } from "react-icons/go";
import { VscHistory } from "react-icons/vsc";
import { IoBarChartOutline, IoGameControllerOutline } from "react-icons/io5";
import { TbBrandBooking } from "react-icons/tb";
import ElementSidebar from "../Elements/NavLink/Element-Sidebar";

const FragmentSidebar = (props) => {
    const {toggle} = props
    return (
        <div className="flex flex-col gap-y-4 translate-y-7 items-start">
            <ElementSidebar to="/dashboard" text="Dashboard" toggle={toggle}>
                <GoHome size={24} color="white" />
            </ElementSidebar>

            <ElementSidebar to="/management" text="Management" toggle={toggle}>
                <IoBarChartOutline size={24} color="white" />
            </ElementSidebar>

            <ElementSidebar to="/game" text="Game" toggle={toggle}>
                <IoGameControllerOutline size={24} color="white" />
            </ElementSidebar>

            <ElementSidebar to="/booking" text="Booking" toggle={toggle}>
                <TbBrandBooking size={24} color="white" />
            </ElementSidebar>
        </div>
    );
};

export default FragmentSidebar;