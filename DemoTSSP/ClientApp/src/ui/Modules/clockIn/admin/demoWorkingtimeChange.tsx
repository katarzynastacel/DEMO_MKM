import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import {
  Aggregate,
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
  PdfExport,
  Reorder,
  Resize,
  Sort,
  Toolbar,
} from "@syncfusion/ej2-react-grids";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

interface IData {
  clockInOutID: number;
  comment: string;
  dateToChange: string;
  newEndTime: string;
  newStartTime: string;
  previousEndTime: string;
  previousStartTime: string;
  requestID: number;
  userName: string;
  entryTime: Date;
}

interface IDataHistory {
  clockInOutID: number;
  comment: string;
  dateToChange: string;
  newEndTime: string;
  newStartTime: string;
  previousEndTime: string;
  previousStartTime: string;
  requestID: number;
  userName: string;
  entryTime: Date;
  approvedBy: string;
  approvedDate: Date;
  status: string;
}

interface IComponentProps {
  className?: string;
  currentStep: number;
}

enum CurrentActiveTab {
  PENDINGREQUESTS = "PENDINGREQUESTS",
  REQUESTSHISTORY = "REQUESTSHISTORY",
  NOPERMISSIONSFOUND = "NOPERMISSIONSFOUND",
}

let filterSettings: any = { mode: "Immediate", type: "Excel" };

let toolbarOptions: any = ["Search", "ExcelExport", "CsvExport"];
const pageOptions: PageSettingsModel = {
  pageSizes: ["10", "25", "50", "100", "200", "500"],
  pageSize: 50,
};

const Component: React.FunctionComponent<IComponentProps> = (
  props: IComponentProps
) => {
  const [currentActive, setCurrentActive] = useState<CurrentActiveTab>(
    CurrentActiveTab.PENDINGREQUESTS
  );
  const [dataHistory, setDataHistory] = useState<IDataHistory[]>([]);
  const [data, setData] = useState<IData[]>([
    {
      clockInOutID: 1,
      comment: "Wyszedłem z pracy szybciej i zapomniałem się odbić",
      dateToChange: "12/03/2021",
      entryTime: new Date(),
      userName: "Jan Kowalsk",
      requestID: 123,
      previousStartTime: "08:00:00",
      newStartTime: "-",
      previousEndTime: "19:00:00",
      newEndTime: "15:00:00",
    },
  ]);

  useEffect(() => {
    if (props.currentStep === 13) {
      setData([]);
    }
    if (props.currentStep === 15) {
      setCurrentActive(CurrentActiveTab.REQUESTSHISTORY);
    }

    if (props.currentStep === 17) {
      setDataHistory([
        {
          clockInOutID: 1,
          comment: "Wyszedłem z pracy szybciej i zapomniałem się odbić",
          dateToChange: "19/11/2021",
          entryTime: new Date(),
          userName: "Jan Kowalski",
          requestID: 123,
          previousStartTime: "08:00:00",
          newStartTime: "-",
          previousEndTime: "19:00:00",
          newEndTime: "15:00:00",
          approvedBy: "Karol Kowalski",
          approvedDate: new Date(),
          status: "zatwierdzony",
        },

        {
          clockInOutID: 1,
          comment: "Lorem Ipsum",
          dateToChange: "12/03/2021",
          entryTime: new Date(),
          userName: "Kamil Kowalski",
          requestID: 123,
          previousStartTime: "08:00:00",
          newStartTime: "-",
          previousEndTime: "15:00:00",
          newEndTime: "16:00:00",
          approvedBy: "Karol Kowalski",
          approvedDate: new Date(),
          status: "zatwierdzony",
        },

        {
          clockInOutID: 1,
          comment: "Lorem Ipsum",
          dateToChange: "14/02/2021",
          entryTime: new Date(),
          userName: "Marcin Kowalski",
          requestID: 123,
          previousStartTime: "12:00:00",
          newStartTime: "-",
          previousEndTime: "17:30:00",
          newEndTime: "15:00:00",
          approvedBy: "Karol Kowalski",
          approvedDate: new Date(),
          status: "odrzucone",
        },

        {
          clockInOutID: 1,
          comment: "Lorem Ipsum",
          dateToChange: "23/03/2021",
          entryTime: new Date(),
          userName: "Maja Kowalska",
          requestID: 123,
          previousStartTime: "07:30:22",
          newStartTime: "-",
          previousEndTime: "11:00:00",
          newEndTime: "14:25:00",
          approvedBy: "Karol Kowalski",
          approvedDate: new Date(),
          status: "zatwierdzony",
        },
        {
          clockInOutID: 1,
          comment: "Lorem Ipsum",
          dateToChange: "11/01/2021",
          entryTime: new Date(),
          userName: "Marcin Kowalska",
          requestID: 123,
          previousStartTime: "09:30:22",
          newStartTime: "-",
          previousEndTime: "14:00:00",
          newEndTime: "14:25:00",
          approvedBy: "Maja Kowalski",
          approvedDate: new Date(),
          status: "zatwierdzony",
        },
        {
          clockInOutID: 1,
          comment: "Lorem Ipsum",
          dateToChange: "04/04/2021",
          entryTime: new Date(),
          userName: "Kamila Kowalska",
          requestID: 123,
          previousStartTime: "11:30:00",
          newStartTime: "-",
          previousEndTime: "12:30:00",
          newEndTime: "12:55:00",
          approvedBy: "Karol Kowalski",
          approvedDate: new Date(),
          status: "zatwierdzony",
        },
        {
          clockInOutID: 1,
          comment: "Lorem Ipsum",
          dateToChange: "14/03/2021",
          entryTime: new Date(),
          userName: "Maja Kowalska",
          requestID: 123,
          previousStartTime: "07:30:22",
          newStartTime: "-",
          previousEndTime: "11:00:00",
          newEndTime: "14:25:00",
          approvedBy: "Karol Kowalski",
          approvedDate: new Date(),
          status: "zatwierdzony",
        },
      ]);
    }
  }, [props.currentStep]);
  return (
    <div className={props.className}>
      <div className="tabs is-centered">
        <ul>
          {true && (
            <li
              className={` ${
                currentActive == CurrentActiveTab.PENDINGREQUESTS
                  ? "is-active"
                  : ""
              } `}
            >
              <a>
                Oczekujące Akceptacji{" "}
                {true && (
                  <>
                    <span className="badge-notification">1</span>
                  </>
                )}
              </a>
            </li>
          )}
          {true && (
            <li
              className={`ride-step14 ${
                currentActive == CurrentActiveTab.REQUESTSHISTORY
                  ? "is-active"
                  : ""
              } `}
            >
              <a>Historia Zmian</a>
            </li>
          )}
        </ul>
      </div>

      {currentActive == CurrentActiveTab.REQUESTSHISTORY && (
        <>
          <div className="date-range-container fadein ride-step15">
            <p className="has-text-centered has-text-primary heading-info-text-primary">
              Wybierz Zakres Dat
            </p>
            <div>
              <div className="control-pane">
                <div className="control-section">
                  <div className="daterangepicker-control-section">
                    <DateRangePickerComponent
                      showClearButton={false}
                      width={500}
                      value={[new Date(), new Date()]}
                      placeholder="wybierz zakres dat..."
                      format="dd/MM/yyyy"
                    />
                  </div>
                </div>
              </div>
            </div>
            <br />
          </div>

          {dataHistory.length > 0 && (
            <div className="fadein ride-step17">
              <GridComponent
                dataSource={dataHistory}
                filterSettings={filterSettings}
                toolbar={toolbarOptions}
                allowFiltering={true}
                allowResizing={true}
                allowPaging={true}
                pageSettings={pageOptions}
                allowSorting={true}
                allowGrouping={true}
                showColumnMenu={true}
                allowExcelExport={true}
                allowPdfExport={true}
                height="600px"
              >
                <ColumnsDirective>
                  <ColumnDirective
                    field="clockInOutID"
                    headerText="id"
                    isPrimaryKey={true}
                    visible={false}
                    width="120"
                  />
                  <ColumnDirective
                    field="requestID"
                    headerText="id2"
                    visible={false}
                    width="120"
                  />
                  <ColumnDirective
                    field="userName"
                    headerText="Utworzył"
                    width="120"
                  />
                  <ColumnDirective
                    field="entryTime"
                    headerText="Czas Utworzenia"
                    width="120"
                    type="date"
                    format="dd/MM/yyyy HH:mm:ss"
                  />

                  <ColumnDirective
                    field="dateToChange"
                    headerText="Data Zmiany"
                    width="120"
                  />

                  <ColumnDirective
                    field="status"
                    headerText="Status"
                    width="120"
                  />
                  <ColumnDirective
                    field="previousStartTime"
                    headerText="Rozpoczęcie Pracy"
                    width="120"
                  />
                  <ColumnDirective
                    field="previousEnTime"
                    headerText="Zakończenie Pracy"
                    width="120"
                  />
                  <ColumnDirective
                    field="newStartTime"
                    headerText="Nowe Rozpoczęcie"
                    width="120"
                  />
                  <ColumnDirective
                    field="newEndTime"
                    headerText="Nowe Zakończenie"
                    width="120"
                  />
                  <ColumnDirective
                    field="comment"
                    headerText="Komentarz"
                    width="120"
                  />

                  <ColumnDirective
                    field="approvedBy"
                    headerText="Zatwierdzał/Odrzucał"
                    width="150"
                  />

                  <ColumnDirective
                    field="approvedDate"
                    headerText="Czas Zatwierdzenia"
                    width="120"
                    type="date"
                    format="dd/MM/yyyy HH:mm:ss"
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
                    Page,
                    Sort,
                    Resize,
                    Reorder,
                    Toolbar,
                    ColumnMenu,
                    Toolbar,
                    ColumnChooser,
                    Group,
                    ExcelExport,
                    PdfExport,
                    Aggregate,
                  ]}
                />
              </GridComponent>
            </div>
          )}
        </>
      )}

      {currentActive == CurrentActiveTab.PENDINGREQUESTS && (
        <>
          {" "}
          <div className={props.className}>
            {true && (
              <div className="date-range-container ">
                <p className="has-text-centered has-text-primary costs-text">
                  Nowe zmiany godzin pracy do akceptacji
                </p>
              </div>
            )}

            {data.length < 1 && (
              <div className="has-text-centered fadein ride-step13">
                <p className="costs-not-found-text">
                  Na chwilę obecną nie ma żadnych nowych godzin do
                  zaktualizowania
                </p>
              </div>
            )}

            <br />
            <div className="table-wrapper">
              {data && data.length > 0 && (
                <table className="table is-striped is-hoverable fadein ride-step11">
                  <thead className="thead">
                    <tr className="tr">
                      <th className="th">Pracownik</th>
                      <th className="th">Data Złożenia</th>
                      <th className="th">Data Do Zmiany</th>
                      <th className="th">Rozpoczęcie Pracy</th>
                      <th className="th">Zakończenie Pracy</th>
                      <th className="th">Nowe Rozpoczęcie</th>
                      <th className="th">Nowe Zakończenie</th>
                      <th className="th">Komentarz</th>
                      <th className="th">Decyzja</th>
                    </tr>
                  </thead>
                  <tbody className="tbody">
                    {" "}
                    {data.length > 0 &&
                      data.map((record, index) => {
                        return (
                          <tr key={index} className="tr">
                            <td className="td">Jan Kowalski</td>
                            <td className="td">12/04/2020 12:34:00</td>
                            <td className="td">
                              {record.dateToChange.substring(0, 10)}
                            </td>
                            <td className="td">{record.previousStartTime}</td>
                            <td className="td">{record.previousEndTime}</td>
                            <td className="td">{record.newStartTime}</td>
                            <td className="td">{record.newEndTime}</td>
                            <td className="td">
                              {" "}
                              {record.comment.length > 1 && (
                                <textarea
                                  rows={3}
                                  readOnly={true}
                                  className="textarea"
                                >
                                  {record.comment}
                                </textarea>
                              )}
                            </td>
                            <td className="td decision-td ride-step12">
                              <button
                                className={`button is-success cancel-holiday-button 
                   
                          `}
                              >
                                Zaakceptuj
                                <i className="fas fas fa-thumbs-up  cancel-holiday-icon"></i>
                              </button>

                              <button
                                className={`button is-danger cancel-holiday-button `}
                              >
                                Odrzuć
                                <i className="fas fa-thumbs-down  cancel-holiday-icon"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export const DEMO_WorkingHoursChangeAdmin = styled(Component)`
  .table-wrapper {
    max-width: 100%;
    overflow: auto !important;
    margin-bottom: 2rem;
  }
  .date-range-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
    flex-direction: column;

    .costs-text {
      font-style: italic;
      font-size: 4rem;
      margin-bottom: 2rem;
    }
  }

  .costs-not-found-text {
    margin-top: 5rem;
    text-align: center;
    font-weight: 700;
    font-size: 3rem;
  }

  .table {
    width: 95%;
    margin: 0 auto;

    .decision-td {
      display: grid;
      .button {
        display: flex;
        justify-content: space-evenly;
        margin: 5px;
      }
    }
    .holiday-setting-td {
      position: relative;

      .holiday-setting-icon {
        position: absolute;
        top: 2px;
        left: 2px;

        &:hover {
          cursor: pointer;
          transform: scale(1.3);
        }
      }
    }

    .textarea {
      font-size: 1.4rem;
    }

    td {
      vertical-align: middle;
    }

    thead {
      background-color: #00d1b2 !important;
      th {
        color: white;
      }
    }

    tr {
      .table-comment-column {
        max-width: 20rem !important;
      }
      &:hover {
        background-color: #00d1b2 !important;
        color: white;
        font-weight: 700;
      }
    }
  }
`;
