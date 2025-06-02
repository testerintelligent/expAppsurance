import React from "react";
import {FaMoon,FaUser, FaCog, FaSignOutAlt} from "react-icons/fa"
const NavBar=()=>{
    return(
        <div className="flex justify-end  text-white p-4  ">
                
        <ul className="flex flex-row gap-4">
        <li><FaUser/></li>
        <li > <FaMoon/> </li>
        <li><FaCog/></li>
        <li><FaSignOutAlt/></li>
        </ul>
    </div>
    )
}

export default NavBar;