import firebase from "firebase";

// Add the Firebase products that you want to use
require("firebase/firestore");
require("firebase/auth");

export const firebaseConfig = {
    apiKey: "AIzaSyBiphumjCHYrJks5PwfkP_y4fR9PsVSo_g",
    authDomain: "expensio-f8d3d.firebaseapp.com",
    projectId: "expensio-f8d3d",
    storageBucket: "expensio-f8d3d.appspot.com",
    messagingSenderId: "623662589753",
    appId: "1:623662589753:web:70fbca351b8a578d02eae8",
    measurementId: "G-VCLX1PGZ14"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const Firebase = firebase;

export const DB = firebase.firestore();