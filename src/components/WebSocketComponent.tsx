import React, { useEffect, useState } from 'react';
import { Client, Message } from '@stomp/stompjs'; // Import Client and Message
import IOrder from '../interfaces/IOrder';

const WebSocketComponent: React.FC = () => {
    const [socket, setSocket] = useState<Client | null>(null);
    const [orders, setOrders] = useState<Array<IOrder>>([]);

    const handleWebSocketMessage = (message: Message) => { // Use Message
        const order: IOrder = JSON.parse(message.body);
        console.log("order!!!!!!!!!1",order);
        
        setOrders(prevOrders => [...prevOrders, order]);
    };

    useEffect(() => {
        const newSocket = new Client(); // Use Client
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
            <h1>Orders</h1>
            <div>
                {orders.map(order => (
                    <div key={order.id}>
                        <p>{order.orderStatus}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WebSocketComponent;
