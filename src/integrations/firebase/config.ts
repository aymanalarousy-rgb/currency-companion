import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB7fVMhjD-iEgU36cT2BF-ihC-mrkv4OOs",
  authDomain: "currency-companion.firebaseapp.com",
  projectId: "currency-companion",
  storageBucket: "currency-companion.firebasestorage.app",
  messagingSenderId: "824739291336",
  appId: "1:824739291336:web:9c2017bedeee5f470b85fd",
  measurementId: "G-E64GKFWWTW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default app;
