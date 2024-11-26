import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth/cordova';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyA2W7cyPW6JP9Yzd3c2sNGjCeuIW6medTE",
    authDomain: "studyplanner-8ec8f.firebaseapp.com",
    projectId: "studyplanner-8ec8f",
    storageBucket: "studyplanner-8ec8f.firebasestorage.app",
    messagingSenderId: "325724346238",
    appId: "1:325724346238:web:5dcadbd80022193d36052f"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
