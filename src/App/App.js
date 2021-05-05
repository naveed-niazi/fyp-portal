import './App.css';
//---
import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
//---
import Signup from './genericViews/Signup'
import Signin from './genericViews/Signin'
//---
const hist = createBrowserHistory();

function App() {
  return (
    <BrowserRouter history={hist}>
      <Switch>
        {/* Login routes for students */}
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <Redirect from="/" to="/signin" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
