'use client'

import { Article } from "./Card"

export default function Articles(articles: any){

    const articleArray = articles.articles.slice(0,10);

    return(<div className="flex flex-wrap gap-4">
        {articleArray.map((article: any, i:any)=>{
            return(<Article article={article} key={i}/>)
        })}
    </div>)
}