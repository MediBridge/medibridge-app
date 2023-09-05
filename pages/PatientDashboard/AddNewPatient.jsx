import React, { useState } from "react";
import "../../assets/css/AddNewPatient.css"; // Import your CSS file for styling
import { ToastContainer, toast } from "react-toastify";
import Loading from "../../components/Loading";

const AddNewPatient = ({ isSignedIn, contractId, wallet }) => {
    const [fullName, setFullName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [gender, setGender] = useState("Female");
    const [bloodType, setBloodType] = useState("");
    const [otherGender, setotherGender] = useState("");
    const [documentPassword, setdocumentPassword] = useState("");
    const [loading, setloading] = useState(false);
    //LOGIC TO ADD A PATIENT TO THE CONTRACT
    const handleAddPatient = (e) => {
        e.preventDefault();
        try {
          console.log(wallet);
          setloading(true);
          toast("Registering Patient", {
            toastId: "registerinPatient",
          });
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
              localStorage.setItem("medibridgePassword",documentPassword);
              setloading(false);
              setTimeout(function() {
                window.location.reload();
              }, 2000); 
              
            });
        } catch (error) {
          console.log("Error while Registering Patient", error);
          toast("Failed to Register Patient", {
            toastId: "failureToRegister",
          });
          setloading(false);
        }
    };

    return (
    <div>
        <ToastContainer />
        {
          loading?
          <Loading/>:
          <div className="center-container">
          <div className="add-patient-container">
              <h1 className="add-patient-title">Add New Patient</h1>
              <div className="input-container">
              <label>Full Name:</label>
              <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
              />
              </div>
              <div className="input-container">
              <label>Birthday:</label>
              <input
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  required
              />
              </div>
              <div className="input-container">
              <label>Gender:</label>
              <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
              </select>
              { gender==="Other" &&
              <>
              <label>If other, then:</label>
              <input
                  type="text"
                  value={otherGender}
                  onChange={(e) => setotherGender(e.target.value)}
                  required
              />
              </>
              
              }
              </div>
              <div className="input-container">
              <label>Blood Type:</label>
              <input
                  type="text"
                  value={bloodType}
                  onChange={(e) => setBloodType(e.target.value)}
              />
              </div>
              <div className="input-container">
              <label>Document Password:</label>
              <input
                  type="password"
                  value={documentPassword}
                  placeholder="This will be used constantly for encrypting your documents"
                  onChange={(e) => setdocumentPassword(e.target.value)}
                  required
              />
              </div>
              
              <button className="add-patient-button" onClick={handleAddPatient}>
              Add Patient
              </button>
          </div>
          </div>
        }
       
        <footer className="footer">
        <p>
            &copy; {new Date().getFullYear()} MediBridge. All rights reserved.
        </p>
        </footer>
    </div>
  );
};

export default AddNewPatient;
