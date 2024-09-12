// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-a4553.firebaseapp.com",
  projectId: "mern-auth-a4553",
  storageBucket: "mern-auth-a4553.appspot.com",
  messagingSenderId: "256912875466",
  appId: "1:256912875466:web:fb06675d2f338d99233933",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
