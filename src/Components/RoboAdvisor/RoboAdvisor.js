import React, {useState} from 'react'
import {Link, useHistory} from "react-router-dom"
import Menu from '../Menu/Menu'
import {useAuth} from '../../contexts/AuthContext'
import "./RoboAdvisor.css"


export default function RoboAdvisor() {
    const [error, setError] = useState("")
    const {currentUser, logout} = useAuth()
    const history = useHistory()

    return (
        <>
            <div className="bg">
                <div className="title-card welcome connected">
                    <h1 className="header">Robo Advisor</h1>
                    <input className="input-monthly-salary" type="text" placeholder="Monthly after-tax income"></input>
                    <a className="necessities">Necessities</a> 
                    <a className="wants">Wants</a> 
                    <a className="savings">Savings and Debt Repayment</a> 
                </div>
            </div>

        </>
    )
}