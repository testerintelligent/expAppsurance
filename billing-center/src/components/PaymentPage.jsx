import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  Divider,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

export default function PaymentPage() {
  const [tab, setTab] = React.useState(0);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: 4,
        backgroundColor: "#f5f6fa",
        backgroundImage: `url("https://png.pngtree.com/background/20230622/original/pngtree-illustration-of-3d-personal-bank-account-and-credit-card-with-money-picture-image_3950197.jpg")`,
        backgroundRepeat: "repeat",
        position: "relative",
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(94,53,177,0.15), rgba(103,58,183,0.15))',
          zIndex: 0
        }
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1 }}>
      <Grid container spacing={4} justifyContent={"center"} mt={5}>
        {/* LEFT PANEL */}
        <Grid item xs={12} md={5}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                background: "linear-gradient(135deg, #5e35b1, #673ab7)",
                color: "white",
                p: 4,
              }}
            >
              <Typography variant="h5" fontWeight="bold">
                Expleosurance Payment Portal
              </Typography>
              <Typography variant="body1" mt={2}>
                Securely pay your insurance premium and manage your policy with ease.
              </Typography>
            </Box>

            <CardContent>
              <Typography variant="h6" gutterBottom>
                Policy Summary
              </Typography>

              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Policy Number</Typography>
                <Typography fontWeight="bold">GW-PL-10234</Typography>
              </Box>

              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Insured Name</Typography>
                <Typography fontWeight="bold">Shilpa Kannan</Typography>
              </Box>

              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Premium Amount</Typography>
                <Typography>$400.00</Typography>
              </Box>

              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Service Fee</Typography>
                <Typography>$50.00</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6" fontWeight="bold">
                  $450.00
                </Typography>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Typography variant="body2" color="text.secondary">
                • Payments are processed securely via Expleosurance BillingCenter.
                <br />• Accepted methods: Credit Card, Debit Card, Bank Transfer.
                <br />• Your data is encrypted and compliant with PCI-DSS standards.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* RIGHT PANEL */}
        <Grid item xs={12} md={7}>
          <Card sx={{ borderRadius: 4 }}>
            <CardContent>
              <Typography variant="h5" fontWeight="bold" mb={2}>
                Payment Details
              </Typography>

              <Tabs
                value={tab}
                onChange={(e, v) => setTab(v)}
                sx={{ mb: 3 }}
              >
                <Tab label="Credit / Debit Card" />
                <Tab label="Bank Transfer" />
              </Tabs>

              {tab === 0 && (
                <Box>
                  <TextField
                    fullWidth
                    label="Cardholder Name"
                    margin="normal"
                  />

                  <TextField
                    fullWidth
                    label="Card Number"
                    margin="normal"
                    placeholder="XXXX XXXX XXXX XXXX"
                  />

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Expiry"
                        placeholder="MM/YY"
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="CVC"
                        margin="normal"
                        type="password"
                      />
                    </Grid>
                  </Grid>

                  <FormControlLabel
                    control={<Checkbox />}
                    label="Remember this card"
                  />

                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 3,
                      py: 1.5,
                      borderRadius: 3,
                      background:
                        "linear-gradient(135deg, #5e35b1, #673ab7)",
                    }}
                  >
                    Pay Now
                  </Button>
                </Box>
              )}

              {tab === 1 && (
                <Box>
                  <TextField
                    fullWidth
                    label="Account Holder Name"
                    margin="normal"
                  />

                  <TextField
                    fullWidth
                    label="Bank Account Number"
                    margin="normal"
                    placeholder="XXXX XXXX XXXX"
                  />

                  <Grid container spacing={2}>
                    <Grid item size = {{xs:12, md:12, xl:12}}>
                      <TextField
                        fullWidth
                        label="IFSC / Routing Code"
                        margin="normal"
                      />
                    </Grid>                   
                  </Grid>

                  <FormControlLabel
                    control={<Checkbox />}
                    label="Remember this bank account"
                  />

                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 3,
                      py: 1.5,
                      borderRadius: 3,
                      background:
                        "linear-gradient(135deg, #5e35b1, #673ab7)",
                    }}
                  >
                    Proceed to Pay
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      </Box>
    </Box>
  );
}
