import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import {
  Main,
  Clubs,
  About,
  Links,
  Scenes,
  Talks
} from "./pages";

import Theme from "./component/theme";

function App() {
  return (
    <BrowserRouter>
      <Theme />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/clubs">
          <Clubs />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/talks">
          <Talks />
        </Route>
        <Route path="/links">
          <Links />
        </Route>
        <Route path="/scenes">
          <Scenes />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
