import {
  ColumnChooser,
  ColumnDirective,
  ColumnMenu,
  ColumnsDirective,
  DetailRow,
  Filter,
  GridComponent,
  Group,
  Inject,
  Page,
  Reorder,
  Resize,
  Sort,
  Toolbar,
} from "@syncfusion/ej2-react-grids";
import React, { useState } from "react";
import styled from "styled-components";

interface IComponent {
  className?: string;
}

interface IResponse {
  hoursByProject: IByProjectData[];
  hoursByUser: IByUserData[];
  noUsers: number;
}

interface IByProjectData {
  projectName: string;
  hoursOnProject: number;
  workersOnProject: number;
}

interface IByUserData {
  worker: string;
  totalHoursOnProject: number;
  projectName: string;
}

export const Component: React.FunctionComponent<IComponent> = (
  props: IComponent
) => {
  const [byProjectData, setByProjectData] = useState<IByProjectData[]>([
    { projectName: "Demo Project", hoursOnProject: 735, workersOnProject: 3 },
    { projectName: "Demo Project 2", hoursOnProject: 265, workersOnProject: 2 },
  ]);
  const [byUserData, setByUserData] = useState<IByUserData[]>([
    {
      projectName: "Demo Project",
      worker: "Jan Kowalski",
      totalHoursOnProject: 300,
    },
    {
      projectName: "Demo Project",
      worker: "Maria Kowalska",
      totalHoursOnProject: 275,
    },
    {
      projectName: "Demo Project",
      worker: "Maja Stek",
      totalHoursOnProject: 180,
    },
    {
      projectName: "Demo Project 2",
      worker: "Karol Przemyski",
      totalHoursOnProject: 160,
    },
    {
      projectName: "Demo Project 2",
      worker: "Chian Chun",
      totalHoursOnProject: 105,
    },
  ]);

  let toolbarOptions: any = ["Search", "ExcelExport", "PdfExport", "CsvExport"];

  let childGrid: any = {
    dataSource: byUserData,
    queryString: "projectName",
    allowPaging: true,
    allowExcelExport: true,
    allowSorting: true,
    allowPdfExport: true,
    allowReordering: true,
    allowResizing: true,
    allowFiltering: true,
    showColumnChooser: true,
    showColumnMenu: true,
    toolbar: { toolbarOptions },
    pageSettings: { pageSize: 6, pageCount: 5 },
    filterSettings: { type: "Excel" },
    columns: [
      { field: "projectName", headerText: "Projekt", width: 150 },

      { field: "worker", headerText: "Pracownik", width: 120 },
      { field: "totalHoursOnProject", headerText: "Suma Godzin", width: 150 },
    ],
  };

  /**
   * MAIN GRID
   *
   */

  let gridInstance: any;
  let filterSettings: any = { type: "Excel" };

  return (
    <div className={props.className}>
      <div className="info-container">
        <i
          title="Tutaj widzisz łączną liczbę przepracowanych godzin na wszystkich projektach zdefiniowanych w twojej firmie. Każdy projekt jest rozbity na sumę spędzonych na nim godzin oraz ilość pracowników potrzebnych do pracy na nim. Również możesz zobaczyć ile każdy pracownik przepracował godzin na danym projekcie. Przy następnych projektach pozwoli ci to na lepsze określenie ilość godzin potrzebnych do wykonania kolejnych projektów."
          className="fas fa-info-circle"
        ></i>
      </div>
      <div className="chart-stats-container">
        <div className="has-text-centered circle-container fadein">
          <label className="label">Liczba Projektów </label>
          <div className="circle-component">2</div>
        </div>

        <div className="has-text-centered circle-container">
          <label className="label">Suma Godzin</label>
          <div className="circle-component">1000</div>
        </div>

        <div className="has-text-centered circle-container">
          <label className="label">Pracownicy</label>
          <div className="circle-component">5</div>
        </div>
      </div>

      <div className="fadein">
        <div className="control-pane">
          <div className="control-section">
            <GridComponent
              dataSource={byProjectData}
              ref={(grid) => (gridInstance = grid)}
              childGrid={childGrid}
              allowSorting={true}
              allowGrouping={true}
              allowReordering={true}
              showColumnChooser={true}
              allowResizing={true}
              showColumnMenu={true}
              toolbar={toolbarOptions}
              filterSettings={filterSettings}
              allowFiltering={true}
              allowPaging={true}
              height={380}
              pageSettings={{ pageCount: 3, pageSizes: true }}
              allowExcelExport={true}
              allowPdfExport={true}
            >
              <ColumnsDirective>
                <ColumnDirective
                  field="projectName"
                  headerText="Projekt"
                  width="125"
                />
                <ColumnDirective
                  field="hoursOnProject"
                  headerText="Suma Godzin "
                  width="125"
                />
                <ColumnDirective
                  field="workersOnProject"
                  headerText="Liczba Pracowników"
                  width="180"
                />
              </ColumnsDirective>
              <Inject
                services={[
                  DetailRow,
                  Page,
                  Sort,
                  Group,
                  Reorder,
                  Toolbar,
                  ColumnChooser,
                  Resize,
                  ColumnMenu,
                  Filter,
                ]}
              />
            </GridComponent>
          </div>
        </div>
      </div>
    </div>
  );
};

export const GridTotalByProjectUser = styled(Component)`
  padding: 0 20px;
  position: relative;
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

  .chart-stats-container {
    display: flex;
    justify-content: space-around;
  }

  .circle-container {
    display: table-footer-group;
    margin-bottom: 5px;
  }

  .circle-component {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 4px solid #00d1b2;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    font-size: 1.5rem;

    @media screen and (max-width: 400px) {
      font-size: 2.8rem;
      width: 80px;
      height: 80px;
      border: 2px solid #00d1b2;
    }
  }
`;
