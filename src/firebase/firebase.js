// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRJOTv3NbjYJFErCblXbitPNLBYvX8HeQ",
  authDomain: "clubsphere-83359.firebaseapp.com",
  projectId: "clubsphere-83359",
  storageBucket: "clubsphere-83359.firebasestorage.app",
  messagingSenderId: "545392127858",
  appId: "1:545392127858:web:512dfcfbb50b8c553777eb",
  measurementId: "G-7HBVCJJFEB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);