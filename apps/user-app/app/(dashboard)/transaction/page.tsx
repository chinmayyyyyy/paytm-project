import getAllTransactions from "../../lib/getTxn"


export default async function (){

    const transactions = await getAllTransactions();
    
    return <div className="bg-white p-6 rounded-lg w-full m-20 p-5 shadow-lg">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Transaction History</h2>
    <ul className="divide-y divide-gray-200">
      {transactions.length > 0 ? (
        transactions.map((txn, index) => (
          <li key={index} className="py-4">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-800">{txn.type}</p>
                <p className="text-gray-600 text-sm">{new Date(txn.date).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-700">Amount: ₹{txn.amount}</p>
              </div>
            </div>
          </li>
        ))
      ) : (
        <p className="text-gray-500">No transactions found.</p>
      )}
    </ul>
  </div>
}