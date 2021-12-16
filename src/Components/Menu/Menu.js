import React, {useState, useEffect} from 'react';
import {Link, useHistory} from "react-router-dom"
import { arrayUnion } from "firebase/firestore";
import firebase from 'firebase/app'
import { auth } from '../../firebase';
import "./Menu.css";
import {ethers} from 'ethers';

const firestore = firebase.firestore();

export default function Menu() {
    
    const walletsRef = firestore.collection('wallets');
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [walletConnectStatus, setWalletConnectStatus] = useState("Connect Wallet");
    const [userBalance, setUserBalance] = useState(null);
    const [error, setError] = useState("")
    
    const history = useHistory()

    useEffect(() => {
        if(typeof window.ethereum !== 'undefined') {
            connectWalletHandler();
        }
    })

    const connectWalletHandler = () => {
        if(window.ethereum) {
            window.ethereum.request({method: 'eth_requestAccounts'})
            .then(result => {
                accountChangedHandler(result[0])
            })
        } else {
            setError('Please Check if MetaMask is installed and unlocked!')
        }
    }
    

    const accountChangedHandler = async(newAccount) => {
        setDefaultAccount(newAccount);
        getUserBalance(newAccount);
        //
        setWalletConnectStatus("Connected")
        const {uid} = auth.currentUser;
        await walletsRef.doc(uid).get()
        .then((docSnapshot) => {
          if (docSnapshot.exists) {
            walletsRef.doc(uid).update({
                wallets: firebase.firestore.FieldValue.arrayUnion(newAccount)
            })
          } else {
            walletsRef.doc(uid).set({
                wallets: [newAccount]
            }) 
          }
      });
    }

    const getUserBalance = (address) => {
        window.ethereum.request({method: 'eth_getBalance', params: [address, 'latest']})
        .then(balance => {
            const formattedBalance = ethers.utils.formatEther(balance);
            setUserBalance(formattedBalance);
        })

    }
                

    return(
        <div className="header1">
            <h1 className="logo"><Link to="/Home">golFi</Link></h1>
            <input type="checkbox" id="nav-toggle" className="nav-toggle"/>
            <nav>
                <ul>
                    <li><a href="/Home" style={{color: 'white'}}>Home</a></li>
                    <li><a href="/Profile" style={{color: 'white'}}>Profile</a></li>
                    <li><a href="/Friends" style={{color: 'white'}}>Friends</a></li>
                    <li><a href="/global-chat" style={{color: 'white'}}>Chat</a></li>
                    <li><button className="connect-wallet " onClick={connectWalletHandler}><a>{walletConnectStatus}</a></button></li>
                    {/* <li><a href="/simpleswap-affiliate-widget" style={{color: 'white'}}>Exchange</a></li> */}
                </ul>
            </nav>
            <label htmlFor="nav-toggle" className="nav-toggle-label">
                <span></span>
            </label>
        </div>
    );
}
