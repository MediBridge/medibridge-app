import React, { useState } from 'react'
import bg from "../../assets/backdropLogin.jpg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../../components/Loading";
const PatientOnBoarding = ({ isSignedIn, contractId, wallet }) => {
  const [userName, setuserName] = useState("");
  const [loading, setloading] = useState(false)
  const onBoardPatient = async (e) =>{
    e.preventDefault();
    try {
      wallet.callMethod({ method: 'register_patient', args: {id:wallet.accountId, name: userName }, contractId })
      .then(async () => {console.log("Registered patient");
      toast("Registered patient");
    })
    } catch (error) {
     console.log(error); 
    }
    
     
  }
  return (
    <div className="user-authentication fade-in">
      <ToastContainer />

      {loading ? <Loading />:
       <div className="onboarding-box">
       <h2>Onboarding</h2>
       <p>Enter your Account ID</p>
       <form id="login-form" >
           <div className="form-group">
               <input type="text" id="account-id" name="account-id" placeholder="Account Name" required  value={userName} onChange={e=>{
                 setuserName(e.target.value);
               }}/>
               
           </div>
           <button type="submit" onClick={onBoardPatient}>LET'S ONBOARD!</button>
       </form>
   </div>
      }
    {/* <!-- User authentication content --> */}
   
</div>
  )
}

export default PatientOnBoarding