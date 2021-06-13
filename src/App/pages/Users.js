import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PageLayout from "../components/PageLayout"
import AddUserForm from "../components/AddUserForm"
import FormDialog from "../components/FormDialog"
import { Search } from "@material-ui/icons";
import InputAdornment from "@material-ui/core/InputAdornment";
import Box from "@material-ui/core/Box"
import TabView from "../components/TabView"
import Controls from "../components/Controls";
import { Grid } from '@material-ui/core';


const userStyles = makeStyles((theme) => ({
    '@media(min-width: 1024px)': {
        pageContent: {
            marginRight: theme.spacing(5),
            marginLeft: theme.spacing(5)
        },
        searchInput: {
            width: '95%'
        },
        newButton: {
            position: 'absolute',
            right: '10px'
        },
        tabView: {
            padding: "3rem"
        }
    },
    '@media(max-width: 1023px)': {
        pageContent: {
            margin: "0px",
            padding: "0px"
        },
        searchInput: {
            width: '95%'
        },
        newButton: {
            position: 'absolute',
            right: '10px'
        }
    }
}));

const Users = ({ Data }) => {
    const classes = userStyles()
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [userAdd, setUserAdd] = useState(0)
    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.name.toLowerCase().includes(target.value.toLowerCase()))
            }
        })
    }
    const userAdded = () => {
        console.log("User is added");
        setUserAdd(userAdd + 1)
    }

    return (
        <PageLayout Title={Data.name} Icon={Data.icon}>
            <Grid container spacing={1} justify="flex-end" className={classes.pageContent}>
                <Grid item xs={12} md={9} >
                    <Controls.Input
                        label="Search User"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <FormDialog Form={<AddUserForm userAdded={userAdded} />} Title={"Add New User"} />
                </Grid>
            </Grid>
            {/* now i have to create a tab view to show the 
            different type of users here */}
            <Box mt={2} className={classes.tabView}>
                <TabView filterFn={filterFn} userAdd={userAdd} />
            </Box>
        </PageLayout >
    );
};

export default Users;