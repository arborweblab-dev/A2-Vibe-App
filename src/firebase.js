import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// We will replace this with your actual Firebase config in the next step
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "a2-vibe.firebaseapp.com",
  projectId: "a2-vibe",
  storageBucket: "a2-vibe.firebasestorage.app",
  messagingSenderId: "460550752302",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
