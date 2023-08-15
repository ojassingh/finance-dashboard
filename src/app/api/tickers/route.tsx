import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(){

  try {
    const apiKey = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY;

    const response = await axios.get(
        `https://raw.githubusercontent.com/rreichel3/US-Stock-Symbols/main/nasdaq/nasdaq_full_tickers.json`
    );
    
    const tickerArray = response.data;

    // console.log(response)
    return NextResponse.json({ response: tickerArray }, { status: 200});

  } catch (error) {
    console.error("Error fetching stock data:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })

  }

//   return NextResponse.json({ message: "Hello World" }, { status: 200 });


};
