import React,{useState,useEffect} from 'react';
import GlobalModel from '../../../components/GlobalModal';
import NewOrderForm from '../../newOrderForm/NewOrderForm';
import giftsImg from '../../../img/giftsWithBaloons.png'
import OrderDetailForm from '../../orderDetailForm/OrderDetailForm';



const PendingOrders: React.FC = () => {
  return (
    <>
      <GlobalModel btnOpen={"New Order"} isButton={true} title={"new order"} img={giftsImg} txtSide={"we are almost done"}>
        <NewOrderForm></NewOrderForm>
      </GlobalModel>

      <GlobalModel btnOpen={"Order Detail"} isButton={true} title={"Order Detail"} img={giftsImg} txtSide={"we are almost done"}>
       <OrderDetailForm></OrderDetailForm>
      </GlobalModel>    </>
  )
};

export default PendingOrders;
