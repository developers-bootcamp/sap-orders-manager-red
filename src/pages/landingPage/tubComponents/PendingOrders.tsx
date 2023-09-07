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


const PendingOrders: React.FC = () => {
  const filterTables = (filters: any) => {
    console.log(filters)
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
