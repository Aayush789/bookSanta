import firebase from 'firebase';
require('@firebase/firestore') 

var firebaseConfig = {
    apiKey: "AIzaSyBgkXKmepevNHuVuEx2HTRTz6-ghtnp9aQ",
    authDomain: "book-santa-700c3.firebaseapp.com",
    databaseURL: "https://book-santa-700c3.firebaseio.com",
    projectId: "book-santa-700c3",
    storageBucket: "book-santa-700c3.appspot.com",
    messagingSenderId: "771122395983",
    appId: "1:771122395983:web:608ad2450f8f121dd5633a",
    measurementId: "G-PQ64NNP6K9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default firebase.firestore();
