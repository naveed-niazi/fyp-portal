import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, makeStyles, IconButton, Box } from '@material-ui/core'
import Controls from "./Controls";
import Alert from '@material-ui/lab/Alert';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import ErrorIcon from '@material-ui/icons/Error';
import CircularProgress from '@material-ui/core/CircularProgress';
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';


const useStyles = makeStyles(theme => ({
    dialog: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(2)
    },
    dialogTitle: {
        textAlign: 'center'
    },
    dialogContent: {
        textAlign: 'center'
    },
    dialogAction: {
        justifyContent: 'center'
    },
    titleIcon: {
        //backgroundColor: theme.palette.secondary.light,
        color: theme.palette.secondary.main,

        '&:hover': {
            //backgroundColor: theme.palette.secondary.light,
            cursor: 'default'
        },
        '& .MuiSvgIcon-root': {
            fontSize: '8rem',
        }
    }
}))

export default function ConfirmDialog(props) {

    const { confirmDialog, setConfirmDialog, loading, setLoading } = props;
    const classes = useStyles()


    return (
        <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
            <DialogTitle className={classes.dialogTitle}>
                <IconButton disableRipple className={classes.titleIcon}>
                    {loading === "done" ?
                        <ErrorIcon />
                        :
                        <ContactSupportIcon />
                    }
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <Typography variant="h6">
                    {confirmDialog.title}
                </Typography>
                <Typography variant="subtitle2">
                    {confirmDialog.subTitle}
                </Typography>
            </DialogContent>
            {loading === "yes" ? (
                <Box width="100%" display="flex" justifyContent="center" >
                    <CircularProgress />
                </Box >) : ""
            }
            <DialogActions className={classes.dialogAction}>
                {loading === "done"
                    ?
                    (<Controls.Button
                        text="Done"
                        color="primary"
                        onClick={() => {
                            setLoading("")
                            setConfirmDialog({ ...confirmDialog, isOpen: false })
                        }}
                    />)
                    :
                    <>
                        <Controls.Button
                            text="No"
                            color="default"
                            onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} />
                        <Controls.Button
                            text="Yes"
                            color="secondary"
                            onClick={confirmDialog.onConfirm} />
                    </>
                }
            </DialogActions>
        </Dialog>
    )
}
