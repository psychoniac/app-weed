import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC3WKX4IzgZhGE2Bgx-1LSvzQh4HzekCqs",
  authDomain: "app-weed-e6491.firebaseapp.com",
  projectId: "app-weed-e6491",
  storageBucket: "app-weed-e6491.appspot.com",
  messagingSenderId: "937804016696",
  appId: "1:937804016696:web:7d5c5e03614d5d77f10acd"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);