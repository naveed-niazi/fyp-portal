import React, { useState } from 'react';
import { Link as RouterLink, Redirect } from 'react-router-dom'
//---
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

//---
import IIUI from '../../assets/images/iiui-logo.jpg'
import { signin } from '../apiCalls/authCalls'
import { authenticate, validationSignin } from "../helpers/loginHelp"
import { roleNow } from "../helpers/authenticationHelp"


const GreenTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'green',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'green',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'green',
            },
            '&:hover fieldset': {
                borderColor: 'green',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'green',
            },
        },
    },
})(TextField);

const GreenButton = withStyles((theme) => ({
    root: {
        color: 'white',
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
}))(Button);

const signinStyles = makeStyles((theme) => ({
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
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SigninForm = () => {
    const classes = signinStyles()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorIn, setErrorIn] = useState('')
    const [signinError, setSigninError] = useState('')
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [redirect, setRedirect] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        const Error = validationSignin(email, password);
        setErrorIn(Error.errorIn)
        setErrorMessage(Error.error)
        const user = { email, password }
        setSigninError(false)
        setLoading(true)
        signin(user)
            .then(data => {
                if (data) {
                    if (data.error) {
                        setLoading(false)
                        setSigninError(data.error)
                    }
                    else {
                        authenticate(data, () => {
                            setRedirect(data.user.roles[0])
                        })
                    }
                } else
                    setLoading(false)

            })

    }
    if (redirect) {

        console.log(roleNow())
        const route = `/${roleNow().toLowerCase()}`
        console.log(route)
        return < Redirect to={route} />
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <img className={classes.avatar} src={IIUI} alt="IIUI" />
                <Typography component="h1" variant="h5">
                    Sign in
        </Typography>
                <form className={classes.form} onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <GreenTextField
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
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <GreenTextField
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
                    </Grid>
                    {loading ? <Box className={classes.root} display="flex" justifyContent="center">
                        <CircularProgress />
                    </Box> : ""}
                    {signinError ? <div className={classes.root}>
                        <Alert severity="error">Email or Password is incorrect</Alert>
                    </div> : ""}
                    <GreenButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </GreenButton>
                    <Grid container>
                        <Grid item xs>
                            <RouterLink to="/forgotpassword" variant="body2">
                                Forgot Password
                            </RouterLink>
                        </Grid>
                        <Grid item >
                            <RouterLink to="/signup" variant="body2">
                                Don't have an account? Signup
                            </RouterLink>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container >
    );
}
export default SigninForm;