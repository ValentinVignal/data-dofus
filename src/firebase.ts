
import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB1HPQceSPAiIKowRSyuRlYq6n7zR4FDbU",
    authDomain: "data-dofus.firebaseapp.com",
    databaseURL: "https://data-dofus.firebaseio.com",
    projectId: "data-dofus",
    storageBucket: "data-dofus.appspot.com",
    messagingSenderId: "957046506004",
    appId: "1:957046506004:web:6c18f060aaf65638b0dd01",
    measurementId: "G-L5DTQD2Z87"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };