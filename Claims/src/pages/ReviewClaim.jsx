import axios from "axios";
import {
  Box,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: "http://10.192.190.158:5000/api",
});

export default function ReviewClaim() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const payload = {
      policyNumber: state.policy.policyNumber,
      policyId: state.policy.policyId,

      insured: {
        name: `${state.policy.contact.firstName} ${state.policy.contact.lastName}`,
        phone: state.policy.contact.phone,
        address: state.policy.contact.address,
      },

      lossDate: state.lossDate,
      dateOfNotice: state.dateOfNotice,
      claimType: state.claimType,

      howReported: state.howReported,
      reportedBy: state.reportedName,
      relationToInsured: state.relation,

      lossDescription: state.lossDescription,
      lossLocation: state.lossLocation,
      policeReported: state.policeReported,

      vehicles: state.selectedVehicles.map((id) =>
        state.policy.vehicle.find((v) => v._id === id)
      ),

      drivers: state.selectedDrivers.map((id) =>
        state.policy.driver.find((d) => d._id === id)
      ),
    };

    const res = await api.post("/claims/create", payload);

    navigate("/Claim/success", {
      state: { claim: res.data.claim },
    });
  };

  return (
    <Box p={3}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5">Review Claim</Typography>
        <Typography>Policy: {state.policy.policyNumber}</Typography>
        <Typography>Loss Date: {state.lossDate}</Typography>

        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Submit Claim
        </Button>
      </Paper>
    </Box>
  );
}
