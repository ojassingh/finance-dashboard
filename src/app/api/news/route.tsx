import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest, res: NextResponse) {
  try {

    const news = await fetch("https://newsdata.io/api/1/news?apikey=pub_2829142afcfeb484a78808d9f5ce8ab832492&language=en")

    const data = await news.json()
    const articles = await data.results;

    return NextResponse.json({ articles : articles }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Error found" }, { status: 500 });
  }
  // return NextResponse.json(tickerArray, { status: 200 });
}
