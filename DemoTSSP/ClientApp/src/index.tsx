import "bootstrap/dist/css/bootstrap.css";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { App } from "./App";
import registerServiceWorker from "./registerServiceWorker";

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");
const rootElement = document.getElementById("root");

ReactDOM.render(
  <>
    <Suspense fallback={<p>Przygotowywanie strony...</p>}>
      <Router>
        <Switch>
          <App />
        </Switch>
      </Router>
    </Suspense>
  </>,
  rootElement
);

registerServiceWorker();
