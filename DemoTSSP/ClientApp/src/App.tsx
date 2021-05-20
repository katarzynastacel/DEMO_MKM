import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { FetchData } from "./components/FetchData";
import { Counter } from "./components/Counter";

import "./custom.css";

interface IAppProps {
  className?: string;
}
const App: React.FunctionComponent<IAppProps> = (props: IAppProps) => {
  return (
    <Layout>
      <Route exact path="/" component={Home} />
      <Route path="/counter" component={Counter} />
      <Route path="/fetch-data" component={FetchData} />
    </Layout>
  );
};
