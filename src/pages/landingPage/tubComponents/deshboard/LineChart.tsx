import React, { useEffect } from "react";
import { Chart } from "react-google-charts";
import { PALLETE } from "../../../../config/config";
import { getStatus } from "../../../../axios/graphAxios";

export const LineChart: React.FC = () => {

  const data = [
    ["Year", "Sales", "Expenses"],
    ["2004", 1000, 400],
    ["2005", 1170, 460],
    ["2006", 660, 1120],
    ["2007", 1030, 540],
  ];

  const options = {
    title: "Company Performance",
    curveType: "function",
    legend: { position: "bottom" },
    backgroundColor: `${PALLETE.GRAY}`,
  };

  useEffect(() => {
    getStatus()
      .then(res => {
        debugger
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  })

  return (
    <Chart
      chartType="LineChart"
      height="100%"
      data={data}
      options={options}
    />
  );
}
