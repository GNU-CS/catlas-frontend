import React from "react";
import { Route, useRouteMatch } from "react-router-dom";

import Board from "./Board";

function Talks() {
    const { path } = useRouteMatch();

    return (<>
    <Route exact path={`${path}`} component={Board} />
    </>);
}

export default Talks;