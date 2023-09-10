import React, { useEffect, useState } from 'react';
import { Client, Message } from '@stomp/stompjs';
import IOrder from '../interfaces/IOrder';
import { RootState, useAppDispatch } from "../redux/store"
import { IOrderState, addOrder, } from "../redux/slices/sliceOrder";
import { useSelector } from "react-redux";
const WebSocket: React.FC = () => {
    const [socket, setSocket] = useState<Client | null>(null);
    const orders: IOrder[] = useSelector<RootState, IOrderState>(state => state.orderReducer).statusOrders;

    const dispatch = useAppDispatch();
    const handleWebSocketMessage = (message: Message) => {
        const order: IOrder = JSON.parse(message.body);
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
