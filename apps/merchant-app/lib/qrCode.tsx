"use client";

import { useState } from 'react';
import QRCode from 'qrcode';
import { useSession } from 'next-auth/react';

const MerchantQR = () => {
  const [qrCodeURL, setQrCodeURL] = useState('');
  const { data: session } = useSession();

  const handleGenerateQRCode = async () => {
    const merchantData = JSON.stringify({
      merchantId: session?.user?.id,
      merchantName: session?.user?.name,
    });
    console.log(merchantData);
    try {
      const url = await QRCode.toDataURL(merchantData);
      setQrCodeURL(url);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Generate QR Code</h1>
      <button onClick={handleGenerateQRCode}>Generate QR Code</button>
      {qrCodeURL && <img src={qrCodeURL} alt="QR Code for Payment" />}
    </div>
  );
};

export default MerchantQR;
