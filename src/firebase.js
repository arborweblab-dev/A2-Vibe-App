// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmullh2QQu6pX_YIWHdKf0N3JNdTaAyxo",
  authDomain: "a2-vibe.firebaseapp.com",
  projectId: "a2-vibe",
  storageBucket: "a2-vibe.firebasestorage.app",
  messagingSenderId: "460550752302",
  appId: "1:460550752302:web:762103ed8966dfb24877bf",
  measurementId: "G-5SKGDHGWWZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export the app instance so App.jsx can use it
export { app };
