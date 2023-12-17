import ReactApexChart from "react-apexcharts";

export default function ProbabilityDiagram({ probability }) {
  const chartData = {
    series: [probability, 1 - probability],
    type: "donut",
    width: 360,
    options: {
      chart: { type: "donut" },
      legend: { show: false },
      dataLabels: { enabled: false },
      tooltip: { enabled: false },
      fill: { colors: ["#FE5E48", "#D7B297"] },
      states: {
        hover: { filter: { type: "none", value: 0 } },
        active: { filter: { type: "none", value: 0 } },
      },
      stroke: { width: 0 },
      plotOptions: {
        pie: {
          expandOnClick: false,
          donut: {
            size: "85%",
            labels: {
              show: true,
              name: { show: false },
              total: {
                show: true,
                showAlways: true,
                formatter: function () {
                  return probability * 100 + "%";
                },
              },
            },
          },
        },
      },
    },
  };

  return <ReactApexChart {...chartData} />;
}
