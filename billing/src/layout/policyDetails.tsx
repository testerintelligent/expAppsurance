import {
  Box,
  Grid,
  Typography,
  Button,
  Divider,
  Paper,
  Stack,
} from '@mui/material';
import RecentTransactions from './RecentTransactions.tsx';
import { useSelector } from 'react-redux';

const Section = ({ title, children }: any) => (
  <Box sx={{ mb: 3 }}>
    <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
      {title}
    </Typography>
    <Divider sx={{ mb: 1 }} />
    {children}
  </Box>
);

const Row = ({ label, value, highlight = false }: any) => (
  <Grid container spacing={1} sx={{ mb: 0.5 }}>
    <Grid item xs={6}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography
        variant="body2"
        sx={{ color: highlight ? 'error.main' : 'text.primary' }}
      >
        {value}
      </Typography>
    </Grid>
  </Grid>
);

const PolicyDetails = () => {

  const { policyNumber } = useSelector((state: any) => state.policyReducer);

  return (
    <Box sx={{ p: 2,height: '100vh', overflowY: 'auto' }}>
      {/* Title + Actions */}
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h6">Policy Details</Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="contained" size="small">
            Start Delinquency
          </Button>
          <Button variant="outlined" size="small">
            Edit
          </Button>
        </Stack>
      </Stack>

      <Grid container spacing={2}>
        {/* LEFT COLUMN */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Section title="Policy Basics">
              <Row label="Policy #" value={policyNumber} />
              <Row label="Product" value="Workers Comp" />
              <Row label="Assigned Risk" value="No" />
              <Row label="Jurisdiction" value="US" />
              <Row label="Effective Date" value="01.12.25" />
              <Row label="Expiration Date" value="01.12.26" />
              <Row label="Closure Status" value="Open" />
            </Section>

            <Section title="Account Information">
              <Row label="Account #" value="1000011242" />
              <Row label="Account Name" value="Testing" />
            </Section>

            <Section title="Producer">
              <Row label="Producer Name" value="ABC Agency" />
              <Row label="Producer Code" value="AGT-001" />
            </Section>
          </Paper>
        </Grid>

        {/* MIDDLE COLUMN */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Section title="Charges">
              <Row label="Premium Charges" value="10,250.00 $" />
              <Row label="Other Charges" value="0" />
              <Row label="Total" value="10,250.00 $" />
            </Section>

            <Section title="Earnings">
              <Row label="Earned Premium" value="5%" />
              <Row label="Earned Balance" value="95%" />
            </Section>

            <Section title="Payments">
              <Row
                label="Payment Plan"
                value="Monthly 10% Down, 9 Installments"
              />
              <Row label="Total Paid" value="0" />
            </Section>
          </Paper>
        </Grid>

        {/* RIGHT COLUMN */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Section title="Amounts Outstanding">
              <Row label="Past Due" value="0" />
              <Row label="Total Adj. Outstanding" value="0" />
            </Section>

            <Section title="Write-Offs">
              <Row label="Write-Off Amount" value="0" />
            </Section>

            <Section title="Policy Equity">
              <Row label="Policy Equity" value="-547.95 $" highlight />
              <Row label="Equity Percent" value="-5.35%" highlight />
            </Section>

            <Section title="History">
              <Row label="Initial Inception" value="01.12.25" />
              <Row label="Term #" value="1" />
            </Section>
          </Paper>
        </Grid>
      </Grid>
      <RecentTransactions />
    </Box>
  );
};

export default PolicyDetails;
