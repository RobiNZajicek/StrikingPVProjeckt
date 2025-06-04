import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCE8VxR1se-6rXEobsK0a3_kGghUiXFiTo",
    authDomain: "strikingweb-e2a2f.firebaseapp.com",
    projectId: "strikingweb-e2a2f",
    storageBucket: "strikingweb-e2a2f.firebasestorage.app",
    messagingSenderId: "989359868228",
    appId: "1:989359868228:web:3542606d749bef9e982f11",
    measurementId: "G-18LDSXVSEJ"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };    