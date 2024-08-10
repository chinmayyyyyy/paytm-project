import VoiceAck from '../components/voiceAck';
import { MutableRefObject } from 'react';

export default function connectToSocket(merchantId: string, socketRef: MutableRefObject<WebSocket | null>) {
    // Check if the WebSocket connection already exists
    if (socketRef.current) {
        console.log('WebSocket connection already exists');
        return;
    }

    const ws = new WebSocket(`ws://localhost:8080/?merchantId=${merchantId}`);

    ws.onopen = () => {
        console.log('WebSocket connection established');
    };

    ws.onmessage = (event) => {
        const notification = event.data;
        console.log('Notification received:', notification);
        VoiceAck(notification);
        alert(notification);
    };

    ws.onclose = () => {
        console.log('WebSocket connection closed');
        socketRef.current = null; // Reset the ref when the connection is closed
    };

    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    // Store the WebSocket instance in the ref
    socketRef.current = ws;
}
