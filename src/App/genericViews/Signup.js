import React from 'react'
//---
import Box from '@material-ui/core/Box'
//---
import Copyright from '../reusableComponents/Copyright'
import Topbar from '../reusableComponents/Topbar'
import SignupForm from '../reusableComponents/SignupForm';

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