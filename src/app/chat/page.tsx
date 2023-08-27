
'use client'
import { useEffect } from "react";


export default function Page(){

    async function getData() {
        const data = await fetch("/api/news");
        const news = await data.json();
        console.log(news)
    }

    useEffect(()=>{
        getData();
    }, [])

    return (
        <main className="">
        <h1>hi there</h1>
        </main>
    );
}