import React, { useState } from "react";
import { Table, TableContainer, TableHead,TableBody, TableRow,TableCell, TablePagination } from "@mui/material";
import { ClaimsData } from "../data/claims";
import { ClaimsHeader } from "../data/claimsHeadrers";
import EllipsesModel from "../components/EllipsesModel.tsx"
import {FaEllipsisV} from "react-icons/fa"

     
const DashboardLayout=()=>{

  const[page,setPage]=useState(0);
  const[rowsPerPage,setrowsPerPage]=useState(5);
  const[modelOpen,setModelOpen]=useState(false);

const handleChangePage=(event:unknown,newpage:number)=>{
  setPage(newpage)
}
const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
  setrowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
};

    return(
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow className="bg-gray-950">
                                {ClaimsHeader.length>0 && ClaimsHeader.map((val)=>
                                            <TableCell><span  className="text-white ">{val}</span></TableCell>
                                )}                             
                    </TableRow>
                </TableHead>

                <TableBody>
                    {ClaimsData.length>0 && ClaimsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((claim,index)=>(
                        
                            <TableRow key={index} className=" odd:bg-gray-800 even:bg-gray-900 p-0">
                        <TableCell><span  className="text-white ">{index+1}</span></TableCell>
                            <TableCell><span  className="text-white ">{claim.claimId}</span></TableCell>
                            <TableCell ><span className="text-white " >{claim.customerId}</span></TableCell>
                            <TableCell><span  className="text-white ">{claim.policyId}</span></TableCell>
                            <TableCell><span  className="text-white ">{claim.claimType}</span></TableCell>
                            <TableCell ><span className="text-white " >{claim.claimAmount}</span></TableCell>
                            <TableCell ><span className="text-white " >{claim.claimDate}</span></TableCell>
                            <TableCell ><span className="text-white ">{claim.resolutionDate}</span></TableCell>
                            <TableCell ><span className="text-white " >{claim.claimStatus}</span></TableCell>
                             <TableCell ><span className="text-white " ><button onClick={()=>setModelOpen(!modelOpen)}>{modelOpen ?<EllipsesModel/>:<FaEllipsisV/> }</button></span></TableCell>
                         
        </TableRow>
                        
                    ))    
}
                </TableBody>
               

            </Table>
             <TablePagination
                      className="text-white w-screen"
                      rowsPerPageOptions={[5,10,15]}
                      component="div"
                      count={ClaimsData.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                       style={{ color:"white", backgroundColor:"#36454F",width:"100%" }} 
                    
               />

        </TableContainer>
    )
}
export default DashboardLayout;