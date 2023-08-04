import React, { useEffect, useState } from 'react'
import bg from "../../assets/backdropLogin.jpg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const PatientDashboard = ({ isSignedIn, contractId, wallet }) => {
  const [fileURL, setFileURL] = useState("https://gateway.lighthouse.storage/ipfs/Qmba7wM4h6FXUx6SdnqgeKWaXrZEqGZGDajfTw4EVrJ1Lr");
  const [isPublicData, setisPublicData] = useState(false);
  const [userData, setuserData] = useState("");
  const [records, setrecords] = useState([]);
  const getPatientInfo = async () =>{
    console.log("Checking the Patients status");
    try {
      // return await wallet.viewMethod({ method: 'get_patient', args: { id: wallet.accountId },contractId })
      const messages = await wallet.viewMethod({ contractId: contractId, method: "get_patient",args:{id:wallet.accountId}});
      console.log((messages) );
      setuserData(messages.name);
      setrecords(messages.medical_records)

      return messages;
    } catch (error) {
      console.log(error);
    }
    
  }
  useEffect(() => {
    if(isSignedIn)
    getPatientInfo();
  }, [])
  function generateRandomId() {
    const min = 10000; // Minimum value (inclusive)
    const max = 99999; // Maximum value (inclusive)
  
    // Generate a random number between min and max (inclusive)
    const randomId = Math.floor(Math.random() * (max - min + 1)) + min;
  
    return randomId;
  }
  const uploadRecord = async (e) =>{
    e.preventDefault();
    toast("Uploading the records");
    try {
      wallet.callMethod({ method: 'store_medical_record', args: {id:generateRandomId(), patient_id:wallet.accountId, record_data:fileURL,is_public:isPublicData }, contractId })
      .then(async () => {console.log("Record Stored");
      toast("Record Stored");
    })
    } catch (error) {
     console.log(error); 
    }
  }
  const uploadFile = async (file) => {
    // Push file to lighthouse node
    // Both file and folder are supported by upload function
    console.log("File Uploaded");
    // if (true) {
    //   try {
    //     const output = await lighthouse.upload(file, "3e045010.561525b52e304691b6f3e7d0c393e3e5");
    //     console.log('File Status:', output);
  
    //     console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash);
       
        
    //     setFileURL(`https://gateway.lighthouse.storage/ipfs/${output.data.Hash}`)
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
  }
  // const getMedicalRecords = async () =>{
  //   try {
  //     // return await wallet.viewMethod({ method: 'get_patient', args: { id: wallet.accountId },contractId })
  //     const messages = await wallet.viewMethod({ contractId: contractId, method: "get_patient_records",args:{account_id:wallet.accountId}});
  //     console.log((messages) );
  //     setrecords(messages)
  //     return messages;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // useEffect(() => {
  //   getMedicalRecords();
  // }, [])
  
  return (
    <div>
      <ToastContainer />
      <main className="fade-in">
    <section>
        <h2>Personal Information</h2>
        <div className="patient-details">
            <p>Name: <span className="patient-name">{userData}</span></p>
            {/* <p>Age: <span className="patient-age">[Patient Age]</span></p>
            <p>Gender: <span className="patient-gender">[Patient Gender]</span></p>
            <p>Address: <span className="patient-address">[Patient Address]</span></p> */}
            {/* <!-- Add more patient information here --> */}
        </div>
    </section>
    {/* <section>
        <h3>Connected Doctors</h3>
        <div className="connected-doctors">
            <div className="doctor-item">
                <p>Doctor 1</p>
            </div>
            <div className="doctor-item">
                <p>Doctor 2</p>
            </div>
        </div>
    </section> */}
    <section>
        <h3>Upload Medical Records</h3>
        <form id="upload-form" >
            <input type="file" name="file" id="file"  onChange={e=>{
              uploadFile(e.target.files);
            }} />
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
          { records.length==0? <div className="record-item">
                <p>No Record Uploaded yet!</p>
                {/* <!-- Add more details about the record --> */}
            </div>:
            records.map((record,index)=>{
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
</main></div>
  )
}

export default PatientDashboard