import axios from "axios";

const fetchTickers = async (props: string) => {

  const name = props;
  try {
    const apiKey = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY;

    const response = await axios.get(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${name}&apikey=${apiKey}`
    );
    
    return response.data;
    console.log(response.data);

  } catch (error) {
    console.error("Error fetching stock data:", error);
    return null;
  }
};

export default fetchTickers;
