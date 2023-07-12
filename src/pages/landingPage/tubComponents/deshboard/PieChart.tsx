import React from "react";
import { Chart } from "react-google-charts";
import { PALLETE } from "../../../../config/config";

export const data = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7]
];

export const options = {
  title: "My Daily Activities",
  backgroundColor: `${PALLETE.GRAY}`,
};

export function PieChart() {
  return (
    <Chart
      chartType="PieChart"
      width="100%"
      height="300px"
      data={data}
      options={options}
    />
  );
}
