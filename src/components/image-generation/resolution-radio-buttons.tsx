import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { ResolutionType } from "@/types/image-generation";

interface IRowRadioButtonsGroup {
  value: ResolutionType;
  onChange: (value: ResolutionType) => void;
}

export default function ResolutionRadioGroup({
  value,
  onChange
}: IRowRadioButtonsGroup) {
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">
        Image resolution
      </FormLabel>
      <RadioGroup
        row
        value={value}
        onChange={e => onChange(e.target.value as ResolutionType)}
      >
        <FormControlLabel value="256x256" control={<Radio />} label="256x256" />
        <FormControlLabel value="512x512" control={<Radio />} label="512x512" />
        <FormControlLabel
          value="1024x1024"
          control={<Radio />}
          label="1024x1024"
        />
        <FormControlLabel
          value="1024x1792"
          control={<Radio />}
          label="1024x1792"
        />
        <FormControlLabel
          value="1792x1024"
          control={<Radio />}
          label="1792x1024"
        />
      </RadioGroup>
    </FormControl>
  );
}
