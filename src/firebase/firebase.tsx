// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAA7rtxzMGckBY6UvH0guyGszMaoLo3XK4",
  authDomain: "altemira-fitness-site.firebaseapp.com",
  projectId: "altemira-fitness-site",
  storageBucket: "altemira-fitness-site.appspot.com",
  messagingSenderId: "65140640068",
  appId: "1:65140640068:web:3934985f6aa946cddb6f11",
  measurementId: "G-3WMQ1T2LN5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };
