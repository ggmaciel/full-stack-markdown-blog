import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const authorized = useSelector((state) => state.auth.isAuthenticated);

    return (
        <Route
            {...rest}
            render={(props) => {
                if (authorized) {
                    return <Component {...props} />;
                } else if (authorized === false) {
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {
                                    from: props.location,
                                },
                            }}
                        />
                    );
                }
            }}
        />
    );
};

export default PrivateRoute;
