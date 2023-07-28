'use client'
import fetchMusicInsights from "@/functions/fetchMusicInsights";
import { useEffect, useState } from "react";
import axios from "axios";


async function getData(accessToken: string) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const profileResponse = await axios.get('https://api.spotify.com/v1/me', {
    headers: headers,
  });
  console.log(profileResponse.data)
}



function Profile({ params }: any) {

  const [data, setData] = useState(null);
  const accessToken = params.slug;
  getData(accessToken)

  // useEffect(() => {
  //   const getData = async () => {
      
  //   }
  //   getData()
  // }, [])

  return <div>My Post: {data}</div>
}


export default Profile;