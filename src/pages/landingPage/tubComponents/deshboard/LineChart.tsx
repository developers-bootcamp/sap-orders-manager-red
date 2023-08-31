import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { PALLETE } from "../../../../config/config";
import { getStatus } from "../../../../axios/graphAxios";

export const LineChart: React.FC = () => {

  const options = {
    title: "Deliver/Cancel Orders",
    curveType: "function",
    legend: { position: "bottom" },
    backgroundColor: `${PALLETE.GRAY}`,
  };

  const [status, setStatus] = useState<Object>({});

  let keys: string[] = []
  let values: Array<Array<any>> = []
  let data: Array<Array<any>> = [["Month", "Delivered", "Cancelled "]]

  Object.keys(status).map(item => {
    keys.push(item)
  })

  Object.values(status).map((item) => {
    const temp: Array<any> = [parseInt(Object.keys(item)[0]), Object.values(item)[0]];
    values.push(temp)
  });

  for (let i = 0; i < keys.length; i++) {
    let arr: Array<any> = [keys[i], values[i][0], values[i][1]]
    data.push(arr)
  }
  
  useEffect(() => {
    getStatus()
      .then(res => {
        setStatus({ ...res.data })
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  return (
    <Chart
      chartType="LineChart"
      height="100%"
      data={data}
      options={options}
    />
  );
}
