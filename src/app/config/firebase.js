import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD8ToXlmyeR6hZzGk-jdf7PqJOBNtCVKp0",
  authDomain: "orgevents93.firebaseapp.com",
  databaseURL: "https://orgevents93.firebaseio.com",
  projectId: "orgevents93",
  storageBucket: "orgevents93.appspot.com",
  messagingSenderId: "249588531200",
  appId: "1:249588531200:web:eecac12f5c095b1b8d98e5"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
