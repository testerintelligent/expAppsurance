import { Card, CardContent, Box, Typography } from "@mui/material";
import myImage from "../assets/car.png";


const PolicyTitleBar = ({ policyNumber, claimNumber, insured, lossDate, status }) => {
  return (
    <Card
      sx={{
        height: "60px",
        backgroundColor: "black",
        color: "white"
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 5
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1
            }}
          >
            <Box
              sx={{
                width: 10,
                height: 10,
                backgroundColor: "green",
                borderRadius: "50%"
              }}
            />
            <Typography>Active</Typography>
          </Box>

          <Box
            component="img"
            src={myImage}
            alt="Car"
            sx={{
              width: 40,
              height: 25
            }}
          />

          {claimNumber &&

            <Typography>
              Claim: {claimNumber}
            </Typography>
          }

          <Typography>
            Pol: {policyNumber}
          </Typography>
          {insured &&
            <Typography>
              Ins: {insured}
            </Typography>}

          <Typography>
            DOL: {new Date(lossDate).toLocaleDateString("en-GB")}
          </Typography>

          <Typography>
            Status: {status}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PolicyTitleBar;