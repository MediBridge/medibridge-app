import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import the Link component
import RecordsTab from "./RecordsTab";
import AllergiesTab from "./AllergiesTab";
import ImmunizationsTab from "./ImmunizationsTab";
import ProceduresTab from "./ProceduresTab";
import "../../assets/css/PatientProfile.css";
import Loading from "../../components/Loading";

const PatientProfile = ({ isSignedIn, contractId, wallet }) => {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState("records");
  const [isEditMode, setIsEditMode] = useState(false); // State to track edit mode
  const [patientInfo, setpatientInfo] = useState({
    full_name:"Full Name",
    birthday:"20/02/2020",
    blood_type:"AB+",
    gender:"Gender",
    records: [
      // ... mock records data ...
      "records 123",
      "records1232",
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
  const [loading, setLoading] = useState(false); // Declare the loading state here
  const localStorageData = localStorage.getItem("userinfo");

  //GET DETAILS OF THE PATIENT
  const checkPatientStatus = async () => {
    setLoading(true);
    console.log("Checking the Patients status");

    try {
          await new Promise((resolve) => setTimeout(resolve, 2000));
      // return await wallet.viewMethod({ method: 'get_patient', args: { id: wallet.accountId },contractId })
      // console.log(wallet);
      // if (localStorageData) {
      //   setisaPatient(true);
      //   //DEBUGING TO CHECK WHAT DATA IS STORED
      //   console.log(JSON.parse(localStorageData));
      //   return;
      // } else {
      //   console.log("Now calling wallet");
      //   // wallet.callMethod({
      //   //   contractId: contractId,
      //   //   method: "get_patient",
      //   // })
      //   // .then(async (result) => {
      //   // console.log(result);
      //   // localStorage.setItem("userinfo", JSON.stringify(result));
      //   // });
      //   wallet
      //     .viewMethod({
      //       contractId: contractId,
      //       method: "get_patient_workaround",
      //       args: {
      //         account_id: await wallet.getAccountId(),
      //       },
      //     })
      //     .then(async (result) => {
      //       console.log(result);
      //       setisaPatient(true);
      //       setpatientInfo(result);
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     });
      // }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading back to false after the call completes
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
          setLoading(false); // Set loading back to false after the call completes
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
                <div>{patientInfo.full_name}</div>
                <div>{patientInfo.birthday}</div>
                <div>Blood Type: {patientInfo.blood_type}</div>
              </div>
            )}
            <button className="edit-button" onClick={handleEditClick}>
              {isEditMode ? "Save" : "Edit"}
            </button>
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
            <RecordsTab records={patientInfo.records} />
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
