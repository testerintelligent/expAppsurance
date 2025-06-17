import React from "react";
import {FaUser, FaCog, FaSignOutAlt} from "react-icons/fa"
const NavBar:React.FC=()=>{
    return(
        <div className="relative  flex  justify-end  text-white p-4  ">
                
        <ul className="flex flex-row gap-4">
        <li ><FaUser/></li>
      
        <li><FaCog/></li>
        <li><FaSignOutAlt/></li>
        </ul>
    </div>
    )
}

export default NavBar;