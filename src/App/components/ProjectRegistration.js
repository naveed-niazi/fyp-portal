import React, { useState, useEffect, useRef } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

import { Chip } from "@material-ui/core";
import { projectInfoValidation } from "../helpers/documentationHelp";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(4),
    },

    chip: {
        margin: theme.spacing(0.5),
        color: "black",
        backgroundColor: "#8bc34a",
        "&:focus": {
            color: "black",
            backgroundColor: "#8bc34a",
        },
    },
    chipIcon: {
        color: "white",
        backgroundColor: "#8bc34a",
        "&:hover": {
            color: "#d50000",
            backgroundColor: "#8bc34a",
        },
    },
    moduleChip: { marginTop: theme.spacing(2) },
}));
const theme = createMuiTheme({
    palette: {
        primary: green,
    },
});

const ProjectRegistration = ({
    next,
    setNext,
    setActiveStep,
    projectData,
    setProjectData,
}) => {
    const classes = useStyles();
    const [refresh, setRefresh] = useState(false);
    const [title, setTitle] = useState(projectData.title);
    const [abstract, setAbstract] = useState(projectData.abstract);
    const [scope, setScope] = useState(projectData.scope);
    const [modulesList, setModulesList] = useState(projectData.modulesList);
    const [module, setModule] = useState("");
    const errorIn = useRef("");
    const errorMessage = useRef("");

    if (next) {
        const Error = projectInfoValidation(
            title,
            abstract,
            scope,
            modulesList
        );
        if (Error == "") {
            errorIn.current = "ready";
        } else {
            errorIn.current = Error.errorIn;
            errorMessage.current = Error.error;
        }
    }

    const addModule = (e) => {
        e.preventDefault();
        if (module.trim().length < 5 || module.trim().length > 30) {
            errorIn.current = "module";
            errorMessage.current =
                "Module Title should be between 5 to 30 characters ";
            setRefresh(!refresh);
        } else {
            errorIn.current = "";
            errorMessage.current = "";
            setModulesList([...modulesList, module]);
            setModule("");
        }
    };
    const deleteModule = (index) => () => {
        modulesList.splice(index, 1);
        setRefresh(!refresh);
    };
    useEffect(() => {
        if (errorIn.current == "ready") {
            setProjectData({ title, abstract, scope, modulesList });
            setActiveStep(2);
        }

        setNext(false);
    }, [next]);
    return (
        <div className={classes.root}>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            name="title"
                            variant="outlined"
                            required
                            fullWidth
                            id="title"
                            label="Title"
                            placeholder="Write title of your project"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                                errorIn.current = "";
                            }}
                            error={errorIn.current === "title"}
                            helperText={
                                errorIn.current === "title"
                                    ? errorMessage.current
                                    : `${title.length}/50`
                            }
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="abstract"
                            label="Abstract"
                            name="abstract"
                            value={abstract}
                            onChange={(e) => {
                                setAbstract(e.target.value);
                                errorIn.current = "";
                            }}
                            error={errorIn.current === "abstract"}
                            helperText={
                                errorIn.current === "abstract"
                                    ? errorMessage.current
                                    : `${abstract.length}/400`
                            }
                            rows={4}
                            multiline
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="scope"
                            label="Scope"
                            name="scope"
                            value={scope}
                            onChange={(e) => {
                                setScope(e.target.value);
                                errorIn.current = "";
                            }}
                            error={errorIn.current === "scope"}
                            helperText={
                                errorIn.current === "scope"
                                    ? errorMessage.current
                                    : `${scope.length}/400`
                            }
                            rows={4}
                            multiline
                        />
                    </Grid>

                    <Grid item xs={12}>
                        {modulesList.length > 0 &&
                            modulesList.map((m, index) => {
                                return (
                                    <Chip
                                        key={index}
                                        label={m}
                                        onDelete={deleteModule(index)}
                                        classes={{
                                            root: classes.chip,
                                            deleteIcon: classes.chipIcon,
                                        }}
                                    />
                                );
                            })}
                        <form onSubmit={addModule} noValidate>
                            <TextField
                                className={classes.moduleChip}
                                variant="outlined"
                                required
                                fullWidth
                                id="module"
                                label="Add Modules"
                                name="module"
                                value={module}
                                placeholder="Write the name of your major modules"
                                onChange={(e) => {
                                    setModule(e.target.value);
                                    errorIn.current = "";
                                }}
                                error={errorIn.current === "module"}
                                helperText={
                                    errorIn.current === "module"
                                        ? errorMessage.current
                                        : `${module.length}/30`
                                }
                            />
                            <Button
                                onClick={addModule}
                                variant="outlined"
                                color="primary"
                            >
                                Add Module
                            </Button>
                        </form>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </div>
    );
};

export default ProjectRegistration;