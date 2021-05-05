import React from 'react';
//---
import Box from '@material-ui/core/Box'
//---
import Topbar from '../reusableComponents/Topbar'
import ForgotPasswordFrom from '../reusableComponents/ForgotPasswordForm'
import Copyright from '../reusableComponents/Copyright'


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