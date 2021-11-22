import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { productsContext } from "../../contexts/ProductsContext";
import history from "../../helpers/history";
import RangeSlider from "./Slider";

const Sidebar = () => {
  const { getProducts } = useContext(productsContext);
  const [memory, setMemory] = useState(getMemory());

  function getMemory() {
    const search = new URLSearchParams(history.location.search);
    return search.get("memory");
  }

  function handleChange(e) {
    if (e.target.value === "all") {
      history.push(`${history.location.pathname.replace("memory")}`);
      getProducts();
      return;
    }

    const search = new URLSearchParams(history.location.search);
    search.set("memory", e.target.value);
    history.push(`${history.location.pathname}?${search.toString()}`);
    getProducts(search.toString());
    setMemory(e.target.value);
    console.log(search.toString());
  }

  return (
    <Grid p={10} md={3}>
      <Paper>
        <FormControl component="fieldset">
          <FormLabel component="legend">Memory</FormLabel>
          <RadioGroup
            value={memory}
            onChange={handleChange}
            aria-label="memory"
            name="memory1"
          >
            <FormControlLabel value="64" control={<Radio />} label="64" />
            <FormControlLabel value="128" control={<Radio />} label="128" />
            <FormControlLabel value="256" control={<Radio />} label="256" />
            <FormControlLabel value="512" control={<Radio />} label="512" />
            <FormControlLabel value="1024" control={<Radio />} label="1024" />
            <FormControlLabel value="all" control={<Radio />} label="All" />
          </RadioGroup>
          <RangeSlider />
        </FormControl>
      </Paper>
    </Grid>
  );
};

export default Sidebar;
