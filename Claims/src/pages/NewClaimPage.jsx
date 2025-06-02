import React from "react";
import InputField from "../components/InputField"
import ButtonField from "../components/ButtonField"
const NewClaim=({Title})=>{
    return(
        <>
        <p className="p-2 font-serif">New Claim Creation</p>
        <hr></hr>
        <form className="grid sm:grid-cols-2 md:grid-cols-2 gap-4 p-4 ">
            <InputField labelName={"CustomerID"} placeholderName={"Customer Id"}/>
            <InputField labelName={"PolicyID"} placeholderName={"Policy Id"}/>
            <InputField labelName={"Claim type"} placeholderName={"Claim type"}/>
            <InputField labelName={"Claim Status"} placeholderName={"Claim Status"}/>
            <InputField labelName={"Claim Amount"} placeholderName={"Claim Amount"}/>
            <InputField labelName={"Claim Date"} placeholderName={"Claim Date"}/>
            <InputField labelName={"Resolution Date"} placeholderName={"Resolution Date"}/>
            <InputField labelName={"Details"} placeholderName={"Details"}/>
        
            <ButtonField  buttonName={"Submit"}/>
            <ButtonField  buttonName={"Cancel"}/>

        </form>
        </>
    )
}
export default NewClaim;