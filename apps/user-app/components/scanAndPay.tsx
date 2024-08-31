"use client";
import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { p2mTxn } from '../app/lib/p2m';

interface ParsedData {
  merchantId: string;
  merchantName: string;
}

export default function ScanAndPay() {
  const [data, setData] = useState<ParsedData | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleResult = (result: any, error: any) => {
    if (result) {
      try {
        const parsedData: ParsedData = JSON.parse(result.text);
        setData({
          merchantId: parsedData.merchantId,
          merchantName: parsedData.merchantName
        });
      } catch (err) {
        console.error("Error parsing QR code data:", err);
      }
    }

    if (error) {
      console.info(error);
    }
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };

  const handleSend = async () => {
    if (data && amount > 0) {
      try {
        const txn = await p2mTxn(Number(data.merchantId), amount*100);
        setStatusMessage(txn.message);
      } catch (err) {
        console.error("Transaction failed:", err);
        setStatusMessage("Transaction failed. Please try again.");
      }
    } else {
      console.error("Invalid data or amount");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      {!data ? (
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
          
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Scan QR Code</h2>
          <QrReader
            onResult={handleResult}
            constraints={{ facingMode: 'environment' }}
          />
        </div>
      ) : (
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Payment Details</h2>
          <p className="text-lg text-gray-700 mb-4">Merchant Name: {data.merchantName}</p>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            placeholder="Enter Amount"
            onChange={handleAmountChange}
          />
          <button
            onClick={handleSend}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Send Payment
          </button>
          {statusMessage && (
            <div className={`mt-4 text-center p-2 rounded-lg ${statusMessage.includes('successful') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {statusMessage}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
