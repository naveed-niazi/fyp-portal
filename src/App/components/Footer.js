/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
//---
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Copyright from "./Copyright"

import {
    defaultFont,
    container,
    primaryColor,
    grayColor
} from "../../assets/jss/portalStyles";

const footerStyle = {
    block: {
        color: "inherit",
        padding: "15px",
        textTransform: "uppercase",
        borderRadius: "3px",
        textDecoration: "none",
        position: "relative",
        display: "block",
        ...defaultFont,
        fontWeight: "500",
        fontSize: "12px"
    },
    left: {
        float: "left!important",
        display: "block"
    },
    right: {
        padding: "15px 0",
        margin: "0",
        fontSize: "14px",
        float: "right!important"
    },
    footer: {
        bottom: "0",
        borderTop: "1px solid " + grayColor[11],
        padding: "15px 0",
        ...defaultFont
    },
    container,
    a: {
        color: primaryColor,
        textDecoration: "none",
        backgroundColor: "transparent"
    },
    list: {
        marginBottom: "0",
        padding: "0",
        marginTop: "0"
    },
    inlineBlock: {
        display: "inline-block",
        padding: "0px",
        width: "auto"
    }
};

const useStyles = makeStyles(footerStyle);

export default function Footer(props) {
    const classes = useStyles();
    return (
        <footer className={classes.footer}>
            <div className={classes.container}>
                <Copyright />
            </div>
        </footer>
    );
}
