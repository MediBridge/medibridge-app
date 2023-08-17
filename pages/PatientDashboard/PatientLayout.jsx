import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { SignInPrompt, SignOutButton } from "../../ui-components";
import AddNewPatient from "../AddNewPatient";
const DoctorLayout = ({ isSignedIn, contractId, wallet }) => {
  console.log(isSignedIn);
  const [isaPatient, setisaPatient] = useState(false);
  const localStorageData = localStorage.getItem("userinfo");
  console.log(localStorage);

  const checkPatientStatus = async () => {
    console.log("Checking the Patients status");
    console.log("This is storage data",localStorageData);
  
    try {
      // return await wallet.viewMethod({ method: 'get_patient', args: { id: wallet.accountId },contractId })
      console.log(wallet);
      if (localStorageData) {
        setisaPatient(true);
        //DEBUGING TO CHECK WHAT DATA IS STORED
        console.log(JSON.parse(localStorageData));
        return;
      }
      else{
        console.log("Now calling wallet");
        // wallet.callMethod({
        //   contractId: contractId,
        //   method: "get_patient",
        // })
        // .then(async (result) => {
        // console.log(result);
        // localStorage.setItem("userinfo", JSON.stringify(result));
        // });
        wallet.viewMethod({
            contractId: contractId,
            method: "get_patient_workaround",
            args:{
                account_id:await wallet.getAccountId()
            }
          })
          .then(async (result) => {
          console.log(result);
          setisaPatient(true);
          })
          .catch(error=>{
            console.log(error);
          });
      }
     
    } catch (error) {
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

      {!isSignedIn ? (
        <SignInPrompt onClick={() => wallet.signIn()} />
      ) : isaPatient ? (
        <Outlet />
      ) : (
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
