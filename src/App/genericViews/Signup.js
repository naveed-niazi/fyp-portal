import React from 'react'
//---
import Box from '@material-ui/core/Box'
//---
import Copyright from '../components/Copyright'
import Topbar from '../components/Topbar'
import SignupForm from '../components/SignupForm';

const Signup = () => {
    return (
        <div>
            <Topbar />
            <SignupForm />
            <Box mt={5}>
                <Copyright />
            </Box>
        </div>
    );
};

export default Signup;