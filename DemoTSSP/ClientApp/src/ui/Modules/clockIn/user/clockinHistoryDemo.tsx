import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import {
  Aggregate,
  AggregateColumnDirective,
  AggregateColumnsDirective,
  AggregateDirective,
  AggregatesDirective,
  ColumnChooser,
  ColumnDirective,
  ColumnMenu,
  ColumnsDirective,
  ExcelExport,
  Filter,
  GridComponent,
  Group,
  Inject,
  Page,
  PageSettingsModel,
  PdfExport,
  Reorder,
  Resize,
  Sort,
  Toolbar,
} from "@syncfusion/ej2-react-grids";
import React, { useState } from "react";
import { TimePickerComponent } from "@syncfusion/ej2-react-calendars";
import styled from "styled-components";

interface IComponent {
  className?: string;
}

export interface ITableData {
  id: number;
  user: string;
  totaWorkTime: string;
  date: string;
  workStartedAt: string;
  workfinishedAt: string;
  totalTimeOnBreak: string;
}

const pageOptions: PageSettingsModel = {
  pageSizes: ["10", "25", "50", "100", "200", "500"],
  pageSize: 50,
};

let filterSettings: any = { mode: "Immediate", type: "Excel" };

let toolbarOptions: any = ["Search", "ExcelExport", "PdfExport", "CsvExport"];

export const Component: React.FunctionComponent<IComponent> = (
  props: IComponent
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [modes] = useState<string[]>([
    "Ostatnie 7 dni",
    "Ostatnie 14 dni",
    "Ostatnie 30 dni",
    "Ostatnie 60 dni",
    "Ostatnie 90 dni",
  ]);
  const [includeWeekends] = useState<string[]>(["NIE", "TAK"]);
  const [currentRowToEdit, setCurrentRowToEdit] = useState<any>();
  const onConfirm = () => {
    setIsLoading(false);
    setIsReady(true);
  };

  const HandleEditWorkingHours = (data: any) => {
    return () => {
      setCurrentRowToEdit({
        id: data.id,
        startTime: data.workStartedAt,
        endTime: data.workfinishedAt,
        date: data.date,
      });
    };
  };

  const EditWorkingHoursOnGivenDay = (event: any) => {
    return (
      <p
        id={`${event.id === 1 ? "clockin-ride-step18" : ""}`}
        className="  has-text-info hover-edit ride-step18"
        onClick={HandleEditWorkingHours(event)}
      >
        <i className="fas fa-pen ride-step18"></i>
      </p>
    );
  };

  const CloseEditModal = () => {
    setCurrentRowToEdit(undefined);
  };

  return (
    <div className={`${props.className}`}>
      {currentRowToEdit && (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title has-text-info is-size-2">
                <i className="fas fa-pen"></i> Edycja Godzin Pracy{" "}
              </p>
              <button
                id="clockin-ride-step20"
                onClick={CloseEditModal}
                className="delete"
                aria-label="close"
              ></button>
            </header>
            <section className="modal-card-body">
              <p className="has-text-centered has-text-info ride-step19">
                <b>
                  {" "}
                  Prośba o zaktualizowanie godzin zostanie wysłana do
                  zatwierdzenia.
                  <br />
                  Dopiero po zatwierdzeniu przez przełożonego godziny zostaną
                  zaktualizowane.
                </b>
              </p>
              <br />

              <>
                <label className="label">Godzina rozpoczęcia pracy</label>
                <div className="control-pane format">
                  <div className="control-section">
                    <div className="timepicker-control-section">
                      <TimePickerComponent
                        placeholder="Wybierz godzinę rozpoczęcia pracy"
                        step={1}
                        format={"HH:mm:ss"}
                        showClearButton={false}
                        allowEdit={false}
                        value={new Date()}
                      ></TimePickerComponent>
                    </div>
                  </div>
                </div>
              </>

              <br />
              <br />

              <>
                <label className="label">Godzina zakończenia pracy</label>
                <div className="control-pane format">
                  <div className="control-section">
                    <div className="timepicker-control-section">
                      <TimePickerComponent
                        placeholder="Wybierz godzinę zakończenia pracy"
                        step={1}
                        format={"HH:mm:ss"}
                        showClearButton={false}
                        allowEdit={false}
                        value={new Date()}
                      ></TimePickerComponent>
                    </div>
                  </div>
                </div>
              </>

              <br />
              <label className="label">Dodaj Komentarz</label>
              <textarea className="textarea"></textarea>
              <br />
            </section>
            <footer className="modal-card-foot">
              <button
                onClick={CloseEditModal}
                className="button is-primary ride-step20"
              >
                Wyślij Zmiany
              </button>
            </footer>
          </div>
        </div>
      )}
      <div className="dropdowns-container fadein">
        <div className="employee-dropdown-container fadein">
          <div>
            <i className="fas fa-hourglass-half"></i>
          </div>
          <div>
            <label className="label">Wybierz Okres</label>
            <div className="control-pane">
              <div className="control-section">
                <div id="template">
                  <DropDownListComponent
                    dataSource={modes}
                    width={250}
                    allowFiltering={true}
                    showClearButton={false}
                    placeholder="Wybierz okres czasu"
                    value={modes[0]}
                    popupHeight="270px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="employee-dropdown-container fadein">
          <div>
            <i className="far fa-question-circle"></i>
          </div>
          <div>
            <label className="label">Pokaż Soboty/Niedziele</label>
            <div className="control-pane">
              <div className="control-section">
                <div id="template">
                  <DropDownListComponent
                    dataSource={includeWeekends}
                    width={250}
                    allowFiltering={true}
                    showClearButton={false}
                    placeholder="Pokaz Soboty/Niedziele"
                    value={includeWeekends[0]}
                    popupHeight="270px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          id="clockin-ride-step16"
          onClick={onConfirm}
          className={`ride-step16 fadein button is-medium is-primary confirm-button ${
            isLoading == true ? "is-loading" : ""
          } `}
        >
          Wykonaj{" "}
        </button>
      </div>

      {!isLoading && isReady && (
        <GridComponent
          className="ride-step17"
          dataSource={[
            {
              date: "12/11/2021",
              id: 1,
              totaWorkTime: "07:30:00",
              totalTimeOnBreak: "00:15:00",
              workStartedAt: "10:00:00",
              workfinishedAt: "17:30:00",
            },
            {
              date: "13/11/2021",
              id: 2,
              totaWorkTime: "08:00:00",
              totalTimeOnBreak: "00:00:00",
              workStartedAt: "09:00:00",
              workfinishedAt: "17:00:00",
            },
            {
              date: "14/11/2021",
              id: 3,
              totaWorkTime: "08:00:00",
              totalTimeOnBreak: "00:00:00",
              workStartedAt: "07:00:00",
              workfinishedAt: "16:00:00",
            },
            {
              date: "15/11/2021",
              id: 4,
              totaWorkTime: "08:30:00",
              totalTimeOnBreak: "00:00:00",
              workStartedAt: "06:00:00",
              workfinishedAt: "15:30:00",
            },
            {
              date: "16/11/2021",
              id: 5,
              totaWorkTime: "08:40:00",
              totalTimeOnBreak: "00:00:00",
              workStartedAt: "09:00:00",
              workfinishedAt: "17:40:00",
            },
          ]}
          enableVirtualization={false}
          allowFiltering={true}
          filterSettings={filterSettings}
          allowResizing={true}
          allowPaging={true}
          pageSettings={pageOptions}
          allowSorting={true}
          toolbar={toolbarOptions}
          allowGrouping={true}
          showColumnMenu={true}
          allowExcelExport={true}
          allowPdfExport={true}
          height="600px"
        >
          <ColumnsDirective>
            <ColumnDirective
              field="id"
              headerText="id"
              isPrimaryKey={true}
              visible={false}
              width="120"
            />
            <ColumnDirective field="date" headerText="Data" width="135" />
            <ColumnDirective
              field="workStartedAt"
              headerText="Start"
              width="120"
            />
            <ColumnDirective
              field="workfinishedAt"
              headerText="Koniec"
              width="120"
            />

            <ColumnDirective
              field="totaWorkTime"
              headerText="Przepracowano"
              format="D2"
              width="130"
            />
            <ColumnDirective
              field="totalTimeOnBreak"
              headerText=" W tym przerwy"
              width="130"
            />
            <ColumnDirective
              headerText="Edit"
              width="130"
              template={EditWorkingHoursOnGivenDay}
            />
          </ColumnsDirective>
          <AggregatesDirective>
            <AggregateDirective>
              <AggregateColumnsDirective>
                <AggregateColumnDirective field="totaWorkTime" type="Sum" />
              </AggregateColumnsDirective>
            </AggregateDirective>
          </AggregatesDirective>
          <Inject
            services={[
              Filter,
              Sort,
              Resize,
              Aggregate,
              Group,
              Page,
              Filter,
              Page,
              Sort,
              Resize,
              Reorder,
              Toolbar,
              ColumnMenu,
              Toolbar,
              ColumnChooser,
              Group,
              ExcelExport,
              PdfExport,
            ]}
          />
        </GridComponent>
      )}
    </div>
  );
};

export const DemoMyClockInHistory = styled(Component)`
  .dropdowns-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 3rem;
    @media screen and (max-width: 820px) {
      flex-direction: column;
    }

    .employee-dropdown-container {
      display: flex;
      margin-right: 2rem;

      @media screen and (max-width: 820px) {
        margin-right: 0rem;
        margin-bottom: 3.2rem;
      }

      .fa-user-tie {
        font-size: 3rem;
      }
      .control-pane {
        margin-left: 20px;

        @media screen and (max-width: 820px) {
          margin-left: 0rem;
        }
      }

      .label {
        margin-left: 20px;

        @media screen and (max-width: 820px) {
          margin-left: 0rem;
        }
      }
    }
  }

  .confirm-button {
    @media screen and (max-width: 820px) {
      width: 50%;
      font-size: 2rem !important;
      margin-bottom: 2.5rem;
    }
  }

  .table {
    width: 95%;
    margin: 0 auto;

    td {
      vertical-align: middle;
    }

    thead {
      background-color: #00d1b2 !important;
      th {
        color: white;
      }
    }

    tr {
      &:hover {
        background-color: #00d1b2 !important;
        color: white;
        font-weight: 700;
      }
    }
  }

  .hover-edit {
    &:hover {
      cursor: pointer !important;

      font-size: 18px;
    }
  }
`;

export default DemoMyClockInHistory;
