import TransactionGraph from "../../../components/TransactionGraph";
import getAllTransactions from "../../lib/getTxn";
import { BalanceCard } from "../../../components/BalanceCard";
import { getBalance } from "../transfer/page";

export default async function DashboardPage() {
    const transaction = await getAllTransactions();
    const balance = await getBalance();

    return (
        <div className="w-full p-5 min-h-screen">
            <div className="text-4xl text-[#6a51a6] font-bold mb-6">
                Dashboard
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-semibold text-gray-800">Current Balance</h2>
                <p className="text-3xl text-[#6a51a6] font-bold">{(balance.amount / 100).toFixed(2)} RS</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Transaction History</h2>
                <TransactionGraph transactions={transaction} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <BalanceCard amount={balance.amount} locked={balance.locked} />
            </div>
        </div>
    );
}
