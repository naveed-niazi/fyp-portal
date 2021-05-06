
import Dashboard from "@material-ui/icons/Dashboard";
import AssignmentIcon from '@material-ui/icons/Assignment';
import BallotIcon from '@material-ui/icons/Ballot';
import VisibilityIcon from '@material-ui/icons/Visibility';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import Language from "@material-ui/icons/Language";
// core components/views for Student layout

import Documentation from "../pages/Documentation"
import Something from "../pages/Something"


const dashboardRoutes = [

    {
        path: "/documentation",
        name: "Documentation",
        rtlName: "ملف تعريفي للمستخدم",
        icon: AssignmentIcon,
        component: Documentation,
        layout: "/student"
    },
    {
        path: "/something",
        name: "Something",
        rtlName: "لوحة القيادة",
        icon: BallotIcon,
        component: Something,
        layout: "/student"
    }
];


export default dashboardRoutes;
