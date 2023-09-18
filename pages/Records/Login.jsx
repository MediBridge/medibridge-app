// src/components/Login.js

import React, { useEffect, useState } from "react";
import app from "../../Firebase/firebase";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider, getRedirectResult } from "firebase/auth";
import {auth} from "../../Firebase/firebase";
import "../../assets/css/RecordsLogin.css";
import logoImage from "../../assets/MediBridge_logo.png";
const auth = getAuth();
const Login = () => {
  const navigate = useNavigate();
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const typingTimeout = setTimeout(() => {
      setShowText(true);
    }, 1000);
    return () => {
      clearTimeout(typingTimeout);
    };
  }, []);

  
  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    const provider =  new GoogleAuthProvider();
    try {
       signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log(user);
          // IdP data available using getAdditionalUserInfo(result)
          navigate("/patientdata");
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
          console.log(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  
  return (
    <div className="login-container">
      {showText && (
        <h1 className="typing-animation">
          Hello  •‿• , Please Sign-In...
        </h1>
      )}
      <img src={logoImage} alt="Logo" className="logo" />
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
    </div>
  );
};

export default Login;
