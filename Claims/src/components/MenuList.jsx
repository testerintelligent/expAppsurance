import React from "react";
import {
    FaTachometerAlt,
    FaPlusCircle,
    FaInfoCircle,
    FaClipboardCheck,
    FaHistory
  } from 'react-icons/fa';
  import {Link} from "react-router-dom" 


export default function MenuList(){
    return(
        <div className="flex flex-row  border-black border-2  rounded-b-md w-44 shadow-lg h-screen bg-black">
        
        <ul className="flex flex-col flex-1 space-y-2">
  <Link to={"/dashboard"} className=" p-2 text-white hover:text-black hover:bg-white rounded-md flex items-center gap-2">
    <FaTachometerAlt /> Dashboard
  </Link>
  <Link to={"/Claim"} className="p-2 text-white hover:text-black hover:bg-white rounded-md flex items-center gap-2">
    <FaPlusCircle /> New Claim
  </Link>
  <Link to={"/claimDetails"}
  className="p-2 text-white hover:text-black hover:bg-white rounded-md flex items-center gap-2">
    <FaInfoCircle /> Claim Details
  </Link>
  <Link to={"/claimStatus"} className="p-2 text-white hover:text-black hover:bg-white rounded-md flex items-center gap-2">
    <FaClipboardCheck /> Claim Status
  </Link>
 
  <Link to={"/claimHistory"} className="p-2 text-white hover:text-black hover:bg-white rounded-md flex items-center gap-2">
    <FaHistory /> Claim History
  </Link>
</ul>
        </div>
    )
}