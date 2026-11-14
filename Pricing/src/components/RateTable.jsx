import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
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
    <div>
      {/* Page title */}
      <div
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: "#2d3e52",
          marginBottom: 12,
        }}
      >
        Motor Insurance Premium Calculator
      </div>

      <div style={{ border: "1px solid #d7dbe2", background: "#fff" }}>
        <div
          style={{
            background: "#f3f6f9",
            padding: "7px 12px",
            borderBottom: "1px solid #d7dbe2",
            fontSize: 11,
            fontWeight: 700,
            color: "#2e3e4c",
            textTransform: "uppercase",
            letterSpacing: 0.5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>Rate Table</span>
          <span
            style={{ fontWeight: 400, color: "#4c5d72", textTransform: "none" }}
          >
            {premium.location.length} records
          </span>
        </div>
        <div style={{ overflow: "auto" }}>
          <Table>
            <TableHead>
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
                        style={{
                          border: "1px solid #c5ccd5",
                          borderRadius: 2,
                          padding: "2px 4px",
                          fontSize: 12,
                        }}
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
        </div>
      </div>
    </div>
  );
};

export default RateTable;
