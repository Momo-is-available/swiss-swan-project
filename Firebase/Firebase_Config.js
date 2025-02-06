// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js';

const firebaseConfig = {
  apiKey: "AIzaSyC7FNWSTlZLCmaNq0l7sW2yuwqeWumErmo",
  authDomain: "ashopfluter.firebaseapp.com",
  projectId: "ashopfluter",
  storageBucket: "ashopfluter.firebasestorage.app",
  messagingSenderId: "1047274525186",
  appId: "1:1047274525186:web:e69c4b808fc0e77d9b8d1b"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };