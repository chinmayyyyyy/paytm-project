'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TransactionGraph = ({ transactions }) => {
  const formattedTransactions = transactions.map(transaction => ({
    amount: transaction.amount,
    timestamp: new Date(transaction.timestamp).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }),
  }));

  if (formattedTransactions.length === 0) {
    return <div>No transaction data available</div>;
  }

  return (
    <div style={{ width: '100%', height: 400, backgroundColor: '#fff', padding: '1rem', borderRadius: '8px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formattedTransactions}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionGraph;
