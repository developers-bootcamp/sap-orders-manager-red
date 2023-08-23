import React from "react";
import { Chart } from "react-google-charts";
import { PALLETE } from "../../../../config/config";
import Loader from "../../../../components/loading/Loader";

export const data = [
  ["Year", "Sales", "Expenses"],
  ["2004", 1000, 400],
  ["2005", 1170, 460],
  ["2006", 660, 1120],
  ["2007", 1030, 540],
];

export const options = {
  title: "Company Performance",
  curveType: "function",
  legend: { position: "bottom" },
  backgroundColor: `${PALLETE.GRAY}`,
};

export const LineChart: React.FC = () => {
  return (
    <Chart
      chartType="LineChart"
      height="100%"
      loader={<Loader />}
      data={data}
      options={options}
    />
  );
}
