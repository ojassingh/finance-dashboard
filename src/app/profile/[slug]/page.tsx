'use client'
import fetchMusicInsights from "@/functions/fetchMusicInsights";
import { useEffect, useState } from "react";
import axios from "axios";


async function getData(accessToken: string) {
  try {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    // Fetch user profile data
    const profileResponse = await axios.get('https://api.spotify.com/v1/me', {
      headers,
    });
    const userProfile = profileResponse.data;
    

    // Fetch user's top tracks
    const topTracksResponse = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
      headers,
    });
    const topTracks = topTracksResponse.data.items;

    // // Fetch user's playlists
    // const playlistsResponse = await axios.get('https://api.spotify.com/v1/me/playlists', {
    //   headers,
    // });
    // const playlists = playlistsResponse.data.items;

    // Combine all the relevant data in an object
    const musicInsights = {
      userProfile,
      // topArtists,
      topTracks,
      // playlists,
    };

    console.log(musicInsights);
  } catch (error) {
    console.error('Error fetching music insights:', error);
    return null;
  }
}



function Profile({ params }: any) {

  const accessToken = params.slug;
  getData(accessToken)

  return <div>My Post:</div>
}


export default Profile;