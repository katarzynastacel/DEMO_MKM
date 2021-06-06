import "bulma/css/bulma.css";
import React, { useState, lazy } from "react";
import { Link, Route } from "react-router-dom";
import "./custom.css";
import { DemoTabs } from "./ui/Modules/shared/demoTabs";

const AdminTimesheet = lazy(() => import("./ui/Modules/timesheets/demoAdmin"));

const DEMO_ADMINClockInAdminPage = lazy(
  () => import("./ui/Modules/clockIn/demoAdmin")
);

const DEMO_User_ClockInMasterPage = lazy(
  () => import("./ui/Modules/clockIn/demoUser")
);

const DEMOUserTimeshet = lazy(() => import("./ui/Modules/timesheets/demoUser"));

interface IAppProps {
  className?: string;
}
export const App: React.FunctionComponent<IAppProps> = (props: IAppProps) => {
  return (
    <>
      <Route exact path="/">
        <div className="has-text-centered is-size-1">
          <p>
            <b>WITAJ DEMO MKM PROFESSIONALS!</b>
          </p>

          <ul className="li">
            <Link to="/demo/clock-in/admin">Obecności online - ADMIN</Link>
          </ul>

          <ul className="li">
            <Link to="/demo/clock-in/user">Obecności online - PRACOWNIK</Link>
          </ul>
          <ul className="li">
            <Link to="/demo/timesheet/admin">
              Ewidencja Czasu pracy - ADMIN
            </Link>
          </ul>
          <ul className="li">
            <Link to="/demo/timesheet/user">
              Ewidencja Czasu pracy - PRACOWNIK
            </Link>
          </ul>
        </div>
      </Route>

      <Route exact path="/demo/clock-in/admin">
        <>
          <DemoTabs currentActive={6} />
          <DEMO_ADMINClockInAdminPage />
        </>
      </Route>
      <Route exact path="/demo/clock-in/user">
        <>
          <DemoTabs currentActive={1} />
          <DEMO_User_ClockInMasterPage />
        </>
      </Route>

      <Route exact path="/demo/timesheet/admin">
        <>
          <DemoTabs currentActive={7} />
          <AdminTimesheet />
        </>
      </Route>
      <Route exact path="/demo/timesheet/user">
        <>
          <DemoTabs currentActive={2} />
          <DEMOUserTimeshet />
        </>
      </Route>
    </>
  );
};
