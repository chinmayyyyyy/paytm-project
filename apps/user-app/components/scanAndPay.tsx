import QrReader from 'react-qr-reader'

export function ScanAndPay() {

    handelScan(){
        //handel scan here
    }

    
    return <div>
       <h1>Scan Merchant QR Code</h1>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
    </div>

}