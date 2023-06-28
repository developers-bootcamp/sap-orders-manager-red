// import dotenv from 'dotenv';
// Load the environment variables from the .env file
// dotenv.config();

const BASE_URL = "http://localhost:8080"

// const BASE_URL = process.env.DASHBOARD_API_BASE_URL;
console.log(BASE_URL);

// Define the full URL for getting all orders
const GET_ALL_ORDERS_URL = `${BASE_URL}/orders`;
const LOG_IN = `${BASE_URL}/User/logIn`
export { GET_ALL_ORDERS_URL, LOG_IN };

