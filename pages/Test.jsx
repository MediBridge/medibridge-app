import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

const EncryptDecryptPDF = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [pdfBinary, setPdfBinary] = useState(null);
  const [encryptionKey, setEncryptionKey] = useState('');
  const [encryptedBinary, setEncryptedBinary] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const convertToBinary = () => {
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryData = event.target.result;
      setPdfBinary(binaryData);
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  const encryptBinary = () => {
    if (!pdfBinary || !encryptionKey) return;
    try {
        const key = CryptoJS.enc.Utf8.parse(encryptionKey);
        console.log("Key is ", key);
    const encryptedData = CryptoJS.AES.encrypt(pdfBinary, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });

    setEncryptedBinary(encryptedData);
    } catch (error) {
        console.log(error);
    }
    
  };

  const downloadConvertedPDF = () => {
    if (!encryptedBinary) return;

    const encryptedBlob = new Blob([encryptedBinary], { type: 'application/octet-stream' });
    const encryptedURL = URL.createObjectURL(encryptedBlob);
    const a = document.createElement('a');
    a.href = encryptedURL;
    a.download = 'encrypted.pdf';
    a.click();
    URL.revokeObjectURL(encryptedURL);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={convertToBinary}>Convert to Binary</button>
      <input
        type="text"
        value={encryptionKey}
        onChange={(e) => setEncryptionKey(e.target.value)}
        placeholder="Encryption Key"
      />
      <button onClick={encryptBinary}>Encrypt Binary Data</button>
      <button onClick={downloadConvertedPDF}>Download Encrypted PDF</button>
    </div>
  );
};

export default EncryptDecryptPDF;
