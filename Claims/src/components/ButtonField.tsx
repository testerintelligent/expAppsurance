import React from "react";
interface buttonProps{
    buttonName:String
}
const ButtonField:React.FC<buttonProps>=({buttonName})=>{
    return(
        <button className="h-10 w-28 mt-6 px-6 py-2 rounded-md hover:bg-white hover:text-black bg-gray-700 text-white transition duration-300 shadow-lg font-serif">
{buttonName}
</button> 
    )
}
export default ButtonField;