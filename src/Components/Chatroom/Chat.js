import React, {useState} from 'react'
import { Card, Button, Alert, Container } from 'react-bootstrap'
import {Link, useHistory} from "react-router-dom"
import Menu from '../Menu/Menu'
import {useAuth} from '../../contexts/AuthContext'
import { db } from '../../firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import * as FirestoreService from '../../firebase';
import './Chat.css'



export default function Chat() {
    const [error, setError] = useState("")
    const {currentUser, logout} = useAuth()
    const history = useHistory()
    
    function sendMessage(e) {
        e.preventDefault();
        setError(null);

        
    }

    return (
        <>
            <header><Menu /></header>
            <div className="chat-body">
                Hello
            </div>
        </>
    );
}
