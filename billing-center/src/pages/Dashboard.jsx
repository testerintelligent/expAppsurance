import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Grid,
  Divider,
} from "@mui/material";
const Dashboard = () => {
  return (
    <div>
      {" "}
      <h1 className="text-black text-2xl font-medium p-2">Policies</h1>
      <div className="bg-gray-500 pt-px"></div>
      <h3 className="text-black text-lg p-2">Search Criteria</h3>
      <div>
        <Typography>Account</Typography>
        <TextField />
      </div>
    </div>
  );
};

export default Dashboard;
