import React,{useState,useEffect} from 'react';
import GlobalModel from '../../../components/GlobalModal';
import NewOrderForm from '../../newOrderForm/NewOrderForm';
import giftsImg from '../../../img/giftsWithBaloons.png'



const PendingOrders: React.FC = () => {
  return (
    <>
      <GlobalModel btnOpen={"New Order"} isButton={true} title={"new order"} img={giftsImg} txtSide={"we are almost done"}>
        <NewOrderForm></NewOrderForm>
      </GlobalModel>     
    </>
  )
};

export default PendingOrders;
