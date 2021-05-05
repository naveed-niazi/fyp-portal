import React, { useState } from 'react';
import { Link as RouterLink, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types';
//---
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import MuiAlert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
//---
import { newPassword } from '../apiCalls/authCalls'
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

const resetPasswordStyles = makeStyles((theme) => ({
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

const ResetPasswordForm = ({ match }) => {
    const [resetId, setResetId] = useState(match.params.resetId);
    const classes = resetPasswordStyles()
    const [password, setPassword] = useState('')
    const [passwordC, setPasswordC] = useState('')

    const [errorIn, setErrorIn] = useState('')
    const [resetError, setResetError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [redirect, setRedirect] = useState(false)

    const handleSubmit = e => {
        e.preventDefault()
        const Error = !(password === passwordC)
        if (Error) {
            setErrorIn('passwordC')
            setErrorMessage("Password don't match")
        }
        else {
            const Password = { password }
            setLoading(true)
            newPassword(resetId, Password)
                .then(data => {
                    if (data.err) {
                        setLoading(false)
                        setResetError(true)
                    } else {
                        setLoading(false)
                        setRedirect(true)
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
                    Reset Password
        </Typography>
                {!redirect
                    ?
                    <form className={classes.form} onSubmit={handleSubmit} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <GreenTextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="password"
                                    label="New Password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={e => { setPassword(e.target.value); setErrorIn('') }}
                                    error={errorIn === "password"}
                                    helperText={errorIn === "password" ? errorMessage : ''}
                                    autoComplete="code"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <GreenTextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="passwordC"
                                    label="Confirm New Password"
                                    name="passwordC"
                                    type="password"
                                    value={passwordC}
                                    onChange={e => { setPasswordC(e.target.value); setErrorIn('') }}
                                    error={errorIn === "passwordC"}
                                    helperText={errorIn === "passwordC" ? errorMessage : ''}
                                    autoComplete="passwordC"
                                />
                            </Grid>
                        </Grid>
                        {loading ? <Box className={classes.root} display="flex" justifyContent="center">
                            <CircularProgress />
                        </Box> : ""}
                        {resetError ? <div className={classes.root}>
                            <Alert severity="error">Unable to reset password</Alert>
                        </div> : ""}
                        <GreenButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Submit
                    </GreenButton>
                    </form>
                    :
                    <Box mt={5}>
                        <Alert severity="success">
                            Password Reset, Please{` `} <RouterLink to="/signin">Sign In!</RouterLink>
                        </Alert>
                    </Box>

                }

            </div>
        </Container >
    );
};

ResetPasswordForm.propTypes = {
    match: PropTypes.any
}
export default ResetPasswordForm;

