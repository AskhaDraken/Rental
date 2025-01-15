
import React from 'react'
import { NavLink } from 'react-router-dom'

const NAVLINK = ({to, text}) => {
    const NavLinkStyle =({isActive}) => {
        return {
            backgroundColor: isActive ? "#ffffff" : "",
            color: isActive? "#197031": "#ffffff",
            fontWeight: isActive? "bOld" :""
        }
    }
  return (
    <NavLink
    className={`flex items-center p-4 rounded-lg w-fit cursor-pointer hover:bg-white/20 transition-all duration-150`}
    to={to}
    style={NavLinkStyle}
    >
        <label
        className='text-2xl font-normal font-body'
        >{text}</label>
    </NavLink>
  )
}

export default NAVLINK