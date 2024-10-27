import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; 
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAdNCCSdRW9wAHRp35wEPR9LPKzBeI1tfw",
  authDomain: "chat-app-1a7bc.firebaseapp.com",
  projectId: "chat-app-1a7bc",
  storageBucket: "chat-app-1a7bc.appspot.com",
  messagingSenderId: "156084294454",
  appId: "1:156084294454:web:ee4259706e2ea8b0bf5997",
  measurementId: "G-FNK9GSTY5S"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);