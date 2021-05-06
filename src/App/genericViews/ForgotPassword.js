import React from 'react';
//---
import Box from '@material-ui/core/Box'
//---
import Topbar from '../components/Topbar'
import ForgotPasswordFrom from '../components/ForgotPasswordForm'
import Copyright from '../components/Copyright'


const SignIn = () => {
    return (
        <div>
            <Topbar />
            <ForgotPasswordFrom />
            <Box mt={5}>
                <Copyright />
            </Box>
        </div>
    );
};

export default SignIn;