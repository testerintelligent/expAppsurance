import React from "react";
import {
    FaTachometerAlt,
    FaPlusCircle,
    FaClipboardCheck,
    FaHistory
  } from 'react-icons/fa';
  import {Link} from "react-router-dom" 


export default function MenuList(){
  const expLogo=require('../assets/expleo.webp');
    return(
        <div className="absolute  flex flex-row  border-black border-2  rounded-b-md w-52 shadow-lg h-screen  ">
         
        <ul className="  flex flex-col flex-1 space-y-2">

        <div className="  flex gap-2 w-40  text-white p-2   ">
          <img className="h-8 rounded-md" alt="expLogo" src={expLogo}></img>
            <h2 className="text-lg italic ">[Expleosurance]</h2>   
          
        </div>
  <Link to={"/dashboard"} className=" p-2 text-white  hover:bg-gray-700 rounded-md flex items-center gap-2">
    <FaTachometerAlt /> Dashboard
  </Link>
  <Link to={"/newClaim"} className="p-2 text-white  hover:bg-gray-700 rounded-md flex items-center gap-2">
    <FaPlusCircle /> New Claim
  </Link>

  <Link to={"/claimStatus"} className="p-2 text-white  hover:bg-gray-700 rounded-md flex items-center gap-2">
    <FaClipboardCheck /> Claim Status
  </Link>
 
  <Link to={"/claimHistory"} className="p-2 text-white  hover:bg-gray-700 rounded-md flex items-center gap-2">
    <FaHistory /> Claim History
  </Link>
</ul>
        </div>
    )
}