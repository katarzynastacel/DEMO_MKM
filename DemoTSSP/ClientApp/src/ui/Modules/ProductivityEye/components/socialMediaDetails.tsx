import {
  AccumulationChartComponent,
  AccumulationDataLabel,
  AccumulationLegend,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  AccumulationTooltip,
  PieSeries,
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
import React, { useEffect, useState } from "react";
import Timer from "react-compound-timer/build";
import styled from "styled-components";
import { UserHistoryData } from "./userProductivityModal";

interface IComponentProps {
  className?: string;
  onClose: () => void;
  name: string;
  reportMode: IReportMode;
}

export enum IReportMode {
  SocialMedia = "SocialMedia",
  UnallowedWebsites = "UnallowedWebsites",
  LockedScreen = "LockedScreen",
}

export enum IReportType {
  BadWebsites = "BW",
  LockedScreen = "L",
}

interface ITimeSpend {
  mkmID: string;
  name: string;
  totalSeconds: number;
}

interface IResponse {
  usersTimeSpend: ITimeSpend[];
  logData: UserHistoryData[];
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
  const [logData, setLogData] = useState<any[]>([]);
  const [usersOnMedia, setUsersOnMedia] = useState<ITimeSpend[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [allowPaging, setAllowPaging] = useState(true);
  const loadSocialMedia = () => {
    setLogData([
      {
        ativityStart: "11:30:55",
        totalDuration: "00:00:40",
        productive: 1,
        type: "W",
        mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
        category: props.name,
        socialMedia: props.name,
        activity: `"chrome - ${props.name} – log in or sign up - Google Chrome"`,
        userName: "Jan Kowalski",
      },
      {
        ativityStart: "12:31:50",
        totalDuration: "00:01:30",
        productive: 1,
        type: "W",
        mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
        category: props.name,
        socialMedia: props.name,
        activity: `"chrome - ${props.name} – Informacje o Maria Kowalska | ${props.name} - Google Chrome"`,
        userName: "Jan Kowalski",
      },
      {
        ativityStart: "14:12:41",
        totalDuration: "00:03:10",
        productive: 1,
        type: "W",
        mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
        category: props.name,
        socialMedia: props.name,
        activity: `"chrome - ${props.name} –  Avon najlepsze okazje! 70% Off! | ${props.name} - Google Chrome"`,
        userName: "Karolina Kowalska",
      },
      {
        ativityStart: "14:30:00",
        totalDuration: "00:05:35",
        productive: 1,
        type: "W",
        mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
        category: props.name,
        socialMedia: props.name,
        activity: `"chrome - ${props.name} –  Kryptowaluty najlepsze koparki | ${props.name} - Google Chrome"`,
        userName: "Marcin Bielik",
      },
      {
        ativityStart: "15:20:00",
        totalDuration: "00:03:35",
        productive: 1,
        type: "W",
        mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
        category: props.name,
        socialMedia: props.name,
        activity: `"chrome - ${props.name} –  Ranking gier w europie | ${props.name} - Google Chrome"`,
        userName: "Karol Janas",
      },
    ]);
    setUsersOnMedia([
      {
        totalSeconds: 335,
        mkmID: "fbf0f2192-2b22-499c-b",
        name: "Marcin Bielik",
      },
      {
        totalSeconds: 215,
        mkmID: "fbf0f2192-2b22-499c-b",
        name: "Karol Janas",
      },
      {
        totalSeconds: 190,
        mkmID: "fbf0f2192-2b22-499c-b",
        name: "Karolina Kowalska",
      },
      {
        totalSeconds: 130,
        mkmID: "fbf0f-2b22-499c-a",
        name: "Jan Kowalski",
      },
    ]);
  };

  const loadUnallowedReport = () => {
    setLogData([
      {
        ativityStart: "09:00:00",
        totalDuration: "00:03:07",
        productive: 0,
        type: "W",
        mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
        category: props.name,
        socialMedia: "Chrome",
        activity: `Chrome - Jak oszukać pracodawcę?`,
        userName: "Kamil Tryk",
      },

      {
        ativityStart: "09:03:07",
        totalDuration: "00:02:00",
        productive: 0,
        type: "W",
        mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
        category: props.name,
        socialMedia: "Chrome",
        activity: `Chrome - olx praca dla geodety warszawa`,
        userName: "Kamil Tryk",
      },
    ]);
    setUsersOnMedia([
      {
        totalSeconds: 307,
        mkmID: "fbf0f2192-2b22-499c-b",
        name: "Kamil Tryk",
      },
    ]);
  };

  const loadLockedScreenReport = () => {
    setLogData([
      {
        ativityStart: "09:00:00",
        totalDuration: "00:15:00",
        productive: 1,
        type: "W",
        mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
        category: props.name,
        socialMedia: props.name,
        activity: `System Blokada Ekranu`,
        userName: "Karolina Kowalska",
      },

      {
        ativityStart: "10:02:00",
        totalDuration: "00:03:35",
        productive: 1,
        type: "W",
        mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
        category: props.name,
        socialMedia: props.name,
        activity: `System Blokada Ekranu`,
        userName: "Karol Janas",
      },
      {
        ativityStart: "14:12:41",
        totalDuration: "00:03:10",
        productive: 1,
        type: "W",
        mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
        category: props.name,
        socialMedia: props.name,
        activity: `System Blokada Ekranu`,
        userName: "Karolina Kowalska",
      },
    ]);
    setUsersOnMedia([
      {
        totalSeconds: 1090,
        mkmID: "fbf0f2192-2b22-499c-b",
        name: "Karolina Kowalska",
      },
      {
        totalSeconds: 215,
        mkmID: "fbf0f2192-2b22-499c-b",
        name: "Karol Janas",
      },
    ]);
  };

  useEffect(() => {
    switch (props.reportMode) {
      case IReportMode.SocialMedia:
        loadSocialMedia();
        break;

      case IReportMode.UnallowedWebsites:
        loadUnallowedReport();
        break;

      case IReportMode.LockedScreen:
        loadLockedScreenReport();
        break;
    }
  }, []);
  const HandleClose = () => props.onClose();

  const toolbarClick = () => {
    return (args: any) => {
      switch (args.item.text) {
        case "PDF Export":
          gridInstance.pdfExport();
          break;
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
    if (logData) {
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
    }
  };

  return (
    <div className={props.className}>
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-card">
          <section className="modal-card-body">
            <button
              onClick={HandleClose}
              className="delete"
              aria-label="close"
            ></button>
            <div>
              <div
                style={{ textTransform: "uppercase" }}
                className="has-text-centered is-size-1 has-text-primary"
              >
                <b>Demo raport - {props.name}</b>
              </div>
              <hr />

              {logData.length > 0 && (
                <div className="columns">
                  <div className="column is-8">
                    <p className="lower-panel-header-text ">
                      <b>Historia Aktywności ({logData.length})</b>
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
                      height="600px"
                    >
                      <ColumnsDirective>
                        <ColumnDirective
                          field="userName"
                          headerText="Nazwa"
                          // template={ProductivityTemplate}
                          width="100px"
                        />

                        <ColumnDirective
                          field="ativityStart"
                          headerText="Godzina"
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
                  <div className="column is-4 ">
                    <div className="box">
                      {usersOnMedia.length > 0 && (
                        <AccumulationChartComponent
                          id="apps-chart-unique456asdf645324"
                          title="Pracownicy"
                          legendSettings={{
                            visible: true,
                            position: "Bottom",
                          }}
                          enableSmartLabels={true}
                          width={"90%"}
                          height={"90%"}
                          center={{ x: "50%", y: "50%" }}
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
                              dataSource={usersOnMedia}
                              name="Pracownicy"
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

                    <div className="box">
                      <p className="lower-panel-header-text">
                        <b>Lista Pracowników</b>
                      </p>
                      <hr />

                      <table className="table is-fullwidth is-striped">
                        <thead className="thead">
                          <th className="th">Miejsce</th>
                          <th className="th">Pracownik</th>
                          <th className="th">Czas</th>
                        </thead>
                        <tbody className="tbody">
                          {usersOnMedia.map((r, index) => {
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
                                        {/*@ts-ignore*/}
                                        <Timer
                                          formatValue={(value: any) =>
                                            `${
                                              value < 10 ? `0${value}` : value
                                            }`
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
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export const SocialMediaDetails = styled(Component)`
  .modal-card {
    width: 97vw;
    height: 97vh;
  }
  .modal-card-body {
    position: relative;

    .delete {
      position: absolute;
      top: 5px;
      right: 5px;
    }
  }

  .lower-panel-header-text {
    color: #666666;
    font-size: 20px;
    font-weight: 700;
    text-transform: uppercase;
  }
`;
export default SocialMediaDetails;
