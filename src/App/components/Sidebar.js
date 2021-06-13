import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
//---
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
//---
import NavbarLinks from "./NavbarLinks"
import { roleNow } from "../helpers/authenticationHelp"

//---
import {
    drawerWidth,
    transition,
    boxShadow,
    defaultFont,
    primaryColor,
    primaryBoxShadow,
    infoColor,
    successColor,
    warningColor,
    dangerColor,
    whiteColor,
    grayColor,
    blackColor,
    hexToRgb
} from "../../assets/jss/portalStyles";

const sidebarStyle = theme => ({
    drawerPaper: {
        border: "none",
        position: "fixed",
        top: "0",
        bottom: "0",
        left: "0",
        zIndex: "1",
        ...boxShadow,
        width: drawerWidth,
        [theme.breakpoints.up("md")]: {
            width: drawerWidth,
            position: "fixed",
            height: "100%"
        },
        [theme.breakpoints.down("sm")]: {
            width: drawerWidth,
            ...boxShadow,
            position: "fixed",
            display: "block",
            top: "0",
            height: "100vh",
            right: "0",
            left: "auto",
            zIndex: "1032",
            visibility: "visible",
            overflowY: "visible",
            borderTop: "none",
            textAlign: "left",
            paddingRight: "0px",
            paddingLeft: "0",
            transform: `translate3d(${drawerWidth}px, 0, 0)`,
            ...transition
        }
    },
    logo: {
        position: "relative",
        padding: "15px 15px",

        zIndex: "4",
        "&:after": {
            content: '""',
            position: "absolute",
            bottom: "0",

            height: "1px",
            right: "15px",
            width: "calc(100% - 30px)",
            backgroundColor: "rgba(" + hexToRgb(grayColor[6]) + ", 0.3)"
        }
    },
    logoLink: {
        ...defaultFont,

        textTransform: "uppercase",
        padding: "5px 0",
        display: "block",
        fontSize: "18px",
        textAlign: "left",
        fontWeight: "400",
        lineHeight: "30px",
        textDecoration: "none",
        backgroundColor: "transparent",
        "&,&:hover": {
            color: whiteColor
        }
    },
    logoImage: {
        width: "30px",
        display: "inline-block",
        maxHeight: "30px",
        marginLeft: "10px",
        marginRight: "15px"
    },
    img: {
        verticalAlign: "middle",
        width: "35px",
        top: "17px",
        position: "absolute",
        horizontalAlign: "middle",
        verticalAlign: "middle",
        border: "0"
    },
    background: {
        position: "absolute",
        zIndex: "1",
        height: "100%",
        width: "100%",
        display: "block",
        top: "0",
        left: "0",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        "&:after": {
            position: "absolute",
            zIndex: "3",
            width: "100%",
            height: "100%",
            content: '""',
            display: "block",
            background: blackColor,
            opacity: ".8"
        }
    },
    list: {
        marginTop: "20px",
        paddingLeft: "0",
        paddingTop: "0",
        paddingBottom: "0",
        marginBottom: "0",
        listStyle: "none",
        position: "unset"
    },
    item: {
        position: "relative",
        display: "block",
        textDecoration: "none",
        "&:hover,&:focus,&:visited,&": {
            color: whiteColor
        }
    },
    itemLink: {
        width: "auto",
        transition: "all 300ms linear",
        margin: "10px 15px 0",
        borderRadius: "3px",
        position: "relative",
        display: "block",
        padding: "10px 15px",
        backgroundColor: "transparent",
        ...defaultFont
    },
    itemIcon: {
        width: "24px",
        height: "30px",
        fontSize: "24px",
        lineHeight: "30px",
        float: "left",
        marginRight: "15px",
        textAlign: "center",
        verticalAlign: "middle",
        color: "rgba(" + hexToRgb(whiteColor) + ", 0.8)"
    },
    itemText: {
        ...defaultFont,
        margin: "0",
        lineHeight: "30px",
        fontSize: "14px",
        color: whiteColor
    },
    whiteFont: {
        color: whiteColor
    },
    purple: {
        backgroundColor: primaryColor[0],
        ...primaryBoxShadow,
        "&:hover,&:focus": {
            backgroundColor: primaryColor[0],
            ...primaryBoxShadow
        }
    },
    blue: {
        backgroundColor: infoColor[0],
        boxShadow:
            "0 12px 20px -10px rgba(" +
            hexToRgb(infoColor[0]) +
            ",.28), 0 4px 20px 0 rgba(" +
            hexToRgb(blackColor) +
            ",.12), 0 7px 8px -5px rgba(" +
            hexToRgb(infoColor[0]) +
            ",.2)",
        "&:hover,&:focus": {
            backgroundColor: infoColor[0],
            boxShadow:
                "0 12px 20px -10px rgba(" +
                hexToRgb(infoColor[0]) +
                ",.28), 0 4px 20px 0 rgba(" +
                hexToRgb(blackColor) +
                ",.12), 0 7px 8px -5px rgba(" +
                hexToRgb(infoColor[0]) +
                ",.2)"
        }
    },
    green: {
        backgroundColor: successColor[0],
        boxShadow:
            "0 12px 20px -10px rgba(" +
            hexToRgb(successColor[0]) +
            ",.28), 0 4px 20px 0 rgba(" +
            hexToRgb(blackColor) +
            ",.12), 0 7px 8px -5px rgba(" +
            hexToRgb(successColor[0]) +
            ",.2)",
        "&:hover,&:focus": {
            backgroundColor: successColor[0],
            boxShadow:
                "0 12px 20px -10px rgba(" +
                hexToRgb(successColor[0]) +
                ",.28), 0 4px 20px 0 rgba(" +
                hexToRgb(blackColor) +
                ",.12), 0 7px 8px -5px rgba(" +
                hexToRgb(successColor[0]) +
                ",.2)"
        }
    },
    orange: {
        backgroundColor: warningColor[0],
        boxShadow:
            "0 12px 20px -10px rgba(" +
            hexToRgb(warningColor[0]) +
            ",.28), 0 4px 20px 0 rgba(" +
            hexToRgb(blackColor) +
            ",.12), 0 7px 8px -5px rgba(" +
            hexToRgb(warningColor[0]) +
            ",.2)",
        "&:hover,&:focus": {
            backgroundColor: warningColor[0],
            boxShadow:
                "0 12px 20px -10px rgba(" +
                hexToRgb(warningColor[0]) +
                ",.28), 0 4px 20px 0 rgba(" +
                hexToRgb(blackColor) +
                ",.12), 0 7px 8px -5px rgba(" +
                hexToRgb(warningColor[0]) +
                ",.2)"
        }
    },
    red: {
        backgroundColor: dangerColor[0],
        boxShadow:
            "0 12px 20px -10px rgba(" +
            hexToRgb(dangerColor[0]) +
            ",.28), 0 4px 20px 0 rgba(" +
            hexToRgb(blackColor) +
            ",.12), 0 7px 8px -5px rgba(" +
            hexToRgb(dangerColor[0]) +
            ",.2)",
        "&:hover,&:focus": {
            backgroundColor: dangerColor[0],
            boxShadow:
                "0 12px 20px -10px rgba(" +
                hexToRgb(dangerColor[0]) +
                ",.28), 0 4px 20px 0 rgba(" +
                hexToRgb(blackColor) +
                ",.12), 0 7px 8px -5px rgba(" +
                hexToRgb(dangerColor[0]) +
                ",.2)"
        }
    },
    sidebarWrapper: {
        position: "relative",
        height: "calc(100vh - 75px)",
        overflow: "auto",
        width: "260px",
        zIndex: "4",
        overflowScrolling: "touch"
    },
    activePro: {
        [theme.breakpoints.up("md")]: {
            position: "absolute",
            width: "100%",
            bottom: "13px"
        }
    }
});



const useStyles = makeStyles(sidebarStyle);

export default function Sidebar(props) {
    const classes = useStyles();
    // verifies if routeName is the one active (in browser input)
    function activeRoute(routeName) {
        return window.location.href.indexOf(routeName) > -1 ? true : false;
    }
    const { color, logo, image, logoText, routes } = props;
    var links = (
        <List className={classes.list}>
            {routes.map((prop, key) => {
                if (prop.layout == `/${roleNow().toLowerCase()}`) {
                    var activePro = " ";
                    var listItemClasses;
                    listItemClasses = classNames({
                        [" " + classes[color]]: activeRoute(prop.layout + prop.path)
                    });

                    const whiteFontClasses = classNames({
                        [" " + classes.whiteFont]: activeRoute(prop.layout + prop.path)
                    });
                    return (
                        <NavLink
                            to={prop.layout + prop.path}
                            className={activePro + classes.item}
                            activeClassName="active"
                            key={key}
                        >
                            <ListItem button className={classes.itemLink + listItemClasses}>
                                {typeof prop.icon === "string" ? (
                                    <Icon
                                        className={classNames(classes.itemIcon, whiteFontClasses)}
                                    >
                                        {prop.icon}
                                    </Icon>
                                ) : (
                                    <prop.icon
                                        className={classNames(classes.itemIcon, whiteFontClasses)}
                                    />
                                )}
                                <ListItemText
                                    primary={prop.name}
                                    className={classNames(classes.itemText, whiteFontClasses)}
                                    disableTypography={true}
                                />
                            </ListItem>
                        </NavLink>
                    );
                }
            })}
        </List>
    );
    var brand = (
        <div className={classes.logo}>
            <a
                href="https://mainpage.com"
                className={classNames(classes.logoLink)}
                target="_blank"
            >
                <div className={classes.logoImage}>
                    <img src={logo} alt="logo" className={classes.img} />
                </div>
                {logoText}
            </a>
        </div>
    );
    return (
        <div>
            <Hidden mdUp implementation="css">
                <Drawer
                    variant="temporary"
                    anchor={"right"}
                    open={props.open}
                    classes={{
                        paper: classNames(classes.drawerPaper)
                    }}
                    onClose={props.handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true // Better open performance on mobile.
                    }}
                >
                    {brand}
                    <div className={classes.sidebarWrapper}>
                        <NavbarLinks />
                        {links}
                    </div>
                    {image !== undefined ? (
                        <div
                            className={classes.background}
                            style={{ backgroundImage: "url(" + image + ")" }}
                        />
                    ) : null}
                </Drawer>
            </Hidden>
            <Hidden smDown implementation="css">
                <Drawer
                    anchor={"left"}
                    variant="permanent"
                    open
                    classes={{
                        paper: classNames(classes.drawerPaper)
                    }}
                >
                    {brand}
                    <div className={classes.sidebarWrapper}>{links}</div>
                    {image !== undefined ? (
                        <div
                            className={classes.background}
                            style={{ backgroundImage: "url(" + image + ")" }}
                        />
                    ) : null}
                </Drawer>
            </Hidden>
        </div>
    );
}

Sidebar.propTypes = {
    handleDrawerToggle: PropTypes.func,
    bgColor: PropTypes.oneOf(["purple", "blue", "red", "yellow", "pink"]),
    logo: PropTypes.string,
    image: PropTypes.string,
    logoText: PropTypes.string,
    routes: PropTypes.arrayOf(PropTypes.object),
    open: PropTypes.bool
};
