import React from "react";


const RecordsTab = ({ records }) => {
  // Mock data for records
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

  return (
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
  );
};

export default RecordsTab;
