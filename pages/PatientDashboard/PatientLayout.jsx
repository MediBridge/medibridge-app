import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { SignInPrompt, SignOutButton } from "../../ui-components";
import AddNewPatient from "../AddNewPatient";
import Loading from "../../components/Loading";
const DoctorLayout = ({ isSignedIn, contractId, wallet }) => {
  const [isaPatient, setisaPatient] = useState(false);
  const [loading, setloading] = useState(true);
  const checkPatientStatus = async () => {
    try {
      const data = await wallet.viewMethod({
        method: "get_patient_workaround",
        args: { account_id: wallet.accountId },
        contractId,
      });
      console.log(data);
      setTimeout(() => {
      setisaPatient(true);
        setloading(false);
      }, 500);
    } catch (error) {
      setTimeout(() => {
      setisaPatient(true);
      setloading(false);
      }, 500);
      console.log(error);
    }
  };

  useEffect(() => {
    setloading(true);
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
      {
        loading?
        <Loading />:
        !isSignedIn ? (
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
        )
      }
  
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
