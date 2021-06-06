import {
  ColumnChooser,
  ColumnDirective,
  ColumnMenu,
  ColumnsDirective,
  DetailRow,
  ExcelExport,
  Filter,
  GridComponent,
  Group,
  Inject,
  Page,
  PdfExport,
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

interface IByProjectData {
  projectName: string;
  hoursOnProject: number;
  workersOnProject: number;
}

interface IByTypeData {
  projectName: string;
  totalHoursOnTask: number;
  task: string;
}

export const Component: React.FunctionComponent<IComponent> = (
  props: IComponent
) => {
  const [byProjectData] = useState<IByProjectData[]>([
    { projectName: "Demo Project", hoursOnProject: 735, workersOnProject: 3 },
    { projectName: "Demo Project 2", hoursOnProject: 265, workersOnProject: 2 },
  ]);
  const [byTypeData] = useState<IByTypeData[]>([
    {
      projectName: "Demo Project",
      task: "Projektowanie",
      totalHoursOnTask: 300,
    },
    {
      projectName: "Demo Project",
      task: "Spotkanie z klientem",
      totalHoursOnTask: 275,
    },
    {
      projectName: "Demo Project",
      task: "Delegacja",
      totalHoursOnTask: 130,
    },
    {
      projectName: "Demo Project",
      task: "HR Rozliczanie",
      totalHoursOnTask: 50,
    },
    {
      projectName: "Demo Project 2",
      task: "Design",
      totalHoursOnTask: 160,
    },
    {
      projectName: "Demo Project 2",
      task: "Autocad",
      totalHoursOnTask: 80,
    },
    {
      projectName: "Demo Project 2",
      task: "Delegacja",
      totalHoursOnTask: 25,
    },
  ]);

  let filterSettings: any = { type: "Excel" };
  let toolbarOptions: any = ["Search", "ExcelExport", "PdfExport", "CsvExport"];

  let childGrid: any = {
    dataSource: byTypeData,
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
      {
        field: "projectName",
        headerText: "Projekt",

        width: 75,
      },
      {
        field: "task",
        headerText: "Kategoria",

        width: 75,
      },
      {
        field: "totalHoursOnTask",
        headerText: "Suma Godzin",
        width: 100,
      },
    ],
  };

  return (
    <div className={props.className}>
      <div className="info-container">
        <i
          title="Tutaj widzisz łączną liczbę przepracowanych godzin na wszystkich projektach zdefiniowanych w twojej firmie. Każdy projekt jest rozbity na zdefiniowaną przez ciebie kategorię i ilość godzin spędzonych na poszczególnym zadaniu na projekcie. Przy następnych projektach pozwoli ci to na lepsze określenie ilość godzin potrzebnych do wykonania danego zadania na projekcie."
          className="fas fa-info-circle"
        ></i>
      </div>
      <div className="chart-stats-container fadein">
        <div className="has-text-centered circle-container">
          <label className="label">Kategorie</label>
          <div className="circle-component">7</div>
        </div>{" "}
        <div className="has-text-centered circle-container">
          <label className="label">Suma Godzin</label>
          <div className="circle-component">1000</div>
        </div>{" "}
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
                  headerText="Suma Godzin"
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
                  ExcelExport,
                  PdfExport,
                ]}
              />
            </GridComponent>
          </div>
        </div>
      </div>
    </div>
  );
};

export const GridTotalByProjectType = styled(Component)`
  padding: 0 20px;
  position: relative;
  .label {
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
