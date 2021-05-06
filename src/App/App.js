import './App.css';
//---
import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
//import { createBrowserHistory } from "history";
//---
import Signup from './genericViews/Signup'
import Signin from './genericViews/Signin'
import ForgotPassword from './genericViews/ForgotPassword'
import ResetPassword from './genericViews/ResetPassword'
import Welcome from './genericViews/Welcome'
//---
import StudentView from './roleViews/StudentView'

//---
//const hist = createBrowserHistory();

function App() {
  return (
    <BrowserRouter>
      <Switch>

        {/* once in a blue moon cases */}
        <Route path="/confirm/:confirmationCode" component={Welcome} />
        <Route path="/reset-password/:resetId" component={ResetPassword} />
        <Route exact path="/forgotpassword" component={ForgotPassword} />

        {/* exact routes for user to login */}
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        {/* showing differnt views based on roles */}
        <Route path="/student" component={StudentView} />

        <Redirect from="/" to="/signin" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
