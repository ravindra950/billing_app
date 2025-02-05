// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "@react-native-firebase/auth";
// import {getAuth} from 'fireba'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCp6G5IDSXbyWLCBN1AEaIZtrAOeOhXlq4",
  authDomain: "billingproject-a14cd.firebaseapp.com",
  projectId: "billingproject-a14cd",
  storageBucket: "billingproject-a14cd.firebasestorage.app",
  messagingSenderId: "356311808489",
  appId: "1:356311808489:web:fbe378a171cf1ae1cbf378",
  measurementId: "G-SVECZ2J7E2"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);