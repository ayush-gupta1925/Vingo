// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginvirtualcourses-a2266.firebaseapp.com",
  projectId: "loginvirtualcourses-a2266",
  storageBucket: "loginvirtualcourses-a2266.firebasestorage.app",
  messagingSenderId: "238584169955",
  appId: "1:238584169955:web:4e7140528a9a3f109f8cd6"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
