import React from "react";
//import { useState, useCallback } from 'react'
import Menu from "../Menu/Menu";
import './Home.css'
import ViewPlayers from "../TableView/ViewPlayers";
import axios from "axios";
import orderBy from 'lodash/orderBy';



// export function useForceUpdate() {
//     const [, setTick] = useState(0);
//     const update = useCallback(() => {
//         setTick(tick => tick + 1);
//     }, [])
//     return update;
// }

const invert = {
    'asc': 'desc',
    'desc': 'asc'
};

export default function Home() {

    

    return (
        <div className='bg'>
            <Menu/>
            <div className='container'>
                <div className="title-card welcome">
                    <a>Welcome to Golfi, the all-in-one golf app!</a>
                    <img className="homepageBG-img" src={require('./homepageBG.jpg')} alt="golf" width="50%"/>
                </div>
                
            </div>
            
        </div>
    );
}

