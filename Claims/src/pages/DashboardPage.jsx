import React from "react";
import MenuList from "../layout/MenuList";
import NavBar from "../layout/NavBar";
import Workspace from "../layout/Workspace";
import DashboardLayout from "../layout/DashboardLayout";

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