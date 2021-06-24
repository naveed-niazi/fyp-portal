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
import { addNewProgram } from "../apiCalls/settingCalls"

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
const NewDegreeForm = () => {

    const classes = styles()
    const [newDegree, setNewDegree] = useState("");
    const [result, setResult] = useState({ message: "", error: "" })
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        var letters = /^[A-Za-z]+$/;
        // now the submission step will start
        if (newDegree === "" || !(newDegree.match(letters))) {
            setResult({ error: "Enter Valid Degree" })
        } else {
            setLoading(true)
            console.log("about to send the request")
            addNewProgram({newDegree})
                .then(data => {
                    if (data) {
                        if (data.error) {
                            setResult({ error: data.error })
                        } else {
                            setResult({ message: data.message })
                        }
                        setLoading(false)
                    } else {
                        setResult({ error: "Unable to Update" })
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
                            id="degree"
                            label="New Degree"
                            name="degree"
                            disabled={loading}
                            value={newDegree}
                            onChange={e => { setNewDegree(e.target.value); setResult({ data: "", error: "" }) }}
                            helperText={"Enter Valid Degree Program"}
                            autoComplete="Degree"
                            autoFocus
                        />
                    </Grid>
                </Grid>
                {loading ? <Box className={classes.root} display="flex" justifyContent="center">
                    <CircularProgress />
                </Box> : ""}
                {result.error
                    ?
                    <div className={classes.root}>
                        <Alert severity="error">{result.error}</Alert>
                    </div>
                    :
                    ""
                }
                {result.message
                    ?
                    <div className={classes.root}>
                        <Alert severity="success">{result.message}</Alert>
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
                    Add New Program
                </Button>
            </form>
        </div>
    );
};

export default NewDegreeForm;