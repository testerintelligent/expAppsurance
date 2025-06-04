import InputField from "../components/InputField"
import ButtonField from "../components/ButtonField"
const SignUpFunction=()=>{
 
    return(
        <div>
 <div className="flex flex-col gap-4 px-4">
    <InputField labelName={"Enter your new Username :"} placeholderName={"Username"}/>
    <InputField labelName={"Enter your new Password :"} placeholderName={"Password"}/>
</div>
<ButtonField buttonName={"Sign Up"}/>
</div>
    )
}

export default SignUpFunction;
