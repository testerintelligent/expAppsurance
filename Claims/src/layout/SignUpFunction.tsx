import InputField from "../components/InputField"
import ButtonField from "../components/ButtonField"
import React from "react"




const SignUpFunction:React.FC=()=>{
 const glogo=require('../assets/Glogo.jpg')
 const Explogo=require('../assets/expleo.webp')

    return(
        <div>
 <div className="flex flex-col gap-4 px-4">
    <InputField labelName={"Enter your new Username :"} placeholderName={"Username"}/>
    <InputField labelName={"Enter your new Password :"} placeholderName={"Password"}/>


    <div className="flex gap-1 lg:gap-2 m-2 md:pl-3 lg:pl-12 ">  
        <h1 className="font-serif text-white ">Continue with </h1>
        <img alt="GoogleLogo" src={glogo} className="h-6 rounded-xl  "></img>  
        <img alt="GoogleLogo" src={Explogo} className="h-6 rounded-xl "></img>
    </div>



</div>



<ButtonField buttonName={"Sign Up"}/>
</div>
    )
}

export default SignUpFunction;
