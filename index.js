// React
import React from 'react';
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
import PatientDashboard from './pages/PatientDashboard/PatientDashboard';
const CONTRACT_ADDRESS = process.env.CONTRACT_NAME || "dev-1688297327576-65746263435730";
console.log(CONTRACT_ADDRESS);

// When creating the wallet you can optionally ask to create an access key
// Having the key enables to call non-payable methods without interrupting the user to sign
const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS });


const container = document.getElementById('root');
const root = createRoot(container);
// Setup on page load
window.onload = async () => {
  const isSignedIn = await wallet.startUp();

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
      path: "/contact",
      element: <Contact />,
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
      element: <PatientLayout isSignedIn={isSignedIn} contractId={CONTRACT_ADDRESS} wallet={wallet}/>,
      children:[
        {
          path: "dashboard",
          element: <PatientDashboard  isSignedIn={isSignedIn} contractId={CONTRACT_ADDRESS} wallet={wallet}/>,
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
  root.render(<RouterProvider router={router} />);
}