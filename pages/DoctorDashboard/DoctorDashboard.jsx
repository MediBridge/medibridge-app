import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom";
import Loading from '../../components/Loading';

const DoctorDashboard = ({ isSignedIn, contractId, wallet }) => {
  const [patientId, setpatientId] = useState("");
  const [name, setname] = useState("");
  const [appointments, setappointments] = useState([]);
  const [loading, setloading] = useState(false);
  let navigate = useNavigate();
  const goToPatient = (e) =>{
    e.preventDefault();
    navigate(`/doctor/patientrecord/${patientId}`);
  }
  const gatherAppointments = async() =>{
    console.log("Getting the Appointments");
    setloading(true);
    try {
      const messages = await wallet.viewMethod({ contractId: contractId, method: "get_doctor", args: { id: wallet.accountId }});
      console.log((messages) );
      if(messages){
        setname(messages.name);
      }

      const appointmentsArr  = await wallet.viewMethod({ contractId: contractId, method: "view_scheduled_appointments"});
      console.log(appointmentsArr);
    } catch (error) {
      console.log(error);
    setloading(false);

    }
    setloading(false);

  }
  useEffect(() => {
    gatherAppointments();
  }, [])
  
  return (
    <div>
      <main className="fade-in">
    <section>
      <h2>Welcome, {name}</h2>
    </section>
    <section>
      <h3>Search Patients</h3>
     
      <form id="search-form" action="patient-info.html">
        <input type="text" id="patient-id" placeholder="Enter Patient's Account Id" value={patientId} onChange={e=>{
          setpatientId(e.target.value)
        }} required />
        <button type="submit" onClick={goToPatient}>Search</button>
      </form>
    </section>
    <section>
      <h3>Appointments</h3>
      {loading?<Loading />:
      <div className="appointment-card">
      {/* <!-- Add appointment card content here --> */}
      {/* <!-- Example: --> */}
      <div className="appointment-info">
        <p>Time: <span className="time">[Appointment Time]</span></p>
        <p>Patient: <span className="patient">[Patient Name]</span></p>
        <p>Information: <span className="info">[Appointment Information]</span></p>
      </div>
      <div className="appointment-actions">
        <button className="resolve-button">Resolve</button>
        <button className="change-button">Change</button>
      </div>
    </div>
    }
      {/* <div className="appointment-card">
        {/* <!-- Add appointment card content here --> */}
        {/* <!-- Example: --> */}
        {/* <div className="appointment-info">
          <p>Time: <span className="time">[Appointment Time]</span></p>
          <p>Patient: <span className="patient">[Patient Name]</span></p>
          <p>Information: <span className="info">[Appointment Information]</span></p>
        </div>
        <div className="appointment-actions">
          <button className="resolve-button">Resolve</button>
          <button className="change-button">Change</button>
        </div> */}
      {/* </div> */} 
    </section>
  
  
  </main></div>
  )
}

export default DoctorDashboard