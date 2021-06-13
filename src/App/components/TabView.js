import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Lists from "./Lists"

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box >
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `nav-tab-${index}`,
        'aria-controls': `nav-tabpanel-${index}`,
    };
}

function LinkTab(props) {
    return (
        <Tab
            component="a"
            onClick={(event) => {
                event.preventDefault();
            }}
            {...props}
        />
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "0px",
        flexGrow: 1,
        width: '100%',
        backgroundColor: "inherit",
    },
    '@media(min-width: 786px)': {
        appbar: {
            marginLeft: "5rem"
        },
    },
    '@media(max-width: 786px)': {
        appbar: {
            marginLeft: "0px",
            padding: "0px"
        },
    },



    '@media(min-width: 1024px)': {
        listView: {
            padding: theme.spacing(2),
        }
    },
    '@media(max-width: 1023px)': {
        listView: {
            padding: "0px",
            marginLeft: "0px"
        }
    }
}));

export default function TabView({ filterFn, userAdd }) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" >
                <Tabs
                    className={classes.appbar}
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                >
                    <LinkTab label="Students" href="/students-data" {...a11yProps(0)} />
                    <LinkTab label="Professors" href="/professor-data" {...a11yProps(1)} />
                    <LinkTab label="Admins" href="/program-office-data" {...a11yProps(2)} />
                    <LinkTab label="Program Office" href="/program-office-data" {...a11yProps(3)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} className={classes.listView}>
                <Lists recordType={"Student"} filterFn={filterFn} userAdd={userAdd} />
            </TabPanel>
            <TabPanel value={value} index={1} className={classes.listView}>
                <Lists recordType={"Professor"} filterFn={filterFn} userAdd={userAdd} />
            </TabPanel>
            <TabPanel value={value} index={2} className={classes.listView}>
                <Lists recordType={"Admin"} filterFn={filterFn} userAdd={userAdd} />
            </TabPanel>
            <TabPanel value={value} index={3} className={classes.listView}>
                <Lists recordType={"Program-Office"} filterFn={filterFn} userAdd={userAdd} />
            </TabPanel>
        </div>
    );
}
