import React from "react";
import { Route, useRouteMatch } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import Reset from "./Reset";

function Auth() {
    const { path } = useRouteMatch();

    return (<>
        <Route exact path={`${path}`} component={Login} />
        <Route path={`${path}/register`} component={Register} />
        <Route path={`${path}/reset`} component={Reset} />
    </>);
}

export default Auth;