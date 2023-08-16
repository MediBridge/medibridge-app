import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { SignInPrompt, SignOutButton } from "../../ui-components";
import PatientOnBoarding from "./PatientOnBoarding";
const DoctorLayout = ({ isSignedIn, contractId, wallet, isAPatient }) => {
  console.log(isSignedIn);
  const [isaPatient, setisaPatient] = useState(true);
  const localStorageData = localStorage.getItem("userinfo");
  const checkPatientStatus = async () => {
    console.log("Checking the Patients status");
    console.log(localStorageData);
  
    try {
      // return await wallet.viewMethod({ method: 'get_patient', args: { id: wallet.accountId },contractId })
      console.log(wallet);
      if (localStorage.getItem("userinfo")) {
        console.log("No information found");
        setisaPatient(true);
        isAPatient = true;
        console.log(JSON.parse(localStorageData));
        return;
      }
      const messages = await wallet.callMethod({
        contractId: contractId,
        method: "get_patient",
      });
      localStorage.setItem("userinfo", JSON.stringify(messages));
      console.log(messages);
    } catch (error) {
      console.log(error);
     
    }
  };
  // useEffect(() => {
  //   if (isSignedIn && !isAPatient) checkPatientStatus();
  // }, []);

  return (
    <div>
      <nav className="fade-in">
        <ul className="navigation-bar">
          <li>
            <Link to="/">
              <button onClick={checkPatientStatus}>Get details</button>
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

      {!isSignedIn ? (
        <SignInPrompt onClick={() => wallet.signIn()} />
      ) : isaPatient ? (
        <Outlet />
      ) : (
        <PatientOnBoarding
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
