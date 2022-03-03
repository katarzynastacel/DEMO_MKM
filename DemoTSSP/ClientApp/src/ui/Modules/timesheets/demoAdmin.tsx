import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { LivePanel } from "./admin/LivePanel";
import { AdminTimesheetsGeneral } from "../timesheets/admin/mainTab";
import { SendMeEmail } from "../../../helpers/sendMeInfoMessage";
import { ActivityCalendar } from "../timesheets/admin/activityCalendar";
interface IComponentProps {
  className?: string;
}

enum CurrentActiveTab {
  GENEREAL = "GENERAL",
  LIVEPANEL = "LIVEPANEL",
  ACTIVITY_CALENDAR = "ACTIVITY_CALENDAR",
}

const Component: React.FunctionComponent<IComponentProps> = (
  props: IComponentProps
) => {
  const [currentActive, setCurrentActive] = useState<CurrentActiveTab>(
    CurrentActiveTab.GENEREAL
  );
  /*   useEffect(() => {
    SendMeEmail(
      "Ktos wlasnie otworzyl demo ze strony i oglada ewidencja czasu pracy demo ADMIN"
    );
  }, []); */
  const HandleTabClick = (type: CurrentActiveTab) => {
    return () => {
      setCurrentActive(type);
    };
  };

  return (
    <div className={props.className}>
      <br />
      <div className="tabs is-centered">
        <ul>
          <li
            onClick={HandleTabClick(CurrentActiveTab.GENEREAL)}
            className={` ${
              currentActive == CurrentActiveTab.GENEREAL ? "is-active" : ""
            } `}
          >
            <a>Main</a>
          </li>

          <li
            onClick={HandleTabClick(CurrentActiveTab.LIVEPANEL)}
            className={`live ${
              currentActive == CurrentActiveTab.LIVEPANEL ? "is-active" : ""
            } `}
          >
            <a className="">
              Na żywo{" "}
              <div className="ring-container">
                <div className="ringring"></div>
                <div className="circle"></div>
              </div>
            </a>
          </li>

          <li
            onClick={HandleTabClick(CurrentActiveTab.ACTIVITY_CALENDAR)}
            className={` ${
              currentActive == CurrentActiveTab.ACTIVITY_CALENDAR
                ? "is-active"
                : ""
            } `}
          >
            <a>Kalendarz Aktywnosci</a>
          </li>
        </ul>
      </div>
      {currentActive === CurrentActiveTab.LIVEPANEL && <LivePanel />}
      {currentActive === CurrentActiveTab.GENEREAL && (
        <AdminTimesheetsGeneral />
      )}

      {currentActive === CurrentActiveTab.ACTIVITY_CALENDAR && (
        <ActivityCalendar />
      )}
    </div>
  );
};

export const AdminTimesheet = styled(Component)`
  .live {
    position: relative;
  }
  .ring-container {
    position: absolute;
    top: 5px;
    right: 0;
  }

  .circle {
    width: 12px;
    height: 12px;
    background-color: red;
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 50%;
  }
`;
export default AdminTimesheet;
