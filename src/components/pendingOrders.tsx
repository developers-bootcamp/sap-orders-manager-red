import React from 'react';
import GlobalModel from './GlobalModal';
import NewOrderForm from './NewOrderForm';
import giftsImg from '../img/giftsWithBaloons.png'

const PendingOrders: React.FC = () => {
  
  return <>
   <p>pendingOrders component</p>
    <GlobalModel btnOpen={"Sign Up"} title={"new order"} img={giftsImg} txtSide={" we are almost done"}>
      <NewOrderForm></NewOrderForm>
    </GlobalModel>
  </>
};

export default PendingOrders;