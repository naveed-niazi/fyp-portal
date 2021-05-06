import React from 'react';
//---
import Box from '@material-ui/core/Box'
//---
import Topbar from '../components/Topbar'
import ResetPasswordFrom from '../components/ResetPasswordForm'
import Copyright from '../components/Copyright'


const ResetPassword = props => {
    return (
        <div>
            <Topbar />
            <ResetPasswordFrom match={props.match} />
            <Box mt={5}>
                <Copyright />
            </Box>
        </div>
    );
};

export default ResetPassword;