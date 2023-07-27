# Spotify User Analytics

This is a Spotify-based Next.js application that allows users to log in with their Spotify account and access their Spotify API data. The app uses the Spotify Web API to authenticate users and retrieve their access token, which can then be used for making authorized requests to the Spotify API.

## Features

- User authentication with Spotify
- Fetching user data from the Spotify API
- Accessing user playlists, tracks, and other Spotify data
- React-based UI for a seamless user experience

## Getting Started

To run this application on your local machine, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/your-username/spotify-nextjs-app.git
cd spotify-nextjs-app
```

2. Install Dependencies:

```bash
npm install
```

3. Setup environmental variables

```bash
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=your_spotify_client_id
NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
NEXT_PUBLIC_SPOTIFY_REDIRECT_URI=http://localhost:3000/callback
```

Replace your_spotify_client_id and your_spotify_client_secret with your actual Spotify application credentials. The NEXT_PUBLIC_SPOTIFY_REDIRECT_URI is the callback URL for Spotify authorizatio

4. Start the development server

```bash
npm run dev
```

The app should now be running on http://localhost:3000.

## Usage

1. Open your browser and navigate to http://localhost:3000.
2. Click on the "Log in with Spotify" button to authorize the app with your Spotify account.
3. You will be redirected to the Spotify login page. Enter your credentials and authorize the app.
4. After successful login, you will be redirected back to the app.
5. The app will fetch your access token from Spotify and use it to make authorized requests to the Spotify API.
6. You can now access your Spotify data and explore various features of the app.


## Built with

* Next.js - The React framework for building the application
* Axios - For making HTTP requests to the Spotify Web API
* querystring - For parsing and handling URL query parameters
* Spotify Web API - For user authentication and data retrieval

## Contributing

Contributions are welcome! If you find any issues or have any suggestions for improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

## Acknowledgments 

Special thanks to the Spotify Web API for providing the necessary tools to create this application.
