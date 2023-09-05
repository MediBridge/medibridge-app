// React
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import { createRoot } from 'react-dom/client';
// NEAR
import { Wallet } from './near-wallet';
import LandingPage from './pages/LandingPage';
import PatientLayout from "./pages/PatientDashboard/PatientLayout";
import About from './pages/About';
import Contact from "./pages/Contact";
import PatientProfile from './pages/PatientDashboard/PatientProfile';
import MyProvider from './Context/MyProvider';
import RecordView from './pages/RecordView';
const CONTRACT_ADDRESS = process.env.CONTRACT_NAME ;


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
      path: "/contact",
      element: <Contact />,
    },
    {
      path:"/viewdata",
      element:<RecordView />
    },
    {
      path: "/patient",
      element: <PatientLayout isSignedIn={isSignedIn} contractId={CONTRACT_ADDRESS} wallet={wallet} isAPatient={isAPatient} />,
      children:[
        {
          path: "dashboard",
          element: <PatientProfile  isSignedIn={isSignedIn} contractId={CONTRACT_ADDRESS} wallet={wallet}/>,
        }
      ]
    }
  ]);
  root.render(
  <MyProvider>
    <RouterProvider router={router} />
  </MyProvider>
  );
}