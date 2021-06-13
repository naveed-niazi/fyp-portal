import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { isLoggedIn, roleNow } from "../helpers/authenticationHelp"

const PORoute = ({ component: Component, ...rest }) => (
    //props means all the components passed down to this private route component
    <Route
        {...rest}
        render={props =>
            isLoggedIn() && roleNow() === "Program-Office"
                ?
                (<Component{...props} />)
                :
                (<Redirect to={{ pathname: "/signin", state: { from: props.location } }} />)
        } />
)

export default PORoute;