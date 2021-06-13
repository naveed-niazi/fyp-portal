import React, { useEffect, useState } from 'react';
import { getUser } from "../apiCalls/userCalls"
import EditAdminForm from "./EditAdminForm"
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert'
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import AdminDetail from "./AdminDetail"
import { isLoggedIn } from "../helpers/authenticationHelp"


const styles = makeStyles((theme) => ({
    paper: {
        //marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'green'
    },
    root: {
        marginTop: theme.spacing(2),
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    }
}));

const UserDetail = ({ record, recordType, view }) => {
    const classes = styles()
    const [id, setId] = useState(record._id)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [userData, setUserData] = useState({})

    const renderSwitch = recordType => {
        switch (recordType) {
            case 'Admin':
                return EditAdminForm;
            default:
                return EditAdminForm;
        }
    }

    useEffect(() => {
        //here i am going to get all the information about the user
        setLoading(true)
        const token = isLoggedIn().token;
        getUser(record._id, token)
            .then(data => {
                if (data) {
                    if (data.error) {
                        setError(data.error)
                        setLoading(false)
                    }
                    else {
                        setUserData(data)
                        setLoading(false)
                    }
                } else {
                    setError("Unable to connect to database")
                }
            })

    }, [record])

    if (error) {
        return (
            <div className={classes.root}>
                <Alert severity="error">{error}</Alert>
            </div>
        )
    }
    if (view)
        return (
            <>
                {loading ?
                    <>
                        <Box className={classes.root} display="flex" justifyContent="center">
                            <CircularProgress />
                        </Box>
                        <Box className={classes.root} display="flex" justifyContent="center">
                            <AdminDetail user={userData} />
                        </Box>
                    </>
                    :
                    <AdminDetail user={userData} />
                }
            </>
        );
    else
        return (
            <>
                {loading ?
                    <>
                        <Box className={classes.root} display="flex" justifyContent="center">
                            <CircularProgress />
                        </Box>
                        <Box className={classes.root} display="flex" justifyContent="center">
                            <EditAdminForm user={userData} />
                        </Box>
                    </>
                    :
                    <EditAdminForm user={userData} />
                }
            </>
        );
};

export default UserDetail;