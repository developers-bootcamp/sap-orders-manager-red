import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { PALLETE } from "../../../../config/config";
import Loader from "../../../../components/loading/Loader";
import { topEmployee } from "../../../../axios/graphAxios";
import IUser from "../../../../interfaces/IUser";
import { array } from "yup";

// export const data = [
//   ["Task", "Hours per Day"],
//   ["Work", 11],
//   ["Eat", 2],
//   ["Commute", 2],
//   ["Watch TV", 2],
//   ["Sleep", 7]
// ];

export const options = {
  title: "Top employees",
  backgroundColor: `${PALLETE.GRAY}`,
};

export const PieChart: React.FC = () => {

  const [data, setData] = useState([["", ""]])

  useEffect(() => {
    
    topEmployee().then(res => {
      setData([["", ""]])
      debugger
      let arr = [...res.data]
      for (let i = 0; i < arr.length; i++) {
        setData(prevData => [...prevData, [arr[i].employee.fullName, arr[i].countOfDeliveredOrders]])
      }
      console.log(data);
      debugger
    }).catch(err => {
      console.error(err)
    })
  }, [])

  return (
    <Chart
      chartType="PieChart"
      width="100%"
      height="300px"
      loader={<Loader />}
      data={data}
      options={options}
    />
  );
}
