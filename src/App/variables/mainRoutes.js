
import Dashboard from "@material-ui/icons/Dashboard";
import AssignmentIcon from '@material-ui/icons/Assignment';
import BallotIcon from '@material-ui/icons/Ballot';
import VisibilityIcon from '@material-ui/icons/Visibility';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import Language from "@material-ui/icons/Language";
// core components/views for Student layout

import Documentation from "../pages/Documentation"
import Something from "../pages/Something"
import Nothing from "../pages/Nothing"


const dashboardRoutes = [
    {
        path: "/documentation",
        name: "Documentation",
        icon: AssignmentIcon,
        component: Documentation,
        layout: "/student"
    },
    {
        path: "/something",
        name: "Something",
        icon: BallotIcon,
        component: Something,
        layout: "/student"
    },
    {
        path: "/nothing",
        name: "Nothing",
        icon: BallotIcon,
        component: Nothing,
        layout: "/admin"
    }
];


export default dashboardRoutes;
