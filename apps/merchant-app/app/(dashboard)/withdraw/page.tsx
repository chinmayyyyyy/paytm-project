import { redirect } from 'next/navigation';
import MerchantWithdrawMoney from '../../../components/MerchantWithdrawMoney';
import { PreviousTxn } from '../../../components/PreviousTxn';
import getOfRampTxn from '../../../lib/getOfRampTxn';
import isAuth from '../isAuth';

export default async function Page() {

    const auth = await isAuth();
    if(!auth){
        redirect('api/auth/signin')
    }
    const transactions = await getOfRampTxn();

    return (
        <div className="w-screen">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
                <div className="w-full w-min-38 pr-2">
                    <MerchantWithdrawMoney />
                </div>
            <div className="w-full pl-4">
                <PreviousTxn transactions={transactions} />
            </div>
            </div>
        </div>
    );
}