import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { usePathname } from 'next/navigation'


export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const userInput = await req.nextUrl.searchParams.get("input")?.toUpperCase() || "";
    const body = await req.json();
    const tickerArray = body.body;
    
    const matchedTickers = tickerArray.filter((ticker: any) =>
      ticker.symbol.startsWith(userInput)
    );

    const matchedStocks = tickerArray.filter((stock: any) => {
      const symbolMatch = stock.symbol.startsWith(userInput);
      const nameMatch = stock.name
        .toLowerCase()
        .startsWith(userInput.toLowerCase());
      return symbolMatch || nameMatch;
    });

    const sortedTickers = matchedStocks.slice(0, 7); // Limit to 7 results

    return NextResponse.json({ results: sortedTickers }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Error found" }, { status: 500 });
  }
  // return NextResponse.json(tickerArray, { status: 200 });
}
