import React from "react";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";

const PrimaryDriverQuestion = ({ value, onChange }) => {
  return (
    <div className=" bg-orange-300 p-4 rounded-md shadow-xl">
      <h5 className="font-medium text-start text-xl">
        Is the policy account holder also the primary driver?
      </h5>
      <RadioGroup row value={value} onChange={(e) => onChange(e.target.value)}>
        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
        <FormControlLabel value="no" control={<Radio />} label="No" />
      </RadioGroup>
    </div>
  );
};

export default PrimaryDriverQuestion;
