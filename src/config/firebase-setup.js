import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPzbiqmlIbw1MDWhO2G8Zr9nFYEraS5is",
  authDomain: "jsr-final-project-abf52.firebaseapp.com",
  projectId: "jsr-final-project-abf52",
  storageBucket: "jsr-final-project-abf52.appspot.com",
  messagingSenderId: "834374669566",
  appId: "1:834374669566:web:7714d57ece62836b7841af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;