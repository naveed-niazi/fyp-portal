import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CloseIcon from '@material-ui/icons/Close';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Table, TableContainer, TableRow, TableCell, Box, TableBody, ThemeProvider } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import useTable from "./useTable"
import ConfirmDialog from "./ConfirmDialog";
import Popup from "./Popup";
import Controls from "./Controls"
import { pendingUsers, eligibleUser } from "../apiCalls/userCalls"
import UserDetail from "./UserDetail"
import { isLoggedIn } from "../helpers/authenticationHelp"
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import InputAdornment from "@material-ui/core/InputAdornment";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { Search } from "@material-ui/icons";
import { Grid } from '@material-ui/core';


import Notification from "./Notification";

const headCells = [
    { id: 'fullName', label: 'Student Name', minWidth: 170 },
    { id: 'email', label: 'Email Address (Personal)', minWidth: 170 },
    { id: 'regNo', label: 'Reg. No', minWidth: 100 },
    { id: 'dept', label: 'Department', minWidth: 100 },
    { id: 'actions', label: 'Actions', disableSorting: true, minWidth: 100 }
]

const useStyles = makeStyles((theme) => ({
    root: {
        root: {
            width: '100%',
            marginTop: "2rem"
        },
    },
    container: {
        maxHeight: 440,
    },
    '@media(min-width: 1024px)': {
        pageContent: {
            marginRight: theme.spacing(5),
            marginLeft: theme.spacing(5)
        },
        searchInput: {
            margin: theme.spacing(2),
            width: '80%'
        },
        newButton: {
            position: 'absolute',
            right: '10px'
        },
        tabView: {
            padding: "3rem"
        }
    },
    '@media(max-width: 1023px)': {
        pageContent: {
            margin: "0px",
            padding: "0px"
        },
        searchInput: {
            margin: theme.spacing(2),
            width: '95%',
        },
        newButton: {
            position: 'absolute',
            right: '10px'
        }
    }
}));
const UnEligibleList = (props) => {
    const classes = useStyles();
    const { userAdd } = props;
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [records, setRecords] = useState([]);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [userUpdated, setUserUpdated] = useState(0)
    const [openPopup, setOpenPopup] = useState(false)
    const [users, setUsers] = useState(-1);

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const makeEligible = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        const token = isLoggedIn().token;
        //api call to make-it Eligible
        eligibleUser(id, token)
            .then(data => {
                if (data) {
                    if (data.error || data.err) {
                        setNotify({
                            isOpen: true,
                            message: data.error,
                            type: 'error'
                        })
                    } else {
                        setNotify({
                            isOpen: true,
                            message: data.message,
                            type: 'success'
                        })
                        setUserUpdated(userUpdated + 1)
                    }
                }
            })
    }
    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.name.toLowerCase().includes(target.value.toLowerCase()))
            }
        })
    }

    useEffect(() => {
        setLoading(true)
        const token = isLoggedIn().token;
        pendingUsers(token)
            .then(data => {
                if (data) {
                    console.log(data)
                    setLoading(false)
                    if (data.error) {
                        setError(data.error)
                    }
                    else {
                        setRecords(data.users.reverse())
                        setUsers(data.users.length)
                    }
                } else {
                    setLoading(false)
                    setError("Unable to connect to database")
                }
            })
    }, [userAdd, userUpdated])
    if (loading) {
        return (
            <Box width="100%" display="flex" justifyContent="center" >
                <CircularProgress />
            </Box >)
    }
    if (users === 0) {
        return (
            <Box width="100%" display="flex" justifyContent="center">
                <Alert severity="success">No Pending Student At The Moment</Alert>
            </Box>)
    }
    if (error) {
        return (
            <Box width="100%" display="flex" justifyContent="center">
                <Alert severity="error">{error}</Alert>
            </Box>)
    }
    return (

        <div>
            <Grid container spacing={1} justify="flex-end" className={classes.pageContent}>
                <Grid item xs={12} >
                    <Controls.Input
                        label="Search User"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                </Grid>
            </Grid>
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TblHead />
                        <TableBody>
                            {
                                recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item._id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.student_details ? item.student_details.regNo : ""}</TableCell>
                                    <TableCell>{item.department}</TableCell>
                                    <TableCell>
                                        <Controls.ActionButton
                                            color="secondary"
                                            onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Are you sure this student is Eligible?',
                                                    subTitle: "You can't undo this operation",
                                                    onConfirm: () => { makeEligible(item._id) }
                                                })
                                            }}>
                                            <CheckCircleOutlineIcon fontSize="small" color="action" />
                                        </Controls.ActionButton>
                                    </TableCell>
                                </TableRow>))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TblPagination />
                <Notification
                    notify={notify}
                    setNotify={setNotify}
                />
                <ConfirmDialog
                    confirmDialog={confirmDialog}
                    setConfirmDialog={setConfirmDialog}
                />
            </Paper >
        </div>


    );
};

export default UnEligibleList;