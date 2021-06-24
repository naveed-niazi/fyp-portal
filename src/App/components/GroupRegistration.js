import React, { useState, useEffect, Fragment, useRef } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import {
    RadioGroup,
    Radio,
    FormControlLabel,
    FormHelperText,
} from "@material-ui/core";
import { groupRegistrationValidation } from "../helpers/documentationHelp";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";
import SearchStudent from "./SearchStudent";
import ProjectRegistration from "./ProjectRegistration";

const useStyles = makeStyles((theme) => ({
      root: {
            marginTop:theme.spacing(4)
      },
    group: {
        display: "flex",
        flexDirection: "row",
    },
}));

const GroupRegistration = ({
    next,
    setNext,
    setActiveStep,
    groupData,
    setGroupData,
}) => {
    const classes = useStyles();
    const [group, setGroupName] = useState(groupData.group);
    const [description, setGroupDescription] = useState(groupData.description);
    const [team, setTeam] = useState(groupData.team);
    const [groupMembers, setGroupMembers] = useState(groupData.groupMembers);

    const errorIn = useRef("");
    const errorMessage = useRef("");

    if (next) {
        const Error = groupRegistrationValidation(
            group,
            description,
            team,
            groupMembers
        );
        if (Error == "") {
            errorIn.current = "ready";
        } else {
            errorIn.current = Error.errorIn;
            errorMessage.current = Error.error;
        }
    }

    useEffect(() => {
        if (errorIn.current == "ready") {
            setGroupData({ group, description, team, groupMembers });
            setActiveStep(1);
        }

      
        setNext(false);
    }, [next]);
    return (
        <div className={classes.root}>
            <CssBaseline />
            <form noValidate>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            name="groupName"
                            variant="outlined"
                            required
                            fullWidth
                            id="groupName"
                            label="Group Name"
                            value={group}
                            onChange={(e) => {
                                setGroupName(e.target.value);
                                errorIn.current = "";
                            }}
                            error={errorIn.current === "groupName"}
                            helperText={
                                errorIn.current === "groupName"
                                    ? errorMessage.current
                                    : `${group.length}/50`
                            }
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="description"
                            label="Project Description"
                            name="description"
                            value={description}
                            onChange={(e) => {
                                setGroupDescription(e.target.value);
                                errorIn.current = "";
                            }}
                            error={errorIn.current === "description"}
                            helperText={
                                errorIn.current === "description"
                                    ? errorMessage.current
                                    : `${description.length}/400`
                            }
                            autoComplete="description"
                            rows={4}
                            multiline
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl
                            component="fieldset"
                            error={errorIn.current === "team"}
                        >
                            <FormLabel component="legend">Team</FormLabel>
                            <RadioGroup
                                aria-label="Mode"
                                name="mode"
                                className={classes.group}
                                value={team}
                                onChange={(e) => {
                                    setTeam(e.target.value);
                                    errorIn.current = "";
                                }}
                            >
                                <FormControlLabel
                                    value="solo"
                                    control={<Radio color="primary" />}
                                    label="Solo"
                                />
                                <FormControlLabel
                                    value="duo"
                                    control={<Radio color="primary" />}
                                    label="Duo"
                                />
                            </RadioGroup>
                            <FormHelperText>
                                {errorIn.current === "team"
                                    ? errorMessage.current
                                    : ""}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                </Grid>
                {team === "duo" && (
                    <SearchStudent
                        groupMembers={groupMembers}
                        setGroupMembers={setGroupMembers}
                    />
                )}
            </form>
        </div>
    );
};

export default GroupRegistration;