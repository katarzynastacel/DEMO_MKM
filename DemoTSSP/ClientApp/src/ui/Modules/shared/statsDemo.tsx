import {
  BarSeries,
  Category,
  ChartComponent,
  DataLabel,
  Inject,
  Legend,
  SeriesCollectionDirective,
  SeriesDirective,
  Tooltip,
} from "@syncfusion/ej2-react-charts";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface IComponentProps {
  className?: string;
  numberOfhours: number;
  currentActive: string;
}
interface IWorkedHours {
  userName: string;
  totalWorkedHours: number;
}

const Component: React.FunctionComponent<IComponentProps> = (
  props: IComponentProps
) => {
  const [clockInData, setClockInData] = useState<IWorkedHours[]>([]);
  const [timeSheetData, setTimeSheetData] = useState<IWorkedHours[]>([]);

  useEffect(() => {
    if (props.currentActive === "clockin") {
      setClockInData([
        {
          userName: "Jan Kowalski",
          totalWorkedHours: props.numberOfhours,
        },
      ]);
    }

    if (props.currentActive === "timesheet") {
      setTimeSheetData([
        {
          userName: "Jan Kowalski",
          totalWorkedHours: props.numberOfhours,
        },
      ]);
    }
  }, []);

  return (
    <div className={props.className}>
      <div className="box ride-step14">
        <ChartComponent
          id="charts"
          width="90%"
          height="160px"
          style={{ textAlign: "center" }}
          primaryXAxis={{
            valueType: "Category",
            interval: 1,
            majorGridLines: { width: 0 },
          }}
          primaryYAxis={{
            labelFormat: "{value} H",
            edgeLabelPlacement: "Shift",
            majorGridLines: { width: 0 },
            majorTickLines: { width: 0 },
            lineStyle: { width: 0 },
            labelStyle: {
              color: "transparent",
            },
          }}
          chartArea={{ border: { width: 0 } }}
          title="Moje godziny w tym miesiącu"
          tooltip={{ enable: true }}
          legendSettings={{ visible: false }}
        >
          <Inject
            services={[BarSeries, DataLabel, Category, Legend, Tooltip]}
          />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={timeSheetData}
              xName="userName"
              yName="totalWorkedHours"
              type="Bar"
              name="Moje Wypełnione Godziny Pracy (Timesheet)"
              width={2}
              marker={{
                dataLabel: {
                  visible: true,
                  position: "Top",
                  font: {
                    fontWeight: "600",
                    color: "#ffffff",
                  },
                },
              }}
            ></SeriesDirective>
            <SeriesDirective
              dataSource={clockInData}
              xName="userName"
              yName="totalWorkedHours"
              type="Bar"
              name="Przepracowane Godziny Według Obecności"
              width={2}
              marker={{
                dataLabel: {
                  visible: true,
                  position: "Top",
                  font: {
                    fontWeight: "600",
                    color: "#ffffff",
                  },
                },
              }}
            ></SeriesDirective>
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
  );
};

export const DemoMyClockInVsTimeSheetHours = styled(Component)`
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
    width: 50%;
    margin: 0 auto;

    .serach-button {
      font-size: 2rem !important;
      margin-bottom: 3rem;
    }
  }

  .box {
    margin: 0 auto;
    margin: 2rem;
  }
`;
export default DemoMyClockInVsTimeSheetHours;
