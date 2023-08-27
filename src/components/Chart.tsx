"use client";

import { Chart, registerables } from "chart.js";
import { Chart as Chart2 } from "react-chartjs-2";

export default function Line({chartData}: any) {

  Chart.register(...registerables);

//   const chartData = chartData;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        text: "Daily data",
      },
      title: {
        display: true,
        text: "Daily Chart",
      },
    },
  };

  return (
    <div className="">
      <Chart2 className="h-80" type="line" options={options} data={chartData} />
    </div>
  );
}
