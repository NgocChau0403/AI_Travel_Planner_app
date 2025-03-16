// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYaGjdRhJskBxxWFIKmXZj6T8kGHo844Q",
  authDomain: "project-in-uit.firebaseapp.com",
  projectId: "project-in-uit",
  storageBucket: "project-in-uit.firebasestorage.app",
  messagingSenderId: "271567366110",
  appId: "1:271567366110:web:6c8d88ca24ee9c15305f4f",
  measurementId: "G-GJZDLJQ6Y4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
