import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
//---
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
//---
import Menu from "@material-ui/icons/Menu";
import Icon from "@material-ui/core/Icon"
//---
import Button from "./CustomButton";
import NavbarLinks from './NavbarLinks';
import PageHeader from "./PageHeader"

import {
    container,
    defaultFont,
    primaryColor,
    defaultBoxShadow,
    infoColor,
    successColor,
    warningColor,
    dangerColor,
    whiteColor,
    grayColor,
    hexToRgb
} from "../../assets/jss/portalStyles";
import { Card, ThemeProvider } from "@material-ui/core";

const headerStyle = theme => ({
    appBar: {
        backgroundColor: "#4CAF50",
        boxShadow: "none",
        borderBottom: "0",
        marginBottom: "0",
        position: "absolute",
        width: "100%",
        paddingTop: "0px",
        zIndex: "1029",
        color: grayColor[7],
        border: "0",
        borderRadius: "0px",
        padding: "0 0",
        transition: "all 150ms ease 0s",
        minHeight: "50px",
        display: "block"
    },
    container: {
        ...container,
        minHeight: "50px"
    },
    flex: {
        flex: 1
    },
    title: {
        ...defaultFont,
        letterSpacing: "unset",
        lineHeight: "30px",
        fontSize: "18px",
        borderRadius: "3px",
        textTransform: "none",
        color: "inherit",
        margin: "0",
        "&:hover,&:focus": {
            background: "transparent"
        }
    },
    appResponsive: {
        top: "8px"
    },
    primary: {
        backgroundColor: primaryColor[0],
        color: whiteColor,
        ...defaultBoxShadow
    },
    info: {
        backgroundColor: infoColor[0],
        color: whiteColor,
        ...defaultBoxShadow
    },
    success: {
        backgroundColor: successColor[0],
        color: whiteColor,
        ...defaultBoxShadow
    },
    warning: {
        backgroundColor: warningColor[0],
        color: whiteColor,
        ...defaultBoxShadow
    },
    danger: {
        backgroundColor: dangerColor[0],
        color: whiteColor,
        ...defaultBoxShadow
    },
});


const useStyles = makeStyles(headerStyle);


export default function Header(props) {
    const classes = useStyles();
    function makeBrand() {
        var name, icon;
        props.routes.map(prop => {
            if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
                name = prop.name;
                icon = prop.theIcon;
            }
            return null;
        });
        console.log(icon)
        return { name, icon };
    }
    const { color } = props;
    const appBarClasses = classNames({
        [" " + classes[color]]: color
    });
    return (
        <AppBar className={classes.appBar + appBarClasses}>
            <Toolbar className={classes.container}>
                <div className={classes.flex}>
                    {/*Specific Component Data in TopBar*/}

                </div>

                <Hidden smDown implementation="css">
                    <NavbarLinks />
                </Hidden>
                <Hidden mdUp implementation="css">
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={props.handleDrawerToggle}
                    >
                        <Menu />
                    </IconButton>
                </Hidden>
            </Toolbar>
        </AppBar>
    );
}

Header.propTypes = {
    color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
    rtlActive: PropTypes.bool,
    handleDrawerToggle: PropTypes.func,
    routes: PropTypes.arrayOf(PropTypes.object)
};
