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
          await p2mTxn(Number(data.merchantId), amount);
    } else {
      console.error("Invalid data or amount");
    }
  };

  return (
    <>
      {!data ? (
        <QrReader
          onResult={handleResult}
          constraints={{ facingMode: 'environment' }}
          style={{ width: '100%' }}
        />
      ) : (
        <div>
          <h3>Payment Details</h3>
          <p>Merchant ID: {data.merchantId}</p>
          <p>Merchant Name: {data.merchantName}</p>
          <input
            type="number"
            placeholder="Amount"
            onChange={handleAmountChange}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      )}
    </>
  );
}
