import React, {useState, useEffect} from 'react';
import {Link, useHistory} from "react-router-dom"
import { arrayUnion } from "firebase/firestore";
import firebase from 'firebase/app'
import { auth } from '../../firebase';
import "./Menu.css";
import {ethers} from 'ethers';
import { networks } from '../Utils/Networks';

const firestore = firebase.firestore();



export default function Menu() {
    
    const walletsRef = firestore.collection('wallets');
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [currentChainId, setCurrentChainId] = useState(null);
    const [walletConnectStatus, setWalletConnectStatus] = useState("Connect Wallet");
    const [tokenTicker, setTokenTicker] = useState("Ξ");
    const [userBalance, setUserBalance] = useState(null);
    const [error, setError] = useState("")
    
    const history = useHistory()
    
    const networkChanged = (chainid) => {
        console.log({chainid});
        setCurrentChainId({chainid})
    }

    const getCurrentChainId = async() => {
        const id = await window.ethereum.request({ method: 'eth_chainId' })
        setCurrentChainId(id);
    }

    useEffect(() => {
        if(typeof window.ethereum !== 'undefined') {
            connectWalletHandler();
            
        }
        window.ethereum.on("chainChanged", networkChanged => {
            window.location.reload();
        });

        window.ethereum.on("accountsChanged", networkChanged => {
            window.location.reload();
        });

        return () => {
            window.ethereum.removeListener("chainChanged", networkChanged);
            window.ethereum.removeListener("accountsChanged", networkChanged);
        }
    })

    const connectWalletHandler = () => {
        if(window.ethereum) {
            window.ethereum.request({method: 'eth_requestAccounts'})
            .then(result => {
                // console.log(result)
                accountChangedHandler(result[0])
            })
        } else {
            setError('Please Check if MetaMask is installed and unlocked!')
        }
    }
    

    const accountChangedHandler = async(newAccount) => {
        setDefaultAccount(newAccount);
        getUserBalance(newAccount);
        getCurrentChainId();
        
        //
        
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
            const temp = parseFloat(formattedBalance).toFixed(5) //calculate a good decimal threshold for the 
            
            networks.forEach(network => {
                //console.log(network)
                if(network.chainId == currentChainId){
                    //console.log(true)
                    //console.log(network.nativeCurrency.symbol)
                    setTokenTicker(network.nativeCurrency.symbol);
                }
            })
            setWalletConnectStatus(temp+ " " + tokenTicker);
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
