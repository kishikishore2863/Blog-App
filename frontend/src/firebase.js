// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "blog-87b7b.firebaseapp.com",
  projectId: "blog-87b7b",
  storageBucket: "blog-87b7b.appspot.com",
  messagingSenderId: "920100844733",
  appId: "1:920100844733:web:ed286f8e89cb03af21b3d4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;