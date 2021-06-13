import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    Tabs,
    Tab,
    Typography,
    Icon
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DescriptionIcon from "@material-ui/icons/Description";
import PersonAddIcon from '@material-ui/icons/PersonAdd';


const a11yprops = (index) => {
    return {
        id: `full-width-tab-${index}`,
        "aria-controls": `full-width-tabpanel-${index}`,
    };
}
const useStyles = makeStyles({
    '@media(min-width: 1024px)': {
        root: {
            minWidth: 275,
            minHeight: "80vh",
            marginTop: "-2rem",
            marginLeft: "1rem",
            marginRight: "1rem",
            backgroundColor: "#f5f5f5",
            borderRadius: ".3rem",
            "@media screen and (max-width: 600px)": {
                marginTop: "-30px",
            },
        },


        title: {
            textAlign: "center",
        },
        icon: {
            color: "white",
            fontSize: "3rem",
            padding: ".2rem",
            borderRadius: ".3rem",
            backgroundColor: "green",
            boxShadow: "0px 2px 7px 0px rgb(0 0 0 / 16%)",
            marginTop: "-1rem",
            marginLeft: "3rem",
        },
    },
    '@media(max-width: 1023px)': {
        root: {
            minWidth: 275,
            minHeight: "80vh",
            marginTop: "-1.5rem",
            marginLeft: "0px",
            marginRight: "0px",
            padding: "0px",
            backgroundColor: "#f5f5f5",
            borderRadius: ".3rem",
        },


        title: {
            textAlign: "center",
        },
        icon: {
            color: "white",
            fontSize: "2rem",
            padding: ".2rem",
            borderRadius: ".3rem",
            backgroundColor: "green",
            boxShadow: "0px 2px 7px 0px rgb(0 0 0 / 16%)",
            marginTop: "-0.5rem",
            marginLeft: "1rem",
        },
    },


});

const PageLayout = (props) => {
    const { Title, Icon } = props;
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const classes = useStyles();
    return (
        <div>
            <Icon className={classes.icon} />
            <Card className={classes.root}>
                <CardHeader
                    className={classes.title}
                    title={Title}
                    stats
                    icon
                />

                <CardContent>
                    {props.children}
                </CardContent>
            </Card>
        </div>
    );
};

export default PageLayout;