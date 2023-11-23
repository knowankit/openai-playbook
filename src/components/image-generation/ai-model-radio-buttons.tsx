import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

interface IModelRadioGroup {
  value: string;
  onChange: (value: string) => void;
}

export default function ModelRadioGroup({ value, onChange }: IModelRadioGroup) {
  return (
    <FormControl>
      <FormLabel>Image models</FormLabel>
      <RadioGroup row value={value} onChange={e => onChange(e.target.value)}>
        <FormControlLabel
          value="dall-e-2"
          control={<Radio />}
          label="dall-e-2"
        />
        <FormControlLabel
          value="dall-e-3"
          control={<Radio />}
          label="dall-e-3"
        />
      </RadioGroup>
    </FormControl>
  );
}
