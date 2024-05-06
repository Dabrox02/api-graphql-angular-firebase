import { applicationDefault, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Initialize Firebase
export const app = initializeApp({
    credential: applicationDefault()
});
 
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore();
