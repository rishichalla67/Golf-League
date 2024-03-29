import firebase from 'firebase/app'
import 'firebase/firestore'
import "firebase/auth"

import { useAuthState } from 'react-firebase-hooks/auth';




const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STOREAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
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