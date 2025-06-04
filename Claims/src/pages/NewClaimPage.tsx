import React from "react";
// import InputField from "../components/InputField"
// import ButtonField from "../components/ButtonField"
import NavBar from "../layout/NavBar";
import MenuList from "../layout/MenuList";
import Workspace from "../layout/Workspace";
import Form from "../layout/FormLayout";
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