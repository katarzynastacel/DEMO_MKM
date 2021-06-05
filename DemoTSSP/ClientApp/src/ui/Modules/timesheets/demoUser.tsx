import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import Joyride, {
  CallBackProps,
  STATUS,
  Step,
  StoreHelpers,
  ACTIONS,
  EVENTS,
} from "react-joyride";
import { DemoMyClockInVsTimeSheetHours } from "../shared/statsDemo";
import { DemoTimeSheetComponent } from "./user/demoTimesheets";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import Timer from "react-compound-timer";
import { SendMeEmail } from "../../../helpers/sendMeInfoMessage";
interface IComponentProps {
  className?: string;
  redirectToMKM: boolean;
}

enum CurrentActiveTab {
  MYTIMESHEET = "MYTIMESHEET",
  MYSCANNER = "MYSCANNER",
  ACTIVITYCODES = "ACTIVITYCODES",
  MYTASKS = "MYTASKS",
}

const Component: React.FunctionComponent<IComponentProps> = (
  props: IComponentProps
) => {
  const [currentActive, setCurrentActive] = useState<CurrentActiveTab>(
    CurrentActiveTab.MYTIMESHEET
  );
  const [currentStep, setCurrentStep] = useState(1);
  const [runJoyRide, setRunJoyRide] = useState(false);
  const [steps] = useState<Step[]>([
    {
      target: ".ride-step14",
      content: (
        <p>
          Wejdź na wyższy poziom prowadzenia biznesu z MKM Professionals! <br />
          <br /> Podążaj krok za krokiem aby poznać naszą aplikację od A do Z!
        </p>
      ),
      hideCloseButton: true,
      hideBackButton: true,
      placement: "center",
    },
    {
      target: ".ride-step14",
      title: (
        <b>
          <br />
          Godziny Pracy (Timesheet) <br />
        </b>
      ),
      content: (
        <h2 className="has-text-left">
          Służy do ewidencji czasu pracy. <br />
          <br /> Wszystkie wykonywane zadania oraz czas przepracowanych godzin
          zostają tutaj udokumentowane w 2 możliwe sposoby poprzez:
          <br /> <br />
          <p>
            <li> Manualne wypełnianie godzin</li> <br />
            <li> Automatycznie poprzez program</li>
          </p>
          <br /> <br />
          Przejdź dalej by poznać wszystkie funkcje
        </h2>
      ),
      hideCloseButton: true,
      hideBackButton: false,
      placement: "center",
    },
    {
      target: ".ride-step14",
      title: (
        <b>
          Moje Godziny <br />
        </b>
      ),
      content: (
        <p>
          Wykres Pokazuje ilość wszystkich wypełnionych godzin pracy w tym
          miesiącu. Dobrze wypełniony `Dziennik Pracy` powinnien się równać z
          ilością twoich przepracowanych godzin.
          <br />
          <br />
          <br />
          Informuję on również o braku wypełnionych godzin lub ich nadmiarze.
        </p>
      ),
      hideCloseButton: true,
      hideBackButton: false,
    },
    {
      target: ".ride-step1",
      title: (
        <b>
          Moje Godziny <br />
        </b>
      ),
      content: (
        <p>
          Tutaj możesz zarejestrować czas przepracowanych godzin oraz wypełnić
          na jakie zadanie ile czasu zostało przeznaczone.
          <br />
          <br />
        </p>
      ),
      hideCloseButton: true,
      hideBackButton: false,
    },
    {
      target: ".ride-step2",
      title: (
        <b>
          <br />
          Przykładowe Wypełnione Godziny Pracy <br />
        </b>
      ),
      content: <p>Godziny pracy zatwierdzane są w cyklu tygodniowym</p>,
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
              href="https://app.mkmprofessionals.com/demo/clock-in/employee"
            >
              Demo ADMIN
            </a>
          </p>
          Zmień Datę <br />
        </b>
      ),
      content: <p>Stały wgląd do wszystkich wypełnionych godzin</p>,
      hideCloseButton: true,
      hideBackButton: false,
    },
    {
      target: ".ride-step4",
      title: (
        <b>
          Dodaj Nowy Wiersz + <br />
        </b>
      ),
      content: (
        <p>
          Możliwość dodania większej ilości wierszy w zależności od ilości
          wykonywanych zadań
        </p>
      ),
      hideCloseButton: true,
      hideBackButton: false,
    },

    {
      target: ".ride-step5",
      title: (
        <b>
          Zatwierdź ✓ <br />
        </b>
      ),
      content: (
        <p>
          Pod koniec tygodnia wypełnione godziny muszą zostać zatwierdzone.
          <br />
          <br /> Po zatwierdzeniu możliwość edycji zostaje wyłączona. W razie
          potrzeby aktualizacji osoba z uprawnieniami może zezwolić na ponowną
          edycję.
        </p>
      ),
      hideCloseButton: true,
      hideBackButton: false,
    },
    {
      target: ".ride-step6",
      title: (
        <b>
          Zatwierdzono <br />
        </b>
      ),
      content: (
        <p>Możliwość edycji zostaje wyłączona. Godziny zostały zatwierdzone.</p>
      ),
      hideCloseButton: true,
      hideBackButton: false,
    },
    {
      target: ".ride-step14",
      title: (
        <b>
          <br />
          Automatyczne Wypełnianie Godzin
          <br />
        </b>
      ),
      content: (
        <div className="has-text-left">
          <p>Posiadamy 2 tryby wypełniania godzin:</p>
          <br />

          <li> QR Code</li>
          <li> On Click</li>
        </div>
      ),
      hideCloseButton: true,
      hideBackButton: true,
      placement: "center",
    },
    {
      target: ".ride-step7",
      title: (
        <b>
          <br />
          Tryb Qr Code
          <br />
        </b>
      ),
      content: (
        <div className="has-text-left">
          <p>
            Tutaj masz wgląd do wszytkich zadań zdefiniowanych przez twojego
            admina. <br />
            <br />
            Każde zadanie ma przypisany QR Code.
            <br /> <br />W zależności od potrzeb firmy kody mogą być wydrukowane
            i rozmieszczone w różnych miejscach/pomieszczeniach. Tutaj zawsze
            masz możliwość i dostęp do kodu QR w przypadku gdyż nie ma innej
            możliwość zeskanowania kodu.
          </p>
          <br />
        </div>
      ),
      hideCloseButton: true,
      hideBackButton: true,
    },
    {
      target: ".ride-step8",
      title: (
        <b>
          <br />
          Wybierz Zadanie
          <br />
        </b>
      ),
      content: "",
      hideCloseButton: true,
      hideBackButton: true,
    },
    {
      target: ".ride-step9",
      title: (
        <b>
          <br />
          QR Code
          <br />
        </b>
      ),
      content: (
        <div>
          Kod identyfikacyjny zadania. <br />
          <br /> Po zeskanowaniu kodu skanerem osobistym automatycznie zaczniemy
          naliczanie czasu na danym zadaniu. <br />
          <br />
          Po zakończeniu lub rozpoczęciu nowego zadania system automatycznie
          wypełni za ciebie przepracowane godziny.
        </div>
      ),
      hideCloseButton: true,
      hideBackButton: true,
    },
    {
      target: ".ride-step10",
      title: (
        <b>
          <br />
          Mój Scanner
          <br />
        </b>
      ),
      content: (
        <div>
          Z każdego urządzenia z kamerą jesteś w stanie zrobić skanner kodów qr.{" "}
          <br />
          <br />
          Po wejściu w zakładkę zostaniesz poproszony o udostępnienie kamery dla
          naszej aplikacji. <br />
          <br />
          Po zatwierdzeniu wystarczy zeskanować kod i nie musisz się przejmować
          wypełnianiem dziennika pracy system zrobi to za ciebie!
        </div>
      ),
      hideCloseButton: true,
      hideBackButton: true,
    },
    {
      target: ".ride-step11",
      title: (
        <b>
          <br />
          Tryb onClick
          <br />
        </b>
      ),
      content: (
        <div>
          Tutaj możesz korzystać z drugiego trybu który również automatycznie
          będzie za ciebie wypełniać godziny kliknij dalej i zobacz jakie to
          proste. <br />
        </div>
      ),
      hideCloseButton: true,
      hideBackButton: true,
    },
    {
      target: ".ride-step12",
      title: (
        <b>
          <br />
          Rozpocznij nową aktywność
          <br />
        </b>
      ),
      content: (
        <div>
          To proste, wybierz na jakim projekcie pracujesz oraz jakie zadanie
          jest wykonywane. <br />
        </div>
      ),
      hideCloseButton: true,
      hideBackButton: true,
    },
    {
      target: ".ride-step13",
      title: (
        <b>
          <br />
          Rozpocznij
          <br />
        </b>
      ),
      content: (
        <div>
          Po rozpoczęciu czas pracy zostanie naliczany. <br />
        </div>
      ),
      hideCloseButton: true,
      hideBackButton: true,
    },
    {
      target: ".ride-step15",
      title: (
        <b>
          <br />
          Rozpoczęto Naliczanie
          <br />
        </b>
      ),
      content: <div></div>,
      hideCloseButton: true,
      hideBackButton: true,
    },
    {
      target: ".ride-step16",
      title: (
        <b>
          <br />
          Rozpocznij inne zadanie
          <br />
        </b>
      ),
      content: (
        <div>
          Zostaniesz ponownie poproszony o wybranie zadania oraz na jakim
          projekcie jest ono wykonywane. <br />
          <br /> Po rozpoczęciu innego zadania godziny pracy zostaną za ciebie
          wypełnione.
        </div>
      ),
      hideCloseButton: true,
      hideBackButton: true,
    },
    {
      target: ".ride-step17",
      title: (
        <b>
          <br />
          Oś czasu
          <br />
        </b>
      ),
      content: (
        <div>
          Po kliknięciu masz wgląd do wszystkich wykonywanych dzisiaj zadań, od
          której godziny do której oraz łączny czas.
        </div>
      ),
      hideCloseButton: true,
      hideBackButton: true,
    },
    {
      target: ".ride-step18",
      title: (
        <b>
          <br />
          Zakończ Zadanie
          <br />
        </b>
      ),
      content: (
        <div>
          Czas zostanie zatrzymany oraz automatycznie wypełnimy za ciebie
          dziennik pracy.
        </div>
      ),
      hideCloseButton: true,
      hideBackButton: true,
    },
    {
      target: ".ride-step14",
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
          </div>
        </div>
      ),
      hideCloseButton: true,
      hideBackButton: true,
      placement: "center",
    },
    {
      target: ".ride-step14",
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

  useEffect(() => {
    if (props.redirectToMKM) {
      SendMeEmail(
        "Ktos wlasnie otworzyl demo ze strony i oglada ewidencja czasu pracy demo ADMIN"
      );
    }

    return () => {
      if (props.redirectToMKM) {
        SendMeEmail(
          "Ktos wlasnie opuscil demo ze strony ewidencja czasu pracy demo ADMIN"
        );
      }
    };
  }, []);
  const HandleTabClick = (type: CurrentActiveTab) => {
    return () => {
      setCurrentActive(type);
    };
  };

  const JourneyCallback = (data: any) => {
    const { action, index, status, type } = data;
    console.log(data);
    if ([EVENTS.STEP_AFTER /* , EVENTS.TARGET_NOT_FOUND */].includes(type)) {
      setCurrentStep(index + (action === ACTIONS.PREV ? -1 : 1));
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
  };

  const HandleStartJoyRide = () => {
    setRunJoyRide(true);
    setCurrentStep(1);
    setCurrentActive(CurrentActiveTab.MYTIMESHEET);
  };

  useEffect(() => {
    console.log(currentStep);
    if (currentStep === 1) {
      setCurrentActive(CurrentActiveTab.MYTIMESHEET);
    }

    if (currentStep === 10) {
      setCurrentActive(CurrentActiveTab.ACTIVITYCODES);
    }
    if (currentStep === 13) {
      setCurrentActive(CurrentActiveTab.MYSCANNER);
    }
    if (currentStep === 14) {
      setCurrentActive(CurrentActiveTab.MYTASKS);
    }

    if (currentStep === 22) {
      if (props.redirectToMKM) {
        window.location.href = "https://app.mkmprofessionals.com/register";
      } else {
        window.location.reload();
      }
    }
  }, [currentStep]);

  return (
    <div className={props.className}>
      <p className="has-text-centered">
        <button
          onClick={HandleStartJoyRide}
          className="button is-dark has-text-warning animate-demo-btn is-large"
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
      <DemoMyClockInVsTimeSheetHours
        numberOfhours={38}
        currentActive="timesheet"
      />
      <br />

      <div className="tabs is-centered">
        <ul>
          <li
            onClick={HandleTabClick(CurrentActiveTab.MYTIMESHEET)}
            className={` ${
              currentActive == CurrentActiveTab.MYTIMESHEET
                ? "is-active ride-step1"
                : ""
            } `}
          >
            <a>Moje Godziny</a>
          </li>

          <li
            onClick={HandleTabClick(CurrentActiveTab.MYSCANNER)}
            className={`ride-step10 ${
              currentActive == CurrentActiveTab.MYSCANNER ? "is-active" : ""
            } `}
          >
            <a>Mój Scanner</a>
          </li>

          <li
            onClick={HandleTabClick(CurrentActiveTab.ACTIVITYCODES)}
            className={`ride-step7 ${
              currentActive == CurrentActiveTab.ACTIVITYCODES ? "is-active" : ""
            } `}
          >
            <a>Kody Zadań</a>
          </li>

          <li
            onClick={HandleTabClick(CurrentActiveTab.MYTASKS)}
            className={`ride-step11 ${
              currentActive == CurrentActiveTab.MYTASKS ? "is-active" : ""
            } `}
          >
            <a>Zadania</a>
          </li>
        </ul>
      </div>
      <div className="ts-components-container">
        {currentActive == CurrentActiveTab.MYTIMESHEET && (
          <DemoTimeSheetComponent currentStep={currentStep} />
        )}

        {currentActive == CurrentActiveTab.ACTIVITYCODES && (
          <div className="activity-code-container">
            <p className="has-text-centered heading-info-text-primary ">
              Wybierz Zadanie
            </p>
            <DropDownListComponent
              className="ride-step8"
              placeholder="Projektowanie"
              showClearButton={false}
              width={500}
              allowFiltering={true}
              dataSource={["Zadanie 1", "Zadanie 2", "Zadanie 3"]}
              popupHeight="350px"
            />

            <br />
            <br />
            <p className="qr">
              <i className="fas fa-qrcode ride-step9"></i>
            </p>
          </div>
        )}

        {currentActive == CurrentActiveTab.MYSCANNER && (
          <p className="has-text-centered is-size-2">
            Ta opcja jest wyłączona podczas demo
          </p>
        )}

        {currentActive == CurrentActiveTab.MYTASKS && (
          <>
            {currentStep <= 16 && (
              <>
                <div className="activity-code-container ride-step12">
                  <p className="has-text-centered heading-info-text-primary ">
                    Rozpocznij nową aktywność
                  </p>
                  <br />
                  <br />
                  <p className="label has-text-left">Wybierz Zadanie</p>
                  <DropDownListComponent
                    placeholder="Księgowość"
                    showClearButton={false}
                    width={500}
                    allowFiltering={true}
                    dataSource={["Projektowanie", "Autocad", "Delegacja"]}
                    popupHeight="350px"
                  />

                  <br />
                  <br />
                  <p className="label has-text-left">Wybierz Projekt</p>
                  <DropDownListComponent
                    placeholder="Projekt X - 1945"
                    showClearButton={false}
                    width={500}
                    allowFiltering={true}
                    dataSource={[
                      "Projekt X - 1945",
                      "Projekt Y - 1965",
                      "Projekt Z - 2245",
                    ]}
                    popupHeight="350px"
                  />

                  <br />
                  <br />
                </div>
                <div className="has-text-centered">
                  <button
                    onClick={() => setCurrentStep(17)}
                    className={`button ride-step13 is-primary is-large`}
                  >
                    Rozpocznij
                  </button>
                </div>
              </>
            )}

            {currentStep >= 17 && (
              <div className="demo-tasks ride-step15">
                <p className="is-size-2">
                  <i className="fas fa-hourglass-half ride-step17"></i>
                </p>
                <br /> <br />
                <span className="tag is-primary">Projekt X - 1945</span>
                <br /> <br />
                <span className="tag is-light tag-task">Księgowość</span>
                <br /> <br />
                <span className="tag is-primary">
                  {/*@ts-ignore*/}
                  <Timer
                    formatValue={(value: any) =>
                      `${value < 10 ? `0${value}` : value}`
                    }
                    direction="forward"
                  >
                    <Timer.Hours />:
                    <Timer.Minutes />:
                    <Timer.Seconds />
                  </Timer>
                </span>
                <br /> <br />
                <button
                  onClick={() => setCurrentStep(16)}
                  className="button is-info ride-step16"
                >
                  Rozpocznij inne zadanie
                </button>
                <br />
                <button
                  onClick={() => setCurrentStep(16)}
                  className="button is-danger ride-step18"
                >
                  Zakończ zadanie
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export const DEMOUserTimeshet = styled(Component)`
  font-size: 1.6rem;
  .ts-components-container {
    position: relative;
  }

  .activity-code-container {
    display: flex;
    flex-direction: column;

    align-items: center;

    @media screen and (max-width: 550px) {
      height: 65vh;
    }

    .e-input-group {
      margin: 0 auto;
      @media screen and (max-width: 550px) {
        width: 300px !important;
      }
    }

    .qr {
      text-align: center;
      font-size: 70px;
    }
  }

  .demo-tasks {
    position: relative;
    display: flex;
    flex-direction: column;
    text-align: center;

    align-items: center;
    .tag-task {
      box-shadow: black 2px 3px 5px -1px;
      color: #00d1b2 !important;
    }

    .time-text {
      font-size: 3rem;
    }
    .tag {
      width: 500px;
      font-size: 2.6rem;

      @media screen and (max-width: 550px) {
        width: 300px !important;
      }
    }

    @media screen and (max-width: 550px) {
      height: 65vh;
    }

    .e-input-group {
      margin: 0 auto;
      @media screen and (max-width: 550px) {
        width: 300px !important;
      }
    }

    button {
      width: 300px;
      margin-top: 2rem;
      font-size: 2rem !important;

      @media screen and (max-width: 550px) {
        width: 200px !important;
      }
    }

    .label {
      text-align: left;
    }

    .fa-hourglass-half {
      position: absolute;
      top: 4rem;
      right: 4rem;

      @media screen and (max-width: 550px) {
        top: 1rem;
        right: 1rem;
      }
      &:hover {
        cursor: pointer;
        transform: scale(1.5);
        color: #00d1b2;
      }
    }
  }
`;
export default DEMOUserTimeshet;
