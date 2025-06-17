
import InputField from "../components/InputField.tsx";
import ButtonField from "../components/ButtonField.tsx";
import React from "react";

const SignInFunction:React.FC=()=>{
 
    const glogo=require('../assets/Glogo.jpg')
    const Explogo=require('../assets/expleo.webp')
    return(
        <div>
 <div className="flex flex-col gap-4 px-4 ">
    <InputField labelName={"username or Email"} placeholderName={"Username"}/>
    <InputField labelName={"Password"} placeholderName={"Password"}/>

    <div className="flex gap-1 lg:gap-2 m-2 md:pl-3 lg:pl-12 ">  
        <h1 className="font-serif text-white ">Are you can sign in with </h1>
        <img alt="GoogleLogo" src={glogo} className="h-6 rounded-xl  "></img>  
        <img alt="GoogleLogo" src={Explogo} className="h-6 rounded-xl "></img>
    </div>
</div>
<ButtonField buttonName={"Sign In"} />
</div>
    )
}

export default SignInFunction;