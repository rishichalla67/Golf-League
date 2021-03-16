import React, {useState} from 'react'
import { Card, Button, Alert, Container } from 'react-bootstrap'
import {Link} from "react-router-dom"
import Menu from '../Menu/Menu'
import {useAuth} from '../../contexts/AuthContext'
import './Profile.css'


export default function Profile() {
    const [error, setError] = useState("")
    const {currentUser} = useAuth()

    function handleLogOut() {

    }
    return (
        <body  style={{background: 'linear-gradient(90deg, rgba(133,127,232,1) 12%, rgba(35,193,150,1) 51%, rgba(34,178,207,1) 95%)'}}>
            <Menu/>
            <Container className="d-flex align-items-center justify-content-center container" style={{minHeight: "100vh", background: "none", paddingTop: '-50%'}}>
            <>
                <div className="w-100" style={{maxWidth: '100rem'}}></div>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-1">Profile</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <strong>Email:</strong> {currentUser.email}
                            <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
                        </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-2"> 
                        <Button variant="link" onClick={handleLogOut} style={{color: 'white'}}><b>Log Out</b></Button>
                    </div>
            </>
            </Container>
        </body>
    )
}
