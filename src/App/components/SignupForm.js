import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom'
//---
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert'
//---
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
//---
import IIUI from '../../assets/images/iiui-logo.jpg'
import { validation } from '../helpers/loginHelp'
import { signup } from '../apiCalls/authCalls'


const signupStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        color: "white"
    },
}));
const theme = createMuiTheme({
    palette: {
        primary: green,
    },
});

const SignupForm = () => {

    const classes = signupStyles();
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [regNo, setRegNo] = useState('')
    const [signupError, setSignupError] = useState('')
    const [signupSuccess, setSignupSuccess] = useState('')

    const [loading, setLoading] = useState(false)
    const [degree, setDegree] = useState('')
    const [batch, setBatch] = useState('')
    const [errorIn, setErrorIn] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const Error = await validation(firstName, lastName, email, password, regNo, degree, batch)
        setErrorIn(Error.errorIn)
        setErrorMessage(Error.error)
        if (Error.error === '') {
            const student = {
                fname: firstName,
                lname: lastName,
                email: email,
                password: password,
                department: degree,
                student_details: {
                    batch,
                    regNo
                }
            }
            setLoading(true)
            setSignupError('')
            signup(student)
                .then(response => {
                    if (response.error) {
                        setLoading(false)
                        setSignupError(response.error)
                    }
                    else {
                        setLoading(false)
                        setSignupSuccess(response.message)
                    }
                })
        }
    }



    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <img className={classes.avatar} src={IIUI} alt="IIUI" />
                <Typography component="h1" variant="h5">
                    Sign up
        </Typography>
                {signupSuccess ?
                    <Box className={classes.root} display="flex" justifyContent="center">
                        <Alert severity="success">{signupSuccess}</Alert>
                    </Box>
                    :
                    <form className={classes.form} onSubmit={handleSubmit} noValidate>
                        <ThemeProvider theme={theme}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="fname"
                                        name="firstName"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        value={firstName}
                                        onChange={e => setFirstName(e.target.value)}
                                        error={errorIn === "firstName"}
                                        helperText={errorIn === "firstName" ? errorMessage : ''}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        value={lastName}
                                        onChange={e => { setLastName(e.target.value); setErrorIn('') }}
                                        error={errorIn === "lastName"}
                                        helperText={errorIn === "lastName" ? errorMessage : ''}
                                        autoComplete="lname"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        value={email}
                                        onChange={e => { setEmail(e.target.value); setErrorIn('') }}
                                        error={errorIn === "email"}
                                        helperText={errorIn === "email" ? errorMessage : ''}
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={e => { setPassword(e.target.value); setErrorIn('') }}
                                        error={errorIn === "password"}
                                        helperText={errorIn === "password" ? errorMessage : ''}
                                        autoComplete="current-password"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="regNo"
                                        label="Reg No"
                                        type="number"
                                        id="regNo"
                                        value={regNo}
                                        onChange={e => { setRegNo(e.target.value); setErrorIn('') }}
                                        error={errorIn === "regNo"}
                                        helperText={errorIn === "regNo" ? errorMessage : ''}
                                        autoComplete="registration-number"
                                    />
                                </Grid>
                                <Grid item xs={7} sm={4}>
                                    <FormControl variant="outlined" className={classes.formControl}
                                        error={errorIn === "degree"}>
                                        <InputLabel id="degree-input">Degree</InputLabel>
                                        <Select
                                            required
                                            labelId="degree"
                                            id="degreeId"
                                            value={degree}
                                            name="degree"
                                            onChange={e => { setDegree(e.target.value); setErrorIn('') }}
                                            label="degree"
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value='MCS'>MCS</MenuItem>
                                            <MenuItem value='MIT'>MIT</MenuItem>
                                            <MenuItem value='MSE'>MSE</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={4} sm={4}>
                                    <FormControl variant="outlined" className={classes.formControl} error={errorIn === "batch"}>
                                        <InputLabel id="batch">Batch</InputLabel>
                                        <Select
                                            required
                                            labelId="batch"
                                            id="batchId"
                                            value={batch}
                                            onChange={e => { setBatch(e.target.value); setErrorIn('') }}
                                            label="Batch"
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value='F17'>Fall 17</MenuItem>
                                            <MenuItem value='F18'>Fall 18</MenuItem>
                                            <MenuItem value='F19'>Fall 19</MenuItem>
                                            <MenuItem value='F20'>Fall 20</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            {loading ? <Box className={classes.root} display="flex" justifyContent="center">
                                <CircularProgress />
                            </Box> : ""}
                            {signupError ? <div className={classes.root}>
                                <Alert severity="error">{signupError}</Alert>
                            </div> : ""}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign Up
                    </Button>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <RouterLink to="/signin" variant="body2">
                                        Already have an account? Sign in
                            </RouterLink>
                                </Grid>
                            </Grid>
                        </ThemeProvider>
                    </form>
                }
            </div>

        </Container >
    );

};

export default SignupForm;