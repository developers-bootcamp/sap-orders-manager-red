import React,{useState,useEffect} from 'react';
import GlobalModel from '../../../components/GlobalModal';
import NewOrderForm from '../../NewOrderForm/NewOrderForm';
import giftsImg from '../../../img/giftsWithBaloons.png'


import axios,{AxiosResponse} from 'axios';


const PendingOrders: React.FC = () => {
  

  const [data, setData] = useState<string| null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<string> = await axios.get<string>('http://localhost:8080/Order/stam');
        setData(response.data);
        console.log(response.data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
    // const fetchData = async () => {
    //   try {
    //     const response = await axios.get();
    //   } catch (error) {
    //     console.error('Error fetching data:', error);

    // };

    // fetchData();
  return (
    <>
      <GlobalModel btnOpen={"New Order"} isButton={true} title={"new order"} img={giftsImg} txtSide={" we are almost done"}>
        <NewOrderForm></NewOrderForm>
      </GlobalModel>
      
    </>
  )
};

export default PendingOrders;
