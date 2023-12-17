import Chart from "react-apexcharts";
import getData from "../helpers/getData";

export default function ProbabilityChart({ workers, activeFilter }) {
  let data = getData(workers, activeFilter);
  const chartConfig = {
    type: "bar",
    height: 240,
    series: [
      {
        name: "Количество",
        data,
      },
    ],
    options: {
      colors: ["#FE5E48"],
      fill: {
        opacity: 0.8,
      },
      chart: {
        type: "bar",
        height: 380,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      xaxis: {
        type: "category",
        labels: {
          formatter: function (val) {
            return val;
          },
          style: {
            fontWeight: "bold",
          },
        },
      },
      title: {
        text: "",
      },
      tooltip: {
        enabled: false,
        x: {
          formatter: function (val) {
            return val;
          },
        },
      },
    },
  };
  return <Chart {...chartConfig} />;
}
