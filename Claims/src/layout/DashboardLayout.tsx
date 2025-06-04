import React, { useState } from "react";
import { Table, TableContainer, TableHead,TableBody, TableRow,TableCell, TablePagination } from "@mui/material";


   const ClaimsData = [
        {
          claimId: 'CLM001',
          customerId: 'CUS001',
          policyId: 'POL001',
          claimType: 'Accident',
          claimStatus: 'Pending',
          claimAmount: 1500,
          claimDate: '2025-03-01',
          resolutionDate: null,
          details: 'Car accident near downtown',
          documents: ['doc1.jpg', 'doc2.pdf'],
        },
        {
          claimId: 'CLM002',
          customerId: 'CUS002',
          policyId: 'POL002',
          claimType: 'Fire',
          claimStatus: 'Approved',
          claimAmount: 5000,
          claimDate: '2025-02-15',
          resolutionDate: '2025-03-01',
          details: 'Fire damage at warehouse',
          documents: ['fire_report.pdf', 'damage_photos.jpg'],
        },
        {
          claimId: 'CLM003',
          customerId: 'CUS003',
          policyId: 'POL003',
          claimType: 'Theft',
          claimStatus: 'Rejected',
          claimAmount: 2000,
          claimDate: '2025-03-10',
          resolutionDate: '2025-03-20',
          details: 'Stolen laptop',
          documents: ['police_report.pdf'],
        },
        {
          claimId: 'CLM004',
          customerId: 'CUS004',
          policyId: 'POL004',
          claimType: 'Water Damage',
          claimStatus: 'Approved',
          claimAmount: 3500,
          claimDate: '2025-03-05',
          resolutionDate: '2025-03-10',
          details: 'Water damage from broken pipe',
          documents: ['repair_invoice.pdf', 'damage_pictures.jpg'],
        },
        {
          claimId: 'CLM005',
          customerId: 'CUS005',
          policyId: 'POL005',
          claimType: 'Accident',
          claimStatus: 'Pending',
          claimAmount: 1200,
          claimDate: '2025-03-08',
          resolutionDate: null,
          details: 'Minor car accident at an intersection',
          documents: ['accident_report.pdf'],
        },
        {
          claimId: 'CLM006',
          customerId: 'CUS006',
          policyId: 'POL006',
          claimType: 'Medical',
          claimStatus: 'Approved',
          claimAmount: 7500,
          claimDate: '2025-02-20',
          resolutionDate: '2025-03-01',
          details: 'Emergency medical treatment after a fall',
          documents: ['medical_report.pdf', 'hospital_bills.jpg'],
        },
        {
          claimId: 'CLM007',
          customerId: 'CUS007',
          policyId: 'POL007',
          claimType: 'Theft',
          claimStatus: 'Approved',
          claimAmount: 3000,
          claimDate: '2025-03-12',
          resolutionDate: '2025-03-18',
          details: 'Stolen bicycle',
          documents: ['theft_report.pdf', 'photo_of_bike.jpg'],
        },
        {
          claimId: 'CLM008',
          customerId: 'CUS008',
          policyId: 'POL008',
          claimType: 'Accident',
          claimStatus: 'Pending',
          claimAmount: 2200,
          claimDate: '2025-03-15',
          resolutionDate: null,
          details: 'Truck accident causing road block',
          documents: ['accident_pictures.jpg'],
        },
        {
          claimId: 'CLM009',
          customerId: 'CUS009',
          policyId: 'POL009',
          claimType: 'Fire',
          claimStatus: 'Rejected',
          claimAmount: 8000,
          claimDate: '2025-03-02',
          resolutionDate: '2025-03-10',
          details: 'Fire in the kitchen causing property damage',
          documents: ['fire_certificate.pdf'],
        },
        {
          claimId: 'CLM010',
          customerId: 'CUS010',
          policyId: 'POL010',
          claimType: 'Flood',
          claimStatus: 'Pending',
          claimAmount: 1800,
          claimDate: '2025-03-20',
          resolutionDate: null,
          details: 'Flood damage to basement',
          documents: ['flood_photos.jpg', 'insurance_claim_form.pdf'],
        },
      ];      
const DashboardLayout=()=>{

  const[page,setPage]=useState(0);
  const[rowsPerPage,setrowsPerPage]=useState(5);

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
                                        <TableCell><span  className="text-white ">Claim ID</span></TableCell>
                                        <TableCell ><span className="text-white " >Customer ID</span></TableCell>
                                        <TableCell><span  className="text-white ">Policy ID</span></TableCell>
                                        <TableCell><span  className="text-white ">Claim Type</span></TableCell>
                                        <TableCell ><span className="text-white " >Claim Amount</span></TableCell>
                                        <TableCell ><span className="text-white " >Claim Date</span></TableCell>
                                        <TableCell ><span className="text-white ">Resolution Date</span></TableCell>
                                        <TableCell ><span className="text-white " >Status</span></TableCell>
                                     
                    </TableRow>
                </TableHead>

                <TableBody>
                    {ClaimsData.length>0 && ClaimsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((claim,index)=>(
                        
                            <TableRow key={index} className=" odd:bg-gray-800 even:bg-gray-900 p-0">
                        
                            <TableCell><span  className="text-white ">{claim.claimId}</span></TableCell>
                            <TableCell ><span className="text-white " >{claim.customerId}</span></TableCell>
                            <TableCell><span  className="text-white ">{claim.policyId}</span></TableCell>
                            <TableCell><span  className="text-white ">{claim.claimType}</span></TableCell>
                            <TableCell ><span className="text-white " >{claim.claimAmount}</span></TableCell>
                            <TableCell ><span className="text-white " >{claim.claimDate}</span></TableCell>
                            <TableCell ><span className="text-white ">{claim.resolutionDate}</span></TableCell>
                            <TableCell ><span className="text-white " >{claim.claimStatus}</span></TableCell>
                         
        </TableRow>
                        
                    ))
                
}
                </TableBody>
                <TablePagination
                      className="text-white w-80"
                      rowsPerPageOptions={[5,10,15]}
                      component="div"
                      count={ClaimsData.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                       style={{ color:"black", backgroundColor:"white",width:"100%" }} 
                    
               />

            </Table>

        </TableContainer>
    )
}
export default DashboardLayout;