import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    Tabs,
    Tab,
    Button,
    Box
} from "@material-ui/core";
import useStyles from "../../assets/jss/dashboardStyles.js";
import SwipeableViews from "react-swipeable-views";
import PageLayout from "../components/PageLayout";
import DescriptionIcon from "@material-ui/icons/Description";

import CreateProject from "../components/CreateProject"
const a11yprops = (index) => {
    return {
        id: `full-width-tab-${index}`,
        "aria-controls": `full-width-tabpanel-${index}`,
    };
}
const defaultProps = {
    bgcolor: "background.paper",
    marginTop: 3,
    border: 1,
    borderColor: "grey.500",
    style: { width: "initial", height: '20rem', borderStyle: "dashed" },
};
const Documentation = ({ Data }) => {
    const [value, setValue] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleClickOpen = () => {
        console.log("handleClickOpen");
        console.log(open);
        setOpen(true);
    };

    const classes = useStyles();
    return (
        <PageLayout Title={Data.name} Icon={Data.icon}>

            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                centered
            >
                <Tab label="VISION DOCUMENTS" {...a11yprops(0)} />
                <Tab label="FINAL DOCUMENTATION" {...a11yprops(1)} />
            </Tabs>
            <SwipeableViews index={value}>
                <div value={value} index={0}>
                    <Box display="flex" justifyContent="flex-end" m={2}>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={handleClickOpen}
                        >
                            CREATE PROJECT
                        </Button>
                    </Box>
                    <Box {...defaultProps}>
                        {" "}
                    </Box>
                </div>
                <div value={value} index={1}>
                    <Box {...defaultProps}></Box>
                </div>

                <Box {...defaultProps}></Box>
            </SwipeableViews>

            {/* {open ? <CreateProjectForm appear={setOpen} /> : ""} */}
            {open ? <CreateProject appear={setOpen} /> : ""}


        </PageLayout>
    );
};

export default Documentation;