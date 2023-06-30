// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnLBE5OUuWoJfQlp_x2AibkZw-DnPVkfE",
  authDomain: "react-http-demo-d5f4b.firebaseapp.com",
  databaseURL: "https://react-http-demo-d5f4b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-http-demo-d5f4b",
  storageBucket: "react-http-demo-d5f4b.appspot.com",
  messagingSenderId: "792195919850",
  appId: "1:792195919850:web:af1723e24935301f42cc93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
