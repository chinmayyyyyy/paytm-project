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
      {qrCodeURL ? <img src={qrCodeURL} alt="QR Code for Payment" /> :
          <div>
            <button
          onClick={handleGenerateQRCode}
          className="bg-indigo-600 text-black px-4 py-2 rounded-lg"
         > Genrate Qr
        </button>
      </div> 
    
    }
    </div>
  );
};

export default MerchantQR;
