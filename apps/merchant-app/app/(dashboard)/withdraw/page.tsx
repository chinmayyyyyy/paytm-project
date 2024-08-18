import MerchantWithdrawMoney from '../../../components/MerchantWithdrawMoney';
import { PreviousTxn } from '../../../components/PreviousTxn';
import getOfRampTxn from '../../../lib/getOfRampTxn';

export default async function Page() {
    const transactions = await getOfRampTxn();

    return (
        <div className="flex justify-between">
            <div className="w-full w-min-38 pr-2">
                <MerchantWithdrawMoney />
            </div>
            <div className="w-full pl-4">
                <PreviousTxn transactions={transactions} />
            </div>
        </div>
    );
}