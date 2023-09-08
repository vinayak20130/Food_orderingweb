// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvky4bQuq_s5QKgyCvLC3WSR5ooMsA1PI",
  authDomain: "foodcourt-f81e3.firebaseapp.com",
  projectId: "foodcourt-f81e3",
  storageBucket: "foodcourt-f81e3.appspot.com",
  messagingSenderId: "1050540555007",
  appId: "1:1050540555007:web:7cd0697be9eb2f5cdf6aca",
  measurementId: "G-F74ZMVHN5L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore();

export { auth, db };