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
        <div className=" relative  rounded-lg ml-52 bg-gray-800 mx-4  ">
            <p className="p-2 font-serif  ">{title}</p>
            <hr></hr>
                    {children}
        </div>
    )
}

export default Workspace;