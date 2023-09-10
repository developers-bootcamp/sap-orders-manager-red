import React, { useState, useEffect } from 'react';
import GlobalModel from '../../../components/GlobalModal';
import NewOrderForm from '../../newOrderForm/NewOrderForm';
import giftsImg from '../../../img/giftsWithBaloons.png'
import OrderDetailForm from '../../orderDetailForm/OrderDetailForm';


// import GlobalPopOver from "../../../components/GlobalPopOver";
// import FilterPop from "../../../pages/filterPop/FilterPop";
import filterImg from "../../../img/filter.png";
import AllFilter from '../../../pages/filterPop/AllFilter';
import GlobalPopOver from '../../../components/GlobalPopOver';
import OrderTable from '../../tables/OrderTable';

import WebSocket from "../../WebSocket";
import axios from 'axios';
import { IOrderState, setFailedOrders, setFilters, setStatusOrders } from '../../../redux/slices/sliceOrder';
import { RootState, useAppDispatch } from '../../../redux/store';
import { useSelector } from 'react-redux';
import { getFailedOrders, getOrders } from '../../../axios/orderAxios';


const PendingOrders: React.FC = () => {
  const dispatch = useAppDispatch();
  const filtersState= useSelector<RootState, IOrderState>(
    (state) => state.orderReducer
  ).filters;
  const filterTables = (filters: any) => {
    console.log(filters)
    dispatch(setFilters({
      ...filters
  }))
  getOrders(0,{...filters})
    .then((response) => {console.log(response);dispatch(setStatusOrders(response.data));})
    .catch((error) => {console.log(error)});   
  getFailedOrders(0,{...filters})
    .then((response) => {console.log(response);dispatch(setFailedOrders(response.data))})
    .catch((error) => {console.log(error)});       
  }
  return (
    <>
      <div style={{ display: "flex" }}>
        <GlobalModel
          btnOpen={"New Order"}
          isButton={true}
          title={"new order"}
          img={giftsImg}
          txtSide={" we are almost done"}
        >
          <NewOrderForm></NewOrderForm>
        </GlobalModel>


        <div style={{ marginLeft: "3%" }}>
          <GlobalPopOver
            name={"filter"}
            Pop={AllFilter}
            image={filterImg}
            filterTables={filterTables}
          ></GlobalPopOver>

          <WebSocket></WebSocket>

        </div>
      </div>
      <br />
      <OrderTable></OrderTable>
    </>
  );
};

export default PendingOrders;
