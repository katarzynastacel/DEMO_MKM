import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
//@ts-ignore
import socialMedia from "../icons/socialMedia.PNG";
import { MonitoringSettings } from "./settingsMonitoring";
interface IComponentProps {
  className?: string;
}
enum CurrentActiveTab {
  PRODUCTIVITY_SETTING,
  TRACKING_SETTINGS,
}

interface ISettingResponse {
  productiveApps: string;
  productiveWebsites: string;
  badWebsites: string;
}

const Component: React.FunctionComponent<IComponentProps> = (
  props: IComponentProps
) => {
  const [inputValue, setInputValue] = useState("");
  const [productiveApps, setProductiveApps] = useState<string[]>([
    "Teams",
    "Autocad",
    "Zoom",
    "Excel",
    "Slack",
    "Adobe",
    "Word",
    "Skype",
    "Google Meet",
  ]);
  const [productiveWebsites, setProductiveWebsites] = useState<string[]>([
    "Wikipedia",
    "Gmail",
    "Linkedin",
  ]);
  const [badWebsites, setBadWebsites] = useState<string[]>([
    "xxx",
    "job search",
    "copy company data",
  ]);
  const [currentActive, setCurrentActive] = useState<CurrentActiveTab>(
    CurrentActiveTab.PRODUCTIVITY_SETTING
  );

  const HandleClick = () => {
    alert("Registration Required");
  };

  const ListViewTemplate = (value: string, type: string) => {
    return (
      <div className="list-component-container">
        <p>{value}</p>
        <p className="has-text-danger" onClick={HandleClick}>
          <i className="fas fa-trash-alt"></i>
        </p>
      </div>
    );
  };

  const HandleTabClick = (type: CurrentActiveTab) => {
    return () => {
      setCurrentActive(type);
    };
  };

  return (
    <div className={props.className}>
      <div className="tabs is-centered">
        <ul>
          <li
            onClick={HandleTabClick(CurrentActiveTab.PRODUCTIVITY_SETTING)}
            className={` ${
              currentActive == CurrentActiveTab.PRODUCTIVITY_SETTING
                ? "is-active"
                : ""
            } `}
          >
            <a>Productivity</a>
          </li>
          <li
            onClick={HandleTabClick(CurrentActiveTab.TRACKING_SETTINGS)}
            className={` ${
              currentActive == CurrentActiveTab.TRACKING_SETTINGS
                ? "is-active"
                : ""
            } `}
          >
            <a>Monitoring</a>
          </li>
        </ul>
      </div>
      {currentActive === CurrentActiveTab.TRACKING_SETTINGS && (
        <MonitoringSettings />
      )}

      {currentActive === CurrentActiveTab.PRODUCTIVITY_SETTING && (
        <>
          <p className="has-text-centered heading-info-text-primary">
            Define productivity
          </p>

          <div className="icons-container-header box">
            <div className="image-container">
              <img
                alt="clock in image"
                className="module-image"
                src={socialMedia}
              />
            </div>
          </div>

          <div className="settings-container">
            <div className="box">
              <p className="is-pulled-right">
                <i className="fas fa-info"></i>
              </p>

              <p>
                <b>Productive Applications</b>
              </p>
              <br />
              <div className="columns">
                <div className="column is-11">
                  <input
                    placeholder="Excel, Skype, Word, Teams, AutoCad, Adobe, Slack"
                    className="input"
                  />
                </div>
                <div className="column is-1">
                  <button onClick={HandleClick} className="button is-info">
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>
              <div className="list-wrapper">
                {productiveApps.map((r) => {
                  return ListViewTemplate(r, "productiveApps");
                })}
              </div>
            </div>
            <div className="box">
              <p className="is-pulled-right">
                <i className="fas fa-info"></i>
              </p>
              <p>
                <b>Productive Websites</b>
              </p>
              <br />
              <div className="columns">
                <div className="column is-11">
                  <input
                    placeholder="Wikipedia, Gmail, Linkedin"
                    className="input"
                  />
                </div>
                <div className="column is-1">
                  <button onClick={HandleClick} className="button is-info">
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>
              <div className="list-wrapper">
                {productiveWebsites.map((r) => {
                  return ListViewTemplate(r, "productiveWebs");
                })}
              </div>
            </div>
            <div className="box">
              <p className="is-pulled-right">
                <i className="fas fa-info"></i>
              </p>
              <p>
                <b>Social Media</b>
              </p>
              <br />
              <div className="columns">
                <div className="column is-11">
                  <input
                    placeholder="Facebook, Youtube, Avon, Pudelek, Onet"
                    className="input"
                  />
                </div>
                <div className="column is-1">
                  <button className="button is-info">
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>
              <div className="list-wrapper">
                {[
                  "Facebook",
                  "BBC News",
                  "Ebay",
                  "Tiktok",
                  "Youtube",
                  "Instagram",
                ].map((r) => {
                  return ListViewTemplate(r, "socialMedia");
                })}
              </div>
            </div>
            <div className="box">
              <p className="is-pulled-right">
                <i className="fas fa-info"></i>
              </p>
              <p>
                <b>Forbidden Phrases</b>
              </p>
              <br />
              <div className="columns">
                <div className="column is-11">
                  <input placeholder="......." className="input" />
                </div>
                <div className="column is-1">
                  <button onClick={HandleClick} className="button is-info">
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>

              <div className="list-wrapper">
                {badWebsites.map((r) => {
                  return ListViewTemplate(r, "badWebs");
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export const SettingsComponent = styled(Component)`
  padding: 10px;
  min-height: 90vh;

  .settings-container {
    display: flex;
    flex-wrap: wrap;
    max-height: 550px;
    .box {
      flex: 1;
      margin: 10px;
      min-height: 550px;
      min-width: 300px;
      position: relative;

      .fa-plus {
        width: 100%;
      }
    }
  }
  .list-wrapper {
    overflow: auto;
    max-height: 430px;
  }

  .icons-container-header {
    display: flex;
    flex-direction: column;
    margin: 10px;
    min-height: 100px;

    .icons-container-header-sub {
      display: flex;
      justify-content: space-between;
    }
    .icons-container-header-sub2 {
      display: flex;
      justify-content: space-space-evenly;
    }
  }

  .image-container {
    width: 100%;
    height: 100%;
  }

  .fa-info {
    &:hover {
      font-size: 2.5rem;
      cursor: pointer;
    }
  }

  .list-component-container {
    display: flex;
    justify-content: space-between;
    padding: 7px;
    .fa-trash-alt {
      &:hover {
        transform: scale(1.3);
        cursor: pointer;
      }
    }
    &:hover {
      background-color: lightgray;
    }
  }

  .is-info {
    width: -webkit-fill-available;
    min-width: 30px;
  }
`;
