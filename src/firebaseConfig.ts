import firebase from 'firebase/app';
import 'firebase/storage';
import Config from "./Components/Config";
 
// Initialize Firebase

const app = firebase.initializeApp({
  apiKey: Config.firebaseapikey,
  authDomain: Config.firebaseauthdomain,
  projectId: Config.firebaseprojectid,
  storageBucket: Config.firebasestoragebucket,
  messagingSenderId: Config.firebasemessagesenderid,
  appId: Config.firebaseappid,
  measurementId: Config.firebasemeasurementid,
});
 
// Firebase storage reference
const storage = firebase.storage();
export default storage;
