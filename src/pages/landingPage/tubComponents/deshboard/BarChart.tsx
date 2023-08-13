import { Chart } from "react-google-charts";
import { PALLETE } from "../../../../config/config";
import Loader from "../../../../components/loading/Loader";


export const data = [
  [
    "Month",
    "Bolivia",
    "Ecuador",
    "Madagascar",
    "Papua New Guinea",
    "Rwanda",
  ],
  ["2004/05", 165, 938, 522, 998, 450],
  ["2005/06", 135, 1120, 599, 1268, 288],
  ["2006/07", 157, 1167, 587, 807, 397],
  ["2007/08", 139, 1110, 615, 968, 215],
  ["2008/09", 136, 691, 629, 1026, 366],
];

export const options = {
  isStacked: true,
  title: "Monthly Coffee Production by Country",
  vAxis: { title: "Cups" },
  hAxis: { title: "Month" },
  seriesType: "bars",
  backgroundColor: `${PALLETE.GRAY}`,
};

export const BarChart = () => {

  return (
    <Chart
      chartType="ComboChart"
      width="100%"
      height="300px"
      loader={<Loader />}
      data={data}
      options={options}
    />
  );
}
