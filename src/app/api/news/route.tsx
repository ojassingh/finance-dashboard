import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest, res: NextResponse) {
  try {

    const query = await req.nextUrl.searchParams.get("query") || "";
    const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY

    const news = await fetch(`https://newsapi.org/v2/everything?apiKey=${apiKey}&q=${query}`)
    const data = await news.json()
    const articles = await data.articles;

    // console.log(data)

    return NextResponse.json({ articles : articles }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Error found" }, { status: 500 });
  }
}
