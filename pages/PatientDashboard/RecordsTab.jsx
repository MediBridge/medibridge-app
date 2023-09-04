import React, { useState } from "react";


const RecordsTab = ({ records }) => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [condition, setCondition] = useState(""); // Add this line
  const [recordData, setRecordData] = useState(""); // Add this line
  const [date, setDate] = useState(""); // Add this line
  const [isPublic, setIsPublic] = useState("public"); // Add this line  // Mock data for records
  const mockRecords = [
    {
      condition: "Fever",
      recordData: "Some medical data about fever",
      date: "2023-08-15",
      isPublic: true,
    },
    {
      condition: "Fractured Arm",
      recordData: "Some medical data about fractured arm",
      date: "2023-07-20",
      isPublic: false,
    },
    // ... add more mock records ...
  ];

  // Use provided records if available, otherwise use mock records
  const recordsToDisplay = records || mockRecords;
  const handleUploadClick = () => {
    setShowUploadModal(true); 
    const input = document.createElement("input");
    input.type = "file";
    input.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file) {
        console.log("Uploaded file:", file);
      }
    });
    input.click();
  };
  const handleUploadSubmit = () => {
    // Process the uploaded data here, e.g., send it to a server or store it locally.
    const newRecord = {
      condition,
      recordData,
      date,
      isPublic: isPublic === "public",
    };
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
      <label htmlFor="recordData">Record Data:</label>
      <textarea
        id="recordData"
        name="recordData"
        rows="4"
        value={recordData}
        onChange={(e) => setRecordData(e.target.value)}
      />
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
    <div className="modal-overlay" onClick={() => setShowUploadModal(false)}></div>
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
          {recordsToDisplay.map((record, index) => (
            <tr className="record-row" key={index}>
              <td>{record.condition}</td>
              <td>{record.recordData}</td>
              <td>{record.date}</td>
              <td>{record.isPublic ? "Public" : "Private"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default RecordsTab;
