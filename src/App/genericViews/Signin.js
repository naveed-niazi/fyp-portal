import React from 'react';
//---
import Box from '@material-ui/core/Box'
//---
import Topbar from '../components/Topbar'
import SigninForm from '../components/SigninForm'
import Copyright from '../components/Copyright'


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