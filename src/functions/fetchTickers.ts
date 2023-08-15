import axios from "axios";

const fetchTickers = async () => {

  try {
    const apiKey = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY;

    const response = await axios.get(
        `https://raw.githubusercontent.com/rreichel3/US-Stock-Symbols/main/nasdaq/nasdaq_full_tickers.json`
    );
    
    return response.data;
    // console.log(response.data);

  } catch (error) {
    console.error("Error fetching stock data:", error);
    return null;
  }
};

export default fetchTickers;
