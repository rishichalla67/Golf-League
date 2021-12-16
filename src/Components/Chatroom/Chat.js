import React, {useRef, useState} from 'react'
import {Link, useHistory} from "react-router-dom"
import Menu from '../Menu/Menu'
import {useAuth} from '../../contexts/AuthContext'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import './Chat.css'
import firebase from 'firebase/app'
import SendIcon from '@mui/icons-material/Send';

const auth = firebase.auth();
const firestore = firebase.firestore();

export default function Chat() {
    const sendDisabled = false;
    const dummy = useRef();
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);
    const [messages] = useCollectionData(query, {idField: 'id'});

    const [formValue, setFormValue] = useState('');

    const sendMessage = async(e) => {
        e.preventDefault();

        const {uid, photoURL, displayName} = auth.currentUser;
        
        
        if(formValue !== ''){
            await messagesRef.add({
                text: formValue,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                photoURL,
                displayName
            });
        }
        console.log(messagesRef)

        setFormValue('');

        dummy.current.scrollIntoView({behavior: 'smooth'});
    };

    const [error, setError] = useState("")
    const {currentUser, logout} = useAuth()
    const history = useHistory()

    function ChatMessage(props) {
        // console.log(props)
        const {text, uid, photoURL, displayName} = props.message;

        const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

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
            <div className="d-body bg">
                
                <main>
                    {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}

                    <div ref={dummy}></div>                
                </main>
                <form onSubmit={sendMessage} className="messageForm">

                    <input placeholder="Enter message here..." value={formValue} onChange={((e) => 
                        setFormValue(e.target.value))}/>
                    <button className="send-button" type='submit' disabled={sendDisabled}><SendIcon className="icon"/></button>

                </form>

                
            </div>
        </>
    );
}
