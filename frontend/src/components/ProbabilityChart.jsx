import Chart from "react-apexcharts";

export default function ProbabilityChart({ probabilities, activeFilter }) {
  let labels = [];

  if (activeFilter.toLowerCase() == "по месяцам")
    labels = [
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
      "Январь",
      "Февраль",
      "Март",
    ];
  else if (activeFilter.toLowerCase() == "по годам")
    labels = [
      "2012",
      "2013",
      "2014",
      "2015",
      "2016",
      "2017",
      "2018",
      "2019",
      "2020",
      "2021",
      "2022",
      "2023",
    ];
  const chartConfig = {
    type: "line",
    height: 240,
    series: [
      {
        name: "Средний прогноз",
        data: probabilities,
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },

      title: {
        show: "",
      },
      colors: ["#FE5E48"],
      stroke: {
        lineCap: "round",
      },
      markers: {
        size: 5,
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: labels,
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "light",
      },
    },
  };
  return <Chart {...chartConfig} />;
}
