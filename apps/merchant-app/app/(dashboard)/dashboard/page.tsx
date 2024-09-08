"use client"
import { useEffect, useRef } from 'react';
import connectToSocket from '../../../lib/ConnectToSocket';
import { useSession } from 'next-auth/react';
import MerchantDashboard from '../../../components/DashBoardComponent';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {redirect} from 'next/navigation';

export default function Dashboard() {
   const { data: session, status } = useSession();
    const socketRef = useRef<WebSocket | null>(null);

      useEffect(() => {
        if (status === 'authenticated' && session?.user?.id) {
            connectToSocket(session.user.id, socketRef);
        }
        if (status === 'unauthenticated') {
            console.log('User not authenticated');
            redirect('api/auth/signin');
        }
        
        // Cleanup on unmount
        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, [session?.user?.id, status]);

    return (
        <div className="w-full">
           <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark" 
            transition={Bounce}
            />
            {/* Same as */}
            <ToastContainer />
            <MerchantDashboard />
        </div>
    );
}
