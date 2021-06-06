import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import React from "react";
import styled from "styled-components";

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
          title="Godziny pracy zatwierdzane są tygodniowo. Wybierz poszczególny tydzień żeby zobaczyć kto już zatwierdził swoje godziny w posczegolnym tygodniu a kto nie. Pozwoli ci to na upewnienie się że wszyscy pracownicy rzetelnie wypełniają godziny i nie oszacujesz źle przetargu nowego projektu."
          className="fas fa-info-circle"
        ></i>
      </div>
      <div className="serach-container fadein">
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
                    width={290}
                    format="dd/MM/yyyy"
                    value={new Date()}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="main-submission-container fadein">
        <div className="stats-component">
          <div className="circle1">
            <div className="has-text-centered circle-container checkbox-success">
              <label className="label"> Zatwierdzonych</label>

              <div className="circle-component-confirmed">3</div>
            </div>
          </div>

          <div className="circle2">
            <div className="has-text-centered circle-container">
              <label className="label">Nie Zatwierdzonych</label>

              <div className="circle-component-not-confirmed">2</div>
            </div>
          </div>
        </div>
        <div className="search-by-name">
          <input
            className="input search"
            placeholder="Znajdz pracownika"
          ></input>
        </div>
        <table className="table">
          <thead className="thead">
            <tr className="tr">
              <th className="th">Pracownik</th>
              <th className="th">Status</th>
            </tr>
          </thead>
          <tbody className="tbody">
            <tr className="tr">
              <td className="td">Jan Kowalski</td>
              <td className="td">
                <button className="button  is-primary">Zatwierdzony ✔</button>
              </td>
            </tr>

            <tr className="tr">
              <td className="td">Kasia Minor</td>
              <td className="td">
                <button className="button is-danger">Zatwierdzony ✘</button>
              </td>
            </tr>

            <tr className="tr">
              <td className="td">Karol Wielki</td>
              <td className="td">
                <button className="button is-danger">Zatwierdzony ✘</button>
              </td>
            </tr>

            <tr className="tr">
              <td className="td">Maja Banil</td>
              <td className="td">
                <button className="button  is-primary">Zatwierdzony ✔</button>
              </td>
            </tr>

            <tr className="tr">
              <td className="td">Kamil Markowski</td>
              <td className="td">
                <button className="button  is-primary">Zatwierdzony ✔</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const TimeSheetSubmittions = styled(Component)`
  position: relative;
  font-size: 1.6rem;
  .label {
    font-size: 1.6rem !important;
  }
  .button {
    font-size: 1.6rem !important;
  }
  .input {
    font-size: 1.6rem !important;
  }
  .info-container {
    position: absolute;
    z-index: 1;
    top: 1rem;
    right: 3rem;
    .fa-info-circle {
      font-size: 2.6rem !important;
    }
  }
  .checkbox-container {
    margin: 20px;
  }
  .checkbox-success {
    .e-checkbox-wrapper .e-checkbox:focus + .e-frame.e-check,
    .e-css.e-checkbox-wrapper .e-checkbox:focus + .e-frame.e-check {
      background-color: #00d1b2;
    }
  }
  .search-by-name {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .search {
      margin: 0 50px;
      width: 20%;
    }
  }
  .main-submission-container {
    padding: 20px 0;
    display: flex;
    flex-direction: column;

    .circle-container {
      margin-top: 150px;
      display: table-footer-group;
    }

    .table {
      margin: 0 50px;
    }

    .stats-component {
      display: flex;
      justify-content: space-around;

      @media screen and (max-width: 900px) {
        margin-bottom: 3rem;
      }
    }

    .circle-component-confirmed {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      border: 7px solid #00d1b2;
      display: flex;
      justify-content: center;
      text-align: center;
      align-items: center;
      font-size: 2.6rem;

      @media screen and (max-width: 1000px) {
        width: 100px;
        height: 100px;
        border: 5px solid #00d1b2;
      }

      @media screen and (max-width: 550px) {
        width: 80px;
        height: 80px;
        border: 4px solid #00d1b2;
      }
    }

    .circle-component-not-confirmed {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      border: 7px solid #ff3860;
      display: flex;
      justify-content: center;
      text-align: center;
      align-items: center;
      font-size: 2.6rem;

      @media screen and (max-width: 1000px) {
        width: 100px;
        height: 100px;
        border: 5px solid #ff3860;
      }

      @media screen and (max-width: 550px) {
        width: 80px;
        height: 80px;
        border: 4px solid #ff3860;
      }
    }
  }
  .date-dropdown-container {
    display: flex;
    margin-left: 50px;

    @media screen and (max-width: 850px) {
      margin-left: 0px;
    }
    .fa-calendar-alt {
      font-size: 2.9rem;
    }
    .control-pane {
      margin-left: 20px;
    }

    .label {
      margin-left: 20px;
    }
  }
  .serach-container {
    display: flex;
    flex: 1;
    align-items: baseline;
    justify-content: center;

    @media screen and (max-width: 850px) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .button {
      margin-left: 50px;

      @media screen and (max-width: 850px) {
        font-size: 2.2rem !important;
        margin-top: 2rem;
        margin-left: 0px;
      }

      @media screen and (max-width: 450px) {
        font-size: 1.7rem !important;
        margin-top: 2rem;
        margin-left: 0px;
      }
    }
  }

  .circle1:hover {
    cursor: pointer;
  }
  .circle2:hover {
    cursor: pointer;
  }
`;
