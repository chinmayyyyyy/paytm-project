import  ScanAndPay  from "../../../components/scanAndPay"
import isAuth from "../isAuth";
import { redirect } from 'next/navigation';

export  default async function() {
    const user = await isAuth(); // Check if the user is authenticated
    if(!user) {
        console.log('User not authenticated');
        redirect('api/auth/signin');
    }

    return <div className="w-full " >
        <ScanAndPay />
    </div>
}