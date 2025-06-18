import React from "react";
import {
    FaTachometerAlt,
    FaPlusCircle,
    FaClipboardCheck,
    FaHistory
  } from 'react-icons/fa';
  import { NavLink} from "react-router-dom" 


export default function MenuList(){
  const expLogo=require('../assets/expleo.webp');
   const claims="claims"
    return(
        <div className="absolute  flex flex-row  bg-gray-800  w-52 shadow-lg h-screen  ">
         
        <ul className="  flex flex-col flex-1 space-y-2">

        <div className="  flex gap-2 w-48  text-white p-4 ">
          <img className="h-8 rounded-md" alt="expLogo" src={expLogo}></img>
            <h2 className="text-md italic ">[Expleosurance]-{claims}</h2>   
          
        </div>
        <div >

                  <NavLink to={"/dashboard"} className={({isActive})=>`pl-8
                    p-2 text-white  hover:bg-gray-700 rounded-md flex items-center gap-2 ${isActive?'bg-gray-700':''}`
                  }
                  >
                    <FaTachometerAlt /> Dashboard
                  </NavLink>

                  <NavLink to={"/newClaim"} className={({isActive})=>`pl-8 p-2 text-white  hover:bg-gray-700 rounded-md flex items-center gap-2 ${isActive?'bg-gray-700':''}`}
                    >
                    <FaPlusCircle /> New Claim
                  </NavLink>

                <NavLink to={"/claimStatus"} className={({isActive})=>`pl-8 p-2 text-white  hover:bg-gray-700 rounded-md flex items-center gap-2 ${isActive?'bg-gray-700':''}`}
                        >
                          <FaClipboardCheck /> Claim Status
                        </NavLink>
                      
                <NavLink to={"/claimHistory"} className={({isActive})=>`pl-8 p-2 text-white  hover:bg-gray-700 rounded-md flex items-center gap-2 ${isActive?'bg-gray-700':''}`}>
                          <FaHistory /> Claim History
                        </NavLink>
  </div>
</ul>
        </div>
    )
}