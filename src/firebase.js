import firebase from 'firebase/app'
import "firebase/auth"



const app = firebase.initializeApp({
    apiKey: "AIzaSyCWEjX3-KC5DmpTfUofWfnJJR-gGbQCqtc",
    authDomain: "golf-league-b508f.firebaseapp.com",
    projectId: "golf-league-b508f",
    storageBucket: "golf-league-b508f.appspot.com",
    messagingSenderId: "1053908377547",
    appId: "1:1053908377547:web:ddbcb9603ea2c4b3dca04e",
    measurementId: "G-ZDWVT8WZH8"
})

export const auth = app.auth()
export default app