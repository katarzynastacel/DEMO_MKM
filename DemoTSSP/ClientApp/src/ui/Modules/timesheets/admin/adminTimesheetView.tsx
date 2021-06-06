import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { DemoTimeSheetComponent } from "../user/demoTimesheets";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
interface IComponent {
  className?: string;
}

export const Component: React.FunctionComponent<IComponent> = (
  props: IComponent
) => {
  return (
    <div className={props.className}>
      <div className="info-container">
        <i
          title="Godziny pracy są zatwierdzane tygodniowo. Tutaj możesz zobaczyć aktualne bądź wcześniejsze godziny pracy twojego pracownika z wybranego okresu pracy. Możesz również odrzucić zatwierdzone godziny po podaniu komentarza/powodu odrzucenia użytkownik zostanie poproszony o ponowne zaktualizowanie godzin i uwzględnienia zmian podanych w komentarzu podanym przez ciebie, ta opcja jest możliwa tylko wtedy gdy już godziny są zatwierdzone przez pracownika. Po zatwierdzeniu godzin przez pracownika możliwość edycji zostaje wyłączona"
          className="fas fa-info-circle"
        ></i>
      </div>

      <div className="serach-container fadein">
        <div className="employee-dropdown-container">
          <div>
            <i className="fas fa-user-tie"></i>
          </div>
          <div>
            <label className="label">Wybierz Pracownika</label>
            <div className="control-pane">
              <div className="control-section">
                <div id="template">
                  <DropDownListComponent
                    dataSource={[
                      "Jan Kowalski",
                      "Kasia Minor",
                      "Mariola Trzereba",
                    ]}
                    width={350}
                    allowFiltering={true}
                    showClearButton={false}
                    value="Jan Kowalski"
                    popupHeight="270px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="fadein date-dropdown-container">
          <div>
            <i className="far fa-calendar-alt"></i>
          </div>
          <div>
            <label className="label">Wybierz Date</label>
            <div className="control-pane">
              <div className="control-section">
                <div id="template">
                  <DatePickerComponent
                    showClearButton={false}
                    width={350}
                    format="dd/MM/yyyy"
                    value={new Date()}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <button className={`fadein button is-medium is-primary `}>
          Wykonaj{" "}
        </button>
      </div>
      <DemoTimeSheetComponent currentStep={8} />
      <p
        onClick={() =>
          alert(
            "Jeśli godziny pracy są już zatwierdzone zostaną odblokowane i użytkownik będzie miał możliwość wprowadzenia zmian"
          )
        }
        className="has-text-centered"
      >
        <button className={`button is-warning is-large`}>
          Zarządaj Zmiany
        </button>
      </p>
    </div>
  );
};

export const AdminTimsheetsView = styled(Component)`
  position: relative;

  .label {
    font-size: 1.6rem;
  }
  .info-container {
    position: absolute;
    z-index: 1;
    top: 2rem;
    right: 3rem;
    .fa-info-circle {
      font-size: 2.6rem !important;
    }
  }

  .employee-dropdown-container {
    display: flex;

    .fa-user-tie {
      font-size: 3rem;
    }
    .control-pane {
      margin-left: 20px;
    }

    .label {
      margin-left: 20px;
    }
  }

  .date-dropdown-container {
    display: flex;
    margin-left: 50px;

    @media screen and (max-width: 1000px) {
      margin-top: 3rem;
      margin-left: 0px;
      margin-bottom: 2rem;
    }

    .fa-calendar-alt {
      font-size: 2.9rem;
    }
    .control-pane {
      margin-left: 20px;
    }

    .label {
      margin-left: 20px;
      font-size: 1.6rem;
    }
  }
  .serach-container {
    display: flex;
    flex: 1;
    align-items: baseline;
    justify-content: center;

    @media screen and (max-width: 1000px) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .button {
      margin-left: 50px;

      @media screen and (max-width: 1000px) {
        margin-left: 0px;
        width: 15rem;
        font-size: 2rem !important;
        margin-bottom: 2.5rem;
      }
    }
  }
`;
