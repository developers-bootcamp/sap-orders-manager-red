import React, { useEffect, useState } from 'react';
import { Client, Message } from '@stomp/stompjs'; // Import Client and Message
import IOrder from '../interfaces/IOrder';
import { RootState, useAppDispatch } from "../redux/store"
import { IOrderState, addOrder,} from "../redux/slices/sliceOrder";

const WebSocket: React.FC = () => {
    const [socket, setSocket] = useState<Client | null>(null);
    const dispatch = useAppDispatch();
   const handleWebSocketMessage = (message: Message) => {
        const order: IOrder = JSON.parse(message.body);
        console.log(order);

        dispatch(addOrder(order));
        
    };

    useEffect(() => {
        const newSocket = new Client();
        newSocket.configure({
            brokerURL: 'ws://localhost:8080/ws',
            onConnect: () => {
                newSocket.subscribe('/topic/newOrder', handleWebSocketMessage);
            }
        });

        newSocket.activate();
        setSocket(newSocket);

        return () => {
            newSocket.deactivate();
        };
    }, []);

    return (
        <div>

        </div>
    );
};

export default WebSocket;
