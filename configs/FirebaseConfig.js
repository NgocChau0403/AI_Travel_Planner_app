// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth"; // Thêm import
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Thêm import

// Your web app's Firebase configuration
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
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage), // Thêm persistence để lưu trữ phiên đăng nhập
});

export const db = getFirestore(app);
