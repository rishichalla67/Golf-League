import React from "react";
import {Button, TextField} from '@material-ui/core'
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
import SortByAlphaRoundedIcon from '@material-ui/icons/SortByAlphaRounded';

const useStyles = makeStyles({
    table: {
        minWidth: 50,
    },
});

const row = (x, i, header, handleRemove, startEditing, editIdx, handleChange, stopEditing) => {
    const currentlyEditing = editIdx === x.id;

    return(
        <TableRow key={x.id}>
            {
                header.map((y, k) => (
                    <TableCell align='center' key={y.id}>
                        {
                            currentlyEditing ?
                                (<TextField name={y.prop} onChange={(e) => handleChange(e, y.prop, i, x.id)}
                                            value={x[y.prop]} />
                                ) : (
                                    x[y.prop]
                                )}

                    </TableCell>
                ))
            }
            <TableCell align='center'>
                <Button style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}>
                    {currentlyEditing ? (<CheckIcon onClick={() => stopEditing(x.id, i)}/>
                        ) : (
                        <EditIcon style={{fontSize: '17px'}} onClick={() => startEditing(x.id)}/>
                        )}
                </Button>
            </TableCell>
            <TableCell align='center'>
                <Button style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}>
                    <DeleteIcon style={{fontSize: '17px'}} onClick={() => handleRemove(x.id)}/>
                </Button>
            </TableCell>

        </TableRow>
    );
}
export default ({data, header, handleRemove, startEditing, editIdx, handleChange, stopEditing, handleSort}) =>
        <TableContainer component={Paper}>
            <Table >
                <TableHead>
                    <TableRow>
                        {
                            header.map((x, i) =>
                                <TableCell align='center' key={x.id}>
                                    <div className='contain' >
                                        {x.name}<Button onClick={() => handleSort(x.prop)
                                    }style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}>
                                        <SortByAlphaRoundedIcon style={{fontSize: '17px'}}/>
                                        </Button>
                                    </div>
                                </TableCell>
                            )

                        }
                        <TableCell align='center'></TableCell>
                        <TableCell ><Button component={Link} to='/Add'><PersonAddRoundedIcon/></Button></TableCell>
                    </TableRow>

                </TableHead>
                <TableBody>
                    {data.map((x, i) => row(x, i, header, handleRemove, startEditing, editIdx, handleChange, stopEditing))}
                </TableBody>
            </Table>
        </TableContainer>


