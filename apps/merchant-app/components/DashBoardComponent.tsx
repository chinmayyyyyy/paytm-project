"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import MerchantQR from "../lib/qrCode";
import { BalanceCard } from "./BalanceCard";
import { getBalance } from "../lib/getMerchantTxn";

export default function MerchantDashboard() {
  const [balance, setBalance] = useState({ amount: 0, locked: 0 });
  const { data: session } = useSession();

  const fetchBalance = async () => {
    const data = await getBalance();
    setBalance(data);
};

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <div className="w-full p-5 min-h-screen bg-gray-100">
      <div className="text-4xl font-bold text-indigo-700 mb-6">Merchant Dashboard</div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="col-span-1 lg:col-span-2">
          <BalanceCard amount={balance.amount} locked={balance.locked} />
        </div>
        <div className="col-span-1">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Total Revenue</h2>
            <p className="text-4xl text-green-500">{balance.amount / 100} RS</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Generate Payment QR Code</h2>
        <MerchantQR />
      </div>
    </div>
  );
}
