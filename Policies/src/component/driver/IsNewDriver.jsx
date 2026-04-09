import React, { useState, useEffect } from "react";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";

const PrimaryDriverQuestion = ({ value, onChange }) => {
  const [localValue, setLocalValue] = useState(() => {
    return localStorage.getItem("isPrimaryDriver") || value || "";
  });

  // sync to parent
  useEffect(() => {
    if (localValue) {
      onChange(localValue);
      localStorage.setItem("isPrimaryDriver", localValue);
    }
  }, [localValue, onChange]);

  return (
    <div className=" bg-orange-300 p-4 rounded-md shadow-xl">
      <h5 className="font-medium text-start text-xl">
        Is the policy account holder also the primary driver?
      </h5>
      <RadioGroup
        row
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
      >
        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
        <FormControlLabel value="no" control={<Radio />} label="No" />
      </RadioGroup>
    </div>
  );
};

export default PrimaryDriverQuestion;
