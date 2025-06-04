import React from "react";
interface inputProps{
  labelName:String,
  placeholderName:String
}

const InputField:React.FC<inputProps>=({labelName,placeholderName})=>{
    return(
        <div className="text-left">
  <label className="block mb-1 text-sm font-serif text-white">{labelName}</label>
  <input
    className="bg-gray-600 w-full p-2 rounded-md shadow-inner text-white "
    placeholder={`${placeholderName}`}
  />
</div>
    )
}
export default InputField;