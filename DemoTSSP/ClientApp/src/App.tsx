import "bulma/css/bulma.css";
import React, { useState, lazy } from "react";
import { Link, Route } from "react-router-dom";
import "./custom.css";
import { DemoTabs } from "./ui/Modules/shared/demoTabs";

const DEMO_ADMINClockInAdminPage = lazy(
  () => import("./ui/Modules/clockIn/demoAdmin")
);

interface IAppProps {
  className?: string;
}
export const App: React.FunctionComponent<IAppProps> = (props: IAppProps) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <Route exact path="/">
        <>
          <p>Witaj w demo mkm wybierz modul</p>

          <ul className="li">
            <Link to="/demo/clock-in/admin">Ewidencja Czasu pracy - ADMIN</Link>
          </ul>
          <ul className="li"></ul>
        </>
      </Route>

      <Route exact path="/demo/clock-in/admin">
        <>
          <DemoTabs currentActive={1} />
          <DEMO_ADMINClockInAdminPage />
        </>
      </Route>
    </>
  );
};
