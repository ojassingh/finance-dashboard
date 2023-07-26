'use client'
import querystring from 'querystring';

const SpotifyLoginButton = () => {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;
  const scope = 'user-read-private user-read-email'; // Define the scopes you need access to



  const handleSpotifyLogin = () => {
    const queryParams = querystring.stringify({
      client_id: clientId,
      response_type: 'code',
      redirect_uri: redirectUri,
      scope: scope,
    });

    window.location.href = `https://accounts.spotify.com/authorize?${queryParams}`;
    // console.log(clientId)
  };

  return <button onClick={handleSpotifyLogin}>Log in with Spotify</button>;
};

export default SpotifyLoginButton;