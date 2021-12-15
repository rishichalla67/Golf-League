import React, {useState} from 'react';
import {Link, useHistory} from "react-router-dom"
import {useAuth} from '../../contexts/AuthContext'
import "./Menu.css";



export default function Menu() {
    const [error, setError] = useState("")
    const {currentUser, logout} = useAuth()
    const history = useHistory()

    async function handleLogOut() {
        setError('')

        try {
            await logout()
            history.push('/Login')
        } catch {
            setError('Failed to log out')
        }
    }

    return(
        <header className="header1">
            <h1 class="logo"><Link to="/Home">golFi</Link></h1>
            <input type="checkbox" id="nav-toggle" class="nav-toggle"/>
            <nav>
                <ul>
                    <li><a href="/Home" style={{color: 'white'}}>Home</a></li>
                    <li><a href="/Profile" style={{color: 'white'}}>Profile</a></li>
                    <li><a href="/Friends" style={{color: 'white'}}>Friends</a></li>
                    <li><a href="/global-chat" style={{color: 'white'}}>Global Chat</a></li>
                    <li><a href="#" onClick={handleLogOut} style={{color: 'white'}}>Logout</a></li>
                </ul>
            </nav>
            <label for="nav-toggle" class="nav-toggle-label">
                <span></span>
            </label>
        </header>
    );
}
