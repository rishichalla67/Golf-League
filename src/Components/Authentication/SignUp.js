import React, {useRef, useState} from 'react';
import { Card, Form, Button, Container, Alert } from 'react-bootstrap';
import Menu from "../Menu/Menu";
import { AuthProvider, useAuth } from '../../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom';
import './SignUp.css';


export default function SignUp() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords Do Not Match')
        }

        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push('/Home')
        } catch {
            setError('Failed to create an account')
        }
        setLoading(false)

    }

    return(
        <body className='d-block' style={{background: 'linear-gradient(90deg, rgba(133,127,232,1) 12%, rgba(35,193,150,1) 51%, rgba(34,178,207,1) 95%)'}}>
            <Menu/>
            <Container className="d-flex align-items-center justify-content-center container" style={{minHeight: "100vh", background: "none", paddingTop: '-50%'}}>
                <div className="w-100" style={{maxWidth: '35rem'}}>
                <Card className="w-80" style={{padding: '2rem'}}>
                    <Card.Body className="sign-up">
                        <h2 className="text-center">Sign Up</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                    </Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label >Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">Sign Up</Button>
                    </Form>
                </Card>
            
                    <div className="w-100 text-center mt-2">Already have an account? <Link to="/login" style={{color: 'white'}}>Log In</Link>
                </div>
                </div>
            </Container>
        </body>
    )
}