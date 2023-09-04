// React
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import { createRoot } from 'react-dom/client';
// NEAR
import { Wallet } from './near-wallet';
import LandingPage from './pages/LandingPage';
import DoctorLayout from './pages/DoctorDashboard/DoctorLayout';
import DoctorDashboard from './pages/DoctorDashboard/DoctorDashboard';
import PatientRecord from './pages/DoctorDashboard/PatientRecord';
import PatientLayout from "./pages/PatientDashboard/PatientLayout";
import About from './pages/About';
import Contact from "./pages/Contact";
import PatientProfile from './pages/PatientDashboard/PatientProfile';
import Test2 from "./pages/Test2";
import MyProvider from './Context/MyProvider';
import RecordView from './pages/RecordView';
const CONTRACT_ADDRESS = process.env.CONTRACT_NAME ;

// When creating the wallet you can optionally ask to create an access key
// Having the key enables to call non-payable methods without interrupting the user to sign
var wallet
try {
 wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS });
 
} catch (error) {
  console.log(error);
}
const container = document.getElementById('root');
const root = createRoot(container);
// Setup on page load
window.onload = async () => {
  const isSignedIn = await wallet.startUp();
  const isAPatient = false;
  const router = createHashRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/test",
      element: <Test2 />,
    },
    {
      path: "/contact",
      element: <Contact />,
    },
    {
      path:"/viewdata",
      element:<RecordView />
    },
    {
      path: "/doctor",
      element: <DoctorLayout isSignedIn={isSignedIn} contractId={CONTRACT_ADDRESS} wallet={wallet}/>,
      children:[
        {
          path: "dashboard",
          element: <DoctorDashboard  isSignedIn={isSignedIn} contractId={CONTRACT_ADDRESS} wallet={wallet}/>,
        },
        {
          path: "patientrecord/:patientid",
          element: <PatientRecord  isSignedIn={isSignedIn} contractId={CONTRACT_ADDRESS} wallet={wallet}/>,
        },
      ]
    },
    {
      path: "/patient",
      element: <PatientLayout isSignedIn={isSignedIn} contractId={CONTRACT_ADDRESS} wallet={wallet} isAPatient={isAPatient} />,
      children:[
        {
          path: "dashboard",
          element: <PatientProfile  isSignedIn={isSignedIn} contractId={CONTRACT_ADDRESS} wallet={wallet}/>,
        },
        // {
        //   path: "patientrecord/:patientid",
        //   element: <PatientRecord  isSignedIn={isSignedIn} contractId={CONTRACT_ADDRESS} wallet={wallet}/>,
        // },
      ]
    },
    {
      path: "/app",
      element: <App isSignedIn={isSignedIn} contractId={CONTRACT_ADDRESS} wallet={wallet} />,
    },
  ]);
  root.render(
  <MyProvider>
    <RouterProvider router={router} />
  </MyProvider>
  );
}