import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { SECOND_ACTION_TYPES } from "./../secondState";

export default function BasicSelect({ setAddShip, addShip, secondDispatch }) {
  const [count, setCount] = React.useState("");

  const choosShip = (e) => {
    setCount(e.target.value);
    secondDispatch({
      type: SECOND_ACTION_TYPES.CHOSE_SHEEP,
      number: e.target.value,
    }); 
    setAddShip(false);
  };
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Count</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={count}
          label="Count"
          onChange={choosShip}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
