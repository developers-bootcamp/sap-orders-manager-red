import { Chart } from "react-google-charts";
import { PALLETE } from "../../../../config/config";
import Loader from "../../../../components/loading/Loader";
import React, { useEffect, useState } from "react";
import { topProducts } from "../../../../axios/graphAxios";
import IProduct from "../../../../interfaces/IProduct";
import { number } from "yup";

export const BarChart = () => {

  const options = {
    isStacked: true,
    title: "Top products",
    vAxis: { title: "Cups" },
    hAxis: { title: "Month" },
    seriesType: "bars",
    backgroundColor: `${PALLETE.GRAY}`,
  }

  interface IProductQuantity {
    productId: IProduct;
    totalQuantity: number;
  }

  interface ITopProduct {
    month: number;
    products: Array<IProductQuantity>;
  }

  const [topProduct, setTopProduct] = useState<Array<ITopProduct>>([]);

  const setTopProducts = () => {
    topProducts(7).then(res => {
      setTopProduct([...res.data])
    }).catch(err => {
      console.error(err)
    })
  }

  useEffect(() => {
    setTopProducts()
  }, [])

  let namesProducts: Array<string> = ["Month"];

  topProduct.forEach((item) => {
    item.products.forEach((product) => {
      namesProducts.push(product.productId.name);
    });
  });

  const getLastDateOfMonth = (month: number): string => {
    const now = new Date();
    let currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    if (month > currentMonth)
      currentYear -= 1
    const formattedDate = `${month.toString().padStart(2, '0')}/${currentYear}`;
    return formattedDate;
  }

  let data: Array<Array<any>> = [namesProducts]

  if (topProduct.length !== 0)
    for (let i = 0; i < topProduct.length; i++) {
      let arr: Array<any> = [getLastDateOfMonth(topProduct[i].month)]
      for (let j = 0; j < namesProducts.length - 1; j++)
        arr.push(topProduct[i].products[j]?.totalQuantity || 0)
      data.push(arr)
    }

  return (
    <Chart
      chartType="ComboChart"
      height="100%"
      data={data}
      options={options}
    />
  )
}
