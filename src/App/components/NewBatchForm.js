import React, { useState } from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert'
import Button from '@material-ui/core/Button';

import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { addNewBatch } from "../apiCalls/settingCalls"

const styles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
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
    },
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    avatar: {
        width: "80px",
        height: "80px",
        borderRadius: "50%",
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
        width: "17rem"
    },
    submit: {
        color: "white",
        margin: theme.spacing(3, 0, 2),
    },
}));
const theme = createMuiTheme({
    palette: {
        primary: green,
    },
});
const NewBatchForm = () => {

    const classes = styles()
    const [newBatch, setNewBatch] = useState("");
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [updated, setUpdated] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        // now the submission step will start
        //checking for errors
        setError("")
        setUpdated("")
        if (newBatch === "") {
            setError("Enter a valid Batch Name")
        } else {
            setLoading(true)
            const batch = newBatch
            console.log("New Batch request is about to happen")
            addNewBatch({batch})
                .then(data => {
                    if (data) {
                        if (data.error) {
                            setError(data.error)
                            setLoading(false)
                        } else {
                            setUpdated(data.message)
                            setLoading(false)
                        }
                    } else {
                        setError("Unable to Update")
                        setLoading(false)
                    }
                })

        }
    }

    return (

        <div>
            <form className={classes.form} onSubmit={handleSubmit} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="batch"
                            label="New Batch"
                            name="batch"
                            disabled={loading}
                            value={newBatch}
                            onChange={e => { setNewBatch(e.target.value); setUpdated(""); setError("") }}
                            helperText={`Batch format: "F20", "Sp21"`}
                            autoComplete="Batch"
                            autoFocus
                        />
                    </Grid>
                </Grid>
                {loading ? <Box className={classes.root} display="flex" justifyContent="center">
                    <CircularProgress />
                </Box> : ""}
                {error
                    ?
                    <div className={classes.root}>
                        <Alert severity="error">{error}</Alert>
                    </div>
                    :
                    ""
                }
                {updated
                    ?
                    <div className={classes.root}>
                        <Alert severity="success">{updated}</Alert>
                    </div>
                    :
                    ""
                }
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Add New Batch
                </Button>
            </form>
        </div>
    );
};

export default NewBatchForm;