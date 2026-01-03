
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { Box, Paper, Typography } from '@mui/material';

const GW_COLORS = {
  headerBg: '#4A4A4A',
  headerText: '#FFFFFF',
  sectionTitle: '#333333',
  divider: '#C9D7E1',
  tableHeaderBg: '#F2F2F2',
  linkBlue: '#0067AC',
  negativeRed: '#D32F2F',
  rowHover: '#F7FAFC',
};



const RecentTransactions = () => {
  const rows = [
    {
      date: '11.12.25',
      transaction: '100000047-1818',
      description: 'Premium Paid From Account',
      chargeType: 'Policy Issuance',
      invoice: '10.01.26 (Planned)',
      unbilled: 0,
      billed: 0,
      pastDue: '1,000.00 $',
      paid: '-1,000.00 $',
    },
    {
      date: '11.12.25',
      transaction: '100000047-1817',
      description: 'Premium Paid From Account',
      chargeType: 'Policy Issuance',
      invoice: '10.01.26 (Planned)',
      unbilled: 0,
      billed: 0,
      pastDue: '1,000.00 $',
      paid: '-1,000.00 $',
    },
    {
      date: '11.12.25',
      transaction: '100000049-0988',
      description: 'Premium Charged',
      chargeType: 'Policy Change',
      invoice: '',
      unbilled: '250.00 $',
      billed: 0,
      pastDue: 0,
      paid: '',
    },
  ];

  return (
    <Paper sx={{ mt: 3 }}>
      <Box sx={{ px: 2, py: 1, bgcolor: GW_COLORS.tableHeaderBg }}>
        <Typography fontWeight="bold">Recent Transactions</Typography>
      </Box>

      <Table size="small">
        <TableHead>
          <TableRow sx={{ bgcolor: GW_COLORS.tableHeaderBg }}>
            {[
              'Date',
              'Transaction #',
              'Description',
              'Charge Type',
              'Invoice',
              'Unbilled',
              'Billed',
              'Past Due',
              'Paid',
            ].map((h) => (
              <TableCell key={h} sx={{ fontWeight: 'bold' }}>
                {h}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, idx) => (
            <TableRow
              key={idx}
              hover
              sx={{ '&:hover': { bgcolor: GW_COLORS.rowHover } }}
            >
              <TableCell>{row.date}</TableCell>

              <TableCell
                sx={{ color: GW_COLORS.linkBlue, cursor: 'pointer' }}
              >
                {row.transaction}
              </TableCell>

              <TableCell>{row.description}</TableCell>
              <TableCell>{row.chargeType}</TableCell>
              <TableCell>{row.invoice}</TableCell>
              <TableCell>{row.unbilled}</TableCell>
              <TableCell>{row.billed}</TableCell>
              <TableCell>{row.pastDue}</TableCell>

              <TableCell sx={{ color: GW_COLORS.negativeRed }}>
                {row.paid}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default RecentTransactions;
