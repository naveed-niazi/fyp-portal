import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
// core components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import routes from "../variables/mainRoutes"
import bgImage from "../../assets/images/sidebar-3.jpg";
import logo from '../../assets/images/bright_iiui.png';
import { isLoggedIn, roleNow } from '../helpers/authenticationHelp'

import {
    drawerWidth,
    transition,
    container
} from "../../assets/jss/portalStyles";

const appStyle = theme => ({
    wrapper: {
        position: "relative",
        top: "0",
        height: "100vh"
    },
    mainPanel: {
        [theme.breakpoints.up("md")]: {
            width: `calc(100% - ${drawerWidth}px)`
        },
        overflow: "auto",
        position: "relative",
        float: "right",
        ...transition,
        maxHeight: "100%",
        width: "100%",
        overflowScrolling: "touch"
    },
    '@media(min-width: 1024px)': {
        content: {
            marginTop: "70px",
            padding: "30px 15px",
            minHeight: "calc(100vh - 123px)"
        }
    },
    '@media(max-width: 1023px)': {
        content: {
            padding: "0px",
            margin: "70px 0px 0px  0px ",
            minHeight: "calc(100vh - 123px)"
        }
    },
    container,
    map: {
        marginTop: "70px"
    }
});
const theme = createMuiTheme({
    palette: {
        primary: green,
    },
});


let perfectScrollbar;

const switchRoutes = (
    <Switch>
        {routes.map((prop, key) => {
            if (isLoggedIn() && roleNow() && prop.layout == `/${roleNow().toLowerCase()}`) {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        component={() => <prop.component Data={prop} />}
                        key={key}
                    />
                );
            }
            return null;
        })}
        {roleNow() == "Student" ? <Redirect from="/student" to="/student/documentation" /> : ""}
        {roleNow() == "Admin" ? <Redirect from="/admin" to="/admin/users" /> : ""}
        {roleNow() == "Program-Office" ? <Redirect from="/program-office" to="/program-office/user-que" /> : ""}
        {roleNow() == "Professor" ? <Redirect from="/professor" to="/professor/supervisee" /> : ""}
    </Switch>
);

const useStyles = makeStyles(appStyle);

export default function MainView({ ...rest }) {
    // styles
    const classes = useStyles();
    // ref to help us initialize PerfectScrollbar on windows devices
    const mainPanel = React.createRef();
    // states and functions
    const [image, setImage] = React.useState(bgImage);
    const [color, setColor] = React.useState("green");
    const [fixedClasses, setFixedClasses] = React.useState("dropdown show");
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleImageClick = image => {
        setImage(image);
    };
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const resizeFunction = () => {
        if (window.innerWidth >= 960) {
            setMobileOpen(false);
        }
    };
    // initialize and destroy the PerfectScrollbar plugin
    React.useEffect(() => {
        if (navigator.platform.indexOf("Win") > -1) {
            perfectScrollbar = new PerfectScrollbar(mainPanel.current, {
                suppressScrollX: true,
                suppressScrollY: false
            });
            document.body.style.overflow = "hidden";
        }
        window.addEventListener("resize", resizeFunction);
        // Specify how to clean up after this effect:
        return function cleanup() {
            if (navigator.platform.indexOf("Win") > -1) {
                perfectScrollbar.destroy();
            }
            window.removeEventListener("resize", resizeFunction);
        };
    }, [mainPanel]);
    return (
        <div className={classes.wrapper}>
            <ThemeProvider theme={theme}>
                <Sidebar
                    routes={routes}
                    logoText={"GRC Portal"}
                    logo={logo}
                    image={image}
                    handleDrawerToggle={handleDrawerToggle}
                    open={mobileOpen}
                    color={color}
                    {...rest}
                />
                <div className={classes.mainPanel} ref={mainPanel}>
                    <Navbar
                        routes={routes}
                        handleDrawerToggle={handleDrawerToggle}
                        {...rest}
                    />
                    <div className={classes.content}>
                        <div className={classes.container}>{switchRoutes}</div>
                    </div>
                    <Footer />
                </div>
            </ThemeProvider>
        </div>
    );
}
