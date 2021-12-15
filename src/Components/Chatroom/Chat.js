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
import SendIcon from '@mui/icons-material/Send';

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

        const {uid, photoURL, displayName} = auth.currentUser;
        
        console.log(displayName)

        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL,
            displayName
        });
        console.log(messagesRef)

        setFormValue('');

        dummy.current.scrollIntoView({behavior: 'smooth'});
    };

    const [error, setError] = useState("")
    const {currentUser, logout} = useAuth()
    const history = useHistory()

    function ChatMessage(props) {
        console.log(props)
        const {text, uid, photoURL, displayName} = props.message;

        const messageClass = uid === auth.currentUser.uid ? 'sent' : 'recieved';

        return (
            <div className={`message ${messageClass}`}>
                <img className="userIMG" src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
                <a className="displayName">  {displayName}  </a>
                <p>{text}</p>
            </div>
        ) 
    }

    return (
        <>
            <Menu className="nav"/>
            <div className="d-body">
                
                <main>
                    {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}

                    <div ref={dummy}></div>                
                </main>
                <form onSubmit={sendMessage} className="messageForm">

                    <input placeholder="Enter message here..." value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
                    <button type='submit'><SendIcon/></button>

                </form>

                
            </div>
        </>
    );
}
