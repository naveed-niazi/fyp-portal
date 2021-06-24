import React, { useState, useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@material-ui/core";
import GroupRegistration from "./GroupRegistration";
import ProjectRegistration from "./ProjectRegistration";
import UploadVisionDocument from "./UploadVisionDocument";
import { Grid } from "@material-ui/core";
import Announcement from "@material-ui/icons/Announcement";
import { green } from "@material-ui/core/colors";
import { CircularProgress } from "@material-ui/core";
import { createProjectAPI, updateVisionDocument } from "../apiCalls/projectCalls";

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            paddingTop: theme.spacing(4),
            minHeight: "25rem",
        },
        success: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: theme.spacing(3),
            padding: theme.spacing(3),
            textAlign: "center",
            backgroundColor: "#dcedc8",
        },
        unsuccess: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: theme.spacing(3),
            padding: theme.spacing(3),
            textAlign: "center",
            backgroundColor: "#ffebee",
        },
        save: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: theme.spacing(3),
            padding: theme.spacing(3),
            textAlign: "center",
            backgroundColor: "#ffecb3",
        },
        step: {
            padding: "0rem",
            margin: "0rem",
        },
        loading: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: theme.spacing(3),
            padding: theme.spacing(8),
        },
        successIcon: {
            color: "#7cb342",
            fontSize: "8rem",
        },
        unsuccessIcon: {
            color: "#c62828",
            fontSize: "8rem",
        },
        saveIcon: {
            color: "#ff6f00",
            fontSize: "8rem",
        },

        backButton: {
            marginRight: theme.spacing(1),
        },
        instructions: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
    })
);
const theme = createMuiTheme({
    palette: {
        primary: green,
    },
});
function getSteps() {
    return [
        "Group Registration",
        "Proposal Overview",
        "Upload vision document",
    ];
}

const CreateProject = ({ appear }) => {
    const { isLoggedIn } = require("../helpers/authenticationHelp");

    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [open, setOpen] = useState(true);
    const [success, setSuccess] = useState("");
    const [groupData, setGroupData] = useState({
        group: "",
        description: "",
        team: "solo",
        groupMembers: [],
    });
    const [projectData, setProjectData] = useState({
        title: "",
        abstract: "",
        scope: "",
        modulesList: [],
    });
    const [loading, setLoading] = useState(false);
    const [document, setDocument] = useState([]);
    const [next, setNext] = useState(false);
    const steps = getSteps();
    const formData = new FormData();

    const handleClose = () => {
        appear(false);
        setOpen(false);
    };

    const saveProject = async (e) => {
        e.preventDefault();
        // setLoading(true);

        if (groupData.groupMembers.length > 0) {
            const partner = groupData.groupMembers.pop();
            groupData.groupMembers.push(partner._id);
        }

        groupData.groupMembers.push(isLoggedIn().user._id);
        //   formData.set("groupData", JSON.stringify(groupData));
        //   formData.set("projectData", JSON.stringify(projectData));
        formData.set("file", document[0]);
        const data = { groupData, projectData }
        console.log("Before sending request: " + data)
        createProjectAPI(data).then(data => {
            if (data) {
                if (data.error) {
                    setSuccess("declined")
                }
                else {
                    //we will send the file
                    updateVisionDocument(formData).then(data => {
                        if (data) {
                            if (data.error) {
                                setSuccess("declined")
                            } else
                                setSuccess("accepted")
                        } else {
                            setSuccess("declined")
                        }
                    })
                }
            }
            else
                setSuccess("declined")
        })
    };
    const handleNext = async (e) => {
        e.preventDefault();
        if (!next) setNext(true);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    function getStepContent(activeIndex) {
        switch (activeIndex) {
            case 0:
                return (
                    <GroupRegistration
                        next={next}
                        setNext={setNext}
                        setActiveStep={setActiveStep}
                        groupData={groupData}
                        setGroupData={setGroupData}
                    />
                );
            case 1:
                return (
                    <ProjectRegistration
                        next={next}
                        setNext={setNext}
                        setActiveStep={setActiveStep}
                        projectData={projectData}
                        setProjectData={setProjectData}
                    />
                );
            case 2:
                return (
                    <UploadVisionDocument
                        next={next}
                        setNext={setNext}
                        setActiveStep={setActiveStep}
                        document={document}
                        setDocument={setDocument}
                    />
                );
            default:
                return "Unknown stepIndex";
        }
    }
    useEffect(() => { }, [setNext]);
    return (
        <ThemeProvider theme={theme}>
            <div>
                <Dialog open={open} aria-labelledby="form-dialog-title">
                    <DialogTitle
                        id="form-dialog-title"
                        style={{ textAlign: "center" }}
                    >
                        CREATE NEW PROJECT
                    </DialogTitle>

                    <DialogContent className={classes.root}>
                        <Stepper
                            activeStep={activeStep}
                            alternativeLabel
                            className={classes.step}
                        >
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <div>
                            {activeStep === steps.length ? (
                                <div>
                                    { }
                                    {loading ? (
                                        <Paper
                                            className={classes.loading}
                                            elevation={0}
                                        >
                                            <CircularProgress
                                                size={130}
                                                thickness={5}
                                            />
                                        </Paper>
                                    ) : (
                                        <Paper
                                            elevation={3}
                                            className={
                                                success === "" && classes.save ||
                                                success === "declined" && classes.unsuccess ||
                                                success === "accepted" && classes.success
                                            }

                                        >


                                            <Grid container spacing={3}>
                                                <Grid item xs={12}>
                                                    {success === "" && (
                                                        <Announcement
                                                            className={
                                                                classes.saveIcon
                                                            }
                                                        />
                                                    )}
                                                    {success === "accepted" && (
                                                        <CheckCircleIcon
                                                            className={
                                                                classes.successIcon
                                                            }
                                                        />
                                                    )}
                                                    {success === "declined" && (
                                                        <SentimentVeryDissatisfiedIcon
                                                            className={
                                                                classes.unsuccessIcon
                                                            }
                                                        />
                                                    )}
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Typography variant="h5">
                                                        {success === "" &&
                                                            "Are you ready to save?"}
                                                        {success === "accepted" &&
                                                            "Project Saved Successfully!"}
                                                        {success === "declined" &&
                                                            "System Error!"}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography>
                                                        {success === "" &&
                                                            "All steps are completed successfully. Please click on save button to save your settings."}
                                                        {success === "accepted" &&
                                                            "Congratulations! You have successfully submitted your proposal for Approval."}
                                                        {success === "declined" &&
                                                            "Project creation failed! System is unable to create this project on database. Please contact IT support to report this problem."}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    )}
                                </div>
                            ) : (
                                <div>
                                    <Typography
                                        className={classes.instructions}
                                    >
                                        {getStepContent(activeStep)}
                                    </Typography>
                                </div>
                            )}
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        {!(activeStep == 0) && (
                            <>
                                {success === ""
                                    ?
                                    < Button
                                        onClick={handleBack}
                                        className={classes.backButton}
                                    >
                                        Back
                                    </Button>
                                    :
                                    ""
                                }
                            </>
                        )}
                        {activeStep === steps.length ? (
                            <>
                                {success === ""
                                    ?
                                    <Button
                                        color="primary"
                                        type="submit"
                                        variant="contained"
                                        className={classes.submit}
                                        onClick={saveProject}
                                    >
                                        Save
                                    </Button>
                                    :
                                    ""
                                }
                            </>

                        ) : (
                            <Button
                                color="primary"
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={handleNext}
                            >
                                Next
                            </Button>
                        )}
                    </DialogActions>
                </Dialog>
            </div>
        </ThemeProvider >
    );
};
export default CreateProject;