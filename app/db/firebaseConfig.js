
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "lets-talk-bis.firebaseapp.com",
  projectId: "lets-talk-bis",
  storageBucket: "lets-talk-bis.appspot.com",
  messagingSenderId: "280420978617",
  appId: "1:280420978617:web:cb9c2c96b672b9da7c3068"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
export const storage = getStorage(app);