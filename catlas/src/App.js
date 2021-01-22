import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Main, Clubs, About, Links, Talks, Scenes, Login, Register, Reset } from "./pages";

import Theme from "./component/theme";

// apply nested routing

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
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/reset">
          <Reset />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
