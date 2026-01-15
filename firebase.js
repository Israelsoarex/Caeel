import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBVNgbRD9AGU4XCbEJ5J8ln4lnLupxpsLE",
    authDomain: "eng-eletrica-ufpi.firebaseapp.com",
    projectId: "eng-eletrica-ufpi",
    storageBucket: "eng-eletrica-ufpi.firebasestorage.app",
    messagingSenderId: "151889804874",
    appId: "1:151889804874:web:d2f7950e68fa5a69bcf0b3"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
