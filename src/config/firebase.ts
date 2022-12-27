// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcwDJ-Qs4K1uQoMiNYmnaOyTWWEa8MDqg",
  authDomain: "authentication-44d94.firebaseapp.com",
  projectId: "authentication-44d94",
  storageBucket: "authentication-44d94.appspot.com",
  messagingSenderId: "350210635568",
  appId: "1:350210635568:web:2b20323e5a8d8336c37af5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);