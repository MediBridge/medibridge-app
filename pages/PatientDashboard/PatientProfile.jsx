import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import the Link component
import RecordsTab from "./RecordsTab";
import AllergiesTab from "./AllergiesTab";
import ImmunizationsTab from "./ImmunizationsTab";
import ProceduresTab from "./ProceduresTab";
import "../../assets/css/PatientProfile.css";
import Loading from "../../components/Loading";
import axios from "axios";

const PatientProfile = ({ isSignedIn, contractId, wallet }) => {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState("records");
  const [isEditMode, setIsEditMode] = useState(false); // State to track edit mode
  const [emailData, setemailData] = useState("");
  console.log(wallet);
  const [patientInfo, setpatientInfo] = useState({
    full_name:"Full Name",
    birthday:"20/02/2020",
    blood_type:"AB+",
    gender:"Gender",
    records: [
      {
        MedicalRecord:{
          condition: "Fever",
          record_data: "Some medical data about fever",
          date: "2023-08-15",
          isPublic: true,
        }
      }
    ],
    allergies: [
      // ... mock allergies data ...
      "1",
      "2",
      "3",
    ],
    immunizations: [],
    procedures: [],
  });
  const [isaPatient, setisaPatient] = useState(false);
  const [loading, setLoading] = useState(true); // Declare the loading state here
  //GET DETAILS OF THE PATIENT
  const shareToEmail = async () =>{
    const data= await axios.post('http://localhost:3000/api/password/sharepassword',{
      "userAddress":wallet.accountId,
      "email":emailData,
      "password":localStorage.getItem("medibridgePassword")
    })
    setpatientInfo(data)
  }
  const checkPatientStatus = async () => {
    setLoading(true);
    try {
        console.log("Now calling wallet");
        const data = await wallet.viewMethod({ method: 'get_patient_workaround', args: { account_id: wallet.accountId },contractId });
        console.log(data);
        setisaPatient(true);
        setpatientInfo(data)
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(function() {
        setLoading(false); 
      }, 1000); 
       // Set loading back to false after the call completes
    }
  };
  // Function to handle tab click
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  // Function to handle edit button click
  const handleEditClick = () => {
    setIsEditMode(!isEditMode);
  };

  useEffect(() => {
    if (isSignedIn && !isaPatient) {
      setLoading(true); // Set loading to true before making the API call
      checkPatientStatus()
        .finally(() => {
          setTimeout(function() {
            setLoading(false); 
          }, 1000); 
          // Set loading back to false after the call completes
        });
    }
  }, []);


  return (
    <div>
      <ul className="navigation-bar">
        <li>
          <Link to={"/"}>Home</Link>
        </li>
      </ul>
      {loading && <Loading />} 
      {/* Patient Information */}
      <div className="patient-profile">
        <div className="right-section">
          <div className="patient-info">
            {/* Display patient information */}
            {isEditMode ? (
              <div>
                <input type="text" placeholder="Name Surname" />
                {/* I will Add more input fields for other patient info */}
              </div>
            ) : (
              <div>
                  <div className="patient-name">{patientInfo.full_name}</div>
                  <div className="patient-details">Birthday:&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;{patientInfo.birthday}</div>
                  <div className="patient-details">Blood Type: &nbsp;&nbsp;&nbsp;{patientInfo.blood_type}</div>
              </div>
            )}
            <button className="edit-button" onClick={handleEditClick}>
              {isEditMode ? "Save" : "Edit"}
            </button>
          </div>
          <div className="emailToShare">
            <label>Add Email to share to person!</label>
            <input type="text" value={emailData} onChange={e=>setemailData(e.target.value)}/>
            <button onClick={shareToEmail}>Share!</button>
          </div>
        </div>

        <div className="tabs">
          <button
            className={
              activeTab === "records" ? "tab-button active" : "tab-button"
            }
            onClick={() => handleTabClick("records")}
          >
            Records
          </button>
          <button
            className={
              activeTab === "allergies" ? "tab-button active" : "tab-button"
            }
            onClick={() => handleTabClick("allergies")}
          >
            Allergies
          </button>
          <button
            className={
              activeTab === "immunizations" ? "tab-button active" : "tab-button"
            }
            onClick={() => handleTabClick("immunizations")}
          >
            Immunizations
          </button>
          <button
            className={
              activeTab === "procedures" ? "tab-button active" : "tab-button"
            }
            onClick={() => handleTabClick("procedures")}
          >
            Procedures
          </button>

          {/* Tab Content */}
          {activeTab === "records" && (
            <RecordsTab records={patientInfo.records} isSignedIn={isSignedIn} contractId={contractId} wallet={wallet} />
          )}
          {activeTab === "allergies" && (
            <AllergiesTab allergies={patientInfo.allergies} />
          )}
          {activeTab === "immunizations" && (
            <ImmunizationsTab immunizations={patientInfo.immunizations} />
          )}
          {activeTab === "procedures" && (
            <ProceduresTab procedures={patientInfo.procedures} />
          )}
        </div>
      </div>
      <footer className="footer">
        <p>
          &copy; {new Date().getFullYear()} MediBridge. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default PatientProfile;
