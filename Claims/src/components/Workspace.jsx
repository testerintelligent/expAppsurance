import NavBar from "./NavBar";
// import NewClaim from "../pages/NewClaimPage";
import Dashboard from "./Dashboard"

const Workspace=({claim})=>{
    return(
        <div className="w-screen h-screen rounded-lg mb-0 border-2 bg-black ">
          
<NavBar/>
<div className="m-5 border-2 bg-white mb-5 rounded-md ">
    <Dashboard claims={claim}/>
{/* <NewClaim /> */}
</div>
        </div>
    )
}

export default Workspace;