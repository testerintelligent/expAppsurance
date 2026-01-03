import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";

/* ------------------ Mock Data ------------------ */
const contactsData = [
  {
    id: 1,
    type: "Company",
    name: "Perfect Kalai",
    address: ["Line1", "Line2", "Anchorage 99502"],
    phone: "994-066-0007",
    email: "kalaivani.sundar@expleogroup.com",
    roles: ["Additional Interest"],
  },
];

/* ------------------ Component ------------------ */
const ContactsPage = () => {
  const [selected, setSelected] = useState(contactsData[0]);

  return (
    <Box display="flex">
      {/* Left spacing (matches demo) */}
      <Box />

      {/* Main constrained content */}
      <Box
        sx={{
          width: "1050px",
          maxWidth: "1050px",
        }}
      >
        {/* Page Title */}
        <Typography fontSize={16} fontWeight={600} mb={1} pl={1}>
          Contacts
        </Typography>

        {/* Edit Button */}
        <Button
        
          variant="contained"
          size="small"
          sx={{
            fontSize: 10,
            textTransform: "none",
            mb: 1,
            ml: 1,
          }}
        >
          Edit
        </Button>

        {/* ------------------ Contacts Table ------------------ */}
        <Paper variant="outlined">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: 12, fontWeight: 600 }}>
                  Name
                </TableCell>
                <TableCell sx={{ fontSize: 12, fontWeight: 600 }}>
                  Address
                </TableCell>
                <TableCell sx={{ fontSize: 12, fontWeight: 600 }}>
                  Roles
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {contactsData.map((row) => (
                <TableRow
                  key={row.id}
                  hover
                  selected={selected.id === row.id}
                  onClick={() => setSelected(row)}
                  sx={{
                    cursor: "pointer",
                    "&.Mui-selected": {
                      backgroundColor: "#e3f2fd",
                    },
                  }}
                >
                  <TableCell sx={{ fontSize: 12 }}>
                    {row.name}
                  </TableCell>
                  <TableCell sx={{ fontSize: 12 }}>
                    {row.address.join(", ")}
                  </TableCell>
                  <TableCell sx={{ fontSize: 12 }}>
                    {row.roles.join(", ")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

        {/* ------------------ Details Section ------------------ */}
        <Box mt={2} pl={1}>
          <Typography fontSize={14} fontWeight={600}>
            {selected.name}
          </Typography>

          <Divider sx={{ my: 1 }} />

          <Typography fontSize={13} fontWeight={600} mb={1}>
            Contact Info
          </Typography>

          <Grid container spacing={1}>
            <Grid item xs={3}>
              <Typography fontSize={12} fontWeight={500}>
                Type
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography fontSize={12}>{selected.type}</Typography>
            </Grid>

            <Grid item xs={3}>
              <Typography fontSize={12} fontWeight={500}>
                Name
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography fontSize={12}>{selected.name}</Typography>
            </Grid>

            <Grid item xs={3}>
              <Typography fontSize={12} fontWeight={500}>
                Address
              </Typography>
            </Grid>
            <Grid item xs={9}>
              {selected.address.map((line) => (
                <Typography fontSize={12} key={line}>
                  {line}
                </Typography>
              ))}
            </Grid>

            <Grid item xs={3}>
              <Typography fontSize={12} fontWeight={500}>
                Phone
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography fontSize={12}>{selected.phone}</Typography>
            </Grid>

            <Grid item xs={3}>
              <Typography fontSize={12} fontWeight={500}>
                Email
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography fontSize={12}>{selected.email}</Typography>
            </Grid>
          </Grid>

          {/* ------------------ Roles Table ------------------ */}
          <Box mt={2}>
            <Typography fontSize={13} fontWeight={600} mb={0.5}>
              Roles
            </Typography>

            <Paper variant="outlined">
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: 12, fontWeight: 600 }}>
                      Role
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {selected.roles.map((role) => (
                    <TableRow key={role}>
                      <TableCell sx={{ fontSize: 12 }}>
                        {role}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactsPage;
