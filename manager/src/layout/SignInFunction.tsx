
import InputField from "../components/InputField";
import ButtonField from "../components/ButtonField";
import React from "react";

const SignInFunction=()=>{
 
    return(
        <div>
 <div className="flex flex-col gap-4 px-4">
    <InputField labelName={"username or Email"} placeholderName={"Username"}/>
    <InputField labelName={"Password"} placeholderName={"Password"}/>
</div>
<ButtonField buttonName={"Sign In"} />
</div>
    )
}

export default SignInFunction;