import React from "react";
import { Link } from "react-router-dom";

function Main() {
  return (
    <>
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
    </>
  );
}

export default Main;