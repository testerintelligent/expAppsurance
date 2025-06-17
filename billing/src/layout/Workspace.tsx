// import NavBar from "./NavBar";
// import InputField from "../components/InputField";
// import ButtonField from "../components/ButtonField";
// import NewClaim from "../pages/NewClaimPage";
// import Dashboard from "../layout/Dashboard"

import React from "react";

interface workspaceProp{
    children?:React.ReactNode,
    title?:String
}

const Workspace:React.FC<workspaceProp>=({children,title})=>{
    return(
        <div className="p-2 ml-56 relative  rounded-lg  bg-gray-800 mx-4 border-2 border-gray-400 ">
            <p className="p-2 font-serif  ">{title}</p>
            <hr></hr>
                    {children}
        </div>
    )
}

export default Workspace;