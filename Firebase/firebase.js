// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
console.log(process.env.REACT_APP_FIREBASE_PROJECT_ID);
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId:process.env.REACT_APP_MEASUREMENT_ID
};
var app;
try {
     app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
} catch (error) {
    console.log(error);
}
export default app;
export const auth = getAuth(app);
// Add other Firebase services you want to use and export them here
