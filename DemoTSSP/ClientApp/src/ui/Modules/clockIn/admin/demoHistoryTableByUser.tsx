import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Spinner } from "../../shared/spinner";

interface IComponent {
  className?: string;
  currentStep: number;
}

enum EmployeeStatus {
  IN_WORK = "IN_WORK",
  FINISHED = "FINISHED",
  NOT_IN_WORK = "NOT_IN_WORK",
  HOLIDAY = "HOLIDAY",
}

export enum LocationType {
  WORKSTART = "WORKSTART",
  WORKEND = "WORKEND",
}

export const Component: React.FunctionComponent<IComponent> = (
  props: IComponent
) => {
  const [isLoading] = useState(false);
  const [modes] = useState<string[]>([
    "Ostatnie 7 dni",
    "Ostatnie 14 dni",
    "Ostatnie 30 dni",
    "Ostatnie 60 dni",
    "Ostatnie 90 dni",
  ]);
  const [includeWeekends] = useState<string[]>(["NIE", "TAK"]);
  const [selectedUser, setSelectedUser] = useState("Jan Kowalski");

  const [data, setData] = useState<any[]>([
    {
      date: "12/03/2021",
      endOfTheDayComment: "",
      finishLocation: " loc",
      id: 1,
      startLocation: "loc",
      status: "FINISHED",
      totaWorkTime: "04:30:00",
      totalTimeOnBreak: "00:30:00",
      workStartedAt: "08:00:00",
      workfinishedAt: "12:30:00",
    },
    {
      date: "11/03/2021",
      endOfTheDayComment: "",
      finishLocation: " loc",
      id: 2,
      startLocation: "loc",
      status: "FINISHED",
      totaWorkTime: "05:15:00",
      totalTimeOnBreak: "00:30:00",
      workStartedAt: "07:30:00",
      workfinishedAt: "12:45:00",
    },
    {
      date: "10/03/2021",
      endOfTheDayComment: "",
      finishLocation: " loc",
      id: 3,
      startLocation: "loc",
      status: "FINISHED",
      totaWorkTime: "04:45:00",
      totalTimeOnBreak: "00:30:00",
      workStartedAt: "08:35:00",
      workfinishedAt: "12:40:00",
    },
    {
      date: "09/03/2021",
      endOfTheDayComment: "",
      finishLocation: " loc",
      id: 4,
      startLocation: "loc",
      status: "FINISHED",
      totaWorkTime: "05:00:00",
      totalTimeOnBreak: "00:30:00",
      workStartedAt: "08:00:00",
      workfinishedAt: "13:00:00",
    },
    {
      date: "08/03/2021",
      endOfTheDayComment: "",
      finishLocation: " loc",
      id: 5,
      startLocation: "loc",
      status: "FINISHED",
      totaWorkTime: "04:30:00",
      totalTimeOnBreak: "00:30:00",
      workStartedAt: "08:00:00",
      workfinishedAt: "12:30:00",
    },
  ]);
  const [isReady, setIsReady] = useState(false);
  const getStatusTemplate = (value: string) => {
    switch (value) {
      case EmployeeStatus.FINISHED:
        return <div className="clockin-filter-box2">Zakończył Prace</div>;

      case EmployeeStatus.IN_WORK:
        return <div className="clockin-filter-box3">Pracuje</div>;

      case EmployeeStatus.NOT_IN_WORK:
        return <div className="clockin-filter-box4">Nieobecny</div>;

      case EmployeeStatus.HOLIDAY:
        return <div className="clockin-filter-box5">Urlop</div>;
    }
  };

  useEffect(() => {
    if (props.currentStep === 8) {
      setIsReady(true);
    }
  }, [props.currentStep]);

  return (
    <div className={`${props.className}`}>
      <div className="dropdowns-container fadein ride-step7">
        <div className="employee-dropdown-container">
          <div className="is-size-3">
            <i className="fas fa-user-tie"></i>
          </div>
          <div>
            <label className="label">Wybierz Pracownika</label>
            <div className="control-pane">
              <div className="control-section">
                <div id="template">
                  <DropDownListComponent
                    placeholder="Jan Kowalski"
                    width={250}
                    allowFiltering={true}
                    showClearButton={false}
                    popupHeight="270px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {selectedUser != "" && (
          <div className="employee-dropdown-container fadein">
            <div className="is-size-3">
              <i className="fas fa-hourglass-half"></i>
            </div>
            <div>
              <label className="label">Wybierz Okres</label>
              <div className="control-pane">
                <div className="control-section">
                  <div id="template">
                    <DropDownListComponent
                      dataSource={modes}
                      width={250}
                      allowFiltering={true}
                      showClearButton={false}
                      placeholder="Wybierz okres czasu"
                      value={modes[0]}
                      popupHeight="270px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedUser != "" && (
          <div className="employee-dropdown-container fadein">
            <div className="is-size-3">
              <i className="far fa-question-circle"></i>
            </div>
            <div>
              <label className="label">Pokaż Soboty/Niedziele</label>
              <div className="control-pane">
                <div className="control-section">
                  <div id="template">
                    <DropDownListComponent
                      dataSource={includeWeekends}
                      width={250}
                      allowFiltering={true}
                      showClearButton={false}
                      placeholder="Pokaz Soboty/Niedziele"
                      value={includeWeekends[0]}
                      popupHeight="270px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedUser != "" && (
          <button
            onClick={() => setIsReady(true)}
            className={`fadein button is-medium is-primary confirm-button ride-step8 ${
              isLoading == true ? "is-loading" : ""
            } `}
          >
            Wykonaj
          </button>
        )}
      </div>

      {isLoading && <Spinner label="Przygotowywanie danych..." />}

      {isReady && (
        <div>
          <div className="filters fadein">
            <div className="clock-in-filter-text">
              <p>Filter</p>
            </div>

            <div className="clockin-filter-box2">
              <i className="fas fa-business-time filter-icon"></i>
            </div>
            <div className="clockin-filter-box3">
              <i className="fas fa-laptop filter-icon"></i>
            </div>
            <div className="clockin-filter-box4">
              <i className="fas fa-bed filter-icon"></i>
            </div>

            <div className="clear-filter">
              <i className="fas fa-times"></i>
            </div>
          </div>
          <br />
          <div className="search-by-name is-pulled-right">
            <input className="input search" placeholder="WPISZ DATE"></input>
          </div>
          <br /> <br />
          <div className="table-wrapper">
            {!isLoading && (
              <table className="table is-striped is-hoverable fadein ride-step9">
                <thead className="thead">
                  <tr className="tr">
                    <th className="th">
                      <i className="far fa-user"></i> Data
                    </th>
                    <th className="th">
                      <i className="far fa-address-card"></i> Status
                    </th>
                    <th className="th">
                      {" "}
                      <i className="far fa-clock"></i> Rozpoczęcie
                    </th>
                    {
                      <th className="th">
                        {" "}
                        <i className="fas fa-street-view"></i> Lokalizacja
                      </th>
                    }
                    <th className="th">
                      {" "}
                      <i className="far fa-clock"></i> Zakończenie
                    </th>
                    {
                      <th className="th">
                        <i className="fas fa-street-view"></i> Lokalizacja
                      </th>
                    }
                    <th className="th">
                      {" "}
                      <i className="far fa-clock"></i> Przepracowano
                    </th>
                    <th className="th">
                      {" "}
                      <i className="far fa-clock"></i> W tym przerwy
                    </th>
                    <th className="th">
                      {" "}
                      <i className="far fa-clock"></i> Komentarz
                    </th>
                  </tr>
                </thead>
                <tbody className="tbody">
                  {" "}
                  {data &&
                    data.map((record, index) => {
                      return (
                        <tr key={index} className="tr">
                          <td className="td">
                            <b>{record.date}</b>
                          </td>
                          <td className="td">
                            {getStatusTemplate(record.status)}
                          </td>
                          <td className="td">{record.workStartedAt}</td>

                          {record.id > 0 ? (
                            <td className="td">
                              <div id={record.id.toString()}>
                                <i className="fas fa-map-marker-alt has-text-danger is-size-3 location-icon"></i>
                              </div>
                            </td>
                          ) : (
                            <td>-</td>
                          )}

                          <td className="td">{record.workfinishedAt}</td>

                          {true ? (
                            <td className="td">
                              <div id={record.id.toString()}>
                                <i className="fas fa-map-marker-alt has-text-danger is-size-3 location-icon"></i>
                              </div>
                            </td>
                          ) : (
                            <td>-</td>
                          )}

                          <td className="td">{record.totaWorkTime}</td>
                          <td className="td">{record.totalTimeOnBreak}</td>
                          <td className="td">
                            {record.endOfTheDayComment &&
                            record.endOfTheDayComment.length > 0 ? (
                              <textarea
                                value={record.endOfTheDayComment}
                                className="textarea"
                              ></textarea>
                            ) : (
                              ""
                            )}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export const DEMO_HistoryTableByUser = styled(Component)`
  .table-wrapper {
    max-width: 100%;
    font-size: 1.6rem;
    overflow: auto !important;
  }
  .textarea {
    font-size: 1.6rem;
  }
  .dropdowns-container {
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 820px) {
      flex-direction: column;
    }

    .employee-dropdown-container {
      display: flex;
      margin-right: 2rem;

      @media screen and (max-width: 820px) {
        margin-right: 0rem;
        margin-bottom: 3.2rem;
      }

      .fa-user-tie {
        font-size: 3rem;
      }
      .control-pane {
        margin-left: 20px;

        @media screen and (max-width: 820px) {
          margin-left: 0rem;
        }
      }

      .label {
        margin-left: 20px;

        @media screen and (max-width: 820px) {
          margin-left: 0rem;
        }
      }
    }
  }

  .confirm-button {
    @media screen and (max-width: 820px) {
      width: 50%;
      font-size: 2rem !important;
      margin-bottom: 2.5rem;
    }
  }

  .search-by-name {
    width: 27.5rem;
    margin-right: 5.6rem;
    margin-top: -1rem;

    @media screen and (max-width: 820px) {
      margin-right: 0rem;
    }
  }
  .table {
    width: 95%;
    margin: 0 auto;

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
      &:hover {
        background-color: #00d1b2 !important;
        color: white;
        font-weight: 700;
      }
    }

    .location-icon {
      &:hover {
        cursor: pointer;
        transform: scale(1.35);
      }
    }

    .clockin-filter-box2 {
      padding: 1.2rem;
      display: block;
      background-color: #46ef81;
      border-radius: 3px;
      color: white;
      font-weight: 700;
    }

    .clockin-filter-box3 {
      padding: 1.2rem;
      display: block;
      background-color: #ffc17e;
      border-radius: 3px;
      color: white;
      font-weight: 700;
    }

    .clockin-filter-box4 {
      padding: 1.2rem;
      display: block;
      background-color: #ff6e6e;
      border-radius: 3px;
      color: white;
      font-weight: 700;
    }

    .clockin-filter-box5 {
      padding: 1.2rem;
      display: block;
      background-color: #b2e0ff;
      border-radius: 3px;
      color: white;
      font-weight: 700;
    }
  }

  .filters {
    margin-right: 5rem;
    display: flex;
    justify-content: flex-end;
    @media screen and (max-width: 820px) {
      margin-right: 0rem;
    }

    .clock-in-filter-text {
      font-style: italic;
      text-transform: uppercase;
      letter-spacing: 1px;
      align-self: center;
      font-size: 1.6rem;
      font-weight: 400;
      margin-right: 1.5rem;
    }

    .clear-filter {
      padding: 1rem;

      margin: 1rem 0.7rem;

      position: relative;

      &:hover {
        cursor: pointer;
        color: red;
      }
    }

    .clockin-filter-box2 {
      padding: 1rem;

      margin: 1rem 0.7rem;

      background-color: #46ef81;

      &:hover {
        transform: translateY(-0.6rem);
        box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.4);
        cursor: pointer;
      }
    }

    .clockin-filter-box3 {
      padding: 1rem;

      margin: 1rem 0.7rem;

      background-color: #ffc17e;

      &:hover {
        transform: translateY(-0.6rem);
        box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.4);
        cursor: pointer;
      }
    }

    .clockin-filter-box4 {
      padding: 1rem;

      margin: 1rem 0.7rem;

      background-color: #ff6e6e;

      &:hover {
        transform: translateY(-0.6rem);
        box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.4);
        cursor: pointer;
      }
    }

    .filter-icon {
      font-size: 1.6rem;
      color: white;
      opacity: 0.4;
    }
  }

  .circle-stat-container {
    position: absolute;
    top: 6rem;
    left: 4rem;
  }

  .circle-component-success {
    margin: 0 auto;
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    border: 0.6rem solid #00d1b2;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    font-size: 2.6rem;
  }
`;
export default DEMO_HistoryTableByUser;
