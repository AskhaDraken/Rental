import { usePostLogout } from "@/features/auth";
import Link from "next/link";
// import React, { Children } from "react";

const SideNavbar = () => {
    return (
        <aside className="fixed top-0 left-0 h-screen w-64 block place-items-center shadow p-4 bg-primary space-y-4">
            <div className="w-full">
                <figure className="max-w-52">
                    <img src="/logo.png" alt="" />
                </figure>
            </div>
            <nav className="w-full h-full">
                <div className="flex flex-col space-y-4 text-white">
                    <h1 className="text-3xl font-Slackey">ETERNITY</h1>
                    <Link href="/dashboard" className="">Dashboard</Link>
                    <Link href="/management" className="">Management</Link>
                    <Link href="/game" className="">Game</Link>
                    <Link href="/booking" className="">Booking</Link>
                    <button className="btn btn-error text-white" onClick={usePostLogout}>Logout</button>
                </div>
            </nav>
        </aside>
    );
};

export default SideNavbar;
