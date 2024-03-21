import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, OutlinedInput } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 10 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function LossSelector() {
  const [stateLossTypes, setStateLossTypes] = useState([]);
  const losses = useSelector((store) => store.options.lossesReducer);
  const filteredOrgs = useSelector((store) => store.filters);

  const dispatch = useDispatch();

  const handleLossTypeChange = (event) => {
    const lossArray = event.target.value;
    setStateLossTypes(lossArray);

    let newList = [];
    for (let loss of lossArray) {
      newList = filteredOrgs?.filter((org) => {
        if (org.agg_loss_type != null) {
          for (let orgLoss of org?.agg_loss_type) {
            if (loss == orgLoss.name) {
              return org;
            }
          }
        }
      });
    }
    dispatch({ type: "SET_FILTER_ORGS", payload: newList });
  };

  return (
    <FormControl sx={{ width: 250 }}>
      <InputLabel id="demo-multiple-checkbox-label">Type of Loss</InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={stateLossTypes}
        onChange={handleLossTypeChange}
        input={<OutlinedInput label="Tag" />}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
      >
        {losses?.map((type, i) => (
          <MenuItem value={type.name} key={type.id}>
            <Checkbox checked={stateLossTypes?.includes(type.name)} id={type.name.toString()} />
            <ListItemText primary={type.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
