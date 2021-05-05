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

//---
//const hist = createBrowserHistory();

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* Login routes for students */}
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <Route path="/forgotpassword" component={ForgotPassword} />
        <Route exact path="/reset-password/:resetId" component={ResetPassword} />
        <Redirect from="/" to="/signin" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
