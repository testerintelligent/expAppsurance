import {
  Table,
  TableBody,
  TableCell,
  Container,
  Paper,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const RateTable = () => {
  const [selectedAge, setSelectedAge] = useState({});
  const [premium, setPremium] = useState({
    location: [],
    vehicleAge: [],
    basePremium: [],
  });
  const getVehicleFactor = (locKey, ageLabel) => {
    const age = premium.vehicleAge.find((a) => {
      const label = `${a.min}-${a.max}`;
      return label === ageLabel;
    });

    return age?.factor || 1;
  };

  const baseRate = premium.basePremium?.[0]?.baseRate || 0;

  const rows = premium.location.flatMap((loc) => {
    return premium.vehicleAge.map((age) => {
      const premiumAmount = baseRate * loc.factor * age.factor;

      return {
        location: loc.key,
        locationFactor: loc.factor,
        vehicleRange: `${age.min} - ${age.max}`,
        vehicleFactor: age.factor,
        baseRate,
        premiumAmount,
      };
    });
  });

  useEffect(() => {
    if (premium.location.length === 0) return;

    const defaults = {};
    premium.location.forEach((loc) => {
      defaults[loc.key] = "0-5";
    });

    setSelectedAge(defaults);
  }, [premium.location]);

  useEffect(() => {
    const callRateTable = async () => {
      const res = await axios.get("http://10.192.190.158:5001/api/ratetable/");
      const apiData = res.data.data;

      const locationData = apiData.find((item) => item.name === "RT_LOCATION");
      const vehicleAgeData = apiData.find(
        (item) => item.name === "RT_VEHICLE_AGE"
      );
      const basePremiumData = apiData.find(
        (item) => item.name === "RT_BASE_PREMIUM"
      );

      setPremium({
        location: locationData?.data || [],
        vehicleAge: vehicleAgeData?.data || [],
        basePremium: basePremiumData?.data || [],
      });
    };

    callRateTable();
  }, []);

  return (
    <div className="flex flex-col gap-y-4 ">
      <Typography
        variant="h5"
        className="bg-linear-to-r from-black via-violet-600 to-black bg-clip-text text-5xl font-extrabold text-transparent font-bold text-shadow-lg"
      >
        Motor Insurance Premium Calculator
      </Typography>
      <Container
        component={Paper}
        className="!px-0"
        style={{ maxHeight: 400, overflow: "auto" }}
      >
        <Table>
          <TableHead className="bg-amber-400 text-white font-bold ">
            <TableRow>
              <TableCell>Location</TableCell>
              <TableCell>Base Premium</TableCell>
              <TableCell>Location Factor</TableCell>
              <TableCell>Vehicle Age</TableCell>
              <TableCell>Vehicle Factor</TableCell>
              <TableCell>Premium Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {premium.location.map((loc, index) => {
              const baseRate = premium.basePremium?.[0]?.baseRate || 0;

              const ageLabel = selectedAge[loc.key] || "0-5";
              const vehicleFactor = getVehicleFactor(loc.key, ageLabel);

              const premiumAmount = baseRate * loc.factor * vehicleFactor;

              return (
                <TableRow key={index}>
                  <TableCell>{loc.key}</TableCell>

                  <TableCell>{baseRate}</TableCell>

                  <TableCell>{loc.factor}</TableCell>

                  <TableCell>
                    <select
                      value={ageLabel}
                      onChange={(e) =>
                        setSelectedAge((prev) => ({
                          ...prev,
                          [loc.key]: e.target.value,
                        }))
                      }
                    >
                      {premium.vehicleAge.map((age, i) => (
                        <option key={i} value={`${age.min}-${age.max}`}>
                          {age.min}-{age.max}
                        </option>
                      ))}
                    </select>
                  </TableCell>

                  <TableCell>{vehicleFactor}</TableCell>

                  <TableCell>{premiumAmount}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Container>
    </div>
  );
};

export default RateTable;
