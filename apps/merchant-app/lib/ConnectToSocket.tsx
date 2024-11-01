import { useEffect, useRef } from 'react';
import VoiceAck from '../components/voiceAck';
import { MutableRefObject } from 'react';
import { Bounce, toast } from 'react-toastify';
export default function connectToSocket(merchantId: string, socketRef: MutableRefObject<WebSocket | null>) {
    // Check if the WebSocket connection already exists
    if (socketRef.current) {
        console.log('WebSocket connection already exists');
        return;
    }

    const ws = new WebSocket(`wss://paytm-project-8oxu.onrender.com/?merchantId=${merchantId}`);

    ws.onopen = () => {
        console.log('WebSocket connection established');
    };

    ws.onmessage = (event) => {
        const notification = event.data;
        console.log('Notification received:', notification);
        VoiceAck(notification);
        toast.success(notification, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition : Bounce
        });
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

