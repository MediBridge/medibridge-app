import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import MyContext from "../../Context/MyContext";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { ToastContainer,toast } from "react-toastify";
const RecordsTab = ({ records, isSignedIn, contractId, wallet }) => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [condition, setCondition] = useState(""); // Add this line
  const [recordData, setRecordData] = useState(""); // Add this line
  const [date, setDate] = useState(""); // Add this line
  const [isPublic, setIsPublic] = useState("public"); // Add this line  // Mock data for records
  const [uploadStatus, setUploadStatus] = useState(""); // STATUS OF THE FILE BEING UPLOADED TO IPFS
  const { documentData, updateMyData } = useContext(MyContext);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (documentData) navigate("/viewdata");
  }, [documentData]);
  
  // Use provided records if available, otherwise use mock records
  const recordsToDisplay = records;
  const documentPassword = localStorage.getItem("medibridgePassword");
  // console.log(recordsToDisplay);
  // UTILITY FUNCTION TO GENERATE A UNIQUE ID
  function generateUniqueId() {
    const timestamp = new Date().getTime().toString(); // Get current timestamp
    const randomPart = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0"); // Generate random 6-digit number

    return timestamp.slice(-6) + randomPart; // Combine timestamp and random number
  }

  const getDocument = async (url) => {
    try {
      setloading(true);
      const response = await axios.post("http://localhost:3000/decrypt", {
        url: url,
        key: documentPassword,
      });
    
      console.log(response.data);
      setloading(false);
    
      updateMyData(response.data);
      // console.log(myData);
    } catch (error) {
      console.error("Error decrypting PDF:", error);
    }
  };
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
        formData.append("key", documentPassword);
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
    if (recordData == "") return;

    setloading(true);
    wallet
      .callMethod({
        contractId: contractId,
        method: "add_medical_record",
        args: {
          id: parseInt(generateUniqueId()),
          condition: condition,
          record_data: recordData,
          date: date,
          public: isPublic === "public",
        },
      })
      .then(async (result) => {
        console.log("Record has been succesfully added");
        toast("Patient added!",{
          toastId:"PatientAddSuccess"
        });
      })
      .catch((error) => {
        console.log("Error while trying to upload to the chain", error);
        toast("Error while trying to add patient",{
          toastId:"Patient Add Error"
        });
      })
      .finally(() => {
        setTimeout(() => {
          setloading(false);
        }, 2000);
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
      <ToastContainer />
      {loading ? (
        <Loading />
      ) : (
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
      )}

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
            {recordsToDisplay &&
              recordsToDisplay.map((record, index) => (
                <tr className="record-row" key={index}>
                  <td>{record.MedicalRecord.condition}</td>
                  <td>
                    <div
                      onClick={(e) =>
                        getDocument(record.MedicalRecord.record_data)
                      }
                    >
                      Document
                    </div>{" "}
                  </td>
                  {/* <td>{decryptedPDF && <iframe title="Decrypted PDF" src={decryptedPDF} width="100%" height="600px" />}</td> */}
                  <td>{record.MedicalRecord.date}</td>
                  <td>
                    {record.MedicalRecord.isPublic ? "Public" : "Private"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecordsTab;
