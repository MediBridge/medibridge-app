import React, { useState } from "react";

const ImmunizationsTab = ({immunizations, isViewer}) => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [vaccine, setVaccine] = useState("");
  const [date, setDate] = useState("");
  const [provider, setProvider] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [immunizationsData, setImmunizations] = useState([
    // Mock immunization data
    {
      vaccine: "COVID-19 Vaccine",
      date: "2023-01-15",
      provider: "Health Clinic A",
    },
    {
      vaccine: "Flu Shot",
      date: "2022-10-05",
      provider: "Health Clinic B",
    },
    // Add more mock data as needed
  ]);

  // Function to handle the click event for uploading immunization records
  const handleUploadClick = () => {
    setShowUploadModal(true);
  };

  // Function to handle the submission of the immunization record form
  const handleUploadSubmit = () => {
    // Process the uploaded data here, e.g., send it to a server or store it locally.
    const newImmunization = {
      vaccine,
      date,
      provider,
    };
    console.log(newImmunization);
    // @prakhar728 Add code to handle the upload to the chain or any other processing

    // Close the modal and reset the form fields
    setShowUploadModal(false);
    setVaccine("");
    setDate("");
    setProvider("");
    setUploadStatus("Immunization record uploaded successfully.");

    // Add the new immunization data to the table
    setImmunizations([...immunizationsData, newImmunization]);
  };

  return (
    <div>
      <div>
        {!isViewer && (
          <button className="upload-button" onClick={handleUploadClick}>
            Upload Immunization Record
          </button>
        )}
        {showUploadModal && (
          <div className="upload-modal">
            <div className="upload-form">
              <h3>Upload Immunization Record</h3>
              <label htmlFor="vaccine">Vaccine:</label>
              <input
                type="text"
                id="vaccine"
                name="vaccine"
                value={vaccine}
                onChange={(e) => setVaccine(e.target.value)}
              />
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                id="date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <label htmlFor="provider">Provider:</label>
              <input
                type="text"
                id="provider"
                name="provider"
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
              />

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
        <h3>Immunization Records</h3>
        <table className="immunizations-table">
          <thead>
            <tr>
              <th>Vaccine</th>
              <th>Date</th>
              <th>Provider</th>
            </tr>
          </thead>
          <tbody>
            {immunizationsData.map((immunization, index) => (
              <tr className="immunization-row" key={index}>
                <td>{immunization.vaccine}</td>
                <td>{immunization.date}</td>
                <td>{immunization.provider}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ImmunizationsTab;
