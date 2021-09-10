import React, { useState } from "react";
import styled from "styled-components";

import { TimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { SwitchComponent, Button } from "@syncfusion/ej2-react-buttons";

interface IComponentProps {
  className?: string;
}

interface IMonitoringSettings {
  controlMouseKeyboard: boolean;
  mouseIdleMinutes: number;
  keyboardIdleMinutes: number;
  timeToSkip: ITimeToSkip[];
}

interface ITimeToSkip {
  startTime: string;
  endTime: string;
}

let defaultData: IMonitoringSettings = {
  controlMouseKeyboard: false,
  mouseIdleMinutes: 5,
  keyboardIdleMinutes: 10,
  timeToSkip: [
    {
      startTime: "00:00:00",
      endTime: "06:00:00",
    },
    {
      startTime: "12:00:00",
      endTime: "13:00:00",
    },
    {
      startTime: "18:00:00",
      endTime: "23:59:59",
    },
  ],
};

const Component: React.FunctionComponent<IComponentProps> = (
  props: IComponentProps
) => {
  const [monitoringSettings, setMonitoringSettings] = useState<
    IMonitoringSettings
  >(defaultData);
  const [selectedStartDate, setSelectedStartDate] = useState();
  const [selectedEndDate, setSelectedEndDate] = useState();
  const [startLabel, setStartLabel] = useState("");
  const [endLabel, setEndLabel] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={props.className}>
      <div className="settings-container">
        <div className="box">
          <p className="lower-panel-header-text ">
            <b> Myszka & Klawiatura</b>
          </p>
          <hr />

          <div className="mouse-keyboard-setting-container">
            <div className="mouse-keyboard-wrapper">
              <div className="settings-card break-paid-card">
                <div className="has-text-centered">
                  <label className=" lower-panel-header-text">Monitoruj?</label>
                </div>

                <div className="arrow-container">
                  <div>Tak</div>
                </div>

                <div>
                  <SwitchComponent
                    id="checked"
                    checked={true}
                  ></SwitchComponent>
                </div>
              </div>
            </div>

            <div className="mouse-keyboard-wrapper">
              <div className="mouse-setting-items">
                <div className="box">
                  <p className="lower-panel-header-text ">
                    <i className="fas fa-mouse-pointer"></i> <b> Myszka </b>
                  </p>
                  <p className="lower-panel-header-text ">
                    Zarejestruj Nieaktywność PO
                  </p>
                  <input
                    value={monitoringSettings.mouseIdleMinutes}
                    type="number"
                    step="1"
                    min={3}
                    max={1200}
                    className="input"
                  />
                  <p className="lower-panel-header-text ">minutach</p>
                </div>

                <div className="box">
                  <p className="lower-panel-header-text ">
                    <i className="fas fa-keyboard"></i> <b> Klawiatura </b>
                  </p>
                  <p className="lower-panel-header-text ">
                    Zarejestruj NIEAKTYWNOŚĆ po
                  </p>
                  <input
                    value={monitoringSettings.keyboardIdleMinutes}
                    type="number"
                    step="1"
                    min={3}
                    max={1200}
                    className="input"
                  />
                  <p className="lower-panel-header-text ">minutach</p>
                </div>
              </div>
              <div className="btn-flex">
                <button className="button is-primary">Zapisz Zmiany</button>
              </div>
            </div>
          </div>
        </div>
        <div className="box">
          <p className="lower-panel-header-text has-text-centered">
            <i className="fas fa-laptop-code"></i>{" "}
            <b>Nie monitoruj komputerów w godzinach</b>
          </p>

          <hr />
          <div className="time-picker-container">
            <div className="time-picker-wrapper">
              <div className="time-container">
                <label className="label">Od Godziny</label>
                <TimePickerComponent
                  width="100%"
                  format="HH:mm:ss"
                  value={selectedStartDate}
                  placeholder="Wybierz czas"
                  step={15}
                />
              </div>

              <div className="time-container">
                <label className="label">Do Godziny</label>
                <TimePickerComponent
                  format="HH:mm:ss"
                  width="100%"
                  value={selectedEndDate}
                  placeholder="Wybierz czas"
                  step={15}
                />
              </div>
            </div>
            <div className="btn-flex">
              <button className="button is-info">
                Dodaj <b>+</b>
              </button>
            </div>
          </div>

          <hr />

          <table className="table is-fullwidth is-striped">
            <thead className="head">
              <th className="th">Od Godziny</th>
              <th className="th">Do Godziny</th>
              <th className="th">Usuń</th>
            </thead>
            <tbody className="tbody">
              {monitoringSettings.timeToSkip !== null &&
                monitoringSettings.timeToSkip.map((r, index) => (
                  <tr>
                    <td>{r.startTime}</td>
                    <td>{r.endTime}</td>
                    <td>
                      <p className="has-text-danger">
                        <i className="fas fa-trash-alt"></i>
                      </p>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const MonitoringSettings = styled(Component)`
  .settings-container {
    display: flex;
  }
  .box {
    margin: 5px 10px;
    flex: 1;
  }

  .lower-panel-header-text {
    color: #666666;
    font-size: 20px;
    font-weight: 700;
    text-transform: uppercase;

    text-align: center;
  }

  .time-picker-container {
    display: flex;

    flex-direction: column;
    .time-picker-wrapper {
      display: flex;
    }
  }

  .time-container {
    margin: 10px;
    flex: 1;
  }

  .btn-flex {
    display: flex;
    flex: 1;

    .button {
      flex: 1;
    }
  }

  .mouse-keyboard-setting-container {
    display: flex;
    flex-direction: column;

    .settings-card {
      min-width: 40rem;

      padding: 2rem;

      .arrow-container {
        display: flex;
        flex-direction: column;
        font-size: 7rem;
        text-align: center;

        .arrow-container-action {
          display: flex;
          margin: 0 auto;
        }

        svg {
          color: #00d1b2;
          &:hover {
            cursor: pointer;
            animation-name: changeColor;
            animation-duration: 2s;
            transform: scale(1.2);
          }

          &:active {
            transform: scale(0.8);
          }
        }
      }
    }

    .break-paid-card {
      margin: 0 auto;
      width: 250px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .e-switch-wrapper {
        width: 100%;
      }
    }
  }

  .mouse-setting-items {
    display: flex;
    flex-wrap: wrap;
    .box {
      min-height: 200px !important;
      min-width: 300px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      .input {
        width: 80px !important;
        height: 50px !important;
        text-align: center;
        font-size: 1.9rem !important;
      }
    }
  }
`;
