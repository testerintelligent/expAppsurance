const ButtonField=({buttonName})=>{
    return(
        <button className="h-10 w-28 mt-6 px-6 py-2 rounded-md bg-white text-black hover:bg-black hover:text-white transition duration-300 shadow-lg">
{buttonName}
</button> 
    )
}
export default ButtonField;