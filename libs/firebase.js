import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9YN-Hx6m9_7EJrALaJmgtJhn1LgoLigc",
  authDomain: "bookscollection-26d3c.firebaseapp.com",
  projectId: "bookscollection-26d3c",
  storageBucket: "bookscollection-26d3c.appspot.com",
  messagingSenderId: "911001222062",
  appId: "1:911001222062:web:622a152f5eb38991c3e63f"
};


const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);