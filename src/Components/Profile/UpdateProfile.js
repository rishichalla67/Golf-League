import React, {useRef, useState} from 'react';
import { Card, Form, Button, Container, Alert } from 'react-bootstrap';
import Menu from "../Menu/Menu";
import { AuthProvider, useAuth } from '../../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom';
//import firestore from "./firestore"



export default function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, updatePassword, updateEmail } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords Do Not Match')
        }
        
        const promises = []
        setError("")
        setLoading(true)
        if(emailRef.current.value != currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }

        if(passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(() => {
            history.push('/Profile')
        }).catch(() => {
            setError('Failed to update account')
        }).finally(() => {
            setLoading(false)
        })
        
        setLoading(false)

    }

    return(
        <body className='bg d-block'>
            <Menu/>
            <Container className="d-flex align-items-center justify-content-center container" style={{minHeight: "100vh", background: "none", paddingTop: '-50%'}}>
                <div className="w-100" style={{maxWidth: '35rem', minWidth: '35rem'}}>
                    <Card className="w-80" style={{padding: '2rem'}}>
                        <Card.Body className="sign-up">
                            <h2 className="text-center" style={{padding: 0}}>Update Profile</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                        </Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="username">
                                <Form.Label >Username</Form.Label>
                                <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.nickname}/>
                            </Form.Group>
                            <Form.Group id="email">
                                <Form.Label >Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email}/>
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" ref={passwordRef} placeholder="Leave empty to keep current"/>
                            </Form.Group>
                            <Form.Group id="password-confirm">
                                <Form.Label>Password Confirmation</Form.Label>
                                <Form.Control type="password" ref={passwordConfirmRef} placeholder="Leave empty to keep current"/>
                            </Form.Group>
                            <Button disabled={loading} className="w-100" type="submit">Update</Button>
                        </Form>
                        <div className="w-100 text-center "> <h3><Link to="/Profile" style={{color: 'blue'}}>Cancel</Link></h3></div>
                    </Card>
                </div>
            </Container>
        </body>
    )
}