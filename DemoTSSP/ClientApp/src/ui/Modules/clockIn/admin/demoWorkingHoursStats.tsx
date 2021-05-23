import { SwitchComponent } from "@syncfusion/ej2-react-buttons";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import {
  AccumulationChartComponent,
  AccumulationDataLabel,
  AccumulationLegend,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  AccumulationTooltip,
  Category,
  ChartComponent,
  ColumnSeries,
  DataLabel,
  Inject,
  Legend,
  PieSeries,
  SeriesCollectionDirective,
  SeriesDirective,
  Tooltip,
} from "@syncfusion/ej2-react-charts";
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
  Page,
  PageSettingsModel,
  PdfExport,
  Reorder,
  Resize,
  Sort,
  Toolbar,
} from "@syncfusion/ej2-react-grids";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const pageOptions: PageSettingsModel = {
  pageSizes: ["10", "25", "50", "100", "200", "500"],
  pageSize: 50,
};

let filterSettings: any = { mode: "Immediate", type: "Excel" };

let toolbarOptions: any = ["Search", "ExcelExport", "PdfExport", "CsvExport"];

interface IComponent {
  className?: string;
  currentStep: number;
}

interface IStatsData {
  totalNormalWorkedHours: number;
  totalOverTimeHours: number;
  totalWorkedHours: number;
  userName: string;
}
let gridInstance: any;
export const Component: React.FunctionComponent<IComponent> = (
  props: IComponent
) => {
  const [data, setData] = useState<IStatsData[]>([
    {
      userName: "Jan Kowalski",
      totalWorkedHours: 125,
      totalOverTimeHours: 25,
      totalNormalWorkedHours: 100,
    },
    {
      userName: "Kamila Kowalska",
      totalWorkedHours: 160,
      totalOverTimeHours: 10,
      totalNormalWorkedHours: 150,
    },
    {
      userName: "Jack Kowalski",
      totalWorkedHours: 145,
      totalOverTimeHours: 2,
      totalNormalWorkedHours: 143,
    },
    {
      userName: "Marcin Kowalski",
      totalWorkedHours: 130,
      totalOverTimeHours: 5,
      totalNormalWorkedHours: 125,
    },
    {
      userName: "Maja Kowalska",
      totalWorkedHours: 162,
      totalOverTimeHours: 12,
      totalNormalWorkedHours: 150,
    },
    {
      userName: "Kuba Kowalski",
      totalWorkedHours: 100,
      totalOverTimeHours: 0,
      totalNormalWorkedHours: 100,
    },
    {
      userName: "Karolina Kowalska",
      totalWorkedHours: 125,
      totalOverTimeHours: 0,
      totalNormalWorkedHours: 125,
    },
    {
      userName: "Wiktoria Kowalska",
      totalWorkedHours: 90,
      totalOverTimeHours: 3,
      totalNormalWorkedHours: 87,
    },
  ]);
  const [isGridModeOn, setIsGridModeOn] = useState(false);
  const HandleSwitch = (event: any) => {
    setIsGridModeOn(!isGridModeOn);
  };

  useEffect(() => {
    if (props.currentStep === 21) {
      setData([
        {
          userName: "Jan Kowalski",
          totalWorkedHours: 125,
          totalOverTimeHours: 25,
          totalNormalWorkedHours: 100,
        },
        {
          userName: "Kamila Kowalska",
          totalWorkedHours: 160,
          totalOverTimeHours: 10,
          totalNormalWorkedHours: 150,
        },
        {
          userName: "Jack Kowalski",
          totalWorkedHours: 145,
          totalOverTimeHours: 2,
          totalNormalWorkedHours: 143,
        },
        {
          userName: "Marcin Kowalski",
          totalWorkedHours: 130,
          totalOverTimeHours: 5,
          totalNormalWorkedHours: 125,
        },
        {
          userName: "Maja Kowalska",
          totalWorkedHours: 162,
          totalOverTimeHours: 12,
          totalNormalWorkedHours: 150,
        },
        {
          userName: "Kuba Kowalski",
          totalWorkedHours: 100,
          totalOverTimeHours: 0,
          totalNormalWorkedHours: 100,
        },
        {
          userName: "Karolina Kowalska",
          totalWorkedHours: 125,
          totalOverTimeHours: 0,
          totalNormalWorkedHours: 125,
        },
        {
          userName: "Wiktoria Kowalska",
          totalWorkedHours: 90,
          totalOverTimeHours: 3,
          totalNormalWorkedHours: 87,
        },
      ]);
    }

    if (props.currentStep === 24) {
      setIsGridModeOn(false);
    }
  }, [props.currentStep]);

  return (
    <div className={props.className}>
      <div className="date-range-container fadein">
        <div className="ride-step19 has-text-centered">
          <p className="has-text-centered has-text-primary search-text">
            Wybierz Zakres Dat
          </p>
          <div>
            <div className="control-pane">
              <div className="control-section">
                <div className="daterangepicker-control-section">
                  <DateRangePickerComponent
                    showClearButton={false}
                    width={500}
                    value={[new Date(), new Date()]}
                    placeholder="wybierz zakres dat..."
                    format="dd/MM/yyyy"
                  />
                </div>
              </div>
            </div>
          </div>
          <br />

          <button
            className={`ride-step20 button fadein is-primary serach-button`}
          >
            Wygeneruj Raport
          </button>
        </div>
      </div>

      <div className="switch-chart-type">
        <p>Pokaż Wykres</p>
        <SwitchComponent
          className="ride-step22"
          change={HandleSwitch}
          checked={!isGridModeOn}
        ></SwitchComponent>
      </div>

      {isGridModeOn && (
        <>
          <div className="fadein ride-step21">
            <GridComponent
              dataSource={data}
              ref={(grid) => (gridInstance = grid)}
              filterSettings={filterSettings}
              toolbar={toolbarOptions}
              allowFiltering={true}
              allowResizing={true}
              allowPaging={true}
              pageSettings={pageOptions}
              allowSorting={true}
              allowGrouping={true}
              showColumnMenu={true}
              allowExcelExport={true}
              allowPdfExport={true}
              height="600px"
            >
              <ColumnsDirective>
                <ColumnDirective
                  field="userName"
                  headerText="Pracownik"
                  width="120"
                />
                <ColumnDirective
                  field="totalWorkedHours"
                  headerText="Suma Wszystkich Godzin"
                  width="120"
                  type="number"
                  format="N2"
                />

                <ColumnDirective
                  field="totalNormalWorkedHours"
                  headerText="Suma Zwyklych Godzin"
                  width="120"
                  type="number"
                  format="N2"
                />
                <ColumnDirective
                  field="totalOverTimeHours"
                  headerText="Suma Nadgodzin"
                  width="120"
                  type="number"
                  format="N2"
                />
              </ColumnsDirective>
              <AggregatesDirective>
                <AggregateDirective>
                  <AggregateColumnsDirective>
                    <AggregateColumnDirective
                      type="Sum"
                      format="N2"
                      field="totalOverTimeHours"
                    >
                      {" "}
                    </AggregateColumnDirective>
                    <AggregateColumnDirective
                      type="Sum"
                      field="totalNormalWorkedHours"
                      format="N2"
                    >
                      {" "}
                    </AggregateColumnDirective>
                    <AggregateColumnDirective
                      type="Sum"
                      format="N2"
                      field="totalWorkedHours"
                    >
                      {" "}
                    </AggregateColumnDirective>
                  </AggregateColumnsDirective>
                </AggregateDirective>
              </AggregatesDirective>
              <Inject
                services={[
                  Filter,
                  Sort,
                  Resize,
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
                  Aggregate,
                ]}
              />
            </GridComponent>
          </div>
        </>
      )}

      {data.length > 0 && (
        <div className="columns ride-step23">
          <div className="column is-9">
            {" "}
            {true && (
              <ChartComponent
                id="clockinbased"
                style={{ textAlign: "center" }}
                primaryXAxis={{
                  valueType: "Category",
                  interval: 1,
                  majorGridLines: { width: 0 },
                  tickPosition: "Outside",
                  labelPosition: "Outside",
                  labelStyle: { color: "black" },
                }}
                primaryYAxis={{
                  majorGridLines: { width: 0 },
                  majorTickLines: { width: 0 },
                  lineStyle: { width: 0 },
                  labelStyle: { color: "transparent" },
                }}
                chartArea={{ border: { width: 0 } }}
                title={`Ilość Przepracowanych Godzin (1032)`}
                legendSettings={{ visible: true }}
                tooltip={{ enable: true }}
              >
                <Inject
                  services={[
                    ColumnSeries,
                    DataLabel,
                    Legend,
                    Category,
                    Tooltip,
                  ]}
                />
                <SeriesCollectionDirective>
                  <SeriesDirective
                    dataSource={[
                      {
                        userName: "Jan Kowalski",
                        totalWorkedHours: 125,
                      },
                      {
                        userName: "Kamila Kowalska",
                        totalWorkedHours: 160,
                      },
                      {
                        userName: "Jack Kowalski",
                        totalWorkedHours: 145,
                      },
                      {
                        userName: "Marcin Kowalski",
                        totalWorkedHours: 130,
                      },
                      {
                        userName: "Maja Kowalska",
                        totalWorkedHours: 162,
                      },
                      {
                        userName: "Kuba Kowalski",
                        totalWorkedHours: 100,
                      },
                      {
                        userName: "Karolina Kowalska",
                        totalWorkedHours: 125,
                      },
                      {
                        userName: "Wiktoria Kowalska",
                        totalWorkedHours: 90,
                      },
                    ]}
                    type="Column"
                    xName="userName"
                    width={1}
                    yName="totalWorkedHours"
                    name="Suma Godzin"
                    cornerRadius={{
                      bottomLeft: 10,
                      bottomRight: 10,
                      topLeft: 10,
                      topRight: 10,
                    }}
                    marker={{
                      dataLabel: {
                        visible: true,
                        position: "Top",
                        font: { fontWeight: "600", color: "#ffffff" },
                      },
                    }}
                  ></SeriesDirective>
                  <SeriesDirective
                    dataSource={[
                      {
                        userName: "Jan Kowalski",
                        totalWorkedHours: 25,
                      },
                      {
                        userName: "Kamila Kowalska",
                        totalWorkedHours: 10,
                      },
                      {
                        userName: "Jack Kowalski",
                        totalWorkedHours: 4,
                      },
                      {
                        userName: "Marcin Kowalski",
                        totalWorkedHours: 5,
                      },
                      {
                        userName: "Maja Kowalska",
                        totalWorkedHours: 12,
                      },
                      {
                        userName: "Kuba Kowalski",
                        totalWorkedHours: 0,
                      },
                      {
                        userName: "Karolina Kowalska",
                        totalWorkedHours: 9,
                      },
                      {
                        userName: "Wiktoria Kowalska",
                        totalWorkedHours: 2,
                      },
                    ]}
                    type="Column"
                    xName="userName"
                    width={1}
                    yName="totalWorkedHours"
                    name="Ilość Nadgodzin"
                    cornerRadius={{
                      bottomLeft: 10,
                      bottomRight: 10,
                      topLeft: 10,
                      topRight: 10,
                    }}
                    //  fill="black"
                    marker={{
                      dataLabel: {
                        visible: true,
                        position: "Outer",
                        font: { fontWeight: "600", color: "black" },
                      },
                    }}
                  ></SeriesDirective>
                </SeriesCollectionDirective>
              </ChartComponent>
            )}
          </div>
          <div className="column is-3">
            {true && (
              <AccumulationChartComponent
                id="pie-chart1235s643464"
                title="Godziny / Nadgodziny"
                legendSettings={{ visible: false }}
                enableSmartLabels={true}
                width={"80%"}
                height={"80%"}
                center={{ x: "50%", y: "50%" }}
                tooltip={{
                  enable: true,
                  format: "${point.x} : <b>${point.y} H</b>",
                }}
              >
                <Inject
                  services={[
                    AccumulationLegend,
                    PieSeries,
                    AccumulationTooltip,
                    AccumulationDataLabel,
                  ]}
                />
                <AccumulationSeriesCollectionDirective>
                  <AccumulationSeriesDirective
                    dataSource={[
                      {
                        subject: "Godziny",
                        text: "Suma Godzin (1032)",
                        total: 1032,
                      },
                      {
                        subject: "Nadgodziny",
                        text: "Suma Nadgodzin (67)",
                        total: 67,
                      },
                    ]}
                    name="Rodzaj"
                    xName="subject"
                    yName="total"
                    explode={true}
                    explodeOffset="20%"
                    explodeIndex={0}
                    dataLabel={{
                      visible: true,
                      position: "Outside",
                      name: "text",
                      font: {
                        fontWeight: "600",
                      },
                    }}
                    radius="70%"
                  ></AccumulationSeriesDirective>
                </AccumulationSeriesCollectionDirective>
              </AccumulationChartComponent>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export const DEMO_UsersWorkingHoursStats = styled(Component)`
  .e-input-group {
    @media screen and (max-width: 550px) {
      width: 300px !important;
    }
  }

  .date-range-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
    flex-direction: column;

    .search-text {
      font-style: italic;
      font-size: 4rem;
      margin-bottom: 2rem;
    }

    .serach-button {
      font-size: 2rem !important;
      margin-bottom: 3rem;
    }
  }

  .not-found-text {
    font-size: 3rem;
    margin-top: 3rem;
    font-weight: 700;
  }

  .switch-chart-type {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    margin-right: 20px;
    margin-bottom: 20px;
  }
`;
