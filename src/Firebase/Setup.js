
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDwgkag68mbLmNbNYfcqLYYZ3WmnJQ_xt0",
    authDomain: "bbc-clone-888d3.firebaseapp.com",
    projectId: "bbc-clone-888d3",
    storageBucket: "bbc-clone-888d3.appspot.com",
    messagingSenderId: "936292829949",
    appId: "1:936292829949:web:7ac84d44a4958a98d1cc94",
    measurementId: "G-9FJ3KQY9H1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider(app);
export const database = getFirestore(app);