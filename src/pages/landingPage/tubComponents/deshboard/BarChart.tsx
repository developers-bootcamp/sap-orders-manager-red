import { Chart } from "react-google-charts";
import { PALLETE } from "../../../../config/config";
import Loader from "../../../../components/loading/Loader";
import React, { useEffect, useState } from "react";
import { topProducts } from "../../../../axios/graphAxios";


// export const data = [
//   [
//     "Month",
//     "Bolivia",
//     "Ecuador",
//     "Madagascar",
//     "Papua New Guinea",
//     "Rwanda",
//   ],
//   ["2004/05", 165, 938, 522, 998, 450],
//   ["2005/06", 135, 1120, 599, 1268, 288],
//   ["2006/07", 157, 1167, 587, 807, 397],
//   ["2007/08", 139, 1110, 615, 968, 215],
//   ["2008/09", 136, 691, 629, 1026, 366],
// ];

// export const options = {
//   isStacked: true,
//   title: "Monthly Coffee Production by Country",
//   vAxis: { title: "Cups" },
//   hAxis: { title: "Month" },
//   seriesType: "bars",
//   backgroundColor: `${PALLETE.GRAY}`,
// };

export const BarChart = () => {

  const options = {
    isStacked: true,
    title: "Top products",
    vAxis: { title: "Cups" },
    hAxis: { title: "Month" },
    seriesType: "bars",
    backgroundColor: `${PALLETE.GRAY}`,
  }

  const [data, setData] = useState([["", ""]])

  useEffect(() => {
    topProducts(1).then(res => {
      debugger
      setData([["", ""]])

      let arr = [...res.data[0].products]
      console.log(arr);
      debugger
      let arr1: Array<string> = []
      arr.forEach(element => {
        arr1.push(element.productId.Name)
      })
      console.log(arr1);

      // setData(arr1)

      // arr[0].products.forEach(element => {
      //   arr1.push(element.products)
      //   setData(prevData => [...prevData, [element.employee.fullName, element.countOfDeliveredOrders]])
      // });
    }).catch(err => {
      console.error(err)
    })
  }, [])

  return (
    <Chart
      chartType="ComboChart"
      height="100%"
      data={data}
      options={options}
    />
  )
}
