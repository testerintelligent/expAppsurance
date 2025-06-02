import React from "react";
import Workspace from "./Workspace";
import MenuList from "./MenuList";

const HamburgerMenu=({claim})=>{
    return(
        <div className="flex flex-row ">
        <div className="flex flex-col h-screen">
        <div className="w-44 bg-black text-white  rounded-t-md p-2 hover:bg-white hover:text-black ">
            <h2 className="uppercase font-bold text-lg italic pr-1 pb-4 pt-1">[Expleosurance]</h2>    
            <hr></hr>
        </div>
        <MenuList/>
        </div>
        <Workspace claim={claim}/>
        </div>
    )
}





export default HamburgerMenu;