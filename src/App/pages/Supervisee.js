import React from 'react';
import PageLayout from "../components/PageLayout"
import SuperviseeTabs from '../components/SuperviseeTabs';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        width: '100%',
        marginTop: "2rem"
    },
    container: {
        maxHeight: 440,
    },
});

const Supervisee = ({ Data }) => {

    const classes = useStyles();

    return (
        <PageLayout Title={Data.name} Icon={Data.icon}>
            <SuperviseeTabs />
        </PageLayout>
    );
};

export default Supervisee;