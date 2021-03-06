
import React from 'react'
import { Route, Switch, Redirect } from "react-router-dom";
//import { createBrowserHistory } from "history";
//---
import Signup from '../genericViews/Signup'
import Signin from '../genericViews/Signin'
import ForgotPassword from '../genericViews/ForgotPassword'
import ResetPassword from '../genericViews/ResetPassword'
import Welcome from '../genericViews/Welcome'
//---
import MainView from '../roleViews/MainView'

//---
import AdminRoute from "./AdminRoute"
import StudentRoute from "./StudentRoute"
import PORoute from "./PORoute"
import ProfessorRoute from "./ProfessorRoute"
import LoginRoute from "./LoginRoute"

function MainRouter() {
    return (
        <Switch>

            {/* once in a blue moon cases */}
            <Route path="/confirm/:confirmationCode" component={Welcome} />
            <Route path="/reset-password/:resetId" component={ResetPassword} />
            <Route exact path="/forgotpassword" component={ForgotPassword} />

            {/* exact routes for user to login */}
            <LoginRoute exact path="/signup" component={Signup} />
            <LoginRoute exact path="/signin" component={Signin} />
            {/* showing differnt views based on roles */}
            <StudentRoute path="/student" component={MainView} />
            <AdminRoute path="/admin" component={MainView} />
            <PORoute path="/program-office" component={MainView} />
            <ProfessorRoute path="/professor" component={MainView} />



            <Redirect from="/" to="/signin" />
        </Switch>
    );
}

export default MainRouter;
