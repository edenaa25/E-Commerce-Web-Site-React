// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-D7W4P94D3Qeonnmtm-DNWn8crve05jk",
  authDomain: "react-project-759ec.firebaseapp.com",
  projectId: "react-project-759ec",
  storageBucket: "react-project-759ec.appspot.com",
  messagingSenderId: "139826299497",
  appId: "1:139826299497:web:9d21f52b75c7df69f618f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;