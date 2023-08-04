import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export async function loader() {
  const patientRecord = await getContacts();
  return { contacts };
}

const PatientRecord = ({ isSignedIn, contractId, wallet }) => {
  let { patientid } = useParams();
  const [patientDetails, setPatientDetails] = useState("");
  const [fileURL, setFileURL] = useState("https://gateway.lighthouse.storage/ipfs/Qmba7wM4h6FXUx6SdnqgeKWaXrZEqGZGDajfTw4EVrJ1Lr");
  const [isPublicData, setisPublicData] = useState(false);
  console.log(patientid);


  function generateRandomId() {
    const min = 10000; // Minimum value (inclusive)
    const max = 99999; // Maximum value (inclusive)
  
    // Generate a random number between min and max (inclusive)
    const randomId = Math.floor(Math.random() * (max - min + 1)) + min;
  
    return randomId;
  }


  const getPatientInfo = async () => {
    console.log("Gather Patients Info");
    try {
      // return await wallet.viewMethod({ method: 'get_patient', args: { id: wallet.accountId },contractId })
      const messages = await wallet.viewMethod({
        contractId: contractId,
        method: "get_patient",
        args: { id: patientid },
      });
      console.log(messages);
      setPatientDetails(messages);
      return messages;
    } catch (error) {
      console.log(error);
    }
  };
  const uploadRecord = async (e) =>{
    e.preventDefault();
    toast("Uploading The Medical Records for the patient")
    try {
      wallet.callMethod({ method: 'store_medical_record', args: {id:generateRandomId(), patient_id:patientDetails.id, record_data:fileURL,is_public:isPublicData }, contractId })
      .then(async () => {console.log("Record Stored");
      toast("Record Stored");
    })
    } catch (error) {
     console.log(error); 
    }
  }
  useEffect(() => {
    
  
    getPatientInfo();
  }, [])
  
  if(patientDetails===""){
    return <div>Patient hasn't been registered with us yet!</div>
  }
  return (
    <div>
      <ToastContainer />
      <main className="fade-in">
        <section>
          <h2>Patient Information</h2>

          
          <div className="patient-details">
            <p>
              Name: <span className="patient-name">{patientDetails.name}</span>
            </p>
            {/* <p>
              Age: <span className="patient-age">[Patient Age]</span>
            </p>
            <p>
              Gender: <span className="patient-gender">[Patient Gender]</span>
            </p>
            <p>
              Address:{" "}
              <span className="patient-address">[Patient Address]</span>
            </p> */}
            {/* <!-- Add more patient information here --> */}
          </div>
        </section>

        <section>
          <h3>Upload Medical Records</h3>
          <form
            id="upload-form"
           
          >
            <input
              type="file"
              name="file"
              id="file"
            />
            <label>Make your data available to the public?</label>
            <input type="checkbox" placeholder='Make your data available to the public?' checked={isPublicData} onChange={e=>{
              setisPublicData(!isPublicData);
            }}/>
            <button type="submit" onClick={uploadRecord}>Upload</button>
          </form>
        </section>

        <section>
          <h3>Medical Records</h3>
          <div className="medical-records">
            {/* <!-- Add medical record items here --> */}
            {!patientDetails &&  patientDetails.medical_records.length==0? <div className="record-item">
                <p>No Record Uploaded yet!</p>
                {/* <!-- Add more details about the record --> */}
            </div>:
            patientDetails.medical_records.map((record,index)=>{
              return(
                <div className="record-item" key={index}>
                <Link to={`${record.record_data}`}><p>Record {index+1}</p></Link> 
                {/* <!-- Add more details about the record --> */}
            </div>
              )
            })

          }
          </div>
        </section>
      </main>
    </div>
  );
};

export default PatientRecord;
