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
import { getUsers, deleteUser } from "../apiCalls/userCalls"
import UserDetail from "./UserDetail"
import { isLoggedIn } from "../helpers/authenticationHelp"
import Notification from "./Notification";

const headCells = [
    { id: 'fullName', label: 'Employee Name', minWidth: 200 },
    { id: 'email', label: 'Email Address (Personal)', minWidth: 200 },
    { id: 'actions', label: 'Actions', disableSorting: true, minWidth: 200 }
]

const useStyles = makeStyles({
    root: {
        width: '100%',
        marginTop: "2rem"
    },
    container: {
        maxHeight: 440,
    },
});
const Lists = (props) => {
    const classes = useStyles();
    const { recordType, setRecordType, filterFn, filterDe, filterBh, filterPd, userAdd } = props;
    const [records, setRecords] = useState([]);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [userDeleted, setUserDeleted] = useState(0)
    const [openPopup, setOpenPopup] = useState(false)
    const [View, setView] = useState(false);

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState("");


    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn, filterDe, filterBh, filterPd);

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const onDelete = id => {
        setUpdating("yes")
        setConfirmDialog({
            title: 'User is being deleted please wait',
            subTitle: "Please wait!",
            isOpen: true
        })
        const token = isLoggedIn().token;
        deleteUser(id, token)
            .then(data => {
                setUpdating("done")
                if (data) {
                    if (data.error || data.err) {
                        setConfirmDialog({
                            title: data.error,
                            subTitle: "Update Error",
                            isOpen: true
                        })
                    } else {
                        setConfirmDialog({
                            title: "User Is Deleted",
                            subTitle: "Data Updated!",
                            isOpen: true
                        })
                        setUserDeleted(userDeleted + 1)
                    }
                }
            })

    }

    useEffect(() => {
        setLoading(true)
        console.log("i am trying")
        const token = isLoggedIn().token;
        setRecordType(recordType)
        getUsers(recordType, token)
            .then(data => {
                if (data) {
                    setLoading(false)
                    if (data.error) {
                        setError(data.error)
                    }
                    else {
                        console.log(data)
                        setRecords(data.users.reverse())
                    }
                } else {
                    setLoading(false)
                    setError("Unable to connect to database")
                }
            })
    }, [recordType, userAdd, userDeleted])
    if (loading) {
        return (
            <Box width="100%" display="flex" justifyContent="center" >
                <CircularProgress />
            </Box >)
    }
    if (error) {
        return (
            <Box width="100%" display="flex" justifyContent="center">
                <Alert severity="error">{error}</Alert>
            </Box>)
    }
    return (
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
                                <TableCell>
                                    <Controls.ActionButton
                                        color="primary"
                                        onClick={() => { setView(false); openInPopup(item) }}>
                                        <EditOutlinedIcon fontSize="small" color="action" />
                                    </Controls.ActionButton>
                                    <Controls.ActionButton
                                        color="secondary"
                                        onClick={() => {
                                            setConfirmDialog({
                                                isOpen: true,
                                                title: 'Are you sure to see this record?',
                                                subTitle: "You can't undo this operation",
                                                onConfirm: () => { onDelete(item._id) }
                                            })
                                        }}>
                                        <CloseIcon fontSize="small" color="action" />
                                    </Controls.ActionButton>
                                    <Controls.ActionButton
                                        color="primary"
                                        onClick={() => { setView(true); openInPopup(item) }}>
                                        <VisibilityIcon fontSize="small" color="action" />
                                    </Controls.ActionButton>
                                </TableCell>
                            </TableRow>))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TblPagination />
            <Popup
                title={View ? "User Information" : "Edit Information"}
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <UserDetail record={recordForEdit} recordType={recordType} view={View} />
            </Popup>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
                loading={updating}
                setLoading={setLoading}
            />
        </Paper >


    );
};

export default Lists;