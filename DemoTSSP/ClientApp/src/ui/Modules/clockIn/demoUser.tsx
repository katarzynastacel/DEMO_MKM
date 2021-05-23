import React, { useState } from "react";
import Joyride, { ACTIONS, EVENTS, STATUS, Step } from "react-joyride";
import styled from "styled-components";
import { ClockInDemo } from "./user/clockInDemo";
import { DemoMyClockInHistory } from "./user/clockinHistoryDemo";
import { DemoMyClockInVsTimeSheetHours } from "./user/statsDemo";
/*import { SendMeEmail } from "../../../helper/sendMeInfoMessage"; */
interface IComponent {
  className?: string;
  redirectToMKM: boolean;
}

enum CurrentActiveTab {
  CLOCKIN = "CLOCKIN",
  CLOCKINHISTORY = "CLOCKINHISTORY",
}

const Component: React.FunctionComponent<IComponent> = (props: IComponent) => {
  const [currentActive, setCurrentActive] = useState<CurrentActiveTab>(
    CurrentActiveTab.CLOCKIN
  );
  const [currentStep, setCurrentStep] = useState(1);
  const [runJoyRide, setRunJoyRide] = useState(false);
  const [isUiVisible, setIsUiVisible] = useState(true);
  const [steps] = useState<Step[]>([
    {
      target: ".ride-step1",
      content: "Podążaj krok za krokiem aby poznać naszą aplikację od A do Z!",
      hideCloseButton: true,
      hideBackButton: true,
    },
    {
      target: ".ride-step2",
      title: (
        <b>
          <p style={{ position: "absolute", top: 5, left: 5, fontSize: 11 }}>
            <a
              target="_blank"
              href="https://app.mkmprofessionals.com/demo/clock-in/admin"
            >
              Demo Admin
            </a>
          </p>
          Zakładka Dzisiaj
        </b>
      ),
      content: (
        <h2>
          Służy do ewidencji czasu pracy. Wszystkie przepracowane godziny
          automatycznie zostaną zarejestrowane.
        </h2>
      ),
      hideCloseButton: true,
      hideBackButton: false,
    },
    {
      target: ".ride-step3",
      title: (
        <b>
          {" "}
          <p style={{ position: "absolute", top: 5, left: 5, fontSize: 11 }}>
            <a
              target="_blank"
              href="https://app.mkmprofessionals.com/demo/clock-in/admin"
            >
              Demo Admin
            </a>
          </p>
          Rozpoczynanie Pracy
        </b>
      ),
      content: (
        <h2>
          Po naciśnięciu przycisku `Start` czas rozpoczęcia zostanie
          zarejestrowany i zaczniemy naliczanie czasu twojej pracy.
        </h2>
      ),
      hideCloseButton: true,
      hideBackButton: false,
      isFixed: true,
    },
    {
      target: ".ride-step3",
      title: (
        <b>
          {" "}
          <p style={{ position: "absolute", top: 5, left: 5, fontSize: 11 }}>
            <a
              target="_blank"
              href="https://app.mkmprofessionals.com/demo/clock-in/admin"
            >
              Demo Admin
            </a>
          </p>
          Rozpoczęto Pracę
        </b>
      ),
      content: (
        <p>
          Twój czas pracy w tym momencie jest rejestrowany. W czasie
          rzeczywistym widzisz przepracowany czas.
          <br />
          <br /> Panel admina z obecnościami został zaktualizowany.
        </p>
      ),
      hideCloseButton: true,
      hideBackButton: true,
      isFixed: true,
    },
    {
      target: ".ride-step4",
      title: (
        <b>
          {" "}
          <p style={{ position: "absolute", top: 5, left: 5, fontSize: 11 }}>
            <a
              target="_blank"
              href="https://app.mkmprofessionals.com/demo/clock-in/admin"
            >
              Demo Admin
            </a>
          </p>
          Czas Rozpoczęcia Pracy
        </b>
      ),
      content: "",
      hideCloseButton: false,
      hideBackButton: true,
    },
    {
      target: ".ride-step5",
      title: (
        <b>
          {" "}
          <p style={{ position: "absolute", top: 5, left: 5, fontSize: 11 }}>
            <a
              target="_blank"
              href="https://app.mkmprofessionals.com/demo/clock-in/admin"
            >
              Demo Admin
            </a>
          </p>
          Rozpocznij Przerwę
        </b>
      ),
      content:
        "W trakcie pracy w dowolnym momencie możesz pójść na przerwę, a czas przerwy zostanie zarejestrowany.",
      hideCloseButton: true,
      hideBackButton: false,
      isFixed: true,
    },
    {
      target: ".ride-step6",
      title: (
        <b>
          {" "}
          <p style={{ position: "absolute", top: 5, left: 5, fontSize: 11 }}>
            <a
              target="_blank"
              href="https://app.mkmprofessionals.com/demo/clock-in/admin"
            >
              Demo Admin
            </a>
          </p>
          Na Przerwie
        </b>
      ),
      content:
        "Twój czas przerwy jest rejestrowany. Wielokrotnie możesz zmieniać status w ciągu dnia.",
      hideCloseButton: true,
      hideBackButton: true,
      isFixed: true,
    },
    {
      target: ".ride-step7",
      title: (
        <b>
          {" "}
          <p style={{ position: "absolute", top: 5, left: 5, fontSize: 11 }}>
            <a
              target="_blank"
              href="https://app.mkmprofessionals.com/demo/clock-in/admin"
            >
              Demo Admin
            </a>
          </p>
          Kontynuacja Pracy
        </b>
      ),
      content: "Naliczanie przepracowanych godzin będzie kontynuowane.",
      hideCloseButton: true,
      hideBackButton: true,
      isFixed: true,
    },
    {
      target: ".ride-step8",
      title: (
        <b>
          {" "}
          <p style={{ position: "absolute", top: 5, left: 5, fontSize: 11 }}>
            <a
              target="_blank"
              href="https://app.mkmprofessionals.com/demo/clock-in/admin"
            >
              Demo Admin
            </a>
          </p>
          Naliczanie godzin pracy jest aktywne
        </b>
      ),
      content: "",
      hideCloseButton: true,
      hideBackButton: true,
      isFixed: true,
      placement: "center",
    },
    {
      target: ".ride-step9",
      title: (
        <b>
          {" "}
          <p style={{ position: "absolute", top: 5, left: 5, fontSize: 11 }}>
            <a
              target="_blank"
              href="https://app.mkmprofessionals.com/demo/clock-in/admin"
            >
              Demo Admin
            </a>
          </p>
          Zakończ Prace
        </b>
      ),
      content: (
        <p>
          Zostaniesz poproszony o potwierdzenie, masz możliwość wypełnienia
          notatki lub dodania komentarza na koniec dnia. <br />
          <br /> Notatka zostanie dołączona do raportu przepracowanych godzin,
          która będzie dostępna w panelu admina.
        </p>
      ),
      hideCloseButton: true,
      hideBackButton: true,
      isFixed: true,
    },
    {
      target: ".ride-step10",
      title: (
        <b>
          {" "}
          <p style={{ position: "absolute", top: 5, left: 5, fontSize: 11 }}>
            <a
              target="_blank"
              href="https://app.mkmprofessionals.com/demo/clock-in/admin"
            >
              Demo Admin
            </a>
          </p>
          Potwierdzenie Zakończenia Pracy
        </b>
      ),
      content: "Po zatwierdzeniu, czas twojej pracy zostanie zakończony.",
      hideCloseButton: true,
      hideBackButton: true,
    },
    {
      target: ".ride-step11",
      title: (
        <b>
          {" "}
          <p style={{ position: "absolute", top: 5, left: 5, fontSize: 11 }}>
            <a
              target="_blank"
              href="https://app.mkmprofessionals.com/demo/clock-in/admin"
            >
              Demo Admin
            </a>
          </p>
          Zakończono Prace
        </b>
      ),
      content: (
        <p>
          Możliwość rozpoczęcia pracy zostanie odblokowana następnego dnia.
          <br />
          <br /> Jeśli zakończyłeś pracę przypadkowo, osoba z uprawnieniami ma
          możliwość odblokowania czasu pracy.
        </p>
      ),
      hideCloseButton: true,
      hideBackButton: true,
      isFixed: true,
      placement: "center",
    },
    {
      target: ".ride-step12",
      title: (
        <b>
          {" "}
          <p style={{ position: "absolute", top: 5, left: 5, fontSize: 11 }}>
            <a
              target="_blank"
              href="https://app.mkmprofessionals.com/demo/clock-in/admin"
            >
              Demo Admin
            </a>
          </p>
          Czas Zakończenia Pracy
        </b>
      ),
      content: "",
      hideCloseButton: true,
      hideBackButton: false,
    },
    {
      target: ".ride-step13",
      title: <b>QR Code</b>,
      content: (
        <p>
          Kliknij żeby zobaczyć swój kod QR. <br />
          <br />
          Po zeskanowaniu swojego kodu QR na skanerze firmowym, rozpoczniemy lub
          zakończymy za ciebie pracę automatycznie . <br />
          <br /> Osoba z uprawnieniami posiada dane dostępu do skanera. <br />
          <br /> Z każdego urządzenia z kamerą jesteś w stanie zrobić skaner.
        </p>
      ),
      hideCloseButton: true,
      hideBackButton: false,
      placement: "left",
    },
    {
      target: ".ride-step14",
      title: (
        <b>
          {" "}
          <p style={{ position: "absolute", top: 5, left: 5, fontSize: 11 }}>
            <a
              target="_blank"
              href="https://app.mkmprofessionals.com/demo/clock-in/admin"
            >
              Demo Admin
            </a>
          </p>
          Moje Godziny Pracy
        </b>
      ),
      content: "Ilość godzin przepracowanych w tym miesiącu.",
      hideCloseButton: true,
      hideBackButton: true,
    },
    {
      target: ".ride-step15",
      title: (
        <b>
          {" "}
          <p style={{ position: "absolute", top: 5, left: 5, fontSize: 11 }}>
            <a
              target="_blank"
              href="https://app.mkmprofessionals.com/demo/clock-in/admin"
            >
              Demo Admin
            </a>
          </p>
          Zakładka Dzisiaj
        </b>
      ),
      content: (
        <p>
          Tutaj masz wgląd do wszystkich swoich przepracowanych godzin. <br />
          <br />
          Jeśli zdarzy ci się zapomnieć zarejestrować godziny pracy, to masz
          możliwość dodania ich manualnie.
          <br />
          <br />W przypadku popełnienia błędu, również masz możliwość edytowania
          swoich godzin pracy.
        </p>
      ),
      hideCloseButton: true,
      hideBackButton: true,
    },

    {
      target: ".ride-step16",
      title: <b>Wykonaj</b>,
      content: "Wybierz tryb i kliknij żeby załadować twoje godziny pracy",
      hideCloseButton: true,
      hideBackButton: false,
    },
    {
      target: ".ride-step17",
      title: (
        <b>
          {" "}
          <p style={{ position: "absolute", top: 5, left: 5, fontSize: 11 }}>
            <a
              target="_blank"
              href="https://app.mkmprofessionals.com/demo/clock-in/admin"
            >
              Demo Admin
            </a>
          </p>
          Twoje Godziny Pracy
        </b>
      ),
      content: (
        <p>
          Jednym kliknięciem masz wgląd do swoich przepracowanych godzin.
          <br />
          <br /> Dane można exportowac jako CSV, XLSX{" "}
          <span className="has-text-success">
            <i className="fas fa-file-excel"></i>
          </span>{" "}
          oraz do PDF{" "}
          <span className="has-text-danger">
            <i className="fas fa-file-pdf"></i>
          </span>
        </p>
      ),
      hideCloseButton: true,
      hideBackButton: false,
    },
    {
      target: ".ride-step18",
      title: (
        <b>
          {" "}
          <p style={{ position: "absolute", top: 5, left: 5, fontSize: 11 }}>
            <a
              target="_blank"
              href="https://app.mkmprofessionals.com/demo/clock-in/admin"
            >
              Demo Admin
            </a>
          </p>
          Edycja Czas Pracy
        </b>
      ),
      content:
        "Tutaj możesz wdrążyć poprawki do twoich przepracowanych godzin.",
      hideCloseButton: true,
      hideBackButton: true,
      placement: "center",
    },
    {
      target: ".ride-step19",
      title: (
        <b>
          {" "}
          <p style={{ position: "absolute", top: 5, left: 5, fontSize: 11 }}>
            <a
              target="_blank"
              href="https://app.mkmprofessionals.com/demo/clock-in/admin"
            >
              Demo Admin
            </a>
          </p>
          Aktualizacja Godzin
        </b>
      ),
      content: "",
      hideCloseButton: true,
      hideBackButton: true,
    },
    {
      target: ".ride-step20",
      title: (
        <b>
          {" "}
          <p style={{ position: "absolute", top: 5, left: 5, fontSize: 11 }}>
            <a
              target="_blank"
              href="https://app.mkmprofessionals.com/demo/clock-in/admin"
            >
              Demo Admin
            </a>
          </p>
          Zmiany zostaną wysłane
        </b>
      ),
      content: "",
      hideCloseButton: true,
      hideBackButton: false,
    },

    {
      target: ".ride-step1",
      title: <b>Koniec Demo 😊</b>,
      content: (
        <div>
          <p>
            Dziękujemy, jeśli masz pomysł jak możemy ulepszyć naszą aplikację
            dla ciebie, skontaktuj się z nami.
            <br />
            <br /> W mniej niż tydzień wdrążymy twój pomysł lub brakującą
            funkcjonalność!
          </p>{" "}
          <br />
          <br />
          <div className="">
            <button
              onClick={() => {
                window.location.href =
                  "https://mkmprofessionals.com/kontakt.html";
              }}
              className="button is-info"
            >
              Kontakt
            </button>
            <br />
            <a
              target="_blank"
              href="https://app.mkmprofessionals.com/demo/clock-in/admin"
            >
              Zobacz Demo Admina
            </a>
          </div>
        </div>
      ),
      hideCloseButton: true,
      hideBackButton: true,
      placement: "center",
    },
    {
      target: ".ride-step1",
      title: (
        <b>
          Aplikacja zostanie odświeżona{" "}
          <span className="has-text-success">
            {" "}
            <i className="fas fa-sync"></i>
          </span>
        </b>
      ),
      content: "",
      hideCloseButton: true,
      hideBackButton: true,
      placement: "center",
    },
  ]);

  /*   useEffect(() => {
    if (props.redirectToMKM) {
      SendMeEmail(
        "Ktos wlasnie otworzyl demo ze strony i oglada demo elektroniczna lista obecnosci demo uzytkownik"
      );
    }

    return () => {
      if (props.redirectToMKM) {
        SendMeEmail(
          "Ktos wlasnie opuscil demo ze strony elektroniczna lista obecnosci demo uzytkownik"
        );
      }
    };
  }, []); */

  const HandleTabClick = (type: CurrentActiveTab) => {
    return () => {
      setCurrentActive(type);
    };
  };

  const JourneyCallback = (data: any) => {
    const { action, index, status, type } = data;
    console.log(data);
    if ([EVENTS.STEP_AFTER /* , EVENTS.TARGET_NOT_FOUND */].includes(type)) {
      // Update state to advance the tour
      if (index === 9) {
        let element = document.getElementById("clockin-ride-step9");
        if (element) {
          setTimeout(() => {
            //@ts-ignore
            element.click();
          }, 200);

          setTimeout(() => {
            setCurrentStep(index + (action === ACTIONS.PREV ? -1 : 1));
          }, 1000);
        }
      } else if (index === 14) {
        setCurrentActive(CurrentActiveTab.CLOCKINHISTORY);
        setCurrentStep(index + (action === ACTIONS.PREV ? -1 : 1));
      } else if (index === 16) {
        let element = document.getElementById("clockin-ride-step16");
        if (element) {
          setTimeout(() => {
            //@ts-ignore
            element.click();
          }, 200);

          setTimeout(() => {
            setCurrentStep(index + (action === ACTIONS.PREV ? -1 : 1));
          }, 800);
        }
      } else if (index === 18) {
        let element = document.getElementById("clockin-ride-step18");
        if (element) {
          setTimeout(() => {
            //@ts-ignore
            element.click();
          }, 200);

          setTimeout(() => {
            setCurrentStep(index + (action === ACTIONS.PREV ? -1 : 1));
          }, 800);
        }
      } else {
        setCurrentStep(index + (action === ACTIONS.PREV ? -1 : 1));
      }
    }

    if ([STATUS.FINISHED, STATUS.SKIPPED, STATUS.WAITING].includes(status)) {
      // Need to set our running state to false, so we can restart if we click start again.
      setRunJoyRide(false);
      setCurrentStep(1);
      if (props.redirectToMKM) {
        window.location.href = "https://app.mkmprofessionals.com/register";
      } else {
        window.location.reload();
      }
    }

    if (index === 1) {
      setCurrentActive(CurrentActiveTab.CLOCKIN);
    }

    if (index === 3) {
      let element = document.getElementById("clockin-ride-step3");
      if (element) {
        setTimeout(() => {
          //@ts-ignore
          element.click();
        }, 500);
      }
    }

    if (index === 6) {
      let element = document.getElementById("clockin-ride-step5");
      if (element) {
        setTimeout(() => {
          //@ts-ignore
          element.click();
        }, 500);
      }
    }

    if (index === 8) {
      let element = document.getElementById("clockin-ride-step7");
      if (element) {
        setTimeout(() => {
          //@ts-ignore
          element.click();
        }, 200);
      }
    }

    if (index === 10) {
      let element = document.getElementById("clockin-ride-step9");
      if (element) {
        setTimeout(() => {
          //@ts-ignore
          element.click();
        }, 200);
      }
    }

    if (index === 11) {
      let element = document.getElementById("clockin-ride-step10");
      if (element) {
        setTimeout(() => {
          //@ts-ignore
          element.click();
        }, 200);
      }
    }

    if (index === 11) {
      let element = document.getElementById("clockin-ride-step10");
      if (element) {
        setTimeout(() => {
          //@ts-ignore
          element.click();
        }, 200);
      }
    }

    if (index === 21) {
      let element = document.getElementById("clockin-ride-step20");
      if (element) {
        setTimeout(() => {
          //@ts-ignore
          element.click();
        }, 200);
      }
    }
    if (index === 22) {
      if (props.redirectToMKM) {
        window.location.href = "https://app.mkmprofessionals.com/register";
      } else {
        window.location.reload();
      }
    }
  };

  const HandleStartDemo = () => {
    setCurrentActive(CurrentActiveTab.CLOCKIN);
    trigerRefresh();
    setTimeout(() => {
      setRunJoyRide(true);
    }, 300);
  };

  const trigerRefresh = () => {
    setIsUiVisible(false);

    setTimeout(() => {
      setIsUiVisible(true);
    }, 200);
  };

  return (
    <div className={props.className}>
      <p className="has-text-centered">
        <button
          onClick={HandleStartDemo}
          className="button is-dark has-text-warning is-large"
        >
          Rozpocznij Tutorial
        </button>
      </p>

      <Joyride
        steps={steps}
        continuous={true}
        callback={JourneyCallback}
        run={runJoyRide}
        scrollToFirstStep={true}
        stepIndex={currentStep}
        showProgress={true}
        disableCloseOnEsc={true}
        disableOverlayClose={true}
        showSkipButton={true}
      />
      <div>
        <p className="has-text-primary clock-in-welcome ride-step1">
          Dzień Dobry, Jan Kowalski
        </p>
      </div>
      <div className="tabs is-centered">
        <ul>
          <li
            onClick={HandleTabClick(CurrentActiveTab.CLOCKIN)}
            className={`ride-step2 ${
              currentActive == CurrentActiveTab.CLOCKIN ? "is-active" : ""
            } `}
          >
            <a>Dzisiaj</a>
          </li>
          <li
            onClick={HandleTabClick(CurrentActiveTab.CLOCKINHISTORY)}
            className={`ride-step15 ${
              currentActive == CurrentActiveTab.CLOCKINHISTORY
                ? "is-active"
                : ""
            } `}
          >
            <a>Historia</a>
          </li>
        </ul>
      </div>

      <div>
        {currentActive == CurrentActiveTab.CLOCKIN && isUiVisible && (
          <>
            <DemoMyClockInVsTimeSheetHours numberOfhours={78} />
            <ClockInDemo currentStepIndex={currentStep} />
          </>
        )}

        {currentActive == CurrentActiveTab.CLOCKINHISTORY && (
          <DemoMyClockInHistory />
        )}
      </div>
    </div>
  );
};

export const DEMO_User_ClockInMasterPage = styled(Component)`
  font-size: 1.6rem;
  .demo-admin {
    position: absolute !important;
    top: 5;
    left: 5;
    font-size: 11px !important;
  }
  .tabs a {
    border-bottom-color: #00d1b2 !important;
  }
  .tabs li.is-active a {
    border-bottom-color: #00d1b2 !important;
    color: white !important;
    background-color: #00d1b2;
  }
  .tabs ul {
    border-bottom-color: #00d1b2 !important;
  }
  .stats-header {
    font-size: 3rem;

    @media screen and (max-width: 850px) {
      font-size: 5rem;
      margin: 2rem 0rem;
    }
  }

  .clock-in-welcome {
    font-style: italic;
    font-size: 5rem;
    text-align: center;
    margin: 2rem 0rem;

    @media screen and (max-width: 500px) {
      font-size: 3rem;
    }
  }
`;
export default DEMO_User_ClockInMasterPage;
