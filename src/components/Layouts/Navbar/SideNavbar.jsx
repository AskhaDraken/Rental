import React, { useState } from 'react'
import FragmentSidebar from '../../../components/Fragments/Fragment-Sidebar.jsx';
import ButtonProfil from '../../../components/Elements/Button/Button-Profil.jsx';
import LogoBar from '../../../components/Elements/Logo/Logo-Bar.jsx';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { Outlet } from 'react-router-dom';
import Link from 'next/link.js';
import { usePostLogout } from '@/features/auth.js';

const Sidebar = () => {
    const [isToggle, setToggle] = useState(true)

    return (
        // <div className='fixed '>
        //     <div className='flex flex-row items-start text-black'>
        //         <div className='flex w-fit h-screen'>
        //             <div className={`${isToggle ? "w-64" : "w-fit"} h-full flex justify-center p-4 transition-all duration-500 relative bg-third`}>
        //                 <div className={`flex-1 flex-col items-start ${isToggle ? "" : "translate-y-6"} transition-transform duration-500 delay-150`}>
        //                     <LogoBar toggle={isToggle} />
        //                     <FragmentSidebar toggle={isToggle} />
        //                     <ButtonProfil toggle={isToggle} />
        //                 </div>
        //                 <div className={`absolute transition-transform  duration-300 translate-y-1 bg-third border-4 border-white flex justify-center items-center -right-5 w-10 h-10 rounded-full cursor-pointer`}
        //                     onClick={() => setToggle(!isToggle)}
        //                 >
        //                     <BiChevronRight className={`${isToggle ? "rotate-180" : ""} text-3xl transition-all text-white  duration-300`} />
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <aside className='fixed min-w-64 min-h-screen bg-third'>
            <nav className='flex flex-col p-4'>
                <div className='flex flex-col w-full space-y-4'>
                    <Link className='font-semibold text-secondary btn w-full' href="/dashboard">Dashboard</Link>
                    <Link className='font-semibold text-secondary btn w-full' href="/management">Management</Link>
                    <Link className='font-semibold text-secondary btn w-full' href="/transaksi">Transaksi</Link>
                    <Link className='font-semibold text-secondary btn w-full' href="/riwayat">Riwayat</Link>
                    <Link className='font-semibold text-secondary btn w-full' href="/profil">Profil</Link>
                    <button className='btn btn-error text-white' onClick={usePostLogout}>Kaluar</button>
                </div>
            </nav>
        </aside>
    )
}

export default Sidebar