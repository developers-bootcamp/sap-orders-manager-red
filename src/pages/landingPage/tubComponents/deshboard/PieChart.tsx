import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { PALLETE } from "../../../../config/config";
import Loader from "../../../../components/loading/Loader";
import { topEmployee } from "../../../../axios/graphAxios";

 
export const PieChart: React.FC = () => {

  const options = {
    title: "Top employees",
    backgroundColor: `${PALLETE.GRAY}`,
  }

  const [data, setData] = useState([["", ""]])

  useEffect(() => {
    topEmployee().then(res => {
      setData([["", ""]])
      let arr = [...res.data]      
      arr.forEach(element => {
        setData(prevData => [...prevData, [element.employee.fullName, element.countOfDeliveredOrders]])
      });
    }).catch(err => {
      console.error(err)
    })
  }, [])

  return (
    <Chart
      chartType="PieChart"
      height="100%"
      data={data}
      options={options}
    />
  )
}
