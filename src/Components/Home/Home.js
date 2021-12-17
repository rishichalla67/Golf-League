import React, {useState, useEffect} from "react";
//import { useState, useCallback } from 'react'
import Menu from "../Menu/Menu";
import './Home.css'
import {ethers} from 'ethers';
import firebase from 'firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import axios from 'axios';
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
    const [loading, setLoading] = useState();
    const [ethData, setEthData] = useState(null)
    const walletsRef = firestore.collection('wallets');

    useEffect(() => {
        (async () => await getWalletsFromUser())();
        (async () => await getEthData())();
        
    }, [])

    const getEthData = async() => {
        try{
            const response = await fetch('https://api.nomics.com/v1/currencies/ticker?key=f4335d03c35fda19304ee5a774da930698ac6ed1&ids=ETH&interval=1d,30d&platform-currency=ETH&per-page=100&page=1');
            const data = await response.json();
            console.log(userBalance)
            setEthData(data);
        } catch(error){
            console.log(error.stack)
        }
    }

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
        const balances = [];
        // wallets.forEach(address => {
        
        window.ethereum.request({method: 'eth_getBalance', params: [address, 'latest']})
        .then(balance => {
            const formattedBalance = ethers.utils.formatEther(balance);
            // const dollarBalance = ethData[0].price * parseFloat(formattedBalance)
            
            setUserBalance([...userBalance, formattedBalance])
            
        },)
        // })
        
        
    }

    return (
        <div className='bg'>
            <Menu/>
            <div className='container'>
                {/* <button onClick={listAllUsers}>List all Users</button> */}
                <div className="title-card welcome connected">
                    <h2>Welcome, {user.displayName}!</h2>
                    <a className="description">Check your associated wallets below:</a>
                    { 
                        userBalance && userBalance.map(balance=>{
                            return(
                                <div className="balances" key={user.uid}>
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

