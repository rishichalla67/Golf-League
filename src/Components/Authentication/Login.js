import React, {useRef, useState} from 'react';
import { Card, Form, Button, Container, Alert } from 'react-bootstrap';
import Menu from "../Menu/Menu";
import { AuthProvider, useAuth } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom';


export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
        } catch {
            setError('Failed to log in')
        }
        setLoading(false)

    }

    return(
        <body className='d-block' style={{background: 'linear-gradient(90deg, rgba(133,127,232,1) 12%, rgba(35,193,150,1) 51%, rgba(34,178,207,1) 95%)'}}>
            <Menu/>
            <Container className="d-flex align-items-center justify-content-center container" style={{minHeight: "100vh", background: "none", paddingTop: '-50%'}}>
                <div className="w-100" style={{maxWidth: '35rem'}}>
                <Card className="w-80" style={{padding: '2rem'}}>
                    <Card.Body>
                        <h2 className="text-center mb-4">Log In</h2>
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
                        <Button disabled={loading} className="w-100" type="submit">Log In</Button>
                    </Form>
                </Card>
            
                    <div className="w-100 text-center mt-2"> Don't have an account? <Link to="/SignUp" style={{color: 'white'}}>Sign Up</Link>
                </div>
                </div>
            </Container>
        </body>
    )
}