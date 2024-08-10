"use client"
import { useEffect } from 'react';

export default function Dashboard() {
    useEffect(() => {
        const merchantId = 1005; 
        const ws = new WebSocket(`ws://localhost:8080/?merchantId=${merchantId}`);

        ws.onopen = () => {
            console.log('WebSocket connection established');
        };

        ws.onmessage = (event) => {
            const notification = event.data;
            console.log('Notification received:', notification);
            alert(notification);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            ws.close();
        };
    }, []);

    return (
        <div>
            Dashboard
        </div>
    );
}
