import axios from "axios";

const fetchStockData = async (props: any) => {

  const interval = props.interval;
  const symbol = props.symbol;

  try {
    const apiKey = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY;

    var response = null;

    if (interval.toLowerCase() === "intraday") {
      response = await axios.get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_${interval.toUpperCase()}&symbol=${symbol}&interval=60min&apikey=${apiKey}&outputsize=compact`
      );
    } else {
      response = await axios.get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_${interval.toUpperCase()}&symbol=${symbol}&apikey=${apiKey}&outputsize=compact`
      );
    }

    var timeSeries = null;

    if (interval.toLowerCase() === "weekly") {
      timeSeries = response.data[`Weekly Time Series`];
    } else if (interval.toLowerCase() === "monthly") {
      timeSeries = response.data[`Monthly Time Series`];
    } else if (interval.toLowerCase() === "intraday") {
      timeSeries = response.data[`Time Series (5min)`];
    } else {
      timeSeries = response.data[`Time Series (Daily)`];
    }

    if (!timeSeries) {
      console.error(
        "Error fetching stock data: Time series data is null or undefined."
      );
      return;
    }

    const labels = Object.keys(timeSeries).slice(0, 30);
    const prices = Object.values(timeSeries).map((data: any) =>
      parseFloat(data["4. close"])
    );

    const chartData: any = {
      labels: labels,
      datasets: [
        {
          label: "Dataset 1",
          data: prices,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    };

    return chartData;
  } catch (error) {
    console.error("Error fetching stock data:", error);
    return null;
  }
};

export default fetchStockData;
