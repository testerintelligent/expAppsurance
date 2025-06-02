import React from "react";
import { useState } from "react";
import SignUpFunction from "../layout/SignUpFunction";
import SignInFunction from "../layout/SignInFunction";
// import {useNavigate} from 'react-router-dom'

const Login=()=> {
    const[SignIn,setSignIn]=useState(true);
  return (
    <div className="bg-gray-400 m-4 p-4 rounded-md border-2 border-black shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl text-center mx-auto">
        <h2 className="text-xl font-bold italic">[Expleosurance]</h2>
      <h2 className=" mb-4">Welcome to [Expleosurance]</h2>
<div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl  rounded-md">
<button className={`w-50 px-16 py-2 rounded-l-md    transition duration-300 shadow-lg ${SignIn?'bg-black text-white':'bg-white text-black'}`}
onClick={()=>setSignIn(bool=>!bool)}
>
        Sign In
      </button>
      <button className={`w-50 px-14 py-2 rounded-r-md   transition duration-300 shadow-lg  ${SignIn?'bg-white text-black':'bg-black text-white'}`}
      onClick={()=>setSignIn(bool=>!bool)}
      >
        Sign up
      </button>
      <div className=" m-5 p-2 ">
      <div className=" p-2 max-w-sm mx-auto">
        {
            SignIn?<SignInFunction/>:<SignUpFunction/>
        }
    
      </div>
      </div>
</div>
    
    </div>
  );
}

export default Login;









