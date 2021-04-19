import * as firebase from "firebase";

const firebaseConfig = {
     apiKey: "AIzaSyB0SnGJSYEyPlFn0cR4-p4nOBLtU4qR-d4",
    authDomain: "ipl-auction-bphc-809e9.firebaseapp.com",
    projectId: "ipl-auction-bphc-809e9",
    storageBucket: "ipl-auction-bphc-809e9.appspot.com",
    messagingSenderId: "445746092559",
    appId: "1:445746092559:web:fe0405847f514cbc8a617a"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase;
