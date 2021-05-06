
import React, { useState } from "react";
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
//---
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
//---
import Topbar from '../components/Topbar'
import { verifyUser } from "../helpers/signupHelp";
import Copyright from '../components/Copyright'


const Welcome = (props) => {
    const [message, setMessage] = useState('');

    if (props.match.path === "/confirm/:confirmationCode") {
        verifyUser(props.match.params.confirmationCode).then(response => {
            setMessage(response.message)
        });
    }

    return (
        <div className="container">
            <Topbar />
            <Box justifyContent="center">
                <header className="jumbotron">
                    {!message ?
                        <Box mt={5} display="flex" justifyContent="center">
                            <CircularProgress />
                        </Box>
                        :
                        <Box mt={5} display="flex" justifyContent="center">
                            {message}
                        </Box>
                    }
                </header>
            </Box>
            <Box mt={5} display="flex" justifyContent="center">
                <Copyright />
            </Box>
        </div >
    );
};

Welcome.propTypes = {
    match: PropTypes.any
}
export default Welcome;
