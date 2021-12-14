import React, {useRef, useState} from 'react';
import { Card, Form, Button, Container, Alert } from 'react-bootstrap';
import Menu from "../Menu/Menu";
import { AuthProvider, useAuth } from '../../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom';


export default function ForgotPassword() {
    const emailRef = useRef()

    const { resetPassword } = useAuth()
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setMessage('')
            setError("")
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('A reset link has been sent to your email')
            
        } catch {
            setError('Failed to reset password')
        }
        setLoading(false)

    }

    return(
        <body className='d-block' style={{background: 'linear-gradient(90deg, rgba(133,127,232,1) 12%, rgba(35,193,150,1) 51%, rgba(34,178,207,1) 95%)'}}>
            <Menu/>
            <Container className="d-flex align-items-center justify-content-center container" style={{minHeight: "100vh", background: "none", paddingTop: '-50%'}}>
                <div className="w-100" style={{maxWidth: '30rem'}}>
                <Card className="w-80" style={{padding: '2rem'}}>
                    <Card.Body>
                        <h2 className="text-center" style={{padding: 0}}>Reset Your Password</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {message && <Alert variant="success">{message}</Alert>}
                    </Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label >Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">Reset Password</Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to='/Login'>Login</Link>
                    </div>
                    
                </Card>
            
                    <div className="w-100 text-center mt-2"> Don't have an account? <Link to="/SignUp" style={{color: 'white'}}>Sign Up</Link>
                </div>
                </div>
            </Container>
        </body>
    )
}