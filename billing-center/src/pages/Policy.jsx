// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Box, Paper, Typography, TextField, Button, Grid } from "@mui/material";
// import { searchPolicy } from "./PolicyApi";

// const PolicyDashboard = () => {
//   const [policyNumber, setPolicyNumber] = useState("");

//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleSearch = async () => {
//     if (!policyNumber) {
//       alert("Please enter a Policy Number");
//       return;
//     }

//     setError(null);

//     try {
//       const result = await searchPolicy(policyNumber);
//       navigate(`/policy-summary/${result.policy.policyNumber}`, {
//         state: { policy: result.policy },
//       });

//       console.log("reusltPolicy", result); // now accountId is used
//     } catch (err) {
//       setError("Failed to fetch policy details");
//     }
//   };

//   const handleChange = (e) => {
//     const { value } = e.target;
//     setPolicyNumber(value.trim());
//   };

//   return (
//     <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", mt: 2 }}>
//       <Paper sx={{ p: 3, mb: 3 }}>
//         <Typography
//           variant="h6"
//           sx={{ fontWeight: "bold", fontSize: 16, pb: 2 }}
//         >
//           Search Policy
//         </Typography>
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="Policy No"
//               name="policyNo"
//               value={policyNumber}
//               onChange={handleChange}
//             />
//           </Grid>
//           <Grid className="flex items-start">
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleSearch}
//               className="self-center"
//             >
//               Search
//             </Button>
//           </Grid>
//         </Grid>
//       </Paper>
//     </Box>
//   );
// };

// export default PolicyDashboard;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Paper, Typography, TextField, Button, Grid } from "@mui/material";
import { searchPolicy } from "./PolicyApi";

const PolicyDashboard = () => {
  const [policyNumber, setPolicyNumber] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!policyNumber) {
      alert("Please enter a Policy Number");
      return;
    }

    setError(null);

    try {
      const result = await searchPolicy(policyNumber);

      console.log("Policy Result:", result);

      navigate(`/policy-summary/${result.policy.policyNumber}`, {
        state: { policy: result.policy },
      });
    } catch (err) {
      console.log("error", err.message);
      setError("Failed to fetch policy details");
    }
  };

  const handleChange = (e) => {
    setPolicyNumber(e.target.value.trim());
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", mt: 2 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", fontSize: 16, pb: 2 }}
        >
          Search Policy
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Policy No"
              value={policyNumber}
              onChange={handleChange}
            />
          </Grid>

          <Grid item>
            <Button variant="contained" color="primary" onClick={handleSearch}>
              Search
            </Button>
          </Grid>
        </Grid>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default PolicyDashboard;
