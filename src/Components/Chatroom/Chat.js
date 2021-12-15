import React, {useRef, useState} from 'react'
import { Card, Button, Alert, Container } from 'react-bootstrap'
import {Link, useHistory} from "react-router-dom"
import Menu from '../Menu/Menu'
import {useAuth} from '../../contexts/AuthContext'
import { db } from '../../firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import * as FirestoreService from '../../firebase';
import './Chat.css'
import firebase from 'firebase/app'
import { useAuthState } from 'react-firebase-hooks/auth';

const auth = firebase.auth();
const firestore = firebase.firestore();

export default function Chat() {
    const dummy = useRef();
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);
    const [messages] = useCollectionData(query, {idField: 'id'});

    const [formValue, setFormValue] = useState('');

    const sendMessage = async(e) => {
        e.preventDefault();

        const {uid, photoURL} = auth.currentUser;

        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL
        });

        setFormValue('');

        dummy.current.scrollIntoView({behavior: 'smooth'});
    };

    const [error, setError] = useState("")
    const {currentUser, logout} = useAuth()
    const history = useHistory()
    
    // function sendMessage(e) {
    //     e.preventDefault();
    //     setError(null);

        
    // }

    function ChatMessage(props) {
        const {text, uid, photoURL} = props.message;

        const messageClass = uid === auth.currentUser.uid ? 'sent' : 'recieved';

        return (
            <div className={`message ${messageClass}`}>
                <img classname="userIMG" src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
                <p>{text}</p>
            </div>
        ) 
    }

    return (
        <div className="d-body">
            <div ><Menu/></div>
            <main>
                {messages && messages.map(msg => <ChatMessage key={msg.uid} message={msg}/>)}

                <div ref={dummy}></div>                
            </main>
            <form onSubmit={sendMessage} classname="messageForm">

                <input placeholder="Enter message here..." value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
                <button type='submit'>Send</button>

            </form>

            
        </div>
    );
}
