const BASE_URL = process.env.REACT_APP_BASE_URL;

const GET_ALL_ORDERS_URL = `${BASE_URL}/orders`;
const LOG_IN = `${BASE_URL}/user/logIn`
const GET_CURRENCIES = `${BASE_URL}/global/getCurrencies`
const UPDATE_ORDER = `${BASE_URL}/order/updateOrder`
const GET_ALL_USER=`${BASE_URL}/user`
const SIGN_UP = `${BASE_URL}/user/signUp` 
const GET_ALL_CATEGORY = `${BASE_URL}/productCategory`
const GET_ALL_PRODUCT = `${BASE_URL}/product`
const TOP_EMPLOYEE = `${BASE_URL}/graph/topEmployee`
const TOP_PRODUCTS = `${BASE_URL}/graph`
const DELETE_CATEGORY = `${BASE_URL}/productCategory`
const EDIT_CATEGORY = `${BASE_URL}/productCategory`
const ADD_CATEGORY = `${BASE_URL}/productCategory`
const DELETE_PRODUCT = `${BASE_URL}/product`
const EDIT_PRODUCT = `${BASE_URL}/product`
const ADD_PRODUCT = `${BASE_URL}/product`
const DYNAMIC_GRAPH = `${BASE_URL}/graph/dynamicGraph`

const DELETE_USER = `${BASE_URL}/user`
const EDIT_USER = `${BASE_URL}/user`
const ADD_USER = `${BASE_URL}/user`

const PALLETE = {
    BLUE: '#6794CF',
    YELLOW: '#FAE282',
    RED: '#EE696A',
    GREEN: '#7ED787',
    ORANGE: '#EB9F6E',
    WHITE: '#FFFFFF',
    GRAY: '#F2F2F2',
}

export {
    GET_ALL_ORDERS_URL,
    LOG_IN,
    PALLETE,
    GET_CURRENCIES,
    SIGN_UP,
    GET_ALL_CATEGORY,
    GET_ALL_PRODUCT,
    DELETE_CATEGORY,
    EDIT_CATEGORY,
    ADD_CATEGORY,
    DELETE_PRODUCT,
    EDIT_PRODUCT,
    ADD_PRODUCT,
    GET_ALL_USER,
    DELETE_USER,
    EDIT_USER,ADD_USER,
    TOP_EMPLOYEE,
    TOP_PRODUCTS,
    DYNAMIC_GRAPH,
    UPDATE_ORDER
};

