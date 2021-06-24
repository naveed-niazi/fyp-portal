import React, { useState , useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PageLayout from "../components/PageLayout"
import FormControl from '@material-ui/core/FormControl'

import AddUserForm from "../components/AddUserForm"
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import InputLabel from '@material-ui/core/InputLabel';
import FormDialog from "../components/FormDialog"

import { Search } from "@material-ui/icons";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputAdornment from "@material-ui/core/InputAdornment";
import Box from "@material-ui/core/Box"
import TabView from "../components/TabView"
import Controls from "../components/Controls";
import { Grid } from '@material-ui/core';
import { getSignupData } from "../apiCalls/settingCalls"



const userStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
    },
    '@media(min-width: 1024px)': {
        pageContent: {
            marginTop: theme.spacing(2),
            marginRight: theme.spacing(3),
            marginLeft: theme.spacing(4)
        },
        searchInput: {
            width: '85%'
        },
        newButton: {
            position: 'absolute',
            right: '10px'
        },
        tabView: {
            padding: "1rem 2rem 1rem"
        }
    },
    '@media(max-width: 1023px)': {
        pageContent: {
            margin: "0px",
            padding: "0px",
            marginTop: theme.spacing(2)
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

    const [defaultData, setDefaultData] = useState({ degrees: [], batches: [] });

    useEffect(() => {
        getSignupData().then(data => {
            if (data) {
                console.log(data)
                setDefaultData({ degrees: data.degrees, batches: data.batches })
            }
        })
    }, [])

    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [filterBh, setFilterBh] = useState({ bh: items => { return items; } })
    const [filterDe, setFilterDe] = useState({ de: items => { return items; } })
    const [filterPd, setFilterPd] = useState({ pd: items => { return items; } })
    const [recordType, setRecordType] = useState('');

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
    const handleBatch = e => {
        let target = e.target;
        setFilterBh({
            bh: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.student_details.batch.toLowerCase() === target.value.toLowerCase())
            }
        })
    }
    const handleDegree = e => {
        let target = e.target;
        setFilterDe({
            de: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.department.toLowerCase() === target.value.toLowerCase())
            }
        })
    }
    const handlePassedOut = e => {
        let target = e.target;
        setFilterPd({
            pd: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.student_details.isEligible === target.checked)
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
                    <FormDialog Form={<AddUserForm userAdded={userAdded} />} Title={"Add New User"} Heading={"User Form"} />
                </Grid>
            </Grid>
            {recordType === "Student" ?
                <Grid container spacing={1} className={classes.pageContent}>
                    <Grid item xs={7} sm={3}>
                        <FormControl variant="outlined" className={classes.formControl} size="small">
                            <InputLabel id="degree-input">Degree</InputLabel>
                            <Select
                                required
                                labelId="degree"
                                id="degreeId"
                                name="degree"
                                onChange={handleDegree}
                                label="degree"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {defaultData.degrees.map((degree, key) => (
                                    <MenuItem key={key} value={degree}>{degree}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4} sm={3}>
                        <FormControl variant="outlined" className={classes.formControl} size="small">
                            <InputLabel id="batch">Batch</InputLabel>
                            <Select
                                required
                                labelId="batch"
                                id="batchId"
                                onChange={handleBatch}
                                label="Batch"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {defaultData.batches.map((batch, key) => (
                                    <MenuItem key={key} value={batch}>{batch}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4} sm={3}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onChange={handlePassedOut}
                                    name="checkedF"
                                    indeterminate
                                />
                            }
                            label="Non Active"
                        />
                    </Grid>
                </Grid> : ""
            }
            {/* now i have to create a tab view to show the 
            different type of users here */}
            <Box className={classes.tabView}>
                <TabView filterFn={filterFn} filterDe={filterDe} filterBh={filterBh} filterPd={filterPd} userAdd={userAdd} setRecordType={setRecordType} />
            </Box>
        </PageLayout >
    );
};

export default Users;