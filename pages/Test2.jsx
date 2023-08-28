import React, { useState } from 'react';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Please select a PDF file.');
      return;
    }

    const formData = new FormData();
    formData.append('pdfFile', selectedFile);

    try {
      const response = await fetch('http://localhost:3000/fileUpload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log(response);
        setUploadStatus('PDF file uploaded and processed successfully.');
      } else {
        setUploadStatus('Error uploading the PDF file.');
      }
    } catch (error) {
      setUploadStatus('An error occurred during the upload.');
    }
  };

  return (
    <div className="App">
      <h1>PDF File Upload</h1>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <p>{uploadStatus}</p>
    </div>
  );
}

export default App;
