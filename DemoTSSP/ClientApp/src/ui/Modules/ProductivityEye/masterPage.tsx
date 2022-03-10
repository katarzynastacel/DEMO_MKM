import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { SendMeEmail } from "../../../helpers/sendMeInfoMessage";
import { ConnectedUsers } from "./components/connectedUsers";
import { ReportDashboard } from "./components/reportDashboard";
import { SettingsComponent } from "./components/settings";
import { SoftwareDownloadComponent } from "./components/softwareDownload";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  LineSeries,
  StackingLineSeries,
  Category,
  Inject,
  Crosshair,
  DateTime,
  Legend,
  Tooltip,
  ILoadedEventArgs,
  ChartTheme,
} from "@syncfusion/ej2-react-charts";
import moment from "moment";
import { Browser } from "@syncfusion/ej2-base";
//@ts-ignore
import logo from "../ProductivityEye/icons/agatalogo.png";
//@ts-ignore
import offert from "../ProductivityEye/icons/test.jpg";
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
  const [isActive, setIsActive] = useState(true);

  /*   useEffect(() => {
    SendMeEmail("Ktos wlasnie otworzyl demo Kontrola komputera pracownika");
  }, []); */

  const HandleTabClick = (type: CurrentActiveTab) => {
    return () => {
      setCurrentActive(type);
    };
  };

  return (
    <div className={props.className}>
      <div className={`modal ${isActive ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p
              style={{ fontSize: 16, fontWeight: 700 }}
              className="modal-card-title"
            >
              {" "}
              <img
                width={100}
                alt="clock in image"
                className="module-image"
                src={logo}
              />{" "}
              Agata Business Services
            </p>
          </header>
          <section className="modal-card-body">
            <img alt="clock in image" className="module-image" src={offert} />
          </section>
          <footer className="modal-card-foot">
            <button
              onClick={() => setIsActive(false)}
              style={{ fontSize: 16 }}
              className="button is-success"
            >
              Start Demo
            </button>
          </footer>
        </div>
      </div>
      <ChartComponent
        id="demo-master-id16838"
        style={{ textAlign: "center" }}
        height={"230"}
        width={"100%"}
        primaryXAxis={{
          majorGridLines: { width: 0 },
          minorGridLines: { width: 0 },
          majorTickLines: { width: 0 },
          minorTickLines: { width: 0 },
          interval: 1,
          lineStyle: { width: 0 },
          valueType: "Category",
        }}
        primaryYAxis={{
          lineStyle: { width: 0 },
          minimum: 0,
          maximum: 100,
          interval: 20,
          majorTickLines: { width: 0 },
          majorGridLines: { width: 1 },
          minorGridLines: { width: 1 },
          minorTickLines: { width: 0 },
          labelFormat: "{value}%",
        }}
        chartArea={{ border: { width: 0 } }}
        title="Productivity last 14 days"
        tooltip={{ enable: true }}
      >
        <Inject services={[StackingLineSeries, Category, Legend, Tooltip]} />
        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={[
              {
                date: moment(new Date()).add(-14, "days").format("DD_MM_YYYY"),
                productivity: 0,
              },
              {
                date: moment(new Date()).add(-13, "days").format("DD_MM_YYYY"),
                productivity: 0,
              },
              {
                date: moment(new Date()).add(-12, "days").format("DD_MM_YYYY"),
                productivity: 0,
              },
              {
                date: moment(new Date()).add(-11, "days").format("DD_MM_YYYY"),
                productivity: 20,
              },
              {
                date: moment(new Date()).add(-10, "days").format("DD_MM_YYYY"),
                productivity: 92,
              },
              {
                date: moment(new Date()).add(-9, "days").format("DD_MM_YYYY"),
                productivity: 89,
              },
              {
                date: moment(new Date()).add(-8, "days").format("DD_MM_YYYY"),
                productivity: 77,
              },
              {
                date: moment(new Date()).add(-7, "days").format("DD_MM_YYYY"),
                productivity: 5,
              },
              {
                date: moment(new Date()).add(-6, "days").format("DD_MM_YYYY"),
                productivity: 94,
              },
              {
                date: moment(new Date()).add(-5, "days").format("DD_MM_YYYY"),
                productivity: 95,
              },
              {
                date: moment(new Date()).add(-4, "days").format("DD_MM_YYYY"),
                productivity: 98,
              },
              {
                date: moment(new Date()).add(-3, "days").format("DD_MM_YYYY"),
                productivity: 95,
              },
              {
                date: moment(new Date()).add(-2, "days").format("DD_MM_YYYY"),
                productivity: 96,
              },
              {
                date: moment(new Date()).add(-1, "days").format("DD_MM_YYYY"),
                productivity: 0,
              },
            ]}
            xName="date"
            yName="productivity"
            width={2}
            type="StackingLine"
            marker={{ visible: true }}
            dashArray="5,1"
          ></SeriesDirective>
        </SeriesCollectionDirective>
      </ChartComponent>
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
            <a>My Devices</a>
          </li>
          <li
            onClick={HandleTabClick(CurrentActiveTab.REPORT)}
            className={` ${
              currentActive == CurrentActiveTab.REPORT ? "is-active" : ""
            } `}
          >
            <a>Report</a>
          </li>
          <li
            onClick={HandleTabClick(CurrentActiveTab.PRODUCTIVITY_SETTINGS)}
            className={` ${
              currentActive == CurrentActiveTab.PRODUCTIVITY_SETTINGS
                ? "is-active"
                : ""
            } `}
          >
            <a>Settings</a>
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
