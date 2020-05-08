import React from "react";
import Menu from "../Menu";
import './Home.css'
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Button, ListItem , ExpansionPanel} from '@material-ui/core';

export default function Home() {

    const [players, setPlayers] = React.useState([]);

    React.useEffect(() => {
        axios.get("http://localhost:3004/users").then(
            result => {
                setPlayers(result.data);
                console.log(result);
            })
    }, []);
    console.log(players);
    return (
        <div className='bg'>
            <Menu/>
            <div className='container'>
                <h2>Welcome to the Golf League Application!</h2>
                <div className='change'>
                    {players.map(player => (
                        <ExpansionPanel key={player.id}>
                            <Button>{player.First} {player.Last}</Button>
                        </ExpansionPanel>
                    ))}
                </div>
            </div>
        </div>
    );
}

