import { boot } from "quasar/wrappers";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHbJ0QMxtfmpzhaMPDB4ufWNf6JvLTNNw",
  authDomain: "intus-d9b58.firebaseapp.com",
  projectId: "intus-d9b58",
  storageBucket: "intus-d9b58.appspot.com",
  messagingSenderId: "496219168579",
  appId: "1:496219168579:web:3629b0293e857f1539d9f6",
  measurementId: "G-YNKX5FLL1C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage(app);

export default db;
