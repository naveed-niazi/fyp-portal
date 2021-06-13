import React, { useEffect, useState } from 'react';
import { Link as RouterLink, Redirect } from 'react-router-dom'
//---
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl'
import FormLabel from "@material-ui/core/FormLabel"
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles, makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';


//---
import IIUI from '../../assets/images/iiui-logo.jpg'
import { addUser } from '../apiCalls/userCalls'
import { validationAdmin } from "../helpers/userHelp"
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
    },
    formControl: {
        width: "100%  "
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
        //marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
const theme = createMuiTheme({
    palette: {
        primary: green,
    },
});

const EditAdminForm = ({ user }) => {
    const classes = styles()
    const [email, setEmail] = useState('')
    const [fullName, setFullName] = useState('')
    const [editable, setEditable] = useState(true)
    const [roles, setRoles] = useState({
        Professor: true,
        PO: false,
        Admin: false,
    });
    const [errorIn, setErrorIn] = useState('')
    const [addUserError, setAddUserError] = useState('')
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    useEffect(() => {
        setEmail(user.email)
        setFullName(user.name)
        if (user.roles) {
            setRoles({
                Professor: user.roles.includes("Professor"),
                PO: user.roles.includes("Program-Office"),
                Admin: user.roles.includes("Admin")
            })
        }
    }, [])
    const handleChange = (event) => {
        setSuccessMessage("")
        setRoles({ ...roles, [event.target.name]: event.target.checked });
    };
    const { Professor, PO, Admin } = roles;
    const error = [Professor, PO, Admin].filter((v) => v).length === 0;

    const handleSubmit = e => {
        e.preventDefault()
        const Error = validationAdmin(fullName, email)
        setErrorIn(Error.errorIn)
        setErrorMessage(Error.error)
    }
    const makeEditable = e => {
        e.preventDefault()
        setEditable(false)
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <ThemeProvider theme={theme}>

                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="fname"
                                    name="fullName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="fullName"
                                    label="Name"
                                    disabled={editable}
                                    value={fullName}
                                    onChange={e => setFullName(e.target.value)}
                                    error={errorIn === "fullName"}
                                    helperText={errorIn === "fullName" ? errorMessage : ''}
                                    autoFocus
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
                                    disabled={editable}
                                    onChange={e => { setEmail(e.target.value); setErrorIn(''); setSuccessMessage("") }}
                                    error={errorIn === "email"}
                                    helperText={errorIn === "email" ? errorMessage : ''}
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl required error={error} component="fieldset" className={classes.formControl} disabled={editable}>
                                    <FormLabel component="legend">Pick at-least one role</FormLabel>
                                    <FormGroup row>
                                        <FormControlLabel
                                            control={<Checkbox checked={Professor} onChange={handleChange} name="Professor" />}
                                            label="Professor"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={Admin} onChange={handleChange} name="Admin" />}
                                            label="Admin"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={PO} onChange={handleChange} name="PO" />}
                                            label="Program Office"
                                        />
                                    </FormGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                        {loading ? <Box className={classes.root} display="flex" justifyContent="center">
                            <CircularProgress />
                        </Box> : ""}
                        {addUserError ? <div className={classes.root}>
                            <Alert severity="error">{addUserError}</Alert>
                        </div> : ""}
                        {successMessage ? <div className={classes.root}>
                            <Alert severity="success">{successMessage}</Alert>
                        </div> : ""}
                        {editable ?
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                onClick={makeEditable}
                                color="gray"
                                className={classes.submit}>
                                Enable Editing
                            </Button>
                            :
                            <GreenButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                onClick={handleSubmit}
                                color="primary"
                                className={classes.submit}>
                                Update User
                            </GreenButton>

                        }

                    </form>
                </ThemeProvider>
            </div>
        </Container >
    );
}
export default EditAdminForm;