import React, { useState } from "react";
import styled from "styled-components";
import { GridTotalByProjectType } from "./gridByProjectAndType";
import { UserOnProjectComponent } from "./userOnProject";
import { AdminTimsheetsView } from "./adminTimesheetView";
import { TimeSheetSubmittions } from "./timesheetStatus";
import { GridTotalByProjectUser } from "./gridByProjectUser";

interface IComponent {
  className?: string;
}

enum CurrentActiveTab {
  GRIDPROJECTUSER = "GRIDPROJECTUSER",
  GRIDPROJECTTYPE = "GRIDPROJECTTYPE",
  PROJECTEMPLOYEE = "PROJECTEMPLOYEE",
  TIMESHEET = "TIMESHEET",
  TIMESHEETSTATUS = "TIMESHEETSTATUS",
  NOPERMISSIONSFOUND = "NOPERMISSIONSFOUND",
}

const Component: React.FunctionComponent<IComponent> = (props: IComponent) => {
  const [currentActive, setCurrentActive] = useState<CurrentActiveTab>(
    CurrentActiveTab.GRIDPROJECTUSER
  );

  const HandleTabClick = (type: CurrentActiveTab) => {
    return () => {
      setCurrentActive(type);
    };
  };

  return (
    <div className={props.className}>
      <h1 className="has-text-primary stats-header has-text-centered">
        Raporty/Statystyki
      </h1>

      <div className="tabs is-centered">
        <ul>
          <li
            onClick={HandleTabClick(CurrentActiveTab.GRIDPROJECTUSER)}
            className={` ${
              currentActive == CurrentActiveTab.GRIDPROJECTUSER
                ? "is-active"
                : ""
            } `}
          >
            <a>Projekty/Pracownicy</a>
          </li>

          <li
            onClick={HandleTabClick(CurrentActiveTab.GRIDPROJECTTYPE)}
            className={` ${
              currentActive == CurrentActiveTab.GRIDPROJECTTYPE
                ? "is-active"
                : ""
            } `}
          >
            <a>Projekty/Kategorie</a>
          </li>

          <li
            onClick={HandleTabClick(CurrentActiveTab.PROJECTEMPLOYEE)}
            className={` ${
              currentActive == CurrentActiveTab.PROJECTEMPLOYEE
                ? "is-active"
                : ""
            } `}
          >
            <a>Projekt/Pracownik</a>
          </li>

          <li
            onClick={HandleTabClick(CurrentActiveTab.TIMESHEET)}
            className={` ${
              currentActive == CurrentActiveTab.TIMESHEET ? "is-active" : ""
            } `}
          >
            <a>Godziny Pracownika</a>
          </li>

          <li
            onClick={HandleTabClick(CurrentActiveTab.TIMESHEETSTATUS)}
            className={` ${
              currentActive == CurrentActiveTab.TIMESHEETSTATUS
                ? "is-active"
                : ""
            } `}
          >
            <a>Status Zatwierdzenia</a>
          </li>
        </ul>
      </div>

      <div>
        {currentActive == CurrentActiveTab.GRIDPROJECTUSER && (
          <GridTotalByProjectUser />
        )}
        {currentActive == CurrentActiveTab.GRIDPROJECTTYPE && (
          <GridTotalByProjectType />
        )}

        {currentActive == CurrentActiveTab.PROJECTEMPLOYEE && (
          <UserOnProjectComponent />
        )}

        {currentActive == CurrentActiveTab.TIMESHEET && <AdminTimsheetsView />}
        {currentActive == CurrentActiveTab.TIMESHEETSTATUS && (
          <TimeSheetSubmittions />
        )}
      </div>
    </div>
  );
};

export const AdminTimesheetsGeneral = styled(Component)`
  .tabs a {
    border-bottom-color: #00d1b2 !important;
  }
  .tabs li.is-active a {
    border-bottom-color: #00d1b2 !important;
    color: white !important;
    background-color: #00d1b2;
  }
  .tabs ul {
    border-bottom-color: #00d1b2 !important;
  }
  .stats-header {
    font-size: 3rem;

    @media screen and (max-width: 850px) {
      font-size: 5rem;
      margin: 2rem 0rem;
    }
  }
`;
export default AdminTimesheetsGeneral;
