import { SendCard } from "../../../components/SendCard";
import TxnCard from "../../../components/txnCard";
import isAuth from "../isAuth";
import { redirect } from 'next/navigation'


export default async function (){      
        const user = await isAuth(); // Check if the user is authenticated
        if(!user) {
            console.log('User not authenticated');
            redirect('api/auth/signin');
        }
                
        return <div className="w-screen grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
                <SendCard />
                <TxnCard/>
        </div>
}