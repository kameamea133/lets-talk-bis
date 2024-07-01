
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyC167yE746hBCeNzSrn6ZwDtTZSL7M0cWk",
  authDomain: "lets-talk-ae7e3.firebaseapp.com",
  projectId: "lets-talk-ae7e3",
  storageBucket: "lets-talk-ae7e3.appspot.com",
  messagingSenderId: "37471023614",
  appId: "1:37471023614:web:aa2462fbed2b9dc25a10af"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
export const storage = getStorage(app);