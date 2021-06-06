import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface IComponent {
  className?: string;
  currentStep: number;
}

const Component: React.FunctionComponent<IComponent> = (props: IComponent) => {
  const [isTimeSheetCompleted, setIsTimeSheetCompleted] = useState<Boolean>(
    false
  );

  useEffect(() => {
    if (props.currentStep === 8) {
      setIsTimeSheetCompleted(true);
    }
  }, [props.currentStep]);

  return (
    <div className={`${props.className} ride-step6`}>
      <h1 className="title">
        <i className="fas fa-user-clock"></i> MKM Professionals / Jan Kowalski
      </h1>

      <div className="date-picker-component ">
        <DatePickerComponent
          showClearButton={false}
          width="100%"
          format="dd/MM/yyyy"
          value={new Date()}
          className="ride-step3"
        />

        <br />
        <button
          className={`button is-primary ride-step4 ${
            isTimeSheetCompleted ? "disableEvents" : ""
          }`}
        >
          <b> Dodaj Nowy Wiersz +</b>
        </button>
      </div>

      <table
        className={`table ride-step2 is-fullwidth ${
          isTimeSheetCompleted ? "disableEvents" : ""
        }`}
      >
        <thead className="thead">
          <tr>
            <th className="th">Projekt</th>
            <th className="th">Kategoria</th>
            <th className="th">Poniedziałek</th>
            <th className="th">Wtorek</th>
            <th className="th">Środa</th>
            <th className="th">Czwartek</th>
            <th className="th">Piątek</th>
            <th className="th">Sobota</th>
            <th className="th">Niedziela</th>
            <th className="th has-text-info">Suma</th>
            <th></th>
          </tr>
        </thead>

        <tbody className="tbody">
          <tr>
            <td className="th">
              <DropDownListComponent
                showClearButton={false}
                allowFiltering={true}
                dataSource={["Demo Project", "Demo Project 2"]}
                value="Demo Project"
                popupHeight="350px"
              />
            </td>
            <td className="th">
              <DropDownListComponent
                showClearButton={false}
                allowFiltering={true}
                dataSource={["Delegacja", "Projektowanie", "Rysowanie autocad"]}
                value="Projektowanie"
                popupHeight="350px"
              />
            </td>

            <td className="td">
              <input defaultValue="8" className="input" />
            </td>
            <td className="td">
              <input defaultValue="8" className="input" />
            </td>
            <td className="td">
              <input defaultValue="0" className="input" />
            </td>
            <td className="td">
              <input defaultValue="0" className="input" />
            </td>
            <td className="td">
              <input defaultValue="0" className="input" />
            </td>
            <td className="td">
              <input defaultValue="0" className="input" />
            </td>
            <td className="td">
              <input defaultValue="0" className="input" />
            </td>
            <td className="td">
              <p className="has-text-centered">
                <b>{16}</b>
              </p>
            </td>

            <td className="td">
              <p className="has-text-centered has-text-danger trash">
                <i className="fas fa-trash-alt"></i>
              </p>
            </td>
          </tr>

          <tr>
            <td className="th">
              <DropDownListComponent
                placeholder="Projekt 2"
                showClearButton={false}
                allowFiltering={true}
                dataSource={["Demo Project", "Demo Project 2"]}
                value="Demo Project 2"
                popupHeight="350px"
              />
            </td>
            <td className="th">
              <DropDownListComponent
                showClearButton={false}
                allowFiltering={true}
                dataSource={["Delegacja", "Projektowanie", "Rysowanie autocad"]}
                value="Delegacja"
                popupHeight="350px"
              />
            </td>

            <td className="td">
              <input defaultValue="1" className="input" />
            </td>
            <td className="td">
              <input defaultValue="0" className="input" />
            </td>
            <td className="td">
              <input defaultValue="9" className="input" />
            </td>
            <td className="td">
              <input defaultValue="5" className="input" />
            </td>
            <td className="td">
              <input defaultValue="7" className="input" />
            </td>
            <td className="td">
              <input defaultValue="0" className="input" />
            </td>
            <td className="td">
              <input defaultValue="0" className="input" />
            </td>
            <td className="td">
              <p className="has-text-centered">
                <b>{22}</b>
              </p>
            </td>

            <td className="td">
              <p className="has-text-centered has-text-danger trash">
                <i className="fas fa-trash-alt"></i>
              </p>
            </td>
          </tr>

          <tr>
            <td className="th has-text-info"></td>
            <td className="th"></td>

            <td className="td has-text-centered">
              <b>9</b>
            </td>
            <td className="td has-text-centered">
              <b>8</b>
            </td>
            <td className="td has-text-centered">
              <b>9</b>
            </td>
            <td className="td has-text-centered">
              <b>5</b>
            </td>
            <td className="td has-text-centered">
              <b>7</b>
            </td>
            <td className="td has-text-centered">
              <b>0</b>
            </td>
            <td className="td has-text-centered">
              <b>0</b>
            </td>
            <td className="td has-text-centered">
              <b></b>
            </td>

            <td className="td"></td>
          </tr>
        </tbody>
      </table>

      <div className="total-hours">
        <h1 className=" is-large notification is-primary">
          <b>Suma godzin 38</b>
        </h1>

        <button
          className={`button is-info is-large ride-step5 ${
            isTimeSheetCompleted ? "disableEvents is-success" : ""
          }`}
        >
          <div>
            {!isTimeSheetCompleted ? <b>Zatwierdź </b> : <b>Zatwierdzono ✓</b>}
          </div>
        </button>
      </div>
    </div>
  );
};

export const DemoTimeSheetComponent = styled(Component)`
  padding: 50px;
  display: flex;
  flex-direction: column;
  font-size: 1.6rem;
  max-width: 100%;
  overflow: auto;

  input {
    font-size: 1.6rem;
  }
  @media screen and (max-width: 500px) {
    padding: 25px 10px;
  }

  .disableEvents {
    opacity: 0.6;
    pointer-events: none;
  }

  .control {
    .select {
      width: -webkit-fill-available;
    }

    select {
      width: -webkit-fill-available;
    }
  }

  .total-hours {
    font-size: larger;
    width: fit-content;
    text-align: center;
    align-self: flex-end;
    flex-direction: row;

    @media screen and (max-width: 500px) {
      max-width: 180px;
      align-self: flex-start;
    }

    button {
      width: -webkit-fill-available;
    }
  }
  .trash:hover {
    cursor: pointer;
  }

  .date-picker-component {
    align-self: flex-end;

    @media screen and (max-width: 500px) {
      max-width: 180px;
      align-self: flex-start;
    }

    button {
      width: -webkit-fill-available;
      margin: 20px 0 20px 0;

      b {
        font-size: 1.6rem;
      }
    }
  }
`;

export default DemoTimeSheetComponent;
