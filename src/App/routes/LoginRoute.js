import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { isLoggedIn, roleNow } from "../helpers/authenticationHelp"

const LoginRoute = ({ component: Component, ...rest }) => (
    //props means all the components passed down to this private route component
    <Route
        {...rest}
        render={props =>
            isLoggedIn() && roleNow() ?
                (<Redirect to={{ pathname: `/${roleNow().toLowerCase()}`, state: { from: props.location } }} />)
                :
                (<Component{...props} />)
        } />
)

export default LoginRoute;