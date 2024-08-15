'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TransactionGraph = ({ transactions }) => {
  return (
    <div style={{ width: '100%', height: 400, backgroundColor: '#fff', padding: '1rem', borderRadius: '8px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={transactions}>
          <XAxis dataKey="date" tick={{ fill: '#8884d8' }} />
          <YAxis tick={{ fill: '#8884d8' }} />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Tooltip />
          <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionGraph;
