import React,{useState,useEffect} from 'react';
import GlobalModel from '../../../components/GlobalModal';
import NewOrderForm from '../../newOrderForm/NewOrderForm';
import giftsImg from '../../../img/giftsWithBaloons.png'
import io from 'socket.io-client';
// import IOrder from '../../../interfaces/IOrder';

interface IOrder {
  id: string;
  // Other properties of the Order type
}
const PendingOrders: React.FC = () => {
const order1:IOrder = {"id":"1"};
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    //mabay from config...
   const socket = io('http://localhost:8081');

    // Listen for new order events from the server
    socket.on('new-order', (data: IOrder) => {
      // Add the new order to the list of orders
      setOrders((prevOrders) => [...prevOrders, data]);
      console.log(data);
    });

    // Clean up the socket connection
    return () => {
      socket.disconnect();
      console.log("disconnect");
      
    };
  }, []);


  return (
    <>
      <GlobalModel btnOpen={"New Order"} isButton={true} title={"new order"} img={giftsImg} txtSide={"we are almost done"}>
        <NewOrderForm></NewOrderForm>
      </GlobalModel>    
      <ul>
        {orders.map((order) => (
          <li key={order.id}>{order.id}</li>
          // Display other properties of the Order as needed
        ))}
      </ul> 
    </>
  )
};

export default PendingOrders;

