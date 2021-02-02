import React from "react";
import { Route, useRouteMatch } from "react-router-dom";

import Album from "./Album";

function Scenes() {
    const { path } = useRouteMatch();

    return (
        <>
        <Route exact path={`${path}`} component={Album} />
        </>
    );
}

export default Scenes;