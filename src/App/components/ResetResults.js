import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import IIUI from 'assets/img/iiui-logo.jpg'
import Snackbar from "@material-ui/core/Snackbar"
import MuiAlert from '@material-ui/lab/Alert';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Link as RouterLink, Redirect } from 'react-router-dom'
import { validationSignin } from 'helpers/helpLogin'
import signinStyles from 'assets/jss/other-styles/signinformStyle'
import { GreenTextField, GreenButton } from 'assets/jss/other-styles/greenStyles'
import { newPassword } from 'apiCalls/authCalls'
import { authenticate } from "helpers/helpLogin"
import Box from '@material-ui/core/Box';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ResetPassword = ({ match }) => {
    const [resetId, setResetId] = useState(match.params.resetId);
    const classes = signinStyles()
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
                                    type="passwordC"
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

ResetPassword.propTypes = {
    match: PropTypes.any
}
export default ResetResults;

