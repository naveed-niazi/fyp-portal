
import Dashboard from "@material-ui/icons/Dashboard";
import AssignmentIcon from '@material-ui/icons/Assignment';
import BallotIcon from '@material-ui/icons/Ballot';
import VisibilityIcon from '@material-ui/icons/Visibility';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Language from "@material-ui/icons/Language";
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import SettingsIcon from '@material-ui/icons/Settings';
// core components/views for Student layout

import Documentation from "../pages/Documentation"
import Something from "../pages/Something"
import Users from "../pages/Users"
import UserQue from "../pages/UserQue";
import Supervisee from "../pages/Supervisee"
import SystemSetting from "../pages/SystemSetting";
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
        path: "/users",
        name: "Users",
        icon: PersonAddIcon,
        component: Users,
        layout: "/admin"
    },
    {
        path: "/user-que",
        name: "Pending Users",
        icon: AddToQueueIcon,
        component: UserQue,
        layout: "/program-office"
    },
    {
        path: "/supervisee",
        name: "Supervisee",
        icon: SupervisorAccountIcon,
        component: Supervisee,
        layout: "/professor"
    },
    {
        path: "/system-setting",
        name: "System Setting",
        icon: SettingsIcon,
        component: SystemSetting,
        layout: "/admin"
    }
];


export default dashboardRoutes;
