
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdOVyrUEjJ3aABem6NrD2Is5chf1HF008",
  authDomain: "gamereview-d94af.firebaseapp.com",
  projectId: "gamereview-d94af",
  storageBucket: "gamereview-d94af.firebasestorage.app",
  messagingSenderId: "293416632807",
  appId: "1:293416632807:web:938f4e6034f171c5bcbd42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);