import firebase from 'firebase/app'
import 'firebase/firestore'
import "firebase/auth"

import { useAuthState } from 'react-firebase-hooks/auth';




const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_API_KEY,
    projectId: process.env.REACT_APP_FIREBASE_API_KEY,
    storageBucket: process.env.REACT_APP_FIREBASE_API_KEY,
    messagingSenderId: process.env.REACT_APP_FIREBASE_API_KEY,
    appId: process.env.REACT_APP_FIREBASE_API_KEY,
    measurementId: process.env.REACT_APP_FIREBASE_API_KEY
})
export const db = firebase.firestore();
export const auth = app.auth();


export const sendMessage = (message, userId) => {
    return db.collection('messages')
        .add({
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            id: userId,
            text: message
        });
};




export default app