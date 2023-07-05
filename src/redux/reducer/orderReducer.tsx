import { Reducer } from 'react';

// const initialState = {
//   orders: [],
//   errorMessage: "",
//   shouldDisplayErrorMessage: false,
// };

// const ordersReducer = (state = initialState, action: Action): State => {
//   switch (action.type) {
//     case "ADD_ORDER":
//       return {
//         ...state,
//         orders: [...state.orders, action.payload],
//       };
//     case "REMOVE_ORDER":
//       return {
//         ...state,
//         orders: state.orders.filter((order) => order.id !== action.payload),
//       };
//     case "SET_ERROR_MESSAGE":
//       return {
//         ...state,
//         errorMessage: action.payload,
//         shouldDisplayErrorMessage: true,
//       };
//     case "CLEAR_ERROR_MESSAGE":
//       return {
//         ...state,
//         errorMessage: "",
//         shouldDisplayErrorMessage: false,
//       };
//     default:
//       return state;
//   }
// };

// export default ordersReducer;
// // const initialState = {
// //   orders: [],
// //   errorMessage: "",
// //   shouldDisplayErrorMessage: false
// //   };
  
// //   const ordersReducer = (state = initialState, action: any) => {
// //   switch (action.type) {
// //   // handle different actions here
// //   default:
// //   return state;
// //   }
// //   };
  
// //   export default ordersReducer;

//export interface Order {
//    costumer:string,
//    product:string
//}

//interface OrdersState {
//  orders: Order[];
//  errorMessage: string;
//  shouldDisplayErrorMessage: boolean;
//}

//interface Action {
//  type: string;
//  payload?: any;
//}

//const initialState: OrdersState = {
//  orders: [],
//  errorMessage: '',
//  shouldDisplayErrorMessage: false,
//};

//const ordersReducer: Reducer<OrdersState, Action> = (state, action) => {
// switch (action.type) {
//   //לכתוב כאן את סוג הפעולה ואז להפעיל אותה

//    default:
//      return state;
//  }
//};

//export default ordersReducer;
