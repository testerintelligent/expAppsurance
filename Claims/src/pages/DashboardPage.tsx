import React from "react";
import MenuList from "../layout/MenuList.tsx";
import NavBar from "../layout/NavBar.tsx";
import Workspace from "../layout/Workspace.tsx";
import DashboardLayout from "../layout/DashboardLayout.tsx";

const Dashboard=()=>{
    return(
        <>
           <MenuList/>
            <NavBar/>
            <Workspace ><DashboardLayout/></Workspace>

        </>
    )
}
export default Dashboard;