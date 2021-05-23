import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Spinner } from "../../shared/spinner";

interface IComponent {
  className?: string;
  currentStepIndex: number;
}

export const Component: React.FunctionComponent<IComponent> = (
  props: IComponent
) => {
  const [isCheckedIn, setIsCheckedIN] = useState(false);
  const [isCheckOutComplete, setIsCheckOutComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [workStart, setWorkStart] = useState("--");
  const [workEnd, setWorkEnd] = useState("--");
  const [displayTimer, setDisplayTimer] = useState("");
  const [isConfirmClockOutActive, setIsConfirmClockOutActive] = useState(false);
  const [isBreakActive, setIsBreakActive] = useState(false);

  useEffect(() => {
    if (props.currentStepIndex === 2) {
    }
  }, [props.currentStepIndex]);

  const HandleClockIn = () => {
    const now = new Date();
    setIsCheckedIN(true);
    setWorkStart(
      now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds()
    );
    let start = new Date();
    setInterval(() => {
      const now = new Date();

      const realDiff = now.getTime() - start.getTime();

      now.setTime(realDiff);
      setDisplayTimer(now.toISOString().substr(11, 8));
    }, 1000);
    setIsLoading(false);
  };

  /////////////// CHECKOUT ////////////////////

  const OnCheckOutClick = () => {
    setIsCheckOutComplete(true);
    setIsLoading(false);
    setIsConfirmClockOutActive(false);
    const now = new Date();
    setWorkEnd(
      now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds()
    );
  };

  const HandleClockOutClick = () => {
    setIsConfirmClockOutActive(true);
  };

  const HandleClockOutClose = () => {
    setIsConfirmClockOutActive(false);
  };

  //   BREAK  //

  const HandleBreakStart = () => {
    setIsBreakActive(true);
  };

  return (
    <div className={props.className}>
      {isConfirmClockOutActive && (
        <div className="modal is-active fadein">
          <div className="modal-background"></div>
          <div className="modal-card ">
            <header className="modal-card-head">
              <h1 className="modal-card-title has-text-primary is-size-3">
                Potwierdź <i className="fas fa-clipboard-check"></i>
              </h1>
              <button
                onClick={HandleClockOutClose}
                className="delete"
                aria-label="close"
              ></button>
            </header>
            <section className="modal-card-body">
              <h1>
                <b>Czy jesteś pewien że chcesz zakończyć pracę na dzisiaj?</b>
              </h1>

              <br />
              <label className="label">Komentarz/Podsumowanie Dnia</label>
              <textarea placeholder="" className="textarea"></textarea>
            </section>
            <footer className="modal-card-foot">
              <button
                id="clockin-ride-step10"
                onClick={OnCheckOutClick}
                className={`ride-step10 button is-success ${
                  isLoading ? "is-loading" : ""
                }`}
              >
                Potwierdź
              </button>
            </footer>
          </div>
        </div>
      )}

      <div
        onClick={() => {
          alert("QR Code is not available during the demo");
        }}
        className="ride-step13 qr-code pulse"
      >
        <p>
          <b>Qr Code</b>
        </p>

        <p className="">
          <i className="fas fa-qrcode "></i>
        </p>
      </div>
      <div className="checkInContainer fadein">
        {isCheckedIn && (
          <div className="start-stop-container">
            <div className="start-work-time ride-step4">
              <p> Rozpoczęto Prace: {workStart}</p>
            </div>

            <div className="end-work-time ride-step12">
              <p> Zakończono Prace: {workEnd}</p>
            </div>
          </div>
        )}
        {isLoading && <Spinner label="Przygotowywanie..." />}

        {/***   CLOCK IN ****/}
        {!isCheckedIn && !isLoading && !isCheckOutComplete && (
          <div className="clockin__container fadein">
            <div className="start-paragraph">
              <p>Rozpocznij Prace</p>
            </div>

            <div className="clocklogo-start ">
              {" "}
              <i className="far fa-clock"></i>
            </div>

            <div className="startbtn ">
              {" "}
              {true && (
                <button
                  id="clockin-ride-step3"
                  onClick={HandleClockIn}
                  className="button is-primary startbtn ride-step3"
                >
                  Start
                </button>
              )}
            </div>
          </div>
        )}
        {/*      CLOCK OUT         */}
        {isCheckedIn && !isLoading && !isCheckOutComplete && !isBreakActive && (
          <div className="clockout__container fadein ride-step6 ride-step11">
            <div className="end-paragraph">
              <p>W Pracy</p>
            </div>

            <div className="clocklogo-end">
              {" "}
              <i className="far fa-clock "></i>
            </div>

            <div className="">
              <p>{displayTimer}</p>
            </div>

            <div className="endbtn">
              {" "}
              <button
                id="clockin-ride-step5"
                onClick={HandleBreakStart}
                className="button is-info endbtn ride-step5"
              >
                Rozpocznij Przerwe
              </button>
            </div>

            <div className="endbtn ride-step9">
              <button
                id="clockin-ride-step9"
                onClick={HandleClockOutClick}
                className="button is-primary endbtn"
              >
                Zakończ Prace
              </button>
            </div>
          </div>
        )}

        {/* BREAK */}
        {isBreakActive && (
          <div className={props.className}>
            <div className="break__container fadein ride-step8 ">
              <div className="break-paragraph ">
                <p>Na Przerwie</p>
              </div>

              <i className="fas fa-utensils breaklogo"></i>

              <div className="">
                <p>{displayTimer}</p>
              </div>

              <div className="continue-button">
                {" "}
                <button
                  onClick={() => setIsBreakActive(false)}
                  id="clockin-ride-step7"
                  className={`ride-step7 button is-primary endbtn ${
                    isLoading ? "is-loading" : ""
                  }`}
                >
                  Kontynuuj pracę
                </button>
              </div>
            </div>
          </div>
        )}

        {/*     FINISHED     */}
        {isCheckOutComplete && !isLoading && (
          <div className="finished__container fadein ride-step11">
            <div className="finished-paragraph">Przepracowano</div>

            <div className="">
              <p>08:30:00</p>
            </div>

            <div className="clocklogo-end">W tym przerwy</div>

            <div>
              <p>00:30:00</p>
            </div>

            <div className="endbtn">Do zobaczenia!</div>
          </div>
        )}
      </div>
    </div>
  );
};

export const ClockInDemo = styled(Component)`
  position: relative;
  font-size: 1.6rem;
  .qr-code {
    position: absolute;
    top: 20px;
    right: 20px;
    &:hover {
      cursor: pointer;
    }
  }

  .fa-qrcode {
    font-size: 7rem;
  }
  .checkInContainer {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 5rem;
    align-items: center;

    .clock-in-itsTime {
      font-style: italic;
      font-weight: 100;
      font-size: 4rem;
    }

    .clock {
      font-size: 3rem;
      font-style: italic;
    }

    .start-stop-container {
      display: flex;
      width: 100%;
      justify-content: space-evenly;
      color: white;
      font-style: italic;
      color: #3273dc;
      font-size: 2.5rem;
      font-weight: 700;
      letter-spacing: 1px;

      .start-work-time {
        padding: 20px;
      }

      .end-work-time {
        padding: 20px;
      }
    }

    /** CLOCKOUT IN */

    .clockin__container {
      color: white;
      background: #3273dc;
      margin-top: 3rem;
      width: 40rem;
      height: 40rem;
      border-radius: 1000px;
      font-style: italic;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      font-size: 3rem;
      opacity: 0.9;
      box-shadow: 0rem 2rem 4rem rgba(0, 0, 0, 0.5);
      transition: all 0.3s;

      .startbtn {
        font-size: 3rem !important;
        width: 20rem;
      }

      .start-paragraph {
        font-weight: 700;
        letter-spacing: 1px;
      }

      .clocklogo-start {
        font-size: 6rem !important;
      }
    }

    .clockin__container:hover {
      transform: scale(1.1);
      opacity: 0.8;
      box-shadow: 1rem 3rem 5rem rgba(0, 0, 0, 0.7);
    }

    /** CLOCKOUT */

    .clockout__container {
      color: white;
      background: #6f8bba;
      margin-top: 3rem;
      width: 40rem;
      height: 40rem;
      border-radius: 1000px;
      font-style: italic;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      font-size: 3rem;
      opacity: 0.9;
      box-shadow: 0rem 2rem 4rem rgba(0, 0, 0, 0.5);
      transition: all 0.3s;

      .endbtn {
        font-size: 2rem !important;
        margin-top: -1rem;
        width: 20rem;
      }

      .end-paragraph {
        font-weight: 700;
        letter-spacing: 1px;
      }

      .clocklogo-end {
        font-size: 4rem !important;
      }
    }

    .clockout__container:hover {
      transform: scale(1.1);
      opacity: 0.8;
      box-shadow: 1rem 3rem 5rem rgba(0, 0, 0, 0.7);
    }

    /*   finished    */

    .finished__container {
      color: white;
      background: #3273dc;
      margin-top: 3rem;
      width: 40rem;
      height: 40rem;
      border-radius: 1000px;
      font-style: italic;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      font-size: 3rem;
      opacity: 0.9;
      box-shadow: 0rem 2rem 4rem rgba(0, 0, 0, 0.5);
      transition: all 0.3s;

      .finished-paragraph {
        font-weight: 700;
        letter-spacing: 1px;
      }

      .clocklogo-start {
        font-size: 6rem !important;
      }
    }

    .finished__container:hover {
      transform: scale(1.1);
      opacity: 0.8;
      box-shadow: 1rem 3rem 5rem rgba(0, 0, 0, 0.7);
    }
  }

  .iframeobject {
    width: 80% !important;
    height: 700px !important;
  }

  .break__container {
    color: white;
    background: #209cee;
    margin-top: 3rem;
    width: 40rem;
    height: 40rem;
    border-radius: 1000px;
    font-style: italic;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    font-size: 3rem;
    opacity: 0.9;
    box-shadow: 0rem 2rem 4rem rgba(0, 0, 0, 0.5);
    transition: all 0.3s;

    .continue-button {
      margin-top: -1rem;
      width: 20rem;

      button {
        width: inherit;
        font-size: 2rem !important;
      }
    }

    .break-paragraph {
      font-weight: 700;
      letter-spacing: 1px;
    }

    .breaklogo {
      font-size: 4rem !important;
    }
  }

  .break__container:hover {
    transform: scale(1.1);
    opacity: 0.8;
    box-shadow: 1rem 3rem 5rem rgba(0, 0, 0, 0.7);
  }
`;

export default ClockInDemo;
