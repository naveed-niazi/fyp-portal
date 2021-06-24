import 'date-fns';
import React, { useState } from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert'
import Button from '@material-ui/core/Button';

import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { updateChairman } from "../apiCalls/settingCalls"

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
const NewChairmanForm = () => {

    const classes = styles()
    const [name, setName] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date('2020-08-18T21:11:54'));
    const [result, setResult] = useState({ error: "", message: "" })
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setResult({error:"", message:""})
        // now the submission step will start
        //checking for error
        var letters = /^[a-zA-Z\s]*$/;
        console.log("about to check for errors")
        if (name === "" || !(name.match(letters))) {
            setResult({ error: "Enter Valid Name" })
            console.log("found an error")

        }
        if (!result.error) {
            console.log("about to update")
            
            const chairman = { name: name, Appointed: selectedDate }
            setLoading(true)
            updateChairman(chairman)
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
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    return (

        <div>
            <form className={classes.form} onSubmit={handleSubmit} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="name"
                            label="Chairman Name"
                            name="name"
                            disabled={loading}
                            value={name}
                            onChange={e => { setName(e.target.value); setResult({ error: "", message: "" }) }}
                            helperText={"Enter Chairman Name"}
                            autoComplete="name"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Appointed on"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
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
                    Update Chairman Detail
                </Button>
            </form>
        </div >
    );
};

export default NewChairmanForm;