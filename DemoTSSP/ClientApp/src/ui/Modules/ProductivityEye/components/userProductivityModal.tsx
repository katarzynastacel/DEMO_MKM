import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { ProductivityClock } from "./elemetns/productivityClock";
import productive from "../icons/productive.svg";
import unproductive from "../icons/unproductive.svg";
import notallowed from "../icons/notallowed.svg";
import lock from "../icons/lock.svg";
import Timer from "react-compound-timer";
import {
  ITop10Apps,
  ITop10PopularWebsites,
  IHeaderStatsResponse,
} from "./reportDashboard";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  DetailRow,
  Page,
  Sort,
  Edit,
  Group,
  Reorder,
  Toolbar,
  ColumnChooser,
  Resize,
  ColumnMenu,
  FilterType,
  PageSettingsModel,
  Filter,
  ExcelExport,
  AggregateColumnDirective,
  AggregateColumnsDirective,
  AggregateDirective,
  AggregatesDirective,
} from "@syncfusion/ej2-react-grids";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  AccumulationLegend,
  PieSeries,
  AccumulationTooltip,
  IAccLoadedEventArgs,
  AccumulationTheme,
  AccumulationDataLabel,
} from "@syncfusion/ej2-react-charts";

interface IComponentProps {
  className?: string;
  userName: string;
  mkmID: string;
  onClose: () => void;
  selectedDate: Date;
}

interface IReportData {
  headerStatsReport: IHeaderStatsResponse;
  top10Applications: ITop10Apps[];
  logData: UserHistoryData[];
  socialMedias: ITop10PopularWebsites[];
}

interface UserHistoryData {
  activity: string;
  category: string;
  time: string;
  totalDuration: string;
  productive: number;
}
const pageOptions: PageSettingsModel = {
  pageSizes: ["50", "100", "200", "500", "1000"],
  pageSize: 100,
};

let filterSettings: any = { mode: "Immediate", type: "Excel" };

let toolbarOptions: any = ["Search", "ExcelExport", "CsvExport"];
let gridInstance: any;
const Component: React.FunctionComponent<IComponentProps> = (
  props: IComponentProps
) => {
  const [overallProductivity] = useState<any>(92);
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
  const [socialMedia, setSocialMedia] = useState<ITop10PopularWebsites[]>([
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
  const [logData, setLogData] = useState<UserHistoryData[]>([
    {
      activity:
        "chrome - Platforma do zarządzania firmą online - Google Chrome",
      category: "chrome ",
      time: "21:34:44",
      totalDuration: "00:00:41",
      productive: 1,
    },
    {
      activity: "chrome - New Tab - Google Chrome",
      category: "chrome ",
      time: "21:35:25",
      totalDuration: "00:00:04",
      productive: 0,
    },
    {
      activity: "chrome - YouTube - Google Chrome",
      category: "chrome ",
      time: "21:35:29",
      totalDuration: "00:00:10",
      productive: 0,
    },
    {
      activity:
        "chrome - zenek martyniuk przez twe oczy zielone - YouTube - Google Chrome",
      category: "chrome ",
      time: "21:35:39",
      totalDuration: "00:00:06",
      productive: 0,
    },
    {
      activity:
        "chrome - Zenek Martyniuk (Akcent) - Przez Twe Oczy Zielone - YouTube - Google Chrome",
      category: "chrome ",
      time: "21:35:45",
      totalDuration: "00:00:08",
      productive: 0,
    },
    {
      activity:
        "chrome - Darmowe gry – graj w gry online na gry.pl - Google Chrome",
      category: "chrome ",
      time: "21:35:53",
      totalDuration: "00:00:07",
      productive: 0,
    },
    {
      activity:
        "chrome - Rush Race - Zagraj w Rush Race online na Gry.pl - Google Chrome",
      category: "chrome ",
      time: "21:36:00",
      totalDuration: "00:00:24",
      productive: 0,
    },

    {
      activity:
        "chrome - Rush Race - Zagraj w Rush Race online na Gry.pl - Google Chrome",
      category: "chrome ",
      time: "21:36:26",
      totalDuration: "00:00:06",
      productive: 0,
    },
    {
      activity: "chrome - https://intera.pl - Google Chrome",
      category: "chrome ",
      time: "21:36:32",
      totalDuration: "00:00:02",
      productive: 0,
    },
    {
      activity:
        "chrome - Alex (@alex.pasek) • Instagram photos and videos - Google Chrome",
      category: "chrome ",
      time: "21:36:34",
      totalDuration: "00:00:09",
      productive: 0,
    },
    {
      activity: "chrome - Facebook – log in or sign up - Google Chrome",
      category: "chrome ",
      time: "21:36:43",
      totalDuration: "00:00:04",
      productive: 0,
    },
    {
      activity: "chrome - Google - Google Chrome",
      category: "chrome ",
      time: "21:36:47",
      totalDuration: "00:00:16",
      productive: 0,
    },
    {
      activity: "chrome - praca dla geodetow - Google Search - Google Chrome",
      category: "chrome ",
      time: "21:37:03",
      totalDuration: "00:00:02",
      productive: 1,
    },
    {
      activity:
        "chrome - GEOFORUM - Ogłoszenia drobne - Ogłoszenia - Dam pracę - Google Chrome",
      category: "chrome ",
      time: "21:37:05",
      totalDuration: "00:00:04",
      productive: 1,
    },
    {
      activity: "chrome - praca dla geodetow - Google Search - Google Chrome",
      category: "chrome ",
      time: "21:37:09",
      totalDuration: "00:00:11",
      productive: 1,
    },
    {
      activity:
        "chrome - jak oszukac pracodawce - Google Search - Google Chrome",
      category: "chrome ",
      time: "21:37:20",
      totalDuration: "00:00:02",
      productive: 0,
    },
    {
      activity: "chrome - Jak oszukać szefa? | Kafeteria.pl - Google Chrome",
      category: "chrome ",
      time: "21:37:22",
      totalDuration: "00:00:10",
      productive: 0,
    },
    {
      activity:
        "chrome - Wirtualna Polska - Wszystko co ważne - www.wp.pl - Google Chrome",
      category: "chrome ",
      time: "21:37:32",
      totalDuration: "00:00:28",
      productive: 0,
    },
    {
      activity:
        "chrome - Pożary instalacji fotowoltaicznych. Eksperci radzą jak ich uniknąć | Gadżetomania.pl - Google Chrome",
      category: "chrome ",
      time: "21:38:00",
      totalDuration: "00:00:13",
      productive: 0,
    },
    {
      activity: "chrome - Google - Google Chrome",
      category: "chrome ",
      time: "21:38:13",
      totalDuration: "00:00:04",
      productive: 0,
    },
    {
      activity: "chrome - onet wiadomosci - Google Search - Google Chrome",
      category: "chrome ",
      time: "21:38:17",
      totalDuration: "00:00:04",
      productive: 0,
    },
    {
      activity:
        "chrome - Wiadomości - Wiadomości w Onet - Najnowsze i Najważniejsze Wiadomości z Kraju i Świata - Google Chrome",
      category: "chrome ",
      time: "21:38:21",
      totalDuration: "00:00:28",
      productive: 0,
    },
    {
      activity: "chrome - wikipedia kopernik - Google Search - Google Chrome",
      category: "chrome ",
      time: "21:38:49",
      totalDuration: "00:00:05",
      productive: 1,
    },
    {
      activity:
        "chrome - Mikołaj Kopernik – Wikipedia, wolna encyklopedia - Google Chrome",
      category: "chrome ",
      time: "21:38:54",
      totalDuration: "00:00:10",
      productive: 1,
    },
    {
      activity: "chrome - pinterest - Google Search - Google Chrome",
      category: "chrome ",
      time: "21:39:04",
      totalDuration: "00:00:06",
      productive: 0,
    },
    {
      activity: "chrome - Pinterest - Google Chrome",
      category: "chrome ",
      time: "21:39:10",
      totalDuration: "00:00:04",
      productive: 0,
    },
    {
      activity: "chrome - Untitled - Google Chrome",
      category: "chrome ",
      time: "21:39:14",
      totalDuration: "00:00:02",
      productive: 1,
    },
    {
      activity:
        "chrome - Marketing on Pinterest | Pinterest Business - Google Chrome",
      category: "chrome ",
      time: "21:39:16",
      totalDuration: "00:00:07",
      productive: 1,
    },
    {
      activity: "chrome - Pinterest - Google Chrome",
      category: "chrome ",
      time: "21:39:23",
      totalDuration: "00:00:06",
      productive: 0,
    },
    {
      activity: "chrome - Google - Google Chrome",
      category: "chrome ",
      time: "21:39:29",
      totalDuration: "00:00:04",
      productive: 1,
    },
    {
      activity: "chrome - pudelek - Google Search - Google Chrome",
      category: "chrome ",
      time: "21:39:33",
      totalDuration: "00:00:02",
      productive: 0,
    },
    {
      activity:
        "chrome - Pudelek.pl - Plotki, Gwiazdy, Sensacja - Pudelek - Google Chrome",
      category: "chrome ",
      time: "21:39:35",
      totalDuration: "00:00:20",
      productive: 0,
    },
    {
      activity:
        "chrome - Andrzej Duda i Agata Kornhauser-Duda maszerują brzegiem morza na wakacjach w Juracie (ZDJĘCIA) - Pudelek - Google Chrome",
      category: "chrome ",
      time: "21:39:55",
      totalDuration: "00:00:17",
      productive: 0,
    },
    {
      activity:
        "chrome - Platforma do zarządzania firmą online - Google Chrome",
      category: "chrome ",
      time: "21:40:12",
      totalDuration: "00:00:12",
      productive: 1,
    },
  ]);
  const [allowPaging, setAllowPaging] = useState(true);
  const [selectedDate, setSelectedDate] = useState(props.selectedDate);

  const toolbarClick = () => {
    return (args: any) => {
      switch (args.item.text) {
        case "Excel Export":
          gridInstance.excelExport();
          break;
        case "CSV Export":
          gridInstance.csvExport();
          break;
      }
    };
  };

  const onActionComplete = (event: any) => {
    switch (event.requestType) {
      case "grouping":
      case "ungrouping":
        if (gridInstance) {
          if (
            gridInstance.groupSettings.columns &&
            gridInstance.groupSettings.columns.length
          ) {
            setAllowPaging(false);
            gridInstance.groupModule.collapseAll();
          } else {
            setAllowPaging(true);
          }
        }
        break;
      case "filterchoicerequest":
        event.filterChoiceCount = logData.length;
        break;

      default:
        break;
    }
  };
  const ProductivityTemplate = (r: any) => {
    if (r.productive == 1) {
      return (
        <div>
          <img
            width="30px"
            height="30px"
            alt="clock in image"
            className="module-image"
            src={productive}
          />
        </div>
      );
    } else {
      return (
        <div>
          <img
            width="30px"
            height="30px"
            alt="clock in image"
            className="module-image"
            src={unproductive}
          />
        </div>
      );
    }
  };

  return (
    <div className={props.className}>
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-card">
          <section className="modal-card-body">
            <button
              onClick={props.onClose}
              className="delete"
              aria-label="close"
            ></button>
            <div className="date-container">
              <DatePickerComponent
                showClearButton={false}
                width={300}
                format="dd/MM/yyyy"
                value={selectedDate}
              />
            </div>
            <div
              style={{ textTransform: "uppercase" }}
              className="has-text-centered is-size-1 has-text-primary"
            >
              <b>Profil Demo Pracownika</b>
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
                <div className="lower-stat-mid-panel box">
                  <p className="lower-panel-header-text ">
                    <b>Przykładowa Historia Aktywności ({logData.length})</b>
                  </p>
                  <hr />

                  <GridComponent
                    dataSource={logData}
                    actionBegin={onActionComplete}
                    actionComplete={onActionComplete}
                    filterSettings={filterSettings}
                    toolbar={toolbarOptions}
                    ref={(grid) => (gridInstance = grid)}
                    allowFiltering={true}
                    allowResizing={true}
                    editSettings={{ allowEditing: false }}
                    allowPaging={allowPaging}
                    pageSettings={pageOptions}
                    allowSorting={true}
                    allowGrouping={true}
                    showColumnMenu={true}
                    allowExcelExport={true}
                    allowPdfExport={true}
                    toolbarClick={toolbarClick()}
                    height="500px"
                  >
                    <ColumnsDirective>
                      <ColumnDirective
                        field="productive"
                        headerText="Typ"
                        template={ProductivityTemplate}
                        width="45px"
                      />

                      <ColumnDirective
                        field="time"
                        headerText="Godzina"
                        type="time"
                        isPrimaryKey={true}
                        width="85px"
                      />
                      <ColumnDirective
                        field="totalDuration"
                        headerText="Czas Trwania"
                        width="100px"
                      />
                      <ColumnDirective
                        field="category"
                        headerText="Kategoria"
                        width="100px"
                      />

                      <ColumnDirective
                        field="activity"
                        headerText="Aktywność"
                        width="500px"
                      />
                    </ColumnsDirective>

                    <Inject
                      services={[
                        Filter,
                        Sort,
                        Resize,
                        Group,
                        Page,
                        Filter,
                        Sort,
                        Resize,
                        Reorder,
                        Toolbar,
                        ColumnMenu,
                        Toolbar,
                        ColumnChooser,
                        Group,
                        ExcelExport,
                      ]}
                    />
                  </GridComponent>
                </div>
              </div>

              <div className="apps-and-media-container">
                <div className="box">
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
                                    {/*//@ts-ignore*/}
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

                <div className="box">
                  <div className="apps-chart">
                    {top10Apps.length > 0 && (
                      <AccumulationChartComponent
                        id="apps-chart-unique4563fwwert24"
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

                  <div className="social-media-chart">
                    {top10Apps.length > 0 && (
                      <AccumulationChartComponent
                        id="apps-chart-unique954asdfd43a24"
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
                            dataSource={socialMedia.sort()}
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

                <div className="box">
                  <p className="lower-panel-header-text ">
                    <b>Czas W Social Media</b>
                  </p>
                  <hr />

                  <table className="table is-fullwidth is-striped">
                    <thead className="head">
                      <th className="th">Miejsce</th>
                      <th className="th">Aplikacja</th>
                      <th className="th">Czas</th>
                    </thead>
                    <tbody className="tbody">
                      {socialMedia.map((r, index) => {
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
                                    {/*//@ts-ignore*/}
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
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export const UserProductivityModal = styled(Component)`
  .modal-card {
    width: 99vw;
    height: 97vh;
  }
  .lower-stat-side-panel--override {
    flex: 4.8;
    margin: 5px;
  }
  .modal-card-body {
    position: relative;

    .delete {
      position: absolute;
      top: 5px;
      right: 5px;
    }
  }

  .apps-and-media-container {
    display: flex;
    flex-wrap: wrap;
    .box {
      flex: 1;
      margin: 5px;
    }
  }

  .box {
    min-width: 250px;
  }
`;
