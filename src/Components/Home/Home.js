import React from "react";
//import { useState, useCallback } from 'react'
import Menu from "../Menu";
import './Home.css'
import ViewPlayers from "../ViewPlayers";
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

    const [players, setPlayers] = React.useState([]);
    const [editIdx, setEditIdx] = React.useState(-1);
    const [colToSort, setColToSort] = React.useState('')
    const [sortDirection, setSortDirection] = React.useState('desc')
    //const forceUpdate = useForceUpdate();

    React.useEffect(() => {
        axios.get("http://localhost:3004/users").then(
            result => {
                setPlayers(result.data);
                //console.log(result);
            })
    }, []);



    //WORKS
    const handleRemove = (i) => {
        axios.delete(`http://localhost:3004/users/${i}`).then(
            result => {
                //setPlayers(result.data);
                console.log('Delete: ' + result)
            }
        )
    };

    const startEditing = (i) => {
       setEditIdx(i)
    };

    const stopEditing = (x, i) => {
        setEditIdx(-1);
        axios.put(`http://localhost:3004/users/${x}`, players[i]).then(
            res => {
                //console.log(res);
            }
        )
    };


    const handleChange = (e, name, i, x) => {
        const {value} = e.target;
        setPlayers(
            players.map((row, j) => j === i ? ({...row, [name]: value}) : row )
        );
        console.log(players[i]);
    };

    const handleSort = (colName) => {
        setColToSort(colName);
        setSortDirection(colToSort === colName ? invert[sortDirection] : 'asc')
    }

    return (
        <div className='bg'>
            <Menu/>
            <div className='container'>
                <h2>Welcome to the Golf League Application!</h2>
                <div>
                    <ViewPlayers
                    handleRemove={handleRemove}
                    startEditing={startEditing}
                    editIdx={editIdx}
                    handleChange={handleChange}
                    stopEditing={stopEditing}
                    handleSort={handleSort}
                    data={orderBy(players, colToSort, sortDirection)}
                    header={[
                        {
                            name: "First Name",
                            prop: 'First'
                        },
                        {
                            name: "Last Name",
                            prop: 'Last'
                        },
                        {
                            name: "Email",
                            prop: 'Email'
                        },
                        {
                            name: "Phone",
                            prop: 'Phone'
                        },
                        {
                            name: "Handicap",
                            prop: 'Handicap'
                        },
                    ]}

                    />
                </div>
            </div>
        </div>
    );
}

