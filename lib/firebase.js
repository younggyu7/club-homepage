import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, collection, doc, setDoc, getDoc, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBZTWW08KuPZ4z9gMUDYVyN-3juSRcF-Yw",
  authDomain: "club-homepage-3cf21.firebaseapp.com",
  projectId: "club-homepage-3cf21",
  storageBucket: "club-homepage-3cf21.firebasestorage.app",
  messagingSenderId: "70597781054",
  appId: "1:70597781054:web:7dac32cc8d6c9b3bab536f",
  measurementId: "G-E76CN0HXR1"
};


// Firebase 초기화
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, signInWithPopup, signOut, db, collection, doc, setDoc, getDoc, addDoc, query, orderBy, onSnapshot };
