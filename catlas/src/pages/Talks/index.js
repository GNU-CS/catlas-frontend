import React from "react";
import { Route, useRouteMatch } from "react-router-dom";

import Board from "./Board";
import NewPost from "./NewPost";

function Talks() {
    const { path } = useRouteMatch();

    return (<>
    <Route exact path={`${path}`} component={Board} />
    <Route path={`${path}/new`} component={NewPost} />
    </>);
}

export default Talks;