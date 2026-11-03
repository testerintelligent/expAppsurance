import React, { useState, useEffect } from "react";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";

// ─── Driver assignment question ───────────────────────────────────────────────
// Replaced Tailwind `bg-orange-300` with a neutral GW-style question row.

const PrimaryDriverQuestion = ({ value, onChange }) => {
  const [localValue, setLocalValue] = useState(() => {
    return localStorage.getItem("isPrimaryDriver") || value || "";
  });

  // Keep parent state + localStorage in sync
  useEffect(() => {
    if (localValue) {
      onChange(localValue);
      localStorage.setItem("isPrimaryDriver", localValue);
    }
  }, [localValue, onChange]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 24,
        flexWrap: "wrap",
        padding: "6px 0",
      }}
    >
      <span style={{ fontSize: 13, color: "#2d3e52", fontWeight: 500 }}>
        Is the policy account holder also the primary driver?
      </span>
      <RadioGroup
        row
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        sx={{ gap: 1 }}
      >
        <FormControlLabel
          value="yes"
          control={
            <Radio
              size="small"
              sx={{
                color: "#1f5fa6",
                "&.Mui-checked": { color: "#1f5fa6" },
              }}
            />
          }
          label={<span style={{ fontSize: 12, color: "#2d3e52" }}>Yes</span>}
        />
        <FormControlLabel
          value="no"
          control={
            <Radio
              size="small"
              sx={{
                color: "#1f5fa6",
                "&.Mui-checked": { color: "#1f5fa6" },
              }}
            />
          }
          label={<span style={{ fontSize: 12, color: "#2d3e52" }}>No</span>}
        />
      </RadioGroup>
    </div>
  );
};

export default PrimaryDriverQuestion;
