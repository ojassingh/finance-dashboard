"use client";

import { useState, ChangeEvent } from "react";
import { Chart as Chart2 } from "react-chartjs-2";
import {
  Chart,
  type ChartData,
  type ChartOptions,
  registerables,
} from "chart.js";
import fetchStockData from "@/functions/fetchStockData";
// import fetchTickers from "@/functions/fetchTickers";

const Dashboard: React.FC = () => {

  Chart.register(...registerables);

  const [symbol, setSymbol] = useState<string>("");
  const [interval, setInterval] = useState<string>("daily");
  const [data, setData] = useState(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSymbol(event.target.value);
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };


  const fetchData = async () => {
    const data = await fetchStockData({symbol, interval});
    console.log(data)
    setData(data);
  }


  return (
    <div>
      <h1>Financial Market Tracker</h1>
      <div>
        <input
          type="text"
          value={symbol}
          onChange={handleChange}
          placeholder="Enter stock symbol (e.g., AAPL)"
        />
        <button onClick={fetchData}>Fetch Data</button>
      </div>
      {data ? (
        <div className="">
          <Chart2 className="h-80" type="line" options={options} data={data} />
        </div>
      ) : (
        <p>
          Enter a valid stock symbol and click "Fetch Data" to view the chart.
        </p>
      )}
    </div>
  );
};

export default Dashboard;
