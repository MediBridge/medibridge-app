import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { SignInPrompt, SignOutButton } from "../../ui-components";
import DoctorOnboarding from "./DoctorOnboarding";
const DoctorLayout = ({ isSignedIn, contractId, wallet }) => {
  console.log(isSignedIn);
  const [isADoctor, setisADoctor] = useState(false);
  const checkDoctorStatus = async () =>{
    console.log("Checking the Doctors status");
    try {
      // return await wallet.viewMethod({ method: 'get_patient', args: { id: wallet.accountId },contractId })
      const messages = await wallet.viewMethod({ contractId: contractId, method: "get_doctor", args: { id: wallet.accountId }});
      console.log((messages) );
      setisADoctor(true);
      return messages;
    } catch (error) {
      console.log(error);
      setisADoctor(false);
    }
    
  }
  useEffect(() => {
    if(isSignedIn)
    checkDoctorStatus();
  }, [])

  return (
    <div>
      <nav className="fade-in">
        <ul className="navigation-bar">
          <li>
            <Link to="logout.html"><SignOutButton accountId={wallet.accountId} onClick={() => wallet.signOut()}/></Link>
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
      isADoctor?<Outlet />: <DoctorOnboarding isSignedIn={isSignedIn} contractId={contractId} wallet={wallet} />
      
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
