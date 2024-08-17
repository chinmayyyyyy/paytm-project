import TransactionGraph from "../../../components/TransactionGraph";
import { getMerchantTransactions, getBalance } from "../../../lib/getMerchantTxn";
import { BalanceCard } from "../../../components/BalanceCard";

export default async function MerchantDashboard() {
  const transactions = await getMerchantTransactions();
  const balance = await getBalance();

  return (
    <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Merchant Dashboard</h2>
         {/* Transaction Graph */}

         <div className="bg-gray-50 rounded-lg min-w-full  shadow-md p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-4" style={{ minWidth: '900px' }}>Transaction History</h3>
                <TransactionGraph transactions={transactions} />
        </div>

        {/* Balance Information */}
        <div className="max-w-sm mx-auto p-4">
            <BalanceCard amount={balance.amount} locked={balance.locked} />
        </div>


      
        {/* Transaction List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Recent Transactions</h3>
          <ul className="divide-y divide-gray-200">
            {transactions.length > 0 ? (
              transactions.toReversed().map((txn, index) => (
                <li key={index} className="py-4 flex justify-between items-center">
                  <div>
                    <p className="text-green-400">₹{txn.amount }</p>
                    <p className="text-gray-600 text-sm">{new Date(txn.timestamp).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Recived From :{txn.name}</p>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No transactions found.</p>
            )}
          </ul>
        </div>
     </div>
  );
}
