import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { SignInPrompt, SignOutButton } from "../../ui-components";
import AddNewPatient from "../AddNewPatient";
const DoctorLayout = ({ isSignedIn, contractId, wallet }) => {
  console.log(isSignedIn);
  const [isaPatient, setisaPatient] = useState(false);
  const localStorageData = localStorage.getItem("userinfo");

  const checkPatientStatus = async () => {
    console.log("Checking the Patients status");
  
    try {
      // return await wallet.viewMethod({ method: 'get_patient', args: { id: wallet.accountId },contractId })
      // if (localStorageData) {
      //   setisaPatient(true);
      //   return;
      // }
      // else{
        console.log("Now calling wallet");
      //   wallet.callMethod({
      //     contractId: contractId,
      //     method: "get_patient",
      //   })
      //   .then(async (result) => {
      //   console.log(result);
      //   console.log("This is the result of function call");
      //   localStorage.setItem("userinfo", JSON.stringify(result));
      // })
      // .catch((error)=>{
      //   console.log("Error while trying to find the patient",error);
      // })
     const data = await wallet.viewMethod({ method: 'get_patient_workaround', args: { account_id: wallet.accountId },contractId });
     console.log(data);
     setisaPatient(true);
      // }
    } catch (error) {
      setisaPatient(false);
      console.log(error);
    }
  };

 
  
  useEffect(() => {
    if (isSignedIn && !isaPatient) checkPatientStatus();
  }, []);

  return (
    <div>
      <nav className="fade-in">
        <ul className="navigation-bar">
          <li>
            <Link to="/">
              <SignOutButton
                accountId={wallet.accountId}
                onClick={() => wallet.signOut()}
              />
            </Link>
          </li>
          <li>
            <Link to="patients.html">Patients</Link>
          </li>
          <li>
            <Link to="med-records.html">MedRecords</Link>
          </li>
        </ul>
      </nav>
      {/* THIS LOGIC CHECKS IF PATIENT IS ALREADY SIGNED IN */}
      {!isSignedIn ? (
        <SignInPrompt onClick={() => wallet.signIn()} />
      ) : isaPatient ? (
        <Outlet />
      ) : (
        // ONBOARDING FORM IN CASE PATIENT IS NOT SIGNED IN
        <AddNewPatient
          isSignedIn={isSignedIn}
          contractId={contractId}
          wallet={wallet}
        />
      )}
      <footer className="fade-in">
        <ul className="footer-links">
          <li>
            <Link to="terms.html">Terms of Service</Link>
          </li>
          <li>
            <Link to="privacy.html">Privacy Policy</Link>
          </li>
          <li>
            <Link to="about.html">About Us</Link>
          </li>
          <li>
            <Link to="contact.html">Contact Us</Link>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default DoctorLayout;
