import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { SignInPrompt, SignOutButton } from "../../ui-components";
import PatientOnBoarding from "./PatientOnBoarding";
const DoctorLayout = ({ isSignedIn, contractId, wallet,isAPatient}) => {
  console.log(isSignedIn);
  const [isaPatient, setisaPatient] = useState(false);



  const checkPatientStatus = async () =>{
    console.log("Checking the Patients status");
    try {
      // return await wallet.viewMethod({ method: 'get_patient', args: { id: wallet.accountId },contractId })
      console.log(wallet);
      const messages = await wallet.viewMethod({ contractId: contractId, method: "get_patient"});
      console.log((messages));
      setisaPatient(true);
      isAPatient = true;
    } catch (error) {
      console.log(error);
      setisaPatient(false);
      isAPatient = true;

    }
    
  }
  useEffect(() => {
    if(isSignedIn && !isAPatient)
    checkPatientStatus();
  }, [])

  return (
    <div>
      <nav className="fade-in">
        <ul className="navigation-bar">
          <li>
            <Link to="/"><SignOutButton accountId={wallet.accountId} onClick={() => wallet.signOut()}/></Link>
          </li>
          <li>
            <Link to="patients.html">Patients</Link>
          </li>
          <li>
            <Link to="med-records.html">MedRecords</Link>
          </li>
        </ul>
      </nav>
 
      {!isSignedIn ?  <SignInPrompt  onClick={() => wallet.signIn()}/> :
      isaPatient?<Outlet />: <PatientOnBoarding isSignedIn={isSignedIn} contractId={contractId} wallet={wallet} />
      
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
