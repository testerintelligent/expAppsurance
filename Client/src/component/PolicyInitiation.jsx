import React from "react";
const PolicyInitiation=()=>{
   
    return(
        <div>
            <h3>Policy Initiation Page</h3>
            <h2>
                    Customer Inquiry : 
                </h2>
            <div className="bg-white ml-60 mr-80 mt-10 rounded-lg border-2 border-black">
               <h1>1.Basic Identification Information</h1>
                <div className="">
                    <label>Enter Customer name :</label>
                    <input placeholder="Enter name"></input>
                </div>
                <div className="">
                    <label>Enter Customer Contact Information :</label>
                    <input placeholder="Enter Phone Number"></input>
                </div>
                <div className="">
                    <label>Enter Customer DateofBirth :</label>
                    <input placeholder="Enter DateofBirth"></input>
                </div>
                <h1>2.Inquiry Purpose</h1>
                <div>
                    <label>
                    Requesting a new policy
                    </label>
                    <input type={'radio'} value="Yes"></input>
                    <input type={'radio'} value="No"></input>
                    <label>
                    Policy renewal
                    </label>
                    <label>
                    Claim initiation
                    </label>
                    <label>
                    Premium payment
                    </label>
                    <label>
                    Policy modification (e.g., address or beneficiary updates)
                    </label>
                    <label>
                    General information (e.g., available policies or benefits)
                    </label>
                </div>
            </div>

            <div className="bg-white ml-60 mr-80 mt-10 rounded-lg border-2 border-black">
                    <h2>
                        Needs Assessment
                    </h2>
                </div>
                <div className="bg-white ml-60 mr-80 mt-10 rounded-lg border-2 border-black">
                    <h2>
                        Quatation
                    </h2>
                </div>
                <div className="bg-white ml-60 mr-80 mt-10 rounded-lg border-2 border-black">
                    <h2>
                        Policy purchase
                    </h2>
                </div>
        </div>
    );
};
export default PolicyInitiation;