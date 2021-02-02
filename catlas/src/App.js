import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Main, Clubs, About, Links } from "./pages";

import Theme from "./component/theme";

import Talks from "./pages/Talks";
import Auth from "./pages/Auth";
import Scenes from "./pages/Scenes";

function App() {
  return (
    <BrowserRouter>
      <Theme />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/clubs" component={Clubs} />
        <Route path="/about" component={About} />
        <Route path="/talks" component={Talks} />
        <Route path="/links" component={Links} />
        <Route path="/scenes" component={Scenes} />
        <Route path="/auth" component={Auth} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
