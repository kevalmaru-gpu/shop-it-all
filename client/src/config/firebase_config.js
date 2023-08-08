// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjRS80FTCg_wyD6FwoXNDqHZd2D_jRLP0",
  authDomain: "clone-a8fdc.firebaseapp.com",
  projectId: "clone-a8fdc",
  storageBucket: "clone-a8fdc.appspot.com",
  messagingSenderId: "1020110800215",
  appId: "1:1020110800215:web:52e68468318e755f1e2a12",
  measurementId: "G-MR52ZJ7JG6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export {app, analytics, storage}