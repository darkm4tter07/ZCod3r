import {getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,  OAuthProvider,GoogleAuthProvider,signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDfHFckg-SMfYAZ8bcLOZVuDe05AwfWI3U",
  authDomain: "zcoder-314159.firebaseapp.com",
  projectId: "zcoder-314159",
  storageBucket: "zcoder-314159.appspot.com",
  messagingSenderId: "1045077861815",
  appId: "1:1045077861815:web:b4812b984bcf684cdd3432",
  measurementId: "G-2VTJP1J6RJ"
};

const app = getApps.length>0?getApp() : initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const GoogleProvider = new GoogleAuthProvider();
const OutlookProvider = new OAuthProvider("microsoft.com");


export {auth, GoogleProvider, OutlookProvider, signInWithPopup};