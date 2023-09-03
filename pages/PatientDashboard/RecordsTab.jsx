import React, { useState } from "react";

const RecordsTab = ({ records,isSignedIn, contractId, wallet }) => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [condition, setCondition] = useState(""); // Add this line
  const [recordData, setRecordData] = useState(""); // Add this line
  const [date, setDate] = useState(""); // Add this line
  const [isPublic, setIsPublic] = useState("public"); // Add this line  // Mock data for records
  const [uploadStatus, setUploadStatus] = useState(""); // STATUS OF THE FILE BEING UPLOADED TO IPFS
  const mockRecords = [
    {
      MedicalRecord:{
        condition: "Fever",
        recordData: "Some medical data about fever",
        date: "2023-08-15",
        isPublic: true,
      }
    },
    // {
    //   condition: "Fractured Arm",
    //   recordData: "Some medical data about fractured arm",
    //   date: "2023-07-20",
    //   isPublic: false,
    // },
    // ... add more mock records ...
  ];

  // Use provided records if available, otherwise use mock records
  const recordsToDisplay = records;
  console.log(records);
  // console.log(recordsToDisplay);
  // UTILITY FUNCTION TO GENERATE A UNIQUE ID
  function generateUniqueId() {
    const timestamp = new Date().getTime().toString(); // Get current timestamp
    const randomPart = Math.floor(Math.random() * 1000000).toString().padStart(6, '0'); // Generate random 6-digit number
  
    return timestamp.slice(-6) + randomPart; // Combine timestamp and random number
  }


  // THIS SECTION HANDLES FILE UPLOADS
  const handleUploadClick = async () => {
    setShowUploadModal(true);
    const input = document.createElement("input");
    input.type = "file";
    input.addEventListener("change", async (event) => {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("pdfFile", file);
        try {
          const response = await fetch("http://localhost:3000/fileUpload", {
            method: "POST",
            body: formData,
          });

          if (response.ok) {
            const ipfsURL = await response.json();
            setRecordData(ipfsURL);
            console.log(recordData);
            console.log("PDF HANDLED");
            setUploadStatus("PDF file uploaded and processed successfully.");
          } else {
            setUploadStatus("Error uploading the PDF file.");
          }
        } catch (error) {
          console.log(error);
          setUploadStatus("An error occurred during the upload.");
        }
      }
    });
    input.click();
  };

  // THIS SECTION WILL UPLOAD THE DOCUMENT AND THE RELEVANT DETAILS TO THE CHAIN
  const handleUploadSubmit = () => {
    // Process the uploaded data here, e.g., send it to a server or store it locally.
    const newRecord = {
      condition,
      recordData,
      date,
      isPublic: isPublic === "public",
    };
    console.log(newRecord);
    if(recordData=="")
    return;
    wallet
      .callMethod({
        contractId: contractId,
        method: "add_medical_record",
        args: {
          id: parseInt(generateUniqueId()),
          condition:condition,
          record_data:recordData,
          date:date,
          public:isPublic === "public"
        },
      })
      .then(async (result) => {
        console.log("Record has been succesfully added");
      })
      .catch((error) => {
        console.log("Error while trying to upload to the chain", error);
      });
    console.log("New Record:", newRecord);
    // Close the modal and reset the form fields
    setShowUploadModal(false);
    setCondition("");
    setRecordData("");
    setDate("");
    setIsPublic("public");
  };

  return (
    <div>
      <div>
        <button className="upload-button" onClick={handleUploadClick}>
          Upload Medical Records
        </button>
        {showUploadModal && (
          <div className="upload-modal">
            <div className="upload-form">
              <h3>Upload Medical Records</h3>
              <label htmlFor="condition">Condition:</label>
              <input
                type="text"
                id="condition"
                name="condition"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              />
              {/* <label htmlFor="recordData">Record Data:</label> */}
              {/* <textarea
        id="recordData"
        name="recordData"
        rows="4"
        value={recordData}
        onChange={(e) => setRecordData(e.target.value)}
      /> */}
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                id="date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <label htmlFor="isPublic">Public/Private:</label>
              <select
                id="isPublic"
                name="isPublic"
                value={isPublic}
                onChange={(e) => setIsPublic(e.target.value)}
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>

              <button onClick={handleUploadSubmit}>Upload</button>
            </div>
            <div
              className="modal-overlay"
              onClick={() => setShowUploadModal(false)}
            ></div>
          </div>
        )}
      </div>
      <div className="tab-content">
        <h3>Medical Records</h3>
        <table className="record-table">
          <thead>
            <tr>
              <th>Condition</th>
              <th>Record Data</th>
              <th>Date</th>
              <th>Public/Private</th>
            </tr>
          </thead>
          <tbody>
            { recordsToDisplay && recordsToDisplay.map((record, index) => (
              <tr className="record-row" key={index}>
                <td>{ record.MedicalRecord.condition}</td>
                <td><a href={record.MedicalRecord.record_data}>Document</a> </td>
                <td>{record.MedicalRecord.date}</td>
                <td>{record.MedicalRecord.isPublic ? "Public" : "Private"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecordsTab;
