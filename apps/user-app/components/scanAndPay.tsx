"use client";
import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

export default function ScanAndPay() {
  const [data, setData] = useState('No result');

  const handleResult = (result: any, error: any) => {
    if (result) {
      try {
        const parsedData = JSON.parse(result.text);
        setData(`Merchant ID: ${parsedData.merchantId}, Merchant Name: ${parsedData.merchantName}`);
      } catch (err) {
        console.error("Error parsing QR code data:", err);
      }
    }

    if (error) {
      console.info(error);
    }
  };

  return (
    <>
      <QrReader
        onResult={handleResult}
        constraints={{ facingMode: 'environment' }}
        style={{ width: '100%' }}
      />
      <p>{data}</p>
    </>
  );
}
