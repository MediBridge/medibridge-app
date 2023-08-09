import React, { useState } from "react";
import RecordsTab from "./RecordsTab";
import AllergiesTab from "./AllergiesTab";
import ImmunizationsTab from "./ImmunizationsTab";
import ProceduresTab from "./ProceduresTab";
import "../../assets/css/PatientProfile.css";

const PatientProfile = ({ patientInfo }) => {
    // State to track the active tab
    const [activeTab, setActiveTab] = useState("records");
    const [isEditMode, setIsEditMode] = useState(false); // State to track edit mode

    // Function to handle tab click
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    // Function to handle edit button click
    const handleEditClick = () => {
        setIsEditMode(!isEditMode);
    };

    // Mock data for tabs
    const mockData = {
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
        immunizations: [
        ],
        procedures: [
        ],
    };

    // Use mock data if patientInfo is not provided
    const dataToDisplay = patientInfo || mockData;
    <h2>Patient Profile</h2>;

    return (
    <div>
        <nav className="navbar">
        <div className="navbar-brand">Home</div>
        </nav>
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
                <div>Name Surname</div>
                <div>07/10/2000</div>
                <div>Blood Type: A</div>
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
            <RecordsTab records={dataToDisplay.records} />
            )}
            {activeTab === "allergies" && (
            <AllergiesTab allergies={dataToDisplay.allergies} />
            )}
            {activeTab === "immunizations" && (
            <ImmunizationsTab immunizations={dataToDisplay.immunizations} />
            )}
            {activeTab === "procedures" && (
            <ProceduresTab procedures={dataToDisplay.procedures} />
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
