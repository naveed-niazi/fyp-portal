import React, { useState, useEffect, Fragment, useRef } from "react";
import Grid from "@material-ui/core/Grid";

import Alert from "@material-ui/lab/Alert";

import { makeStyles } from "@material-ui/core/styles";
import { documentValidation } from "../helpers/documentationHelp";
import { DropzoneArea } from "material-ui-dropzone";

const useStyles = makeStyles((theme) => ({
    previewChip: {
        minWidth: 160,
        maxWidth: 210,
    },
}));

const UploadVisionDocuement = ({
    next,
    setNext,
    setActiveStep,
    document,
    setDocument,
}) => {
    const classes = useStyles();
    const errorIn = useRef("");
    const errorMessage = useRef("");
    const [file, setFile] = useState(document);

    if (next) {
        const Error = documentValidation(file);

        if (Error == "") {
            errorIn.current = "ready";
        } else {
            errorIn.current = Error.errorIn;
            errorMessage.current = Error.error;
        }
    }

    useEffect(() => {
        if (errorIn.current == "ready") {
            setDocument(file);
            setActiveStep(3);
        }
        setNext(false);
    }, [next]);

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    {errorIn.current === "file" && (
                        <Alert severity="error">
                            Error - Please upload vision document (.pdf format
                            only)
                        </Alert>
                    )}
                </Grid>

                <DropzoneArea
                    initialFiles={file}
                    onChange={(file) => {
                        setFile(file);
                        errorIn.current = "";
                    }}
                    onDelete={() => {
                        setFile([]);
                        setDocument([]);
                    }}
                    acceptedFiles={["application/pdf"]}
                    filesLimit={1}
                    maxFileSize={20000000}
                    dropzoneText="Choose a file or drag it here"
                    showPreviews={true}
                    showFileNamesInPreview={true}
                    showPreviewsInDropzone={false}
                    useChipsForPreview
                    previewGridProps={{
                        container: {
                            spacing: 1,
                            direction: "row",
                        },
                    }}
                    previewChipProps={{
                        classes: { root: classes.previewChip },
                    }}
                    previewText="Selected files"
                />
            </Grid>
        </div>
    );
};

export default UploadVisionDocuement;