import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyD2RnepYkdHqM_7AcaA-FbTgZ5KtTxC_0A",
    authDomain: "twitter-bc60d.firebaseapp.com",
    projectId: "twitter-bc60d",
    storageBucket: "twitter-bc60d.appspot.com",
    messagingSenderId: "580376153310",
    appId: "1:580376153310:web:3f8ffca701f9ece7a7464f"
};
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };