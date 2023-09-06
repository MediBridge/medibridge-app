// src/components/Login.js

import React from 'react';
import  app  from '../../Firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const auth = getAuth();
const Login = () => {   
    const navigate = useNavigate();
  const handleGoogleSignIn = async () => {
const provider = new GoogleAuthProvider();
const { currentUser } = useAuth();
console.log(currentUser);
    try {
      if(currentUser)
      navigate('/patientdata'); 

        signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log(user);
          // IdP data available using getAdditionalUserInfo(result)
      navigate('/patientdata'); 
          // ...
        }).catch((error) => {
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
    <div>
      <h1>Login Page</h1>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
    </div>
  );
};

export default Login;
