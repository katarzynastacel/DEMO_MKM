import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";

interface IComponent {
  className?: string;
}

interface IResponse {
  projects: string[];
  users: string[];
}

interface IUserStats {
  task: string;
  totalHoursOnTask: number;
}

export const Component: React.FunctionComponent<IComponent> = (
  props: IComponent
) => {
  const [stats, setStats] = useState<IUserStats[]>([]);

  return (
    <div className={props.className}>
      <div className="info-container">
        <i
          title="Po wybraniu pracownika i projektu zobaczysz ilość przepracowanych godzin przez pracownika na danym projekcie wraz z ilością godzin spędzonych na poszczególnym zadaniu"
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
                    dataSource={["Jan Kowalski", "Karol Bachaj", "Kasia Pazur"]}
                    width={350}
                    allowFiltering={true}
                    placeholder="Wybierz Pracownika"
                    value="Jan Kowalski"
                    popupHeight="270px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="fadein projects-dropdown-container">
          <div>
            <i className="far fa-list-alt"></i>
          </div>
          <div>
            <label className="label">Wybierz Projekt</label>
            <div className="control-pane">
              <div className="control-section">
                <div id="template">
                  <DropDownListComponent
                    dataSource={["Demo Project", "Demo Project 2"]}
                    width={350}
                    allowFiltering={true}
                    value="Demo Project"
                    placeholder="wybierz projekt"
                    popupHeight="270px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <button className={`fadein button is-medium is-primary`}>
          Wykonaj
        </button>
      </div>

      <div className="fadein main-statistics-container">
        <table className="table">
          <tr>
            <th>Kategoria</th>
            <th>Suma Godzin</th>
          </tr>
          <tr>
            <td>Spotkanie z klientem</td>
            <td>27</td>
          </tr>
          <tr>
            <td>Rysowanie autocad</td>
            <td>60</td>
          </tr>
          <tr>
            <td>Projektowanie</td>
            <td>33</td>
          </tr>

          <tr>
            <td>Delegacja</td>
            <td>12</td>
          </tr>
          <tr>
            <td>Meeting</td>
            <td>5</td>
          </tr>
        </table>
        <div className="has-text-centered circle-container">
          <label className="label">Suma Godzin Na Projekcie</label>
          <div className="circle-component">{137}</div>
        </div>
      </div>
    </div>
  );
};

export const UserOnProjectComponent = styled(Component)`
  padding: 0 20px 0 20px;
  position: relative;

  font-size: 1.6rem;
  .label {
    font-size: 1.6rem !important;
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
  .main-statistics-container {
    display: flex;
    justify-content: space-evenly;

    @media screen and (max-width: 550px) {
      justify-content: space-between;
    }

    .table {
      width: 33%;
      margin-top: 75px;
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
      }
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

  .projects-dropdown-container {
    display: flex;
    margin-left: 50px;

    @media screen and (max-width: 1000px) {
      margin-top: 3rem;
      margin-left: 0px;
      margin-bottom: 2rem;
    }
    .fa-list-alt {
      font-size: 2.9rem;
    }
    .control-pane {
      margin-left: 20px;
    }

    .label {
      margin-left: 20px;
    }
  }

  .circle-container {
    margin-top: 150px;
    display: table-footer-group;
    @media screen and (max-width: 1000px) {
      margin-top: 85px;
    }
  }

  .circle-component {
    width: 170px;
    height: 170px;
    border-radius: 50%;
    border: 9px solid #00d1b2;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    font-size: 2.8rem;

    @media screen and (max-width: 1000px) {
      border: 6px solid #00d1b2;
    }

    @media screen and (max-width: 850px) {
      border: 5px solid #00d1b2;
      width: 130px;
      height: 130px;
    }

    @media screen and (max-width: 550px) {
      border: 4px solid #00d1b2;
      width: 100px;
      height: 100px;
    }
  }

  .e-input-group {
    @media screen and (max-width: 450px) {
      width: 250px !important;
    }
  }
`;
