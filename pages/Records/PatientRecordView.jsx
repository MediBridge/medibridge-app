import React, { useContext, useEffect, useState } from 'react'
import { Link } from "react-router-dom"; // Import the Link component

import RecordsTab from "../PatientDashboard/RecordsTab";
import AllergiesTab from "../PatientDashboard/AllergiesTab";
import ImmunizationsTab from "../PatientDashboard/ImmunizationsTab";
import ProceduresTab from "../PatientDashboard/ProceduresTab";
import "../../assets/css/PatientProfile.css";
import Loading from '../../components/Loading';
import axios from 'axios';

const PatientRecordView = ({ isSignedIn, contractId, wallet,isViewer }) => {
  const [activeTab, setActiveTab] = useState("records");
  const [loading, setLoading] = useState(true); // Declare the loading state here
  const [isEditMode, setIsEditMode] = useState(false); // State to track edit mode
  const [accountAddress, setaccountAddress] = useState("");
  const userEmail = localStorage.getItem("googleData");
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
  const fetchUserInfo = async() =>{
    console.log("Fetching information");
    const data = await axios.post('http://localhost:3000/api/password/fetchinformation',{
      "userEmail":userEmail,
      "accountAddress":accountAddress
    });
    console.log(data.data.userINFO);
    setpatientInfo(data.data.userINFO);
  }
 
  // Function to handle tab click
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  // Function to handle edit button click
  const handleEditClick = () => {
    setIsEditMode(!isEditMode);
  };

  useEffect(() => {
   
  }, []);
  return (
    <div>
      <ul className="navigation-bar">
        <li>
          <Link to={"/"}>Home</Link>
        </li>
      </ul>
      
      <div className='accountAddressInput'>
        <label>Enter the account Address</label>
        <input type='text' value={accountAddress} onChange={e=>{
          setaccountAddress(e.target.value);
        }} />
        <button onClick={fetchUserInfo}>Fetch Info!</button>
      </div>
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
            <RecordsTab records={patientInfo.records} isSignedIn={isSignedIn} contractId={contractId} wallet={wallet} isViewer={true} />
          )}
          {activeTab === "allergies" && (
            <AllergiesTab allergies={patientInfo.allergies} isViewer={true} />
          )}
          {activeTab === "immunizations" && (
            <ImmunizationsTab immunizations={patientInfo.immunizations} isViewer={true} />
          )}
          {activeTab === "procedures" && (
            <ProceduresTab procedures={patientInfo.procedures} isViewer={true} />
          )}
        </div>
      </div>
      <footer className="footer">
        <p>
          &copy; {new Date().getFullYear()} MediBridge. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

export default PatientRecordView