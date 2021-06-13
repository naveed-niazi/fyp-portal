import React, { useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { TableRow } from '@material-ui/core';
import MuiTableCell from "@material-ui/core/TableCell";

const TableCell = withStyles({
    root: {
        borderBottom: "none",
        padding: ".3rem"
    }
})(MuiTableCell);

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        padding: "0px",
        margin: "0px"
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const AdminDetail = ({ user }) => {
    const { name, email, roles, created } = user;
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;



    return (
        <Card className={classes.root} >
            <CardContent>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>{name}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Email</TableCell>
                    <TableCell>{email}</TableCell>
                </TableRow>
                {roles ?
                    <>
                        {roles.map((role, key) => (
                            <TableRow>
                                {key === 0 ? <TableCell>Roles</TableCell> : <TableCell></TableCell>}
                                <TableCell key={key}>{role}</TableCell>
                            </TableRow>
                        ))}

                    </>
                    :
                    ""
                }
                <TableRow>
                    <TableCell>Created</TableCell>
                    <TableCell>{new Date(created).toDateString()}</TableCell>
                </TableRow>
            </CardContent>
        </Card>
    );
}

export default AdminDetail;
