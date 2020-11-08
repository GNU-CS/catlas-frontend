import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {
  Main,
  Clubs,
  About,
  Links,
  Scenes,
  Talks
} from "./Pages";

function App() {
  return (
    <BrowserRouter>
    <nav>
      <ul>
        <li>
          <Link to="/">Main</Link>
        </li>
        <li>
          <Link to="/clubs">Clubs</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/talks">Talks</Link>
        </li>
        <li>
          <Link to="/links">Links</Link>
        </li>
        <li>
          <a href="https://github.com/GNU-CS/catlas-frontend/issues">Admin</a>
        </li>
        <li>
          <Link to="/scenes">Scenes</Link>
        </li>
      </ul>
    </nav>
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
