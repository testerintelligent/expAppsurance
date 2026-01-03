import { Button, Grid, Typography } from '@mui/material'
import React from 'react'
function Charges() {
  return (
    <Grid container>

    <Typography fontSize={16} fontWeight={600} pl={1}>Charges</Typography>

    <Grid item container mt={2} pl={1} gap={2}>



    <Button variant='contained' size='small'  disabled sx={{
    height: 28,    
    minWidth: 70, 
    fontSize: 10,
    color: "#fff",
    "&.Mui-disabled": {
      color: "#fff",              // 👈 override disabled text color
      backgroundColor: "#9e9e9e", // optional
    },
  }}>Reverse</Button>
      <Button disabled fontSize={12}>Edit Holds</Button>   
      <Button disabled fontSize={12}>Override Commision</Button>   

      </Grid>

    </Grid>

  )
}

export default Charges