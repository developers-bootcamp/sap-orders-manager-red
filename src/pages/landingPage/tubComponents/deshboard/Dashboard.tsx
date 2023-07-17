import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import { PALLETE } from "../../../../config/config";
import { BarChart } from "./BarChart";
import { LineChart } from "./LineChart";
import { PieChart } from "./PieChart";
import { Typography } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: `${PALLETE.GRAY}`,
  textAlign: "center",
  height: 300,
}));

const Dashboard: React.FC = () => {
  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid xs={12} md={6}>
        <Item>
          <BarChart></BarChart>
        </Item>
      </Grid>
      <Grid xs={12} md={6}>
        <Item>
          <PieChart></PieChart>
        </Item>
      </Grid>
      <Grid xs={12} md={6}>
        <Item>
          <LineChart></LineChart>
        </Item>
      </Grid>
      <Grid xs={12} md={6}>
        <Item>
          <Typography variant="h5">+ create new board</Typography>
        </Item>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
