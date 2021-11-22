import React from "react";
import Content from "./Content";
import "../../assets/css/Home.css";
import Sidebar from "./Sidebar";
import { Grid } from "@mui/material";

const Home = () => {
  return (
    <Grid container spacing={3}>
      <Sidebar />
      <Content />
    </Grid>
  );
};

export default Home;
