import * as firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyA5bntlk_2hKdyWp327_0JNgiqoPlMypCw",
    authDomain: "ipl-auction-bphc-1570b.firebaseapp.com",
    databaseURL: "https://ipl-auction-bphc-1570b-default-rtdb.firebaseio.com",
    projectId: "ipl-auction-bphc-1570b",
    storageBucket: "ipl-auction-bphc-1570b.appspot.com",
    messagingSenderId: "278418584038",
    appId: "1:278418584038:web:f4bc9e8c41a2c05eb26627"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase;