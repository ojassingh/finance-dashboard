import {NextRequest, NextResponse } from "next/server";
import axios from "axios";


export async function GET(req:NextRequest, res: NextResponse) {

  const symbol = req.nextUrl.searchParams.get('symbol')?.toUpperCase() || '';
  const interval = req.nextUrl.searchParams.get('interval')?.toLowerCase() || 'daily';


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
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }

    const labels = Object.keys(timeSeries).reverse().slice(0, 100);
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

      return NextResponse.json({ data: chartData }, { status: 200});

  } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }

//   return NextResponse.json({ symbol : symbol, interval: interval }, { status: 200});
  // return NextResponse.json(tickerArray, { status: 200 });

  
}


