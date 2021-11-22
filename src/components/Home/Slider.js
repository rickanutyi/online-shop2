import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { productsContext } from "../../contexts/ProductsContext";
import history from "../../helpers/history";
function valuetext(value) {
  return `${value} сом`;
}

export default function RangeSlider() {
  const [value, setValue] = React.useState([0, 15000]);

  const { getProducts } = React.useContext(productsContext);

  const handleChange = (event, newValue) => {
    // console.log(event);
    setValue(newValue);
    //
    const search = new URLSearchParams(history.location.search);
    search.set("price_gte", newValue[0]);
    search.set("price_lte", newValue[1]);
    history.push(`${history.location.pathname}?${search.toString()}`);
    getProducts(search.toString());
  };

  return (
    <Box sx={{ width: 200 }}>
      <Slider
        getAriaLabel={() => "price range"}
        value={value}
        max={15000}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box>
  );
}
