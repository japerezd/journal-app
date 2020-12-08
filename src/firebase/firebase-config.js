import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
// realizar lo de las variables de entorno en notion

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_DATABASEURL,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,
  };

// const firebaseConfigTesting = {
//   apiKey: "AIzaSyCmqiZPlrFAEBOwvDcMFeTBzn06vivPAj4",
//   authDomain: "sql-demos-2e45f.firebaseapp.com",
//   databaseURL: "https://sql-demos-2e45f.firebaseio.com",
//   projectId: "sql-demos-2e45f",
//   storageBucket: "sql-demos-2e45f.appspot.com",
//   messagingSenderId: "648787701122",
//   appId: "1:648787701122:web:2998c8f61ca429b993739b",
//   measurementId: ""
// };

// if(process.env.NODE_ENV === 'test'){
//   // testing
//   firebase.initializeApp(firebaseConfigTesting);

// }else{
//   //dev/prod
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
// }
firebase.initializeApp(firebaseConfig);



const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export{
    db,
    googleAuthProvider,
    firebase
}