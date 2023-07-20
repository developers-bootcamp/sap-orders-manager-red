const BASE_URL = process.env.REACT_APP_BASE_URL;

const GET_ALL_ORDERS_URL = `${BASE_URL}/orders`;
const LOG_IN = `${BASE_URL}/user/logIn`
const GET_CURRENCIES = `${BASE_URL}/global/getCurrencies`
const GET_ORDERS = `${BASE_URL}/order`
const SIGN_UP = `${BASE_URL}/user/singUp` 

const PALLETE = {
    BLUE: '#6794CF',
    YELLOW: '#FAE282',
    RED: '#EE696A',
    GREEN: '#7ED787',
    ORANGE: '#EB9F6E',
    WHITE: '#FFFFFF',
    GRAY: '#F2F2F2',
}

export { GET_ALL_ORDERS_URL, LOG_IN, PALLETE, GET_CURRENCIES, SIGN_UP };

