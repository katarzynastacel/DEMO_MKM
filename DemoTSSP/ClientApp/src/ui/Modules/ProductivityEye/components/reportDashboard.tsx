import React, { useContext, useState, useEffect, lazy } from "react";
import styled from "styled-components";

import { ProductivityClock } from "./elemetns/productivityClock";
import productive from "../icons/productive.svg";
import unproductive from "../icons/unproductive.svg";
import notallowed from "../icons/notallowed.svg";
import lock from "../icons/lock.svg";
import Timer from "react-compound-timer";

import { UserProductivityModal } from "./userProductivityModal";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  AccumulationLegend,
  PieSeries,
  AccumulationTooltip,
  IAccLoadedEventArgs,
  Inject,
  AccumulationTheme,
  AccumulationDataLabel,
} from "@syncfusion/ej2-react-charts";

interface IComponentProps {
  className?: string;
}

interface IReportData {
  usersProductivityReport: IUserProductivityRecord[];
  headerStatsReport: IHeaderStatsResponse;
  top10Applications: ITop10Apps[];
  top10PopularWebsites: ITop10PopularWebsites[];
  mostUsedSocialMedia: IMostTimeSpendInSocialMedia[];
}

interface IMostTimeSpendInSocialMedia {
  totalSeconds: number;
  websiteName: string;
  mkmID: string;
  name: string;
}

export interface ITop10Apps {
  name: string;
  totalSeconds: number;
}

export interface ITop10PopularWebsites {
  name: string;
  totalSeconds: number;
}
export interface IHeaderStatsResponse {
  overallProductivity: number;
  totalLockedScreenSeconds: number;
  totalProductiveSeconds: number;
  totalUnallowedWebsiteSeconds: number;
  totalUnproductiveSeconds: number;
}
interface IUserProductivityRecord {
  name: string;
  overallProductivity: number;
  totalProductiveSeconds: number;
  totalUnproductiveSeconds: number;
  mkmID: string;
}
const Component: React.FunctionComponent<IComponentProps> = (
  props: IComponentProps
) => {
  const [overallProductivity] = useState<any>(74);
  const [totalProductiveSeconds, setTotalProductiveSeconds] = useState<any>(
    16392
  );
  const [totalUnproductiveSeconds, setTotalUnproductiveSeconds] = useState<any>(
    3685
  );
  const [totalLockedScreenSeconds, setTotalLockedScreenSeconds] = useState<any>(
    1954
  );
  const [
    totalUnallowedWebsiteSeconds,
    setTotalUnallowedWebsiteSeconds,
  ] = useState<any>(307);
  const [usersData, setUsersData] = useState<IUserProductivityRecord[]>([
    {
      overallProductivity: 91,
      name: "Kasia Minor",
      totalUnproductiveSeconds: 1510,
      totalProductiveSeconds: 27300,
      mkmID: "ec1926192.168.0.60_5-dd75-46a7-8",
    },
    {
      overallProductivity: 88,
      name: "Jan Kowalski",
      totalUnproductiveSeconds: 3616,
      totalProductiveSeconds: 32965,
      mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
    },
    {
      overallProductivity: 83,
      name: "Karol Bachaj",
      totalUnproductiveSeconds: 2010,
      totalProductiveSeconds: 20320,
      mkmID: "ec1926192.168.0.60_5-dd75-46a7-8",
    },

    {
      overallProductivity: 49,
      name: "Maria Treben",
      totalUnproductiveSeconds: 7900,
      totalProductiveSeconds: 15600,
      mkmID: "ec1926192.168.0.60_5-dd75-46a7-8",
    },

    {
      overallProductivity: 25,
      name: "Maciej Borek",
      totalUnproductiveSeconds: 15000,
      totalProductiveSeconds: 5000,
      mkmID: "ec1926192.168.0.60_5-dd75-46a7-8",
    },
  ]);
  const [top10Apps, setTop10Apps] = useState<ITop10Apps[]>([
    {
      totalSeconds: 21884,
      name: "chrome ",
    },
    {
      totalSeconds: 17511,
      name: "Autocad ",
    },
    {
      totalSeconds: 9800,
      name: "Excel ",
    },
    {
      totalSeconds: 7200,
      name: "Teams ",
    },
    {
      totalSeconds: 4500,
      name: "PDF Viewer ",
    },
    {
      totalSeconds: 4120,
      name: "Adobe",
    },
    {
      totalSeconds: 4320,
      name: "Dev-env",
    },
    {
      totalSeconds: 2700,
      name: "Paint",
    },
    {
      totalSeconds: 2400,
      name: "snippingtool",
    },
    {
      totalSeconds: 567,
      name: "searchapp",
    },
  ]);
  const [top10PopularWebsites, setTop10PopularWebsites] = useState<
    ITop10PopularWebsites[]
  >([
    {
      totalSeconds: 3200,
      name: "Youtube",
    },
    {
      totalSeconds: 2910,
      name: "Facebook",
    },
    {
      totalSeconds: 2200,
      name: "Pudelek",
    },
    {
      totalSeconds: 1800,
      name: "Instagram",
    },
    {
      totalSeconds: 1673,
      name: "Wirtualna Polska",
    },
    {
      totalSeconds: 582,
      name: "Allegro",
    },
    {
      totalSeconds: 433,
      name: "gry.pl",
    },
    {
      totalSeconds: 6,
      name: "Onet",
    },
    {
      totalSeconds: 5,
      name: "Interia",
    },
    {
      totalSeconds: 4,
      name: "Pinterest",
    },
  ]);
  const [mostUsedSocialMedia, setMostUsedSocialMedia] = useState<
    IMostTimeSpendInSocialMedia[]
  >([
    {
      totalSeconds: 2900,
      websiteName: "Youtube",
      mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
      name: "Jan Kowalski",
    },
    {
      totalSeconds: 2750,
      websiteName: "Facebook",
      mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
      name: "Jan Kowalski",
    },
    {
      totalSeconds: 2290,
      websiteName: "Pudelek",
      mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
      name: "Maria Kowalski",
    },
    {
      totalSeconds: 2200,
      websiteName: "Instagram",
      mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
      name: "Karolina Kowalska",
    },
    {
      totalSeconds: 1900,
      websiteName: "gry.pl",
      mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
      name: "Karol Bachaj",
    },
    {
      totalSeconds: 1876,
      websiteName: "Wirtualna Polska",
      mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
      name: "Maciej Kowalski",
    },
    {
      totalSeconds: 1500,
      websiteName: "Allegro",
      mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
      name: "Maja Kowalska",
    },
    {
      totalSeconds: 1200,
      websiteName: "Onet",
      mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
      name: "Maja Kowalska",
    },
    {
      totalSeconds: 1000,
      websiteName: "Interia",
      mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
      name: "Maja Kowalska",
    },
    {
      totalSeconds: 900,
      websiteName: "Pinterest",
      mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
      name: "Karol Bachaj",
    },
  ]);
  const [selectedUser, setSelectedUser] = useState<IUserProductivityRecord>();
  const [availableReload, setAvailableReload] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  let interval: any;

  const getProductivityTemplate = (value: number) => {
    let color = "is-success";
    if (value < 35) {
      color = "is-danger";
    }
    if (value > 35) {
      color = "is-warning";
    }
    if (value > 75) {
      color = "is-success";
    }

    return (
      <div className="has-text-centered">
        <p>
          {value} %
          <progress
            className={`progress ${color}`}
            value={value}
            max="100"
          ></progress>
        </p>
      </div>
    );
  };

  const getNameTemplate = (name: string, index: number) => {
    if (index == 0) {
      return (
        <p>
          <span style={{ color: "#ebcc34" }}>
            1) <i className="fas fa-crown"></i>
          </span>{" "}
          {name}
        </p>
      );
    }

    if (index == 1) {
      return (
        <p>
          <span style={{ color: "#c5c5c5" }}>
            2) <i className="fas fa-crown"></i>
          </span>{" "}
          {name}
        </p>
      );
    }

    if (index == 0) {
      return (
        <p>
          <span style={{ color: "#5f3b3b" }}>
            3) <i className="fas fa-crown"></i>
          </span>{" "}
          {name}
        </p>
      );
    }
    return <p>{name}</p>;
  };

  const handleUserRecordClick = (selectedUser: IUserProductivityRecord) => {
    return () => {
      setSelectedUser(selectedUser);
    };
  };
  const handleUserModalClose = () => {
    setSelectedUser(undefined);
  };

  return (
    <div className={props.className}>
      {selectedUser && (
        <UserProductivityModal
          selectedDate={selectedDate}
          mkmID={selectedUser.mkmID}
          onClose={handleUserModalClose}
          userName={selectedUser.name}
        />
      )}

      <div className="date-container">
        <DatePickerComponent
          showClearButton={false}
          width={300}
          format="dd/MM/yyyy"
          value={selectedDate}
        />
      </div>

      <div className="refresh-container">
        <button disabled={!availableReload} className="button is-info">
          <i className="fas fa-sync"></i>
        </button>
      </div>
      <div className="layout-container">
        <div className="header-stats-main">
          <div className="header-stats">
            <div className="header-stat-box box">
              <p>Produktywny Czas</p>
              <div className="icon-time-container">
                <div>
                  <img
                    width="100px"
                    height="100px"
                    alt="clock in image"
                    className="module-image"
                    src={productive}
                  />
                </div>
                <div>
                  {totalProductiveSeconds > 0 && (
                    //@ts-ignore
                    <Timer
                      formatValue={(value: any) =>
                        `${value < 10 ? `0${value}` : value}`
                      }
                      initialTime={totalProductiveSeconds * 1000}
                      startImmediately={false}
                    >
                      <Timer.Days />:
                      <Timer.Hours />:
                      <Timer.Minutes />:
                      <Timer.Seconds />
                    </Timer>
                  )}
                </div>
              </div>
            </div>
            <div className="header-stat-box box">
              <p>Czas W Zakazanych</p>
              <div className="icon-time-container">
                <div>
                  <img
                    width="100px"
                    height="100px"
                    alt="clock in image"
                    className="module-image"
                    src={notallowed}
                  />
                </div>
                <div>
                  {totalUnallowedWebsiteSeconds > 0 && (
                    //@ts-ignore
                    <Timer
                      formatValue={(value: any) =>
                        `${value < 10 ? `0${value}` : value}`
                      }
                      initialTime={totalUnallowedWebsiteSeconds * 1000}
                      startImmediately={false}
                    >
                      <Timer.Days />:
                      <Timer.Hours />:
                      <Timer.Minutes />:
                      <Timer.Seconds />
                    </Timer>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="productivity-clock-stat box">
            <ProductivityClock value={overallProductivity} />
          </div>

          <div className="header-stats">
            <div className="header-stat-box box">
              <p>Nieproduktywny Czas</p>
              <div className="icon-time-container">
                <div>
                  <img
                    width="100px"
                    height="100px"
                    alt="clock in image"
                    className="module-image"
                    src={unproductive}
                  />
                </div>
                <div>
                  {totalUnproductiveSeconds > 0 && (
                    //@ts-ignore
                    <Timer
                      formatValue={(value: any) =>
                        `${value < 10 ? `0${value}` : value}`
                      }
                      initialTime={totalUnproductiveSeconds * 1000}
                      startImmediately={false}
                    >
                      <Timer.Days />:
                      <Timer.Hours />:
                      <Timer.Minutes />:
                      <Timer.Seconds />
                    </Timer>
                  )}
                </div>
              </div>
            </div>
            <div className="header-stat-box box">
              <p>Zablokowany Ekran</p>
              <div className="icon-time-container">
                <div>
                  <img
                    width="100px"
                    height="100px"
                    alt="clock in image"
                    className="module-image"
                    src={lock}
                  />
                </div>
                <div>
                  {totalLockedScreenSeconds > 0 && (
                    //@ts-ignore
                    <Timer
                      formatValue={(value: any) =>
                        `${value < 10 ? `0${value}` : value}`
                      }
                      initialTime={totalLockedScreenSeconds * 1000}
                      startImmediately={false}
                    >
                      <Timer.Days />:
                      <Timer.Hours />:
                      <Timer.Minutes />:
                      <Timer.Seconds />
                    </Timer>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lower-stats-main">
          <div className="lower-stat-side-panel box">
            <p className="lower-panel-header-text ">
              <b>TOP 10 Aplikacji</b>
            </p>
            <hr />

            <table className="table is-fullwidth is-striped">
              <thead className="head">
                <th className="th">Miejsce</th>
                <th className="th">Aplikacja</th>
                <th className="th">Czas</th>
              </thead>
              <tbody className="tbody">
                {top10Apps.map((r, index) => {
                  return (
                    <tr className="tr">
                      <td className="td">
                        <b>{index + 1}</b>
                      </td>
                      <td className="td">{r.name}</td>
                      <td className="td">
                        <div>
                          {r.totalSeconds > 0 && (
                            <span className="tag is-info is-light">
                              {/*//@ts-ignore */}
                              <Timer
                                formatValue={(value: any) =>
                                  `${value < 10 ? `0${value}` : value}`
                                }
                                initialTime={r.totalSeconds * 1000}
                                startImmediately={false}
                              >
                                <Timer.Hours />:
                                <Timer.Minutes />:
                                <Timer.Seconds />
                              </Timer>
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="lower-stat-mid-panel box">
            <p className="lower-panel-header-text ">
              <b>Wydajność Pracowników</b>
            </p>
            <hr />

            <table className="table is-fullwidth">
              <thead className="head">
                <th className="th">Pracownik</th>
                <th className="th">Produktywny Czas</th>
                <th className="th">Nieproduktywny Czas</th>
                <th className="th">Produktywnosc</th>
              </thead>
              <tbody className="tbody">
                {usersData.map((r, index) => {
                  return (
                    <tr
                      onClick={handleUserRecordClick(r)}
                      className="tr tr-click-user"
                    >
                      <td className="td">{getNameTemplate(r.name, index)}</td>
                      <td className="td">
                        <div>
                          {r.totalProductiveSeconds > 0 && (
                            <span className="tag is-success is-light">
                              {/*@ts-ignore */}
                              <Timer
                                formatValue={(value: any) =>
                                  `${value < 10 ? `0${value}` : value}`
                                }
                                initialTime={r.totalProductiveSeconds * 1000}
                                startImmediately={false}
                              >
                                <Timer.Hours />:
                                <Timer.Minutes />:
                                <Timer.Seconds />
                              </Timer>
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="td">
                        <div>
                          {r.totalUnproductiveSeconds > 0 && (
                            <span className="tag is-light is-danger">
                              {/*@ts-ignore */}
                              <Timer
                                formatValue={(value: any) =>
                                  `${value < 10 ? `0${value}` : value}`
                                }
                                initialTime={r.totalUnproductiveSeconds * 1000}
                                startImmediately={false}
                              >
                                <Timer.Hours />:
                                <Timer.Minutes />:
                                <Timer.Seconds />
                              </Timer>
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="td has-text-centered">
                        {getProductivityTemplate(r.overallProductivity)}
                      </td>

                      <td className="td has-text-centered">
                        <button className="button is-info">Kliknij</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="lower-stat-side-panel box">
            <p className="lower-panel-header-text ">
              <b>Social Media</b>
            </p>
            <hr />

            <table className="table is-fullwidth is-striped">
              <thead className="head">
                <th className="th">Miejsce</th>
                <th className="th">Strona</th>
                <th className="th">Czas</th>
              </thead>
              <tbody className="tbody">
                {top10PopularWebsites.map((r, index) => {
                  return (
                    <tr className="tr">
                      <td className="td">
                        <b>{index + 1}</b>
                      </td>
                      <td className="td">{r.name}</td>
                      <td className="td">
                        <div>
                          {r.totalSeconds > 0 && (
                            <span className="tag is-info is-light">
                              {/*@ts-ignore */}
                              <Timer
                                formatValue={(value: any) =>
                                  `${value < 10 ? `0${value}` : value}`
                                }
                                initialTime={r.totalSeconds * 1000}
                                startImmediately={false}
                              >
                                <Timer.Hours />:
                                <Timer.Minutes />:
                                <Timer.Seconds />
                              </Timer>
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/*  ddddddddddddddddddddddddddddddddddddddddddddddddddddddddd*/}

        <div className="lower-stats-main">
          <div className="lower-stat-side-panel box">
            <div className="apps-chart">
              {top10Apps.length > 0 && (
                <AccumulationChartComponent
                  id="apps-chart-unique456a2333324"
                  title="Aplikacje"
                  legendSettings={{ visible: true }}
                  enableSmartLabels={true}
                  width={"100%"}
                  height={"100%"}
                  center={{ x: "50%", y: "50%" }}
                  //@ts-ignore
                  tooltip={{
                    enable: true,
                    //@ts-ignore
                    format: "${point.x}",
                  }}
                >
                  <Inject
                    services={[
                      AccumulationLegend,
                      PieSeries,
                      AccumulationTooltip,
                      AccumulationDataLabel,
                    ]}
                  />
                  <AccumulationSeriesCollectionDirective>
                    <AccumulationSeriesDirective
                      dataSource={top10Apps}
                      name="Aplikacja"
                      xName="name"
                      yName="totalSeconds"
                      explode={true}
                      explodeOffset="10%"
                      explodeIndex={0}
                      dataLabel={{
                        visible: true,
                        position: "Outside",
                        name: "name",
                        font: {
                          fontWeight: "600",
                        },
                      }}
                      radius="70%"
                    ></AccumulationSeriesDirective>
                  </AccumulationSeriesCollectionDirective>
                </AccumulationChartComponent>
              )}
            </div>
          </div>
          <div className="lower-stat-mid-panel box">
            <p className="lower-panel-header-text ">
              <b>Najdłużej w social media</b>
            </p>
            <hr />

            <table className="table is-fullwidth">
              <thead className="head">
                <th className="th">Strona</th>
                <th className="th">Pracownik</th>

                <th className="th">Spędzony Czas</th>
              </thead>
              <tbody className="tbody">
                {mostUsedSocialMedia.map((r, index) => {
                  return (
                    <tr
                      //onClick={handleUserRecordClick(r)}
                      className="tr tr-click-user"
                    >
                      <td className="td">{r.websiteName}</td>
                      <td className="td">{r.name}</td>

                      <td className="td">
                        <div>
                          {r.totalSeconds > 0 && (
                            <span className="tag is-success is-light">
                              {/*@ts-ignore */}
                              <Timer
                                formatValue={(value: any) =>
                                  `${value < 10 ? `0${value}` : value}`
                                }
                                initialTime={r.totalSeconds * 1000}
                                startImmediately={false}
                              >
                                <Timer.Hours />:
                                <Timer.Minutes />:
                                <Timer.Seconds />
                              </Timer>
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="lower-stat-side-panel box">
            <div className="social-media-chart">
              {top10Apps.length > 0 && (
                <AccumulationChartComponent
                  id="apps-chart-unique95445553a24"
                  title="Social Media"
                  legendSettings={{ visible: true }}
                  enableSmartLabels={true}
                  width={"100%"}
                  height={"100%"}
                  center={{ x: "50%", y: "50%" }}
                  //@ts-ignore
                  tooltip={{
                    enable: true,
                    //@ts-ignore
                    format: "${point.x}",
                  }}
                >
                  <Inject
                    services={[
                      AccumulationLegend,
                      PieSeries,
                      AccumulationTooltip,
                      AccumulationDataLabel,
                    ]}
                  />
                  <AccumulationSeriesCollectionDirective>
                    <AccumulationSeriesDirective
                      dataSource={top10PopularWebsites}
                      name="Strona"
                      xName="name"
                      yName="totalSeconds"
                      explode={true}
                      explodeOffset="10%"
                      explodeIndex={0}
                      dataLabel={{
                        visible: true,
                        position: "Outside",
                        name: "name",
                        font: {
                          fontWeight: "600",
                        },
                      }}
                      radius="70%"
                    ></AccumulationSeriesDirective>
                  </AccumulationSeriesCollectionDirective>
                </AccumulationChartComponent>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ReportDashboard = styled(Component)`
  .layout-container {
    min-height: 90vh;
    max-height: 90vh;
  }

  .header-stats-main {
    display: flex;
    flex-wrap: wrap;
  }

  .tr-click-user {
    &:hover {
      cursor: pointer;
      background-color: lightgray;
    }
  }

  .productivity-clock-stat {
    display: flex;
    justify-content: center;
    flex: 3;
    margin: 5px;
  }

  .header-stats {
    display: flex;
    min-height: 15vh;
    flex: 2;
    flex-direction: column;
    .header-stat-box {
      display: flex;
      flex-direction: column;
      flex: 1;
      margin: 5px;
      max-height: 160px;
      min-height: 160px;
      text-align: center;
      color: #666666;
      font-size: 25px;
      .icon-time-container {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        font-weight: 700;
      }
    }
  }

  .lower-stats-main {
    display: flex;
    flex-wrap: wrap;
    min-height: 55vh;

    .lower-panel-header-text {
      color: #666666;
      font-size: 20px;
      font-weight: 700;
      text-transform: uppercase;
    }
    .lower-stat-side-panel {
      flex: 8;
      margin: 5px;
    }

    .lower-stat-mid-panel {
      flex: 12.9;
      padding: 12px;
      margin: 5px;
    }
  }

  .tag {
    font-size: 1.4rem;
  }

  .refresh-container {
    display: flex;
    justify-content: flex-end;
    justify-content: space-between;
    margin: 0 20px;
    align-items: flex-end;
    flex-direction: column;
    margin-right: 10px;
  }

  .date-container {
    display: flex;
    justify-content: center;
  }

  .box {
    min-width: 250px;
  }
`;
