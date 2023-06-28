import React from 'react';
import GlobalModel from './GlobalModal';
import NewOrderForm from './NewOrderForm';
import giftsImg from '../img/gifts.png'

const PendingOrders: React.FC = () => {
  
  return <>
   <p>pendingOrders component</p>
    <GlobalModel btnOpen={"Sign Up"} title={"Set up your account"} img={giftsImg} txtSide={" Fill in your details so you can login later"}>
      <NewOrderForm></NewOrderForm>
    </GlobalModel>
  </>
};

export default PendingOrders;