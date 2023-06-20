// import { Action } from "redux";

const initialState = {
  orders: [],
  errorMessage: "",
  shouldDisplayErrorMessage: false,
};

export const ordersReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "ADD_ORDER":
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };
    case "REMOVE_ORDER":
      return {
        ...state,
        orders: state.orders.filter((order) => order !== action.payload),
      };
    case "SET_ERROR_MESSAGE":
      return {
        ...state,
        errorMessage: action.payload,
        shouldDisplayErrorMessage: true,
      };
    case "CLEAR_ERROR_MESSAGE":
      return {
        ...state,
        errorMessage: "",
        shouldDisplayErrorMessage: false,
      };
    default:
      return state;
  }
};
