import {
    Box,
    CircularProgress,
    Collapse,
    Divider,
    Grid,
    InputAdornment,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    ListSubheader,
    makeStyles,
    TextField,
    Typography,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";

import React, { Fragment, useState, useEffect } from "react";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import CloseIcon from "@material-ui/icons/Close";
import { fetchNotEnrolledStudents } from "../apiCalls/studentCalls";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
    root: {
        position: "relative",
        overflow: "auto",
        maxHeight: 200,
    },
    inline: {
        display: "flex",
        marginTop: theme.spacing(1),
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },

    list: {
        "&:hover": {
            backgroundColor: "#c5e1a5",
        },
    },
    selectedList: {
        backgroundColor: "#eeeeee",
    },

    load: {
        display: "flex",
        justifyContent: "center",
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(2),
    },
}));

const SearchStudent = (props) => {

    const {groupMembers, setGroupMembers } = props;
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [studentsList, setStudents] = useState({
        list: [],
        dataLoaded: false,
    });
    const [fetchStudentError, setFetchStudentError] = useState(false);
    const handleClick = () => {
        setSearch("");
        setOpen(!open);
    };

    const setClose = () => {
        setGroupMembers([]);
        setOpen(false);
        setSearch("");
    };
    const handleListItemClick = (index, student) => (event) => {
        handleClick();
        setSearch(student.email);
        groupMembers.push(student)
        console.log("yeh wala mazaak nahi chaaly ga 2");
    };
    useEffect(() => {
        console.log("use effect");
        fetchNotEnrolledStudents().then((students) => {

            if (students == undefined || students.error) {
                setFetchStudentError(true);
                setStudents({
                    list: [],
                    dataLoaded: false,
                });
            } else if (students.length > 0) {
                if (students[0]._id.length > 0) {
                    setStudents({
                        list: students,
                        dataLoaded: true,
                    });
                    setFetchStudentError(false);
                }
            } else {
                setStudents({ list: [], dataLoaded: true });
            }
        });
    }, []);
    return (
        <Grid item xs={12}>
            {fetchStudentError && (
                <Alert severity="error" className={classes.root}>
                    System is not working properly. Please contact IT support :(
                </Alert>
            )}
            {!studentsList.dataLoaded ? (
                <Box className={classes.load}>
                    <CircularProgress />
                </Box>
            ) : (
                <List>
                    {/* display the search bar when nothing is selected */}
                    {groupMembers.length === 0 && (
                        <TextField
                            id="auto"
                            placeholder="search by name"
                            onClick={handleClick}
                            label="Group Partner"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {!open ? (
                                            <ExpandLess />
                                        ) : (
                                            <ExpandMore />
                                        )}
                                    </InputAdornment>
                                ),
                            }}
                        />
                    )}

                    {/* display the available records based on search input */}
                    {groupMembers.length === 0 && (
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List
                                className={classes.root}
                                component="div"
                                disablePadding
                            >
                                {studentsList.list.filter(
                                    ({ name }) =>
                                        name
                                            .toLowerCase()
                                            .indexOf(search.toLowerCase()) > -1
                                ).length > 0 ? (
                                    studentsList.list
                                        .filter(
                                            ({ name }) =>
                                                name
                                                    .toLowerCase()
                                                    .indexOf(
                                                        search.toLowerCase()
                                                    ) > -1
                                        )
                                        .map((student, index) => (
                                            <Fragment key={index}>
                                                <ListItem
                                                    className={classes.list}
                                                    button
                                                    alignItems="flex-start"
                                                    onClick={handleListItemClick(
                                                        index,
                                                        student
                                                    )}
                                                >
                                                    <ListItemText
                                                        primary={student.name}
                                                        secondary={
                                                            <React.Fragment>
                                                                <Box
                                                                    className={
                                                                        classes.inline
                                                                    }
                                                                >
                                                                    <Box
                                                                        flexGrow={
                                                                            1
                                                                        }
                                                                    >
                                                                        <Typography>
                                                                            {`Email: ${student.email}`}
                                                                        </Typography>
                                                                    </Box>
                                                                    <Box>
                                                                        {` Reg # ${student.student_details.regNo}`}
                                                                    </Box>
                                                                </Box>
                                                            </React.Fragment>
                                                        }
                                                    />
                                                </ListItem>
                                                <Divider component="li" />
                                            </Fragment>
                                        ))
                                ) : (
                                    <ListItem>
                                        <ListItemText
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                            }}
                                        >
                                            No data found
                                        </ListItemText>
                                    </ListItem>
                                )}
                            </List>
                        </Collapse>
                    )}
                    {/* display the selected item */}
                    {!(groupMembers.length===0) && !open && (
                        <List>
                            <ListSubheader
                                component="div"
                                id="nested-list-subheader"
                            >
                                Selected Partner
                            </ListSubheader>
                            <ListItem className={classes.selectedList}>
                                <ListItemText
                                    primary={groupMembers[0].name}
                                    secondary={
                                        <Box>
                                            <Box>
                                                {`Email: ${groupMembers[0].email}`}
                                            </Box>
                                            <Box>
                                                {`Reg # ${groupMembers[0].student_details.regNo}`}
                                            </Box>
                                        </Box>
                                    }
                                />
                                <ListItemSecondaryAction>
                                    <IconButton
                                        onClick={setClose}
                                        color="primary"
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </List>
                    )}
                </List>
            )}
        </Grid>
    );
};
export default SearchStudent;