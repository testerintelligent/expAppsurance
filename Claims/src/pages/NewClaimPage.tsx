import React from "react";
// import InputField from "../components/InputField"
// import ButtonField from "../components/ButtonField"
import NavBar from "../layout/NavBar.tsx";
import MenuList from "../layout/MenuList.tsx";
import Workspace from "../layout/Workspace.tsx";
import Form from "../layout/FormLayout.tsx";
const NewClaim=()=>{
    return(
        <>
        <MenuList/>
         <NavBar/>
         <Workspace title={"New Claim creation"}><Form/></Workspace>
        </>
    )
}
export default NewClaim;