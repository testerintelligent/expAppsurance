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

  const [status, setStatus] = useState("Loading rate tables...");

  useEffect(() => {
    const callRateTable = async () => {
      let apiData;
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_PRICING_API_URL}/api/ratetable/`,
        );
        apiData = res.data.data || [];
      } catch (err) {
        setStatus(`Could not load rate tables: ${err.message}`);
        return;
      }

      const locationData = apiData.find((item) => item.name === "RT_LOCATION");
      const vehicleAgeData = apiData.find(
        (item) => item.name === "RT_VEHICLE_AGE",
      );
      const basePremiumData = apiData.find(
        (item) => item.name === "RT_BASE_PREMIUM",
      );

      setPremium({
        location: locationData?.data || [],
        vehicleAge: vehicleAgeData?.data || [],
        basePremium: basePremiumData?.data || [],
      });
      setStatus(
        locationData?.data?.length
          ? ""
          : "No rows to show: the RT_LOCATION rate table is missing or empty.",
      );
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
              <TableCell>Vehicle Type</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Base Premium</TableCell>
              <TableCell>Location Factor</TableCell>
              <TableCell>Vehicle Age</TableCell>
              <TableCell>Vehicle Factor</TableCell>
              <TableCell>Premium Amount</TableCell>
              {/* <TableCell>Actions</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {status && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  {status}
                </TableCell>
              </TableRow>
            )}
            {premium.location.map((loc, index) => {
              const baseRate = premium.basePremium?.[0]?.baseRate || 0;
              const vehicleType = premium.basePremium?.[0]?.key || "--";
              const firstAge = premium.vehicleAge[0];
              const ageLabel =
                selectedAge[loc.key] ||
                (firstAge ? `${firstAge.min}-${firstAge.max}` : "");
              const vehicleFactor = getVehicleFactor(loc.key, ageLabel);

              const premiumAmount = baseRate * loc.factor * vehicleFactor;

              return (
                <TableRow key={index}>
                  <TableCell>{vehicleType}</TableCell>
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
                  {/* <TableCell>
                    <button
                      onClick={() => {
                        // send selected row data to redux
                        dispatch(
                          updateForm({
                            name: "editData",
                            value: {
                              location: loc.key,
                              baseRate,
                              locationFactor: loc.factor,
                              vehicleAge: ageLabel,
                              vehicleFactor,
                            },
                          }),
                        );

                        navigate("/form");
                      }}
                    >
                      Edit
                    </button>
                  </TableCell> */}
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
