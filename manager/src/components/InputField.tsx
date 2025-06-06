import React from "react";

interface InputFieldProp{
  labelName:String,
  placeholderName:String
}
const InputField:React.FC<InputFieldProp>=({labelName,placeholderName})=>{
    return(
        <div className="text-left">
  <label className="block mb-1 text-sm font-medium">{labelName}</label>
  <input
    className="w-full p-2 rounded-md shadow-inner"
    placeholder={`${placeholderName}`}
  />
</div>
    )
}
export default InputField;