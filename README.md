# Finance Dashboard with Next.js, TypeScript, Alpha Vantage, Newsdata.io, MySQL, Prisma, and Docker
## Overview
This is a finance dashboard application that allows users to fetch stock data and read news articles for any stock ticker. It is built using Next.js and TypeScript for the frontend, Alpha Vantage for stock data, Newsdata.io for news articles, MySQL for user information storage, Prisma as the ORM, and Docker to run a MySQL container locally.

<img width="1467" alt="Screenshot 2023-09-04 at 6 55 29 PM" src="https://github.com/ojassingh/trading-dashboard/assets/64021709/406d27fc-97e3-49d6-982e-b1c613c8adaf">


## Features
-  Stock Data: Fetch real-time stock data for any ticker symbol.
-  News Articles: Retrieve the latest news articles related to a selected stock.
-  User Accounts: Store user information securely using MySQL and Prisma.

## Prerequisites
Before running the application, ensure you have the following installed:
- Node.js and npm: Make sure you have Node.js and npm installed. You can download them from nodejs.org.
- Docker: Install Docker to run the MySQL container locally. You can get it from docker.com.

## Getting Started

1. Clone the repository:
Copy code
```bash
git clone https://github.com/yourusername/finance-dashboard.git
```
Navigate to the project directory:
2. Copy code
```bash
cd finance-dashboard
Install project dependencies:
```

3. Copy code
```bash
npm install
```

4. Set up environment variables:

Create a .env.local file in the project root and configure the following environment variables:

```bash
# Alpha Vantage API Key (Get your key at https://www.alphavantage.co/)
ALPHA_VANTAGE_API_KEY=your_api_key_here

# Newsdata.io API Key (Get your key at https://newsdata.io/)
NEWSDATA_API_KEY=your_api_key_here

# MySQL Database Connection URL (e.g., mysql://username:password@host:port/database)
DATABASE_URL=mysql://your_username:your_password@localhost:3306/finance_dashboard
```

5. Start the MySQL container:

Run the following Docker command to start a MySQL container with the necessary configurations:

```bash
Copy code
docker run --name finance-mysql -e MYSQL_ROOT_PASSWORD=your_password_here -p 3306:3306 -d mysql:latest
```

6. Run database migrations:
```
bash
Copy code
npx prisma migrate dev
```

7. Start the application:

```bash
Copy code
npm run dev
```

8. Open your browser and access the application at http://localhost:3000.

## Usage
- Stock Data: Enter a stock ticker symbol in the input field and click "Fetch Data" to retrieve real-time stock information.

- News Articles: After fetching stock data, scroll down to see the latest news articles related to the selected stock.

- User Accounts: The application allows user registration and login. User information is securely stored in the MySQL database.


## Acknowledgments
- Alpha Vantage (https://www.alphavantage.co/)
- Newsdata.io (https://newsdata.io/)
- Next.js (https://nextjs.org/)
- Prisma (https://www.prisma.io/)

