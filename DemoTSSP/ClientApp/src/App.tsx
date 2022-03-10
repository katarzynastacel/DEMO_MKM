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

const ProductivityMasterPage = lazy(
  () => import("./ui/Modules/ProductivityEye/masterPage")
);

interface IAppProps {
  className?: string;
}
export const App: React.FunctionComponent<IAppProps> = (props: IAppProps) => {
  return (
    <>
      <Route exact path="/">
        <>
          <DemoTabs currentActive={8} />

          <ProductivityMasterPage />
        </>
      </Route>
    </>
  );
};
