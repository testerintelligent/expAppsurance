import {
  Box,
  Grid,
  Typography,
  TextField,
  MenuItem,
  Button,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setPolicy } from '../redux/policyaction.ts';
import { useNavigate } from 'react-router-dom';
import { setPage } from '../redux/navigationAction.ts';

const Policy = () => {

  const [policyStatus, setPolicyStatus] = useState<string>('');
  const [input,setInput]= useState<any>('');

const dispatch = useDispatch();
const navigate = useNavigate();

const handleSubmit= async ()=>{ 
  console.log("submitted",typeof(input));
try {
    const response = await axios.get(`http://192.168.29.9:5000/api/policies/getPolicyByNumber/${input}`);
    console.log('Policies fetched:', response.data);
  } catch (error) {
    console.error('Error fetching policies:', error);
}
      dispatch(setPolicy(input));
      dispatch(setPage('policysummary')); 
      navigate('/policysummary');
}

const getAllPolicies= async()=>{
  console.log("get all policies");
  try {
    const response = await axios.get('http://192.168.29.9:5000/api/policies/getAllPolicies'); 
    console.log('All Policies fetched:', response);
  } catch (error) {
    console.error('Error fetching all policies:', error);
  }
}

useEffect(()=>{
  getAllPolicies();
},[])

  return (
    <Box sx={{ p: 2, fontSize: '0.875rem' }}>
      {/* Page Title */}
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 500 }}>
        Policies
      </Typography>
      <Divider sx={{ mb: 2, border: '1px solid #d0d0d0' }} />
      {/* Search Panel */}
      <Box
        sx={{
          bgcolor: '#fff',
        }}
      >
        <Grid container>
          {/* Left Column */}
          <Grid item xs={12} md={6} lg={6} p={1}>
            <Typography variant="body2" fontWeight={'bolder'} sx={{ mb: 2 }}>
              Search Criteria
            </Typography>

            <Grid container spacing={0.5}>
              <Grid item xs={4}>Account #</Grid>
              <Grid item xs={8}>
                <TextField
                  // fullWidth
                  size="small"
                  InputProps={{
                    sx: {
                      height: 30,
                      fontSize: '0.875rem',
                    },
                  }}
                  InputLabelProps={{
                    sx: { fontSize: '0.8rem' },
                  }}
                />
              </Grid>

              <Grid item xs={4}>Policy #</Grid>
              <Grid item xs={8}>
                <TextField
                  size="small"
                  onChange={(e)=> setInput(e.target.value)}
                  InputProps={{
                    sx: {
                      height: 30,
                      fontSize: '0.875rem',
                    },
                  }}
                  InputLabelProps={{
                    sx: { fontSize: '0.8rem' },
                  }}
                />
              </Grid>

              <Grid item xs={4}>Policy Status</Grid>
              <Grid item xs={8}>
                <TextField
                  select
                  fullWidth
                  size="small"
                  defaultValue=""
                  value={policyStatus}
                  onChange={(e) => setPolicyStatus(e.target.value)}
                  InputProps={{
                    sx: {
                      height: 30,
                      width: 205,
                      fontSize: '0.875rem',
                    },
                  }}
                  InputLabelProps={{
                    sx: { fontSize: '0.8rem' },
                  }}

                >
                  <MenuItem value="">&#60;none&#62;</MenuItem>
                  <MenuItem value="Closed">Closed</MenuItem>
                  <MenuItem value="Open">Open</MenuItem>
                  <MenuItem value="Open Locked">Open Locked</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={4}>Product</Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  size="small"
                  InputProps={{
                    sx: {
                      height: 30,
                      width: 205,
                      fontSize: '0.875rem',
                    },
                  }}
                  InputLabelProps={{
                    sx: { fontSize: '0.8rem' },
                  }}
                  select
                  defaultValue=""
                >
                  <MenuItem value="">&#60;none&#62;</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={4}>Billing Method</Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  size="small"
                  InputProps={{
                    sx: {
                      height: 30,
                      width: 205,
                      fontSize: '0.875rem',
                    },
                  }}
                  InputLabelProps={{
                    sx: { fontSize: '0.8rem' },
                  }}
                  select
                  defaultValue=""
                >
                  <MenuItem value="">&#60;none&#62;</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </Grid>

          {/* Vertical Divider */}
          <Divider orientation="vertical" flexItem />

          {/* Right Column */}
          <Grid item xs={12} md={5.8} lg={5.8} p={1}>
            <Typography variant="body2" fontWeight={'bolder'} sx={{ mb: 2 }}>
              Contact
            </Typography>

            <Grid container spacing={0.5}>
              <Grid item xs={4}>Company Name</Grid>
              <Grid item xs={8}>
                <TextField
                  size="small"
                  InputProps={{
                    sx: {
                      height: 30,
                      fontSize: '0.875rem',
                    },
                  }}
                  InputLabelProps={{
                    sx: { fontSize: '0.8rem' },
                  }}
                />
              </Grid>

              <Grid item xs={4}>First name</Grid>
              <Grid item xs={8}>
                <TextField
                  size="small"
                  InputProps={{
                    sx: {
                      height: 30,
                      fontSize: '0.875rem',
                    },
                  }}
                  InputLabelProps={{
                    sx: { fontSize: '0.8rem' },
                  }}
                />
              </Grid>

              <Grid item xs={4}>Last name</Grid>
              <Grid item xs={8}>
                <TextField
                  size="small"
                  InputProps={{
                    sx: {
                      height: 30,
                      fontSize: '0.875rem',
                    },
                  }}
                  InputLabelProps={{
                    sx: { fontSize: '0.8rem' },
                  }}
                />
              </Grid>

              <Grid item xs={4}>Country</Grid>
              <Grid item xs={8}>
                <TextField
                  size="small"
                  InputProps={{
                    sx: {
                      height: 30,
                      width: 205,
                      fontSize: '0.875rem',
                    },
                  }}
                  InputLabelProps={{
                    sx: { fontSize: '0.8rem' },
                  }}
                  select
                  defaultValue=""
                >
                  <MenuItem value="">&#60;none&#62;</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={4}>City</Grid>
              <Grid item xs={8}>
                <TextField
                  size="small"
                  InputProps={{
                    sx: {
                      height: 30,
                      fontSize: '0.875rem',
                    },
                  }}
                  InputLabelProps={{
                    sx: { fontSize: '0.8rem' },
                  }}
                />
              </Grid>

              <Grid item xs={4}>Postcode</Grid>
              <Grid item xs={8}>
                <TextField
                  size="small"
                  InputProps={{
                    sx: {
                      height: 30,
                      fontSize: '0.875rem',
                    },
                  }}
                  InputLabelProps={{
                    sx: { fontSize: '0.8rem' },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Buttons */}
        <Box>
          <Button
            onClick={handleSubmit}
            sx={{
              minHeight: 25,
              fontSize: '0.68rem',
              px: 1,
              mr: 1,
              bgcolor: '#0086AC'
            }} size='small' variant="contained"
          >
            Search
          </Button>
          <Button size='small' variant="contained" sx={{
            minHeight: 25,
            fontSize: '0.68rem',
            px: 1,
            bgcolor: '#0086AC'
          }}>
            Reset
          </Button>
        </Box>
      </Box>

      {/* Results Table */}
      <Box sx={{ mt: 1 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Policy #</TableCell>
              <TableCell>Currency</TableCell>
              <TableCell>Account #</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Effective Date</TableCell>
              <TableCell>Expiration Date</TableCell>
              <TableCell>Producer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow hover>
              <TableCell>POL-100234</TableCell>
              <TableCell>USD</TableCell>
              <TableCell>ACC-98765</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Commercial Auto</TableCell>
              <TableCell>01/01/2025</TableCell>
              <TableCell>31/12/2025</TableCell>
              <TableCell>ABC Insurance</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default Policy;
