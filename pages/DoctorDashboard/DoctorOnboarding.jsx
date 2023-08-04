import React, { useState } from 'react'
import bg from "../../assets/backdropLogin.jpg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const DoctorOnboarding = ({ isSignedIn, contractId, wallet }) => {
  const [userName, setuserName] = useState("");
  const [fee, setfee] = useState("");
  
  const onboardDoctor = async (e) =>{
    e.preventDefault();
    try {
      wallet.callMethod({ method: 'register_doctor', args: {id:wallet.accountId, name: userName,fee:parseFloat(fee) }, contractId })
      .then(async () => {console.log("Registered");
      toast("Registered");
    })
    } catch (error) {
     console.log(error); 
    }
    
     
  }
  return (
    <div className="user-authentication fade-in">
      <ToastContainer />
    {/* <!-- User authentication content --> */}
    <div className="onboarding-box">
        <h2>Onboarding</h2>
        <p>Enter your Account ID</p>
        <form id="login-form" >
            <div className="form-group">
                <input type="text" id="account-id" name="account-id" placeholder="Account ID" required  value={userName} onChange={e=>{
                  setuserName(e.target.value);
                }}/>
                <input type="text" id="account-id" name="account-id" placeholder="BASE FEE" required  value={fee} onChange={e=>{
                  setfee(e.target.value);
                }}/>
                
            </div>
            <button type="submit" onClick={onboardDoctor}>LET'S ONBOARD!</button>
        </form>
    </div>
</div>
  )
}

export default DoctorOnboarding