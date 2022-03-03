import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import {
  AccumulationChartComponent,
  AccumulationDataLabel,
  AccumulationLegend,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  AccumulationTooltip,
  Category,
  ChartComponent,
  Legend,
  PieSeries,
  SeriesCollectionDirective,
  SeriesDirective,
  StackingLineSeries,
  Tooltip,
} from "@syncfusion/ej2-react-charts";
import {
  ColumnChooser,
  ColumnDirective,
  ColumnMenu,
  ColumnsDirective,
  ExcelExport,
  Filter,
  GridComponent,
  Group,
  Inject,
  Page,
  PageSettingsModel,
  Reorder,
  Resize,
  Sort,
  Toolbar,
} from "@syncfusion/ej2-react-grids";
import moment from "moment";
import React, { useState } from "react";
import Timer from "react-compound-timer";
import styled from "styled-components";
import lock from "../icons/lock.svg";
import notallowed from "../icons/notallowed.svg";
import productive from "../icons/productive.svg";
import unproductive from "../icons/unproductive.svg";
import { ProductivityClock } from "./elemetns/productivityClock";
import {
  IHeaderStatsResponse,
  ITop10Apps,
  ITop10PopularWebsites,
} from "./reportDashboard";

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

export interface UserHistoryData {
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
      name: "Twitter",
    },
    {
      totalSeconds: 1800,
      name: "Instagram",
    },
    {
      totalSeconds: 1673,
      name: "TikTok",
    },
    {
      totalSeconds: 582,
      name: "WeChat",
    },
    {
      totalSeconds: 433,
      name: "eBay",
    },
    {
      totalSeconds: 6,
      name: "BBC News",
    },
    {
      totalSeconds: 5,
      name: "Twitch",
    },
    {
      totalSeconds: 4,
      name: "Pinterest",
    },
  ]);
  const [logData, setLogData] = useState<UserHistoryData[]>([
    {
      activity:
        "chrome - Security Officer in South West London, London | Great Scotland Yard - Caterer.com - Google Chrome",
      category: "chrome ",
      time: "21:34:44",
      totalDuration: "00:00:41",
      productive: 1,
    },
    {
      activity: "chrome - Apply - Google Chrome",
      category: "chrome ",
      time: "21:35:25",
      totalDuration: "00:00:04",
      productive: 0,
    },
    {
      activity:
        "chrome - Security Officer in South West London, London | Great Scotland Yard - Caterer.com - Google Chrome",
      category: "chrome ",
      time: "21:35:29",
      totalDuration: "00:00:10",
      productive: 0,
    },
    {
      activity:
        "	chrome - Jobs in London in March 2022 | London Jobs & Vacancies - totaljobs - Google Chrome",
      category: "chrome ",
      time: "21:35:39",
      totalDuration: "00:00:06",
      productive: 0,
    },
    {
      activity:
        "chrome - Lenovo V15 Laptop AMD Athlon Silver 3050U 4GB RAM 128GB SSD 15.6 FHD Win 10 HM 195235875308 | eBay - Google Chrome",
      category: "chrome ",
      time: "21:35:45",
      totalDuration: "00:00:08",
      productive: 0,
    },
    {
      activity:
        "chrome - chrome - Electronics, Cars, Fashion, Collectibles & More | eBay - Google Chrome",
      category: "chrome ",
      time: "21:35:53",
      totalDuration: "00:00:07",
      productive: 0,
    },
    {
      activity: "chrome - ebay - Google Search - Google Chrome",
      category: "chrome ",
      time: "21:36:00",
      totalDuration: "00:00:24",
      productive: 0,
    },

    {
      activity: "chrome - London - BBC Weather - Google Chrome",
      category: "chrome ",
      time: "21:36:26",
      totalDuration: "00:00:06",
      productive: 0,
    },
    {
      activity: "chrome - BBC Weather - Home - Google Chrome",
      category: "chrome ",
      time: "21:36:32",
      totalDuration: "00:00:02",
      productive: 0,
    },
    {
      activity: "	Skype - Skype",
      category: "Skype ",
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
      activity: "SearchHost -",
      category: "searchhost ",
      time: "21:36:47",
      totalDuration: "00:00:16",
      productive: 0,
    },
    {
      activity:
        "	chrome - monitoring from cloud - Twitter Search / Twitter - Google Chrome",
      category: "chrome ",
      time: "21:37:03",
      totalDuration: "00:00:02",
      productive: 1,
    },
    {
      activity: "msteams - Teams",
      category: "teams ",
      time: "21:37:05",
      totalDuration: "00:00:04",
      productive: 1,
    },
    {
      activity:
        "chrome - Ukraine latest news: Zelensky asks Putin for talks as humanitarian crisis grows - BBC News - Google Chrome",
      category: "chrome ",
      time: "21:37:09",
      totalDuration: "00:00:11",
      productive: 1,
    },
    {
      activity: "chrome - Home - BBC News - Google Chrome",
      category: "chrome ",
      time: "21:37:20",
      totalDuration: "00:00:02",
      productive: 0,
    },
    {
      activity: "	chrome - bbc news - Google Search - Google Chrome",
      category: "chrome ",
      time: "21:37:22",
      totalDuration: "00:00:10",
      productive: 0,
    },
    {
      activity:
        "chrome - Ed Sheeran - Perfect (1 Hour Music Lyrics) - YouTube - Google Chrome",
      category: "chrome ",
      time: "21:37:32",
      totalDuration: "00:00:28",
      productive: 0,
    },
    {
      activity:
        "chrome - A Thousand Years - [ 1 HOUR ] - YouTube - Google Chrome",
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
      activity:
        "chrome - Chillout Lounge - Calm & Relaxing Background Music | Study, Work, Sleep, Meditation, Chill - YouTube - Google Chrome",
      category: "chrome ",
      time: "21:38:17",
      totalDuration: "00:00:04",
      productive: 0,
    },
    {
      activity: "chrome - BBC News search - Google Chrome",
      category: "chrome ",
      time: "21:38:21",
      totalDuration: "00:00:28",
      productive: 0,
    },
    {
      activity: "WINWORD - Word (Unlicensed Product)",
      category: "winword ",
      time: "21:38:49",
      totalDuration: "00:00:05",
      productive: 1,
    },
    {
      activity: "EXCEL - Excel (Unlicensed Product)",
      category: "excel ",
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
      activity:
        "chrome - Chillout Lounge - Calm & Relaxing Background Music | Study, Work, Sleep, Meditation, Chill - YouTube - Google Chrome",
      category: "chrome ",
      time: "21:39:33",
      totalDuration: "00:00:02",
      productive: 0,
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
              <b>Employee Demo Profile</b>
            </div>
            <ChartComponent
              id="charsgugugagasdasdts"
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
              <Inject
                services={[StackingLineSeries, Category, Legend, Tooltip]}
              />
              <SeriesCollectionDirective>
                <SeriesDirective
                  dataSource={[
                    {
                      date: moment(new Date())
                        .add(-14, "days")
                        .format("DD_MM_YYYY"),
                      productivity: 12,
                    },
                    {
                      date: moment(new Date())
                        .add(-13, "days")
                        .format("DD_MM_YYYY"),
                      productivity: 24,
                    },
                    {
                      date: moment(new Date())
                        .add(-12, "days")
                        .format("DD_MM_YYYY"),
                      productivity: 48,
                    },
                    {
                      date: moment(new Date())
                        .add(-11, "days")
                        .format("DD_MM_YYYY"),
                      productivity: 68,
                    },
                    {
                      date: moment(new Date())
                        .add(-10, "days")
                        .format("DD_MM_YYYY"),
                      productivity: 19,
                    },
                    {
                      date: moment(new Date())
                        .add(-9, "days")
                        .format("DD_MM_YYYY"),
                      productivity: 50,
                    },
                    {
                      date: moment(new Date())
                        .add(-8, "days")
                        .format("DD_MM_YYYY"),
                      productivity: 77,
                    },
                    {
                      date: moment(new Date())
                        .add(-7, "days")
                        .format("DD_MM_YYYY"),
                      productivity: 80,
                    },
                    {
                      date: moment(new Date())
                        .add(-6, "days")
                        .format("DD_MM_YYYY"),
                      productivity: 94,
                    },
                    {
                      date: moment(new Date())
                        .add(-5, "days")
                        .format("DD_MM_YYYY"),
                      productivity: 95,
                    },
                    {
                      date: moment(new Date())
                        .add(-4, "days")
                        .format("DD_MM_YYYY"),
                      productivity: 98,
                    },
                    {
                      date: moment(new Date())
                        .add(-3, "days")
                        .format("DD_MM_YYYY"),
                      productivity: 95,
                    },
                    {
                      date: moment(new Date())
                        .add(-2, "days")
                        .format("DD_MM_YYYY"),
                      productivity: 96,
                    },
                    {
                      date: moment(new Date())
                        .add(-1, "days")
                        .format("DD_MM_YYYY"),
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
            <div className="layout-container">
              <div className="header-stats-main">
                <div className="header-stats">
                  <div className="header-stat-box box">
                    <p>Productive Time</p>
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
                    <p>Forbidden Phrases</p>
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
                    <p>Unproductive Time</p>
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
                    <p>Locked Screen</p>
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
                    <b>Activity History ({logData.length})</b>
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
                        headerText="Productive"
                        template={ProductivityTemplate}
                        width="45px"
                      />

                      <ColumnDirective
                        field="time"
                        headerText="Time"
                        type="time"
                        isPrimaryKey={true}
                        width="85px"
                      />
                      <ColumnDirective
                        field="totalDuration"
                        headerText="Duration"
                        width="100px"
                      />
                      <ColumnDirective
                        field="category"
                        headerText="Category"
                        width="100px"
                      />

                      <ColumnDirective
                        field="activity"
                        headerText="Activity"
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
                    <b>TOP APPLICATIONS</b>
                  </p>
                  <hr />

                  <table className="table is-fullwidth is-striped">
                    <thead className="head">
                      <th className="th">Position</th>
                      <th className="th">Application</th>
                      <th className="th">Time</th>
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
                        title="Application's"
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
                    <b>Time in social media</b>
                  </p>
                  <hr />

                  <table className="table is-fullwidth is-striped">
                    <thead className="head">
                      <th className="th">Position</th>
                      <th className="th">Website</th>
                      <th className="th">Time</th>
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
