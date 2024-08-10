"use client"
import { useEffect, useRef } from 'react';
import connectToSocket from '../../../lib/ConnectToSocket';
import { useSession } from 'next-auth/react';

export default function Dashboard() {
    const { data: session } = useSession();
    const socketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        if (session?.user?.id) {
            connectToSocket(session.user.id, socketRef);
        }
        
        // Cleanup on unmount
        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, [session?.user?.id]);

    return (
        <div>
            Dashboard
        </div>
    );
}
