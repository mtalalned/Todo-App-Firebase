// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALX4J_FB17C0x0NsgKk7Vi9nztHtO6yGI",
  authDomain: "todo-app-a5218.firebaseapp.com",
  projectId: "todo-app-a5218",
  storageBucket: "todo-app-a5218.appspot.com",
  messagingSenderId: "350239550528",
  appId: "1:350239550528:web:d3d91a731787073a2983a5",
  measurementId: "G-PQ0KEM3H81"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);