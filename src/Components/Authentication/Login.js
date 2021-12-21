import React, {useRef, useState} from 'react';
import { Card, Form, Button, Container, Alert } from 'react-bootstrap';
import { AuthProvider, useAuth } from '../../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom';
import firebase from 'firebase/app'
import { useAuthState } from 'react-firebase-hooks/auth';
import './login.css';

const auth = firebase.auth();
const firestore = firebase.firestore();


export default function Login() {
    
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    
    let exists = false;
    const [user] = useAuthState(auth)
    const signInWithGoogle = async(e) => {
        try{
            const provider = new firebase.auth.GoogleAuthProvider();
            const res = await auth.signInWithPopup(provider)
            console.log(res.user.displayName)
            if(res.user.displayName == null){
                history.push("/")
            }else{
                
                history.push('/global-chat')
            }
        }catch (error) {
            console.log(error.message)
        }
        
    }

    async function handleSubmit(e) {
        e.preventDefault()

        try { 
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            
            history.push("/Home")
        } catch {
            setError('Failed to log in')
        }
        setLoading(false)

    }


    return(
        <body className='d-block' style={{background: 'linear-gradient(90deg, rgba(133,127,232,1) 12%, rgba(35,193,150,1) 51%, rgba(34,178,207,1) 95%)'}}>
           
            <Container className="d-flex align-items-center justify-content-center container" style={{minHeight: "100vh", background: "none", paddingTop: '-50%'}}>
                <div className="w-100" style={{maxWidth: '30rem'}}>
                <Card className="w-80" style={{padding: '2rem'}}>
                    <Card.Body>
                        <h2 className="text-center" style={{padding: 0}}>Log In</h2>
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
                        <p></p>
                        <Button disabled={loading} className="w-100" style={{backgroundColor: '#ffcccb', color: 'black'}} onClick={signInWithGoogle}>Sign In With Google</Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to='/forgot-password'>Forgot Password?</Link>
                        
                    </div>
                    
                </Card>
            
                    <div className="w-100 text-center mt-2"> Don't have an account? <Link to="/SignUp" style={{color: 'white'}}>Sign Up</Link>
                </div>
                </div>
            </Container>
        </body>
    )
}