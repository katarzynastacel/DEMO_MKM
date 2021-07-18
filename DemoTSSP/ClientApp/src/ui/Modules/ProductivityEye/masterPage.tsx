import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { SendMeEmail } from "../../../helpers/sendMeInfoMessage";
import { ConnectedUsers } from "./components/connectedUsers";
import { ReportDashboard } from "./components/reportDashboard";
import { SettingsComponent } from "./components/settings";
import { SoftwareDownloadComponent } from "./components/softwareDownload";
interface IComponentProps {
  className?: string;
}

enum CurrentActiveTab {
  SOFTWARE_DOWNLOAD,
  CONNECTED_COMPUTERS,
  PRODUCTIVITY_SETTINGS,
  REPORT,
}

const Component: React.FunctionComponent<IComponentProps> = (
  props: IComponentProps
) => {
  const [currentActive, setCurrentActive] = useState<CurrentActiveTab>(
    CurrentActiveTab.REPORT
  );

  useEffect(() => {
    SendMeEmail("Ktos wlasnie otworzyl demo Kontrola komputera pracownika");
  }, []);

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
            onClick={HandleTabClick(CurrentActiveTab.SOFTWARE_DOWNLOAD)}
            className={` ${
              currentActive == CurrentActiveTab.SOFTWARE_DOWNLOAD
                ? "is-active"
                : ""
            } `}
          >
            <a>Software</a>
          </li>
          <li
            onClick={HandleTabClick(CurrentActiveTab.CONNECTED_COMPUTERS)}
            className={` ${
              currentActive == CurrentActiveTab.CONNECTED_COMPUTERS
                ? "is-active"
                : ""
            } `}
          >
            <a>Moje Komputery</a>
          </li>
          <li
            onClick={HandleTabClick(CurrentActiveTab.REPORT)}
            className={` ${
              currentActive == CurrentActiveTab.REPORT ? "is-active" : ""
            } `}
          >
            <a>Raport</a>
          </li>
          <li
            onClick={HandleTabClick(CurrentActiveTab.PRODUCTIVITY_SETTINGS)}
            className={` ${
              currentActive == CurrentActiveTab.PRODUCTIVITY_SETTINGS
                ? "is-active"
                : ""
            } `}
          >
            <a>Ustawienia</a>
          </li>
        </ul>
      </div>

      {currentActive === CurrentActiveTab.SOFTWARE_DOWNLOAD && (
        <SoftwareDownloadComponent />
      )}

      {currentActive === CurrentActiveTab.CONNECTED_COMPUTERS && (
        <ConnectedUsers />
      )}

      {currentActive === CurrentActiveTab.REPORT && <ReportDashboard />}

      {currentActive === CurrentActiveTab.PRODUCTIVITY_SETTINGS && (
        <SettingsComponent />
      )}
    </div>
  );
};

export const ProductivityMasterPage = styled(Component)`
  font-size: 1.6rem;

  .input {
    font-size: 1.6rem !important;
  }
`;
export default ProductivityMasterPage;
