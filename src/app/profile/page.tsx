'use client'

import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

export default function Profile(){

    const { data: session, status } = useSession();
    const [auth, setAuth] = useState(false)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<any>(null);
    const router = useRouter()

    async function getData(){
      try {
        const newData = await axios({
          method: "post",
          url: "/api/profile",
          data: {
            email: email,
            name: name
          },
        });

        setData(newData.data)
        console.log(newData.data)
  
      } catch (error) {
        console.error("Error:", error);
      }
    }
  
    useEffect(()=>{
        setLoading(true)
      if (status == "authenticated") {
        setAuth(true)
        if(session?.user?.email && session?.user?.name){
          setEmail(session?.user?.email)
          setName(session?.user?.name)
        }
        getData();
      }
      else{
        router.push('/');
        alert('You are not logged in')
      }
      // console.log("Auth status", status)
      setLoading(false)
    }, [])

    console.log(data)


    
    return (
        <div className=" h-screen">
          <Navbar/>
        {(loading || !auth) && <h1>Loading...</h1>}

        {auth && (
            <div className="grid place-content-cente gap-10 p-20">
                <h1 className="text-2xl font-bold">Email: {email}</h1>
                <h1 className="text-2xl font-bold">Name: {name}</h1>
                <div className="text-2xl font-bold">
                  <h1>
                    Your articles:
                  </h1>
                  {data && <div>
                    {data?.articles?.articles?.map((article: any) => {
                      return(
                        <Button variant="outline"><a target="_blank" id={article.id} href={article.url}>{article.title}</a></Button>
                      )
                    })}
                  </div>}
                </div>
                
                <div className="text-2xl font-bold">
                  <h1>
                      Your Indeces:
                    </h1>
                    {data && <div>
                      {data?.indeces?.indeces?.map((index: any) => {
                        return(
                          <Button id={index.id} variant="outline">{index.index}</Button>
                        )
                      })}
                    </div>}
                </div>
            </div>
        )}
        </div>
    )
}