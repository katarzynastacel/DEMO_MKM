import "bootstrap/dist/css/bootstrap.css";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { App } from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { Spinner } from "./ui/Modules/shared/spinner";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <>
    <Suspense
      fallback={<Spinner label="Agata Business Services - Loading..." />}
    >
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
