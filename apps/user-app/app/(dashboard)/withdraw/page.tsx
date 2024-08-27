import getBalance from "../../lib/getBalance";
import { BalanceCard } from "../../../components/BalanceCard";
import { WithdrawMoney } from "../../../components/WithdrawCard";
import isAuth from "../isAuth";
import { redirect } from 'next/navigation'
export default async function() {
    const user = await isAuth(); // Check if the user is authenticated
    if(!user) {
        console.log('User not authenticated');
        redirect('api/auth/signin');
    }

    const balance = await getBalance();


    return <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            Transfer
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <WithdrawMoney />
            </div>
            <div> 
                <BalanceCard amount={balance.amount} locked={balance.locked} />
            </div>
        </div>
    </div>
}