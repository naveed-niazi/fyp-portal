import React, { useState } from 'react';
//---
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import MuiAlert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
//---
import { forgotPassword } from '../apiCalls/authCalls'
import IIUI from '../../assets/images/iiui-logo.jpg'

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

const forgotPasswordStyles = makeStyles((theme) => ({
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

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ForgotPasswordForm = () => {
    const classes = forgotPasswordStyles()
    const [email, setEmail] = useState('')
    const [errorIn, setErrorIn] = useState('')
    const [resetError, setResetError] = useState('')
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [allowCode, setAllowCode] = useState(false)


    const handleSubmit = e => {
        e.preventDefault()
        const Error = email === ''
        setErrorIn(Error.errorIn)
        setErrorMessage(Error.error)
        const user = { email }
        setResetError(false)
        setLoading(true)
        forgotPassword(user)
            .then(data => {
                if (data.error) {
                    setLoading(false)
                    setResetError(true)
                    setErrorMessage(data.error)
                } else {
                    setLoading(false)
                    setAllowCode(true)
                }

            })

    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <img className={classes.avatar} src={IIUI} alt="IIUI" />
                <Typography component="h1" variant="h5">
                    Forgot Password
        </Typography>
                {
                    !allowCode ?
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
                                        type="email"
                                        value={email}
                                        onChange={e => { setEmail(e.target.value); setErrorIn('') }}
                                        error={errorIn === "email"}
                                        helperText={errorIn === "email" ? errorMessage : ''}
                                        autoComplete="email"
                                    />
                                </Grid>
                            </Grid>
                            {loading ? <Box className={classes.root} display="flex" justifyContent="center">
                                <CircularProgress />
                            </Box> : ""}
                            {resetError ? <div className={classes.root}>
                                <Alert severity="error">{errorMessage}</Alert>
                            </div> : ""}
                            <GreenButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Reset Password
                    </GreenButton>
                        </form>
                        :
                        <Box mt={5}>
                            <Alert severity="success"> Email sent, Please Check your email!</Alert>
                        </Box>
                }
            </div>
        </Container >
    );
}
export default ForgotPasswordForm;