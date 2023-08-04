'use client'

import { useState, ChangeEvent } from "react";
import axios from "axios";
import { Chart as Chart2} from "react-chartjs-2";
import { Chart, type ChartData, type ChartOptions, registerables} from 'chart.js';

interface StockData {
  [key: string]: string;
}

const Dashboard: React.FC = () => {


  Chart.register(...registerables);
  
  interface LineProps {
    options: ChartOptions<'line'>;
    data: ChartData<'line'>;
  }


  const [symbol, setSymbol] = useState<string>("");
  const [data, setData] = useState(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSymbol(event.target.value);
  };

  const fetchData = async () => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY;
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`
      );
      const timeSeries: { [date: string]: StockData } = await response.data[
        "Time Series (Daily)"
      ];

      if (!timeSeries) {
        console.error(
          "Error fetching stock data: Time series data is null or undefined."
        );
        setData(null);
        return;
      }

      const labels =  Object.keys(timeSeries).reverse()

      const chartData: any = {
        labels: labels,
        datasets: [
          {
            label: "Dataset 1",
            data: Object.values(timeSeries).map((data) =>
              parseFloat(data["4. close"])
            ),
            // data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      };

      setData(chartData);
      console.log(chartData);
    } catch (error) {
      console.error("Error fetching stock data:", error);
      setData(null);
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };

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
          <Chart2 className="h-48" type="line" options={options} data={data}/>
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
