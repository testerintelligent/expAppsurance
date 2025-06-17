import React from "react";
import { useState } from "react";
import SignUpFunction from "../layout/SignUpFunction.tsx";
import SignInFunction from "../layout/SignInFunction.tsx";
// import {useNavigate} from 'react-router-dom'

const Login:React.FC=()=> {
    const[SignIn,setSignIn]=useState(true);
  return (
    <div className="bg-gray-800  m-4 p-4 rounded-md border-2 border-gray-600 shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl text-center mx-auto">
        <h2 className="text-xl font-bold italic text-white">[Expleosurance]</h2>
      <h2 className=" mb-4 text-white">Welcome to [Expleosurance]</h2>
<div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl  rounded-md">
<button className={`font-serif w-50 px-16 py-2 rounded-l-md    transition duration-300 shadow-lg ${SignIn?'bg-gray-600 text-white':'bg-white text-black'}`}
onClick={()=>setSignIn(bool=>!bool)}
>
        Sign In
      </button>
      <button className={`font-serif w-50 px-14 py-2 rounded-r-md   transition duration-300 shadow-lg  ${SignIn?'bg-white text-black':'bg-gray-600 text-white'}`}
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









