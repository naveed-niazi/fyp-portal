import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
//---
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton"
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
//---
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
//---
import { makeStyles } from "@material-ui/core/styles";
//---
import IIUI from '../../assets/images/iiui-logo.jpg';
import { headersData } from "../variables/headerData"

const useStyles = makeStyles(() => ({
    header: {
        backgroundColor: "#4CAF50",
        paddingRight: "79px",
        paddingLeft: "118px",
        "@media (max-width: 900px)": {
            paddingLeft: 0,
        },
    },
    logoImage: {
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        marginRight: "10px"
    },
    logo: {

        fontFamily: "Work Sans, sans-serif",
        fontWeight: 600,
        color: "#FFFEFE",
        textAlign: "left",
    },
    menuButton: {
        fontFamily: "Open Sans, sans-serif",
        fontWeight: 700,
        size: "18px",
        marginLeft: "38px",
        color: "white",
        "&:hover": {
            color: "green"
        }

    },
    toolbar: {
        display: "flex",
    },
    moveLeft: {
        marginLeft: "auto"
    },
    drawerContainer: {
        padding: "20px 30px",
    },
}));

export default function Header() {
    const { header, logo, menuButton, toolbar, drawerContainer, logoImage, moveLeft } = useStyles();

    const [state, setState] = useState({
        mobileView: false,
        drawerOpen: false,
    });

    const { mobileView, drawerOpen } = state;

    useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 900
                ? setState((prevState) => ({ ...prevState, mobileView: true }))
                : setState((prevState) => ({ ...prevState, mobileView: false }));
        };

        setResponsiveness();

        window.addEventListener("resize", () => setResponsiveness());
    }, []);

    const displayDesktop = () => {
        return (
            <Toolbar className={toolbar}>
                <img className={logoImage} src={IIUI} alt="IIUI" />
                {grcLogo}
                <div className={moveLeft}>{getMenuButtons()}</div>
            </Toolbar>
        );
    };

    const displayMobile = () => {
        const handleDrawerOpen = () =>
            setState((prevState) => ({ ...prevState, drawerOpen: true }));
        const handleDrawerClose = () =>
            setState((prevState) => ({ ...prevState, drawerOpen: false }));

        return (
            <Toolbar>


                <Drawer
                    {...{
                        anchor: "left",
                        open: drawerOpen,
                        onClose: handleDrawerClose,
                    }}
                >
                    <div className={drawerContainer}>{getDrawerChoices()}</div>
                </Drawer>
                <img className={logoImage} src={IIUI} alt="IIUI" />
                <div>{grcLogo}</div>
            </Toolbar>
        );
    };

    const getDrawerChoices = () => {
        return headersData.map(({ label, href }) => {
            return (
                <Link
                    {...{
                        component: RouterLink,
                        to: href,
                        color: "inherit",
                        style: { textDecoration: "none" },
                        key: label,
                    }}
                    key={label}
                >
                    <div style={{ display: "flex", alignItems: "center" }}>
                        {label === "Sign Up" ? <ExitToAppIcon /> : <VpnKeyIcon />}
                        <MenuItem >{label}</MenuItem>
                    </div>
                </Link>
            );
        });
    };

    const grcLogo = (
        <Typography variant="h6" component="h1" className={logo}>
            <RouterLink style={{ textDecoration: "none", color: "inherit" }} to="/"> GRC Portal</RouterLink>
        </Typography>
    );

    const getMenuButtons = () => {
        return headersData.map(({ label, href }) => {
            return (
                <Button
                    {...{
                        key: label,
                        color: "inherit",
                        to: href,
                        component: RouterLink,
                        className: menuButton,
                    }}
                    key={label}
                >
                    {label}
                </Button>
            );
        });
    };

    return (
        <header>
            <AppBar className={header} position="static">
                {mobileView ? displayMobile() : displayDesktop()}
            </AppBar>
        </header>
    );
}