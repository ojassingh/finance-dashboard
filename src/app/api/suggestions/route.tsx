import {NextRequest, NextResponse } from "next/server";
// import fetchTickers from "@/functions/fetchTickers";
 
export async function GET(req:NextRequest, res: NextResponse) {

  const userInput = req.nextUrl.searchParams.get('input')?.toUpperCase() || '';

  const data = await fetch("http://localhost:3000/api/tickers");
  const stockTickers = await data.json();
  const tickerArray = stockTickers.response;

  // const matchedTickers = tickerArray.filter((ticker: any) =>
  //   ticker.symbol.startsWith(userInput)
  // );

  const matchedStocks = tickerArray.filter((stock: any) => {
    const symbolMatch = stock.symbol.startsWith(userInput);
    const nameMatch = stock.name.toLowerCase().startsWith(userInput.toLowerCase());
    return symbolMatch || nameMatch;
  });

  const sortedTickers = matchedStocks.slice(0, 7); // Limit to 10 results

  return NextResponse.json({ results: sortedTickers }, { status: 200});
  // return NextResponse.json(tickerArray, { status: 200 });
}