import Link from "next/link";
// import React, { Children } from "react";

const SideNavbar = () => {
    return (
        <aside className="fixed top-0 left-0 h-screen w-64 block place-items-center shadow p-4 bg-white space-y-4">
            <div className="w-full">
                <figure className="max-w-52">
                    <img src="/logo.png" alt="" />
                </figure>
            </div>
            <nav className="w-full">
                <ul className="block space-y-2">
                    <h1 className="text-3xl font-Slackey">ETERNITY</h1>
                    <Link href="#" className="">Dashboard</Link>
                    <Link href="#" className="">Management</Link>
                    <Link href="#" className="">Game</Link>
                    <Link href="#" className="">Booking</Link>
                </ul>
            </nav>
        </aside>
    );
};

export default SideNavbar;
