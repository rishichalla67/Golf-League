import React, {useState, useEffect} from "react";
//import { useState, useCallback } from 'react'
import Menu from "../Menu/Menu";
import './Home.css'
import {ethers} from 'ethers';
import firebase from 'firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
require('firebase/auth')



// export function useForceUpdate() {
//     const [, setTick] = useState(0);
//     const update = useCallback(() => {
//         setTick(tick => tick + 1);
//     }, [])
//     return update;
// }
const auth = firebase.auth();
const firestore = firebase.firestore();


export default function Home() {
    // const {currentUser, logout} = useAuth()
    const [user] = useAuthState(auth);
    const [userWallets, setUserWallets] = useState([])
    const [userBalance, setUserBalance] = useState([]);
    const walletsRef = firestore.collection('wallets');

    useEffect(() => {
        getWalletsFromUser();
        
    }, [])

    const getWalletsFromUser = async() => {
        await walletsRef.doc(user.uid).get()
        .then((docSnapshot) => {
          if (docSnapshot.exists) {
            setUserWallets(docSnapshot.data().wallets) 
            docSnapshot.data().wallets.forEach(wallet =>{
                getUserBalance(wallet)
            })
          }
        
      });
    
    }

    

    const getUserBalance = (address) => {
        const balances = []
        // wallets.forEach(address => {
        window.ethereum.request({method: 'eth_getBalance', params: [address, 'latest']})
        .then(balance => {
            const formattedBalance = ethers.utils.formatEther(balance);
            // console.log(balance, formattedBalance)
            setUserBalance([...userBalance, formattedBalance])
            
        },)
        // })
        
        
    }

    return (
        <div className='bg'>
            <Menu/>
            <div className='container'>
                <div className="title-card welcome not-connected">
                    <a>Welcome, {user.displayName}!</a>
                    <img className="homepageBG-img" src={require('./homepageBG.jpg')} alt="golf" width="50%"/>
                </div>
                {/* <button onClick={listAllUsers}>List all Users</button> */}
                <div className="title-card welcome connected">
                    <a>Check your associated wallets below:</a>
                    {
                        userBalance && userBalance.map(balance=>{
                            return(
                                <div className="balances">
                                    <h4>Wallet Balance: {balance} Ξ</h4>
                                </div>
                            )
                        })
                    }
                    <h1>
                        
                    </h1>
                </div>
            </div>
            
        </div>
    );
}

