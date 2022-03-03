import React, { useContext, useState } from "react";
import styled from "styled-components";

import Timer from "react-compound-timer";
import { useEffect } from "react";
interface IComponentProps {
  className?: string;
  onClose: () => void;
  record: any;
  average: IAverageStats;
}

interface IAverageStats {
  averageMouse: number;
  averageKeyboard: number;
}

const Component: React.FunctionComponent<IComponentProps> = (
  props: IComponentProps
) => {
  const HandleClose = () => props.onClose();

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
                <b>Demo Profile </b>
              </div>
              <br />
              <br />

              {true && (
                <div>
                  <div className="average-container">
                    <div className="tags has-addons">
                      <span className="tag  is-large is-dark">
                        AVERAGE KEYBOARD CLICKS
                        <i className="fas fa-keyboard add-margin"></i>
                      </span>
                      <span className="tag is-large is-primary">
                        {props.average.averageKeyboard}
                      </span>

                      <span className="tag  is-large is-dark">
                        AVERAGE MOUSE CLICKS
                        <i className="fas fa-mouse-pointer add-margin"></i>
                      </span>
                      <span className="tag is-large is-primary">
                        {props.average.averageMouse}
                      </span>
                    </div>
                  </div>

                  <hr />
                  <br />

                  <table className="table is-fullwidth">
                    <thead className="head">
                      <th className="th">
                        <i className="fas fa-keyboard"></i> Clicks
                      </th>
                      <th className="th">
                        <i className="fas fa-keyboard"></i> Difference from
                        average
                      </th>
                      <th className="th">
                        <i className="fas fa-keyboard"></i> Lack of activity
                      </th>
                      <th className="th">
                        <i className="fas fa-mouse-pointer"></i> Clicks
                      </th>
                      <th className="th">
                        <i className="fas fa-mouse-pointer"></i> Difference from
                        average
                      </th>
                      <th className="th">
                        <i className="fas fa-mouse-pointer"></i> Lack of
                        activity
                      </th>
                    </thead>
                    <tbody className="tbody">
                      <tr className="tr">
                        <td className="td">
                          <span className="tag is-dark">
                            {props.record.keyboardClickCounter}
                          </span>
                        </td>

                        <td className="td">
                          <div className="tags has-addons">
                            {props.record.keyboardClickCounter -
                              props.average.averageKeyboard >
                            0 ? (
                              <span className="tag  is-large is-success">
                                +
                              </span>
                            ) : (
                              <span className="tag  is-large is-warning">
                                -
                              </span>
                            )}

                            <span className="tag is-large is-info">
                              {props.record.keyboardClickCounter -
                                props.average.averageKeyboard}
                            </span>
                          </div>
                        </td>

                        <td className="td">
                          <div>
                            {props.record.totalSecondsKeyboardIdle > 0 && (
                              <span className="tag is-light is-danger">
                                {/**@ts-ignore */}
                                <Timer
                                  formatValue={(value: any) =>
                                    `${value < 10 ? `0${value}` : value}`
                                  }
                                  initialTime={
                                    props.record.totalSecondsKeyboardIdle * 1000
                                  }
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
                          <span className="tag is-dark">
                            {props.record.mouseClickCounter}
                          </span>
                        </td>
                        <td className="td">
                          <div className="tags has-addons">
                            {props.record.mouseClickCounter -
                              props.average.averageMouse >
                            0 ? (
                              <span className="tag  is-large is-success">
                                +
                              </span>
                            ) : (
                              <span className="tag  is-large is-warning">
                                -
                              </span>
                            )}

                            <span className="tag is-large is-info">
                              {props.record.mouseClickCounter -
                                props.average.averageMouse}
                            </span>
                          </div>
                        </td>

                        <td className="td">
                          <div>
                            {props.record.totalSecondsMouseIdle > 0 && (
                              <span className="tag is-light is-danger">
                                {/**@ts-ignore */}
                                <Timer
                                  formatValue={(value: any) =>
                                    `${value < 10 ? `0${value}` : value}`
                                  }
                                  initialTime={
                                    props.record.totalSecondsMouseIdle * 1000
                                  }
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
                    </tbody>
                  </table>
                </div>
              )}

              <br />
              <br />

              <div className="iddle-details-container">
                <div className="lower-stat-side-panel box">
                  <p className="lower-panel-header-text ">
                    <b>
                      INACTIVE KEYBOARD
                      <i className="fas fa-keyboard"></i>
                    </b>
                  </p>
                  <hr />

                  <table className="table is-fullwidth is-striped">
                    <thead className="head">
                      <th></th>

                      <th className="th">Time</th>
                      <th className="th"> Duration time</th>
                    </thead>
                    <tbody className="tbody">
                      {props.record.keyboardIdleEvents.map(
                        (r: any, index: any) => {
                          return (
                            <tr className="tr" key={index}>
                              <td className="td">
                                <b>{index + 1}</b>
                              </td>

                              <td className="td">{r.startTimeLabel}</td>
                              <td className="td">
                                <div>
                                  {r.totalSeconds > 0 && (
                                    <span className="tag is-info is-light">
                                      {/**@ts-ignore */}
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
                        }
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="lower-stat-side-panel box">
                  <p className="lower-panel-header-text ">
                    <b>
                      INACTIVE MOUSE
                      <i className="fas fa-mouse-pointer add-margin"></i>
                    </b>
                  </p>
                  <hr />

                  <table className="table is-fullwidth is-striped">
                    <thead className="head">
                      <th></th>

                      <th className="th">Time</th>
                      <th className="th"> Duration time</th>
                    </thead>
                    <tbody className="tbody">
                      {props.record.mouseIdleEvents.map(
                        (r: any, index: any) => {
                          return (
                            <tr className="tr" key={index}>
                              <td className="td">
                                <b>{index + 1}</b>
                              </td>

                              <td className="td">{r.startTimeLabel}</td>
                              <td className="td">
                                <div>
                                  {r.totalSeconds > 0 && (
                                    <span className="tag is-info is-light">
                                      {/**@ts-ignore */}
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
                        }
                      )}
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

export const MouseKeyboardDetails = styled(Component)`
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

  .average-container {
    display: flex;
    justify-content: center;
  }

  .tag {
    font-size: 1.6rem !important;
  }

  .iddle-details-container {
    display: flex;

    .box {
      flex: 1;

      margin: 10px;
    }
  }
`;
export default MouseKeyboardDetails;
