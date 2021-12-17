import React, {useState} from 'react'
import { Card, Button, Alert, Container } from 'react-bootstrap'
import {Link, useHistory} from "react-router-dom"
import Menu from '../Menu/Menu'
import { auth } from '../../firebase';
import {useAuth} from '../../contexts/AuthContext'
import './Profile.css'
import EditIcon from '@mui/icons-material/Edit';


export default function Profile() {
    const [error, setError] = useState("")
    const {currentUser, logout} = useAuth()
    const history = useHistory()

    const {photoURL} = auth.currentUser;

    async function handleLogOut() {
        setError('')

        try {
            await logout()
            history.push('/Login')
        } catch {
            setError('Failed to log out')
        }
    }
    return (
        // <body className="container1" style={{background: 'rgb(119, 255, 180)'}}>
        //     <Menu/>
        //     <Container className="d-flex align-items-center justify-content-center container" style={{minHeight: "100vh", background: "none", paddingTop: '-50%'}}>
        //     <>
        //         <div className="d-flex align-items-center" style={{maxWidth: '100rem', alignItems: 'auto'}}></div>
        //             <Card>
        //                 <Card.Body>
        //                     <h2 className="text-center mb-1" style={{padding: "1.5rem"}}>Profile</h2>
        //                     {error && <Alert variant="danger">{error}</Alert>}
        //                     <strong>Email:</strong> {currentUser.email}
        //                     <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
        //                 </Card.Body>
        //                 <div className="w-100 text-center mt-2"> 
        //                     <Button variant="link" onClick={handleLogOut} style={{color: 'black'}}><b>Log Out</b></Button>
        //                 </div>
        //             </Card>
                    
        //     </>
        //     </Container>
        // </body>
        <div className='bg'>
            <Menu/>
            <div className='container'>
                {/* <button onClick={listAllUsers}>List all Users</button> */}
                <div className="title-card welcome connected">
                    <h2>Profile <Link to="/update-profile" ><button className="update-profile"><EditIcon className="editIcon"/></button></Link></h2> 
                    {error && <Alert variant="danger">{error}</Alert>}
                    <a><strong>Email:</strong> {currentUser.email}</a>
                    <img src={photoURL}/>
                    
                    <p className="buttons">
                        
                        <Button variant="link" onClick={handleLogOut} style={{color: 'blue'}}><b>Log Out</b></Button>
                    </p>
                    
                </div>
            </div>
            
        </div>
    )
}
