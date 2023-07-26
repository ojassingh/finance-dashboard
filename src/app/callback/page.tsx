'use client'

import { useEffect } from 'react';
import axios from 'axios';
import querystring from 'querystring';
// import { useRouter } from 'next/navigation';


const Callback = ({router}: any) => {
    


  useEffect(() => {

    const getCode = async () => {

      // Get the authorization code from the URL query parameters
      const code = new URLSearchParams(window.location.search).get('code');
      if (!code) {
        console.error('Authorization code not found.');
        return;
      }

      try {
        // Exchange the authorization code for an access token
        const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
        const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
        const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;

        const authString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
        const data = {
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: redirectUri,
        };

        const response = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify(data), {
          headers: {
            'Authorization': `Basic ${authString}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

        const accessToken = response.data.access_token;
        // Use the access token for your Spotify API requests or store it in a state management solution
        // console.log(accessToken)
        window.location.href = `http://localhost:3000/profile/${accessToken}`;
      } catch (error) {
        console.error('Error exchanging code for access token:', error);
      }
    };

    getCode();
  }, []);

  return <div>Logging in...</div>;
};

export default Callback;