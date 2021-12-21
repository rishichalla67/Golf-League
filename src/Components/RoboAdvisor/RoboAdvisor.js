import React, {useState} from 'react'
import {Link, useHistory} from "react-router-dom"
import Menu from '../Menu/Menu'
import {useAuth} from '../../contexts/AuthContext'


export default function RoboAdvisor() {
    const [error, setError] = useState("")
    const {currentUser, logout} = useAuth()
    const history = useHistory()

    return (
        <>
            <div className="bg">
                
                <h1 className="header">Robo Advisor</h1>
                <input type="text" placeholder="Monthly after-tax income"></input>
            </div>

        </>
    )
}