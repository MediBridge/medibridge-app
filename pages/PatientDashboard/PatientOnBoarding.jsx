import React, { useState } from "react";
import bg from "../../assets/backdropLogin.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../components/Loading";
const PatientOnBoarding = ({ isSignedIn, contractId, wallet }) => {
  const [userName, setuserName] = useState("");
  const [fullName, setfullName] = useState("First");
  const [birthday, setbirthday] = useState("30");
  const [gender, setgender] = useState("male");
  const [bloodType, setbloodType] = useState("O+");
  const [loading, setloading] = useState(false);
  const addPatient = async (e) => {
    e.preventDefault();
    try {
      console.log(wallet);
      setloading(true);
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
          setloading(false);
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
    <div className="user-authentication fade-in">
      <ToastContainer />
      {loading ? (
        <Loading />
      ) : (
        <div className="onboarding-box">
          <h2>Onboarding</h2>
          <p>Enter your Account ID</p>
          <form id="login-form">
            <div className="form-group">
              <input
                type="text"
                id="account-id"
                name="account-id"
                placeholder="Account Name"
                required
                value={userName}
                onChange={(e) => {
                  setuserName(e.target.value);
                }}
              />
            </div>
            <button type="submit" onClick={addPatient}>
              LET'S ONBOARD!
            </button>
          </form>
        </div>
      )}
      {/* <!-- User authentication content --> */}
    </div>
  );
};

export default PatientOnBoarding;
