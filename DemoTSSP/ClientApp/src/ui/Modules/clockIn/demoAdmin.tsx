import React, { useEffect, useState } from "react";
import Joyride, { ACTIONS, EVENTS, STATUS, Step } from "react-joyride";
import styled from "styled-components";
import { DEMO_HeaderStats } from "./admin/demoHeaderStats";
import { DEMO_HistoryTableByUser } from "./admin/demoHistoryTableByUser";
import { DEMO_UsersStateTodayTable } from "./admin/demoTodayUsersState";
import { DEMO_UsersWorkingHoursStats } from "./admin/demoWorkingHoursStats";
import { DEMO_WorkingHoursChangeAdmin } from "./admin/demoWorkingtimeChange";

interface IComponent {
  className?: string;
  redirectToMKM: boolean;
}

enum CurrentActiveTab {
  TODAY = "TODAY",
  HISTORYUSER = "HISTORYUSER",
  SUMALLHOURS = "SUMALLHOURS",
  WORKINGTIMECHANGE = "WORKINGTIMECHANGE",
  NOPERMISSIONSFOUND = "NOPERMISSIONSFOUND",
}

const Component: React.FunctionComponent<IComponent> = (props: IComponent) => {
  const [currentActive, setCurrentActive] = useState<CurrentActiveTab>(
    CurrentActiveTab.TODAY
  );
  const [currentStep, setCurrentStep] = useState(1);
  const [runJoyRide, setRunJoyRide] = useState(false);
  const [steps] = useState<Step[]>([
    {
      target: ".ride-step1",
      content: (
        <p>
          Wejdź na wyższy poziom prowadzenia biznesu z MKM Professionals! <br />
          <br /> Podążaj krok za krokiem aby poznać naszą aplikację od A do Z!
        </p>
      ),
      hideCloseButton: true,
      hideBackButton: true,
    },
    {
      target: ".ride-step2",
      title: (
        <b>
          {" "}
          <p style={{ position: "absolute", top: 5, left: 5, fontSize: 11 }}>
            <a
              target="_blank"
              href="https://app.mkmprofessionals.com/demo/clock-in/employee"
            >
              Demo Pracownik
            </a>
          </p>
          Panel Admina <br />
        </b>
      ),
      content: (
        <h2>
          Przedstawia status obecności wszystkich pracowników w czasie
          rzeczywistym. <br />
          <br />
          Na bieżąco widzisz kto jest aktywny, nieobecny lub kto już zakończył
          pracę
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
              href="https://app.mkmprofessionals.com/demo/clock-in/employee"
            >
              Demo Pracownik
            </a>
          </p>
          Status Pracowników <br /> LIVE
        </b>
      ),
      content: (
        <h2>
          Tutaj widzisz status oraz szczegółowe informacje każdego pracownika
          indywidualne. <br />
          <br />
          Czas rozpoczęcia, zakończenia, lokalizację oraz całkowity
          przepracowany czas wliczając w tym przerwy.
          <br />
          <br />
          Dodatkowo jeżeli użytkownik zakończył pracę widoczny będzie
          komentarz/notatka podana na zakończenie dnia.
        </h2>
      ),
      hideCloseButton: true,
      hideBackButton: false,
      placement: "auto",
    },
    {
      target: ".ride-step4",
      title: (
        <b>
          {" "}
          <p style={{ position: "absolute", top: 5, left: 5, fontSize: 11 }}>
            <a
              target="_blank"
              href="https://app.mkmprofessionals.com/demo/clock-in/employee"
            >
              Demo Pracownik
            </a>
          </p>
          Filtry
        </b>
      ),
      content: (
        <h2>
          Prosty wgląd do historii poprzez zmianę daty
          <br /> <br /> Możesz również filtrować dane na bazie statusu lub
          znajdź pracownika w po nazwie używając pola znajdź pracownika
          <br />
        </h2>
      ),
      hideCloseButton: true,
      hideBackButton: false,
    },
    {
      target: ".ride-step5",
      title: (
        <b>
          {" "}
          <p style={{ position: "absolute", top: 5, left: 5, fontSize: 11 }}>
            <a
              target="_blank"
              href="https://app.mkmprofessionals.com/demo/clock-in/employee"
            >
              Demo Pracownik
            </a>
          </p>
          Lokalizacja
        </b>
      ),
      content: (
        <h2>
          Pobierana jest w trakcie rozpoczynania pracy. <br /> <br />
          Kliknij na{" "}
          <i className="fas fa-map-marker-alt has-text-danger is-size-3 location-icon"></i>{" "}
          aby zobaczyć lokalizację.
        </h2>
      ),
      hideCloseButton: true,
      hideBackButton: false,
      isFixed: true,
      placement: "center",
    },
    {
      target: ".ride-step5",
      title: (
        <b>
          {" "}
          <p style={{ position: "absolute", top: 5, left: 5, fontSize: 11 }}>
            <a
              target="_blank"
              href="https://app.mkmprofessionals.com/demo/clock-in/employee"
            >
              Demo Pracownik
            </a>
          </p>
          Lokalizacja
        </b>
      ),
      content: <h2>Na zakończenie pracy lokalizacja jest również pobierana</h2>,
      hideCloseButton: true,
      hideBackButton: false,
    },

    {
      target: ".ride-step6",
      title: (
        <b>
          {" "}
          <p style={{ position: "absolute", top: 5, left: 5, fontSize: 11 }}>
            <a
              target="_blank"
              href="https://app.mkmprofessionals.com/demo/clock-in/employee"
            >
              Demo Pracownik
            </a>
          </p>
          Zakładka Obecność Pracownika
        </b>
      ),
      content: (
        <h2>
          Tutaj masz wgląd do indywidualnej historii przepracowanych godzin
          pracownika <br />
          <br />
        </h2>
      ),
      hideCloseButton: true,
      hideBackButton: true,
    },
    {
      target: ".ride-step7",
      title: (
        <b>
          {" "}
          <p style={{ position: "absolute", top: 5, left: 5, fontSize: 11 }}>
            <a
              target="_blank"
              href="https://app.mkmprofessionals.com/demo/clock-in/employee"
            >
              Demo Pracownik
            </a>
          </p>
          Tryby
        </b>
      ),
      content: (
        <h2>
          Ustaw interesujący cię przedział czasu <br />
          <br />
        </h2>
      ),
      hideCloseButton: true,
      hideBackButton: true,
    },
    {
      target: ".ride-step8",
      title: (
        <b>
          {" "}
          <p style={{ position: "absolute", top: 5, left: 5, fontSize: 11 }}>
            <a
              target="_blank"
              href="https://app.mkmprofessionals.com/demo/clock-in/employee"
            >
              Demo Pracownik
            </a>
          </p>
          Wykonaj
        </b>
      ),
      content: (
        <h2>
          Dane zostały załadowane
          <br />
          <br />
        </h2>
      ),
      hideCloseButton: true,
      hideBackButton: true,
    },
    {
      target: ".ride-step9",
      title: (
        <b>
          {" "}
          <p style={{ position: "absolute", top: 5, left: 5, fontSize: 11 }}>
            <a
              target="_blank"
              href="https://app.mkmprofessionals.com/demo/clock-in/employee"
            >
              Demo Pracownik
            </a>
          </p>
          Zarejestrowana Obecność
        </b>
      ),
      content: <h2>Godziny pracy z wybranego powyżej okresu czasu</h2>,
      hideCloseButton: true,
      hideBackButton: true,
    },
    {
      target: ".ride-step10",
      title: (
        <b>
          {" "}
          <p style={{ position: "absolute", top: 5, left: 5, fontSize: 11 }}>
            <a
              target="_blank"
              href="https://app.mkmprofessionals.com/demo/clock-in/employee"
            >
              Demo Pracownik
            </a>
          </p>
          Zmiany Godzin Pracy
        </b>
      ),
      content: (
        <h2>
          Pracownicy mają możliwość zaktualizowania godzin pracy jeśli jest to
          konieczne.
          <br />
          <br />
          Wszystkie wysłane wnioski o zaktualizowanie godzin pracy będą tutaj
          widoczne. <br />
          <br />
          Dopiero po procesie akceptacji godziny pracy zostaną zaktualizowane
        </h2>
      ),
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
              href="https://app.mkmprofessionals.com/demo/clock-in/employee"
            >
              Demo Pracownik
            </a>
          </p>
          Przykładowy wniosek
        </b>
      ),
      content: "",
      hideCloseButton: true,
      hideBackButton: true,
      placement: "auto",
    },
    {
      target: ".ride-step12",
      title: (
        <b>
          {" "}
          <p style={{ position: "absolute", top: 5, left: 5, fontSize: 11 }}>
            <a
              target="_blank"
              href="https://app.mkmprofessionals.com/demo/clock-in/employee"
            >
              Demo Pracownik
            </a>
          </p>
          Akceptuj/Odrzuć
        </b>
      ),
      content:
        "Po podjęciu decyzji dane zostaną przeniesione do historii z wglądem kto zatwierdzał/odrzucał wniosek",
      hideCloseButton: true,
      hideBackButton: true,
      placement: "auto",
    },
    {
      target: ".ride-step10",
      title: (
        <b>
          {" "}
          <p style={{ position: "absolute", top: 5, left: 5, fontSize: 11 }}>
            <a
              target="_blank"
              href="https://app.mkmprofessionals.com/demo/clock-in/employee"
            >
              Demo Pracownik
            </a>
          </p>
          Zaakceptowano
        </b>
      ),
      content: "Wniosek został zaakceptowany 😊",
      hideCloseButton: true,
      hideBackButton: true,
      placement: "center",
    },
    {
      target: ".ride-step13",
      title: <b>Brak wniosków</b>,
      content: "",
      hideCloseButton: true,
      hideBackButton: true,
    },
    {
      target: ".ride-step14",
      title: (
        <b>
          {" "}
          <p style={{ position: "absolute", top: 5, left: 5, fontSize: 11 }}>
            <a
              target="_blank"
              href="https://app.mkmprofessionals.com/demo/clock-in/employee"
            >
              Demo Pracownik
            </a>
          </p>
          Historia Zmian
        </b>
      ),
      content: (
        <p>
          Tutaj masz wgląd do wszystkich złożonych wniosków przez pracowników
        </p>
      ),
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
              href="https://app.mkmprofessionals.com/demo/clock-in/employee"
            >
              Demo Pracownik
            </a>
          </p>
          Filter
        </b>
      ),
      content: (
        <p>Możliwość wyszukania złożonych wniosków np tylko z tego miesiąca</p>
      ),
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
              href="https://app.mkmprofessionals.com/demo/clock-in/employee"
            >
              Demo Pracownik
            </a>
          </p>{" "}
          Zmień Zakres Dat
        </b>
      ),
      content: <p>Wnioski zostały załadowane</p>,
      hideCloseButton: true,
      hideBackButton: true,
      placement: "center",
    },
    {
      target: ".ride-step17",
      title: (
        <b>
          {" "}
          <p style={{ position: "absolute", top: 5, left: 5, fontSize: 11 }}>
            <a
              target="_blank"
              href="https://app.mkmprofessionals.com/demo/clock-in/employee"
            >
              Demo Pracownik
            </a>
          </p>
          Wnioski
        </b>
      ),
      content: <p>Wszystkie znalezione wnioski</p>,
      hideCloseButton: true,
      hideBackButton: true,
    },
    {
      target: ".ride-step18",
      title: (
        <b>
          {" "}
          <p style={{ position: "absolute", top: 5, left: 5, fontSize: 11 }}>
            <a
              target="_blank"
              href="https://app.mkmprofessionals.com/demo/clock-in/employee"
            >
              Demo Pracownik
            </a>
          </p>
          Podusmowanie godzin
        </b>
      ),
      content: (
        <p>
          Tutaj znajdziesz raport z wszystkich przepracowanych godzin
          pracowników <br />
          <br />W ustawieniach możesz zdefiniować po jakim czasie naliczane są
          nadgodziny np po 8 godzinach a my uwzględnimy to w raporcie.
        </p>
      ),
      hideCloseButton: true,
      hideBackButton: true,
    },
    {
      target: ".ride-step19",
      title: (
        <b>
          {" "}
          <p style={{ position: "absolute", top: 5, left: 5, fontSize: 11 }}>
            <a
              target="_blank"
              href="https://app.mkmprofessionals.com/demo/clock-in/employee"
            >
              Demo Pracownik
            </a>
          </p>
          Filter
        </b>
      ),
      content: (
        <p>
          Możliwość wygenerowania raportu z dowolnego przedziału czasowego np
          miesięcznie lub kwartalnie.
        </p>
      ),
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
              href="https://app.mkmprofessionals.com/demo/clock-in/employee"
            >
              Demo Pracownik
            </a>
          </p>
          Wygeneruj Raport
        </b>
      ),
      content: <p>Raport został wygenerowany</p>,
      hideCloseButton: true,
      hideBackButton: true,
    },
    {
      target: ".ride-step21",
      title: (
        <b>
          {" "}
          <p style={{ position: "absolute", top: 5, left: 5, fontSize: 11 }}>
            <a
              target="_blank"
              href="https://app.mkmprofessionals.com/demo/clock-in/employee"
            >
              Demo Pracownik
            </a>
          </p>
          Raport Przepracowanych Godzin
        </b>
      ),
      content: (
        <p>
          Jednym kliknięciem masz wgląd do wszystkich przepracowanych godzin.
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
      hideBackButton: true,
    },
    {
      target: ".ride-step22",
      title: (
        <b>
          {" "}
          <p style={{ position: "absolute", top: 5, left: 5, fontSize: 11 }}>
            <a
              target="_blank"
              href="https://app.mkmprofessionals.com/demo/clock-in/employee"
            >
              Demo Pracownik
            </a>
          </p>
          Pokaż Wykres
        </b>
      ),
      content: <p>Dane zostaną przeniesione na wykres</p>,
      hideCloseButton: true,
      hideBackButton: true,
    },
    {
      target: ".ride-step22",
      title: (
        <b>
          {" "}
          <p style={{ position: "absolute", top: 5, left: 5, fontSize: 11 }}>
            <a
              target="_blank"
              href="https://app.mkmprofessionals.com/demo/clock-in/employee"
            >
              Demo Pracownik
            </a>
          </p>
          Wykonano
        </b>
      ),
      content: "Dane zostały przeniesione",
      hideCloseButton: true,
      hideBackButton: true,
      placement: "center",
    },
    {
      target: ".ride-step23",
      title: <b>Koniec Demo 😊</b>,
      content: (
        <div>
          <p>
            Dziękujemy, jeśli masz pomysł jak możemy ulepszyć naszą aplikację
            dla ciebie, skontaktuj się z nami. <br />
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
              href="https://app.mkmprofessionals.com/demo/clock-in/employee"
            >
              Zobacz Demo Pracownika
            </a>
          </div>
        </div>
      ),
      hideCloseButton: true,
      hideBackButton: true,
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
  /* 
  useEffect(() => {
    if (props.redirectToMKM) {
      SendMeEmail(
        "Ktos wlasnie otworzyl demo ze strony i oglada demo elektroniczna lista obecnosci demo ADMIN"
      );
    }

    return () => {
      if (props.redirectToMKM) {
        SendMeEmail(
          "Ktos wlasnie opuscil demo ze strony elektroniczna lista obecnosci demo ADMIN"
        );
      }
    };
  }, []); */

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

  useEffect(() => {
    if (currentStep === 6) {
      setCurrentActive(CurrentActiveTab.HISTORYUSER);
    }
    if (currentStep === 10) {
      setCurrentActive(CurrentActiveTab.WORKINGTIMECHANGE);
    }
    if (currentStep === 19) {
      setCurrentActive(CurrentActiveTab.SUMALLHOURS);
    }

    if (currentStep === 28) {
      if (props.redirectToMKM) {
        window.location.href = "https://app.mkmprofessionals.com/register";
      } else {
        window.location.reload();
      }
    }
  }, [currentStep]);

  const HandleTabClick = (type: CurrentActiveTab) => {
    return () => {
      setCurrentActive(type);
    };
  };

  const HandleStartJoyRide = () => {
    setRunJoyRide(true);
    setCurrentActive(CurrentActiveTab.TODAY);
  };
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
      <DEMO_HeaderStats />

      <div className="tabs is-centered">
        <ul>
          <li
            onClick={HandleTabClick(CurrentActiveTab.TODAY)}
            className={` ${
              currentActive == CurrentActiveTab.TODAY ? "is-active" : ""
            } `}
          >
            <a>Dzisiaj</a>
          </li>

          <li
            onClick={HandleTabClick(CurrentActiveTab.HISTORYUSER)}
            className={`ride-step6 ${
              currentActive == CurrentActiveTab.HISTORYUSER ? "is-active" : ""
            } `}
          >
            <a>Obecność Pracownika</a>
          </li>

          <li
            onClick={HandleTabClick(CurrentActiveTab.WORKINGTIMECHANGE)}
            className={`ride-step10 ${
              currentActive == CurrentActiveTab.WORKINGTIMECHANGE
                ? "is-active"
                : ""
            } `}
          >
            <a>
              Zmiany Godzin Pracy
              <>
                <span className="badge-notification">1</span>
              </>
            </a>
          </li>

          <li
            onClick={HandleTabClick(CurrentActiveTab.SUMALLHOURS)}
            className={`ride-step18 ${
              currentActive == CurrentActiveTab.SUMALLHOURS ? "is-active" : ""
            } `}
          >
            <a>Podsumowanie Godzin</a>
          </li>
        </ul>
      </div>
      <div className="clock-in-admin-sub-pages-container">
        {currentActive == CurrentActiveTab.HISTORYUSER && (
          <DEMO_HistoryTableByUser currentStep={currentStep} />
        )}
        {currentActive == CurrentActiveTab.TODAY && (
          <DEMO_UsersStateTodayTable currentStep={currentStep} />
        )}
        {currentActive == CurrentActiveTab.WORKINGTIMECHANGE && (
          <DEMO_WorkingHoursChangeAdmin currentStep={currentStep} />
        )}
        {currentActive == CurrentActiveTab.SUMALLHOURS && (
          <DEMO_UsersWorkingHoursStats currentStep={currentStep} />
        )}
      </div>
    </div>
  );
};

export const DEMO_ADMINClockInAdminPage = styled(Component)`
  .clock-in-admin-sub-pages-container {
    position: relative;
  }
`;

export default DEMO_ADMINClockInAdminPage;
