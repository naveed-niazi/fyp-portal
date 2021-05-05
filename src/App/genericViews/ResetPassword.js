import React from 'react';
//---
import Box from '@material-ui/core/Box'
//---
import Topbar from '../reusableComponents/Topbar'
import ResetPasswordFrom from '../reusableComponents/ResetPasswordForm'
import Copyright from '../reusableComponents/Copyright'


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