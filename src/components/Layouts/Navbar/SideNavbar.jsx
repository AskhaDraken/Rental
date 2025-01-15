import React, { useState } from 'react'
import FragmentSidebar from '../../../components/Fragments/Fragment-Sidebar.jsx';
import ButtonProfil from '../../../components/Elements/Button/Button-Profil.jsx';
import LogoBar from '../../../components/Elements/Logo/Logo-Bar.jsx';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { Outlet } from 'react-router-dom';

const Sidebar = () => {
    const [isToggle, setToggle] = useState(true)

    return (
        <div className='fixed '>
            <div className='flex flex-row items-start text-black'>
                <div className='flex w-fit h-screen'>
                    <div className={`${isToggle ? "w-64" : "w-fit"} h-full flex justify-center p-4 transition-all duration-500 relative bg-third`}>
                        <div className={`flex-1 flex-col items-start ${isToggle ? "" : "translate-y-6"} transition-transform duration-500 delay-150`}>
                            <LogoBar toggle={isToggle} />
                            <FragmentSidebar toggle={isToggle} />
                            <ButtonProfil toggle={isToggle} />
                        </div>
                        <div className={`absolute transition-transform  duration-300 translate-y-1 bg-third border-4 border-white flex justify-center items-center -right-5 w-10 h-10 rounded-full cursor-pointer`}
                            onClick={() => setToggle(!isToggle)}
                        >
                            <BiChevronRight className={`${isToggle ? "rotate-180" : ""} text-3xl transition-all text-white  duration-300`} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar