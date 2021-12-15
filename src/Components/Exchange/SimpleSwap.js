import React, {useState} from 'react'
import { Card, Button, Alert, Container } from 'react-bootstrap'
import {Link, useHistory} from "react-router-dom"
import Menu from '../Menu/Menu'
import {useAuth} from '../../contexts/AuthContext'
import './SimpleSwap.css'


export default function SimpleSwap() {
    const [error, setError] = useState("")
    const {currentUser, logout} = useAuth()
    const history = useHistory()

    return (
        <div className="bg">
            <Menu/>
            <h1 className="disclaimer">Accountless Crypto Swapping Powered By SimpleSwap</h1>
            <iframe className="simpleSwap" id="simpleswap-frame" name="SimpleSwap Widget"  src="https://simpleswap.io/widget/9cc3620c-de2c-4c9e-b7b0-e49f350043bb" frameBorder="0"></iframe>
        </div>
    )
}