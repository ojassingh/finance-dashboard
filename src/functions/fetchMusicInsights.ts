import axios from 'axios';

// Function to fetch user's music insights from the Spotify API
async function fetchMusicInsights(accessToken: string) {
  try {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    // Fetch user profile data
    const profileResponse = await axios.get('https://api.spotify.com/v1/me', {
      headers,
    });
    const userProfile = profileResponse.data;

    // Fetch user's top artists
    const topArtistsResponse = await axios.get('https://api.spotify.com/v1/me/top/artists', {
      headers,
    });
    const topArtists = topArtistsResponse.data.items;

    // Fetch user's top tracks
    const topTracksResponse = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
      headers,
    });
    const topTracks = topTracksResponse.data.items;

    // Fetch user's playlists
    const playlistsResponse = await axios.get('https://api.spotify.com/v1/me/playlists', {
      headers,
    });
    const playlists = playlistsResponse.data.items;

    // Combine all the relevant data in an object
    const musicInsights = {
      userProfile,
      topArtists,
      topTracks,
      playlists,
    };

    return musicInsights;
  } catch (error) {
    console.error('Error fetching music insights:', error);
    return null;
  }
}

export default fetchMusicInsights;
