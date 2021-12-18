import React, {useState, useEffect} from "react";
//import { useState, useCallback } from 'react'
import Menu from "../Menu/Menu";
import './Home.css'
import {ethers} from 'ethers';
import firebase from 'firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import axios from 'axios';
import { networks } from "../Utils/Networks";
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
    const [pricingData, setPricingData] = useState(null)
    const [currentChainId, setCurrentChainId] = useState(null)
    const walletsRef = firestore.collection('wallets');

    useEffect(() => {
        if(typeof window.ethereum !== 'undefined') {
            connectWalletHandler();
        }
        (async () => {
            const temp = await getPricingData();
            setPricingData(temp)
        })();
        (async () => await getCurrentChainId())();
    }, [])

    const getCurrentChainId = async() => {
        let currentNetwork = "eth"
        const id = await window.ethereum.request({ method: 'eth_chainId' })
        networks.forEach(network => {
            if(network.chainId == id){
                currentNetwork = network.nativeCurrency.name;
                console.log(currentNetwork)
            }
        })
        setCurrentChainId(currentNetwork);
    }

    const getPricingData = async() => {
        try{
            const response = await fetch('/v1/currencies/ticker?key=f4335d03c35fda19304ee5a774da930698ac6ed1&interval=1h,30d&per-page=1000&page=1');
            const data = await response.json();
            return data
        } catch(error){
            console.log(error.stack)
        }
    }

    const connectWalletHandler = () => {
        if(window.ethereum) {
            window.ethereum.request({method: 'eth_requestAccounts'})
            .then(result => {
                // console.log(result)
                getUserBalance(result[0])
            })
        } else {
            console.log('Please Check if MetaMask is installed and unlocked!')
        }
    }

    

    const getUserBalance = (address) => {
        window.ethereum.request({method: 'eth_getBalance', params: [address, 'latest']})
        .then(balance => {
            const formattedBalance = ethers.utils.formatEther(balance);
            const temp = parseFloat(formattedBalance).toFixed(5) //calculate a good decimal threshold for the 
            // setWalletConnectStatus(temp+ " " + tokenTicker);
            setUserBalance(temp);
        })

    }
    if(pricingData == null) return <a>Loading...</a>
    
    return (
        <div className='bg'> 
            <Menu/>
            <div className="title-card welcome connected">
                <h2>Welcome, {user.displayName}!</h2>
                <hr className="title-underline"/>
                {
                    pricingData && pricingData.map(coin =>{
                        // console.log(coin.id)
                        if (coin.name == currentChainId) {
                            console.log(coin)
                            console.log("Print this pls: " + coin)
                            return(
                                <>

                                    <h4 className="wallet-balance">Connected Wallet Balance: </h4> 
                                    <h4 className="wallet-balance">{userBalance} {coin.symbol}</h4>

                                    <h4 className="chain-price">{coin.name.replace(/['"]+/g, '')} Price: </h4> 
                                    <h4 className="chain-price">${parseFloat(coin.price.replace(/['"]+/g, '')).toFixed(4)}</h4>
                                    
                                    <hr/>

                                    <h3 className="account-total">Account Total: </h3> 
                                    <h3 className="account-total">${(parseFloat(coin.price.replace(/['"]+/g, ''))*userBalance).toFixed(2)}</h3>
                                </>
                            
                        )}
                    })
                }
                {/* <li> {JSON.stringify(pricingData[0].id).replace(/['"]+/g, '')}: 
                    {
                        parseFloat(JSON.stringify(pricingData[0].price).replace(/['"]+/g, ''))
                    }
                </li> */}
                
            </div>
        </div>
    );
}

