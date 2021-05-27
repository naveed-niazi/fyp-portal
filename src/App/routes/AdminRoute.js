import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { isLoggedIn, roleNow } from "../helpers/authenticationHelp"

const AdminRoute = ({ component: Component, ...rest }) => (
    //props means all the components passed down to this private route component
    <Route
        {...rest}
        render={props =>
            isLoggedIn() && roleNow() === "Admin" ?
                (<Component{...props} />)
                :
                (<Redirect to={{ pathname: "/student/documentation", state: { from: props.location } }} />)
        } />
)

export default AdminRoute;