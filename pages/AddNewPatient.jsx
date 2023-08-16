import React, { useState } from "react";
import "../assets/css/AddNewPatient.css"; // Import your CSS file for styling
import { ToastContainer, toast } from "react-toastify";

const AddNewPatient = ({ isSignedIn, contractId, wallet }) => {
    const [fullName, setFullName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [gender, setGender] = useState("Male");
    const [bloodType, setBloodType] = useState("");
    const [photo, setPhoto] = useState(null); // State for the uploaded photo


    
    //LOGIC TO ADD A PATIENT TO THE CONTRACT
    const handleAddPatient = (e) => {
        e.preventDefault();
        try {
          console.log(wallet);
          wallet
            .callMethod({
              method: "add_patient",
              args: {
                full_name: fullName,
                birthday: birthday,
                gender,
                blood_type: bloodType,
              },
              contractId,
            })
            .then(async () => {
              console.log("Added the Patient to our list");
              toast("Registered Patient", {
                toastId: "registeredPatient",
              });
            });
        } catch (error) {
          console.log("Error while Registering Patient", error);
          toast("Failed to Register Patient", {
            toastId: "failureToRegister",
          });
        }
    };

    const handlePhotoUpload = (e) => {
        const selectedPhoto = e.target.files[0];
        setPhoto(selectedPhoto);
    };

    return (
    <div>
        <nav className="navbar">
        <div className="navbar-brand">Home</div>
        </nav>
        <div className="center-container">
        <div className="add-patient-container">
            <h1 className="add-patient-title">Add New Patient</h1>
            {/* <div className="photo-container"> */}
            {/* {photo ? (
                <img
                src={URL.createObjectURL(photo)}
                alt="Patient"
                className="uploaded-photo"
                />
            ) : ( */}
                {/* <div className="default-photo"> */}
                {/* Placeholder image or default SVG */}
                {/* <img
                    src="placeholder-image.png"
                    alt="Default"
                    className="default-image"
                />
                </div>
            )} */}
            {/* <input type="file" accept="image/*" onChange={handlePhotoUpload} /> */}
            {/* </div> */}
            <div className="input-container">
            <label>Full Name:</label>
            <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
            />
            </div>
            <div className="input-container">
            <label>Birthday:</label>
            <input
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
            />
            </div>
            <div className="input-container">
            <label>Gender:</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>
            </div>
            <div className="input-container">
            <label>Blood Type:</label>
            <input
                type="text"
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value)}
            />
            </div>
            <button className="add-patient-button" onClick={handleAddPatient}>
            Add Patient
            </button>
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

export default AddNewPatient;
