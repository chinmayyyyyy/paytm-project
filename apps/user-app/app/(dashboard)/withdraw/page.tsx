import { getBalance } from "../transfer/page"
import { BalanceCard } from "../../../components/BalanceCard";
import { WithdrawMoney } from "../../../components/WithdrawCard";
export default async function() {
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