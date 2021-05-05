import React from 'react';
//---
import Box from '@material-ui/core/Box'
//---
import Topbar from '../reusableComponents/Topbar'
import SigninForm from '../reusableComponents/SigninForm'
import Copyright from '../reusableComponents/Copyright'


const SignIn = () => {
    return (
        <div>
            <Topbar />
            <SigninForm />
            <Box mt={5}>
                <Copyright />
            </Box>
        </div>
    );
};

export default SignIn;