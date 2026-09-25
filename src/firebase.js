import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCmullh2QQu6pX_YIWHdKf0N3JNdTaAyxo",
  authDomain: "a2-vibe.firebaseapp.com",
  projectId: "a2-vibe",
  storageBucket: "a2-vibe.firebasestorage.app",
  messagingSenderId: "460550752302",
  appId: "1:460550752302:web:762103ed8966dfb24877bf",
  measurementId: "G-5SKGDHGWWZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
