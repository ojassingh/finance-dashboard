'use client'

import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Profile(){

    const { data: session, status } = useSession();
    const [auth, setAuth] = useState(false)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null);
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


    
    return (
        <div>
        {(loading || !auth) && <h1>Loading...</h1>}

        {auth && (
            <div>
                <h1>Hi Guys</h1>
            </div>
        )}
        </div>
    )
}