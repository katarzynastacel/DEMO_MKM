import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  DetailRow,
  Page,
  Sort,
  Group,
  Reorder,
  Toolbar,
  ColumnChooser,
  Resize,
  ColumnMenu,
  FilterType,
  Filter,
  ExcelExport,
  PdfExport,
} from "@syncfusion/ej2-react-grids";
import Timer from "react-compound-timer";
import { TimeLineComponent } from "../../shared/timeLineModal";
interface IComponentProps {
  className?: string;
}

let toolbarOptions: any = ["Search", "ExcelExport", "CsvExport"];
const filterSettings: any = { type: "Excel" };
let gridInstance: any;

interface ILiveData {
  activity: string;
  department: string;
  location: string;
  projectName: string;
  startTime: string;
  totalSeconds: number;
  userName: string;
  position: string;
}

let defaultData: ILiveData[] = [
  {
    activity: "Autocad",
    department: "Projektanci",
    location: "Londyn",
    projectName: "DEMO - 1234",
    startTime: "12:00:00",
    totalSeconds: 20,
    userName: "Jan Kowalski",
    position: "Architekt",
  },
  {
    activity: "Ksiegowosc",
    department: "HR",
    location: "Warszawa",
    projectName: "DEMO - 4302 ",
    startTime: "12:00:00",
    totalSeconds: 20,
    userName: "Karolina Kowalski",
    position: "Dyrektor",
  },
];
interface IResponse {
  data: ILiveData[];
  companyName: string;
}

const Component: React.FunctionComponent<IComponentProps> = (
  props: IComponentProps
) => {
  const [data, setData] = useState<ILiveData[]>(defaultData);
  const [isTimeLineModalActive, setIsTimeLineModalActive] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setData([
        ...data,
        {
          activity: "Autocad",
          department: "Projektanci",
          location: "Warszawa",
          projectName: "Project Z",
          startTime: "16:10:40",
          totalSeconds: 20,
          userName: "Karolina Kowalski",
          position: "Dyrektor",
        },
      ]);
    }, 1000);
    setTimeout(() => {
      setData([
        ...data,
        {
          activity: "Projektowanie",
          department: "Projektanci",
          location: "Londyn",
          projectName: "Project Y",
          startTime: "12:50:10",
          totalSeconds: 20,
          userName: "Witek Kowalski",
          position: "Junior",
        },
        {
          activity: "Autocad",
          department: "Projektanci",
          location: "Warszawa",
          projectName: "Demo 98462",
          startTime: "16:22:11",
          totalSeconds: 20,
          userName: "Karolina Kowalski",
          position: "Dyrektor",
        },
      ]);
    }, 2000);
    setTimeout(() => {
      setData([
        ...data,
        {
          activity: "Projektowanie",
          department: "Projektanci",
          location: "Kraków",
          projectName: "Project Y",
          startTime: "06:52:03",
          totalSeconds: 20,
          userName: "Witek Kowalski",
          position: "Mid",
        },
        {
          activity: "Autocad",
          department: "Projektanci",
          location: "Kraków",
          projectName: "Project X",
          startTime: "12:22:00",
          totalSeconds: 20,
          userName: "Karolina Kowalski",
          position: "Senior",
        },
        {
          activity: "Delegacja",
          department: "Sales",
          location: "Perth",
          projectName: "Demo 1231",
          startTime: "14:10:00",
          totalSeconds: 20,
          userName: "Marcel Kowalski",
          position: "Architekt",
        },
      ]);
    }, 3000);
    setTimeout(() => {
      setData([
        ...data,
        {
          activity: "Projektowanie",
          department: "Projektanci",
          location: "Warszawa",
          projectName: "Project Y",
          startTime: "07:00:10",
          totalSeconds: 20,
          userName: "Witek Kowalski",
          position: "Junior",
        },
        {
          activity: "Autocad",
          department: "Projektanci",
          location: "Kraków",
          projectName: "Project X",
          startTime: "12:00:52",
          totalSeconds: 20,
          userName: "Karolina Kowalski",
          position: "Dyrektor",
        },
        {
          activity: "Delegacja",
          department: "Sales",
          location: "Perth",
          projectName: "Demo 1231",
          startTime: "16:30:07",
          totalSeconds: 20,
          userName: "Marcel Kowalski",
          position: "Senior",
        },
        {
          activity: "Autocad",
          department: "Projektanci",
          location: "Warszawa",
          projectName: "Project Z -3215",
          startTime: "17:36:00",
          totalSeconds: 20,
          userName: "Julka Sad",
          position: "Dyrektor",
        },
      ]);
    }, 5000);
    setTimeout(() => {
      setData([
        ...data,
        {
          activity: "Projektowanie",
          department: "Projektanci",
          location: "Warszawa",
          projectName: "Project Y",
          startTime: "15:00:05",
          totalSeconds: 20,
          userName: "Witek Kowalski",
          position: "Junior",
        },
        {
          activity: "Autocad",
          department: "Projektanci",
          location: "Warszawa",
          projectName: "Project X",
          startTime: "09:00:00",
          totalSeconds: 20,
          userName: "Maja Pawlak",
          position: "Dyrektor",
        },
        {
          activity: "Delegacja",
          department: "Sales",
          location: "Perth",
          projectName: "Demo 1231",
          startTime: "06:45:00",
          totalSeconds: 20,
          userName: "Marcel Kowalski",
          position: "Junior",
        },
        {
          activity: "Autocad",
          department: "IT",
          location: "Warszawa",
          projectName: "Project Z -3215",
          startTime: "11:20:00",
          totalSeconds: 20,
          userName: "Maria Cyrnek",
          position: "Senior",
        },
        {
          activity: "Autocad",
          department: "IT",
          location: "Warszawa",
          projectName: "Project X",
          startTime: "13:00:00",
          totalSeconds: 20,
          userName: "John Kowalski",
          position: "Senior",
        },
      ]);
    }, 7000);
  }, []);

  const getActivityDurationTemplate = (record: ILiveData) => {
    if (record.startTime) {
      var datetime_start = new Date();
      var datetime_now = new Date();

      let start: any = record.startTime.split(":");

      var totalseconds: any =
        //@ts-ignore
        Math.abs(new Date(datetime_start) - new Date(datetime_now)) / 1000;

      return (
        <span className="tag is-primary is-large is-light">
          {/*@ts-ignore*/}
          <Timer
            formatValue={(value: any) => `${value < 10 ? `0${value}` : value}`}
            initialTime={totalseconds * 1000}
            direction="forward"
          >
            <Timer.Hours />:
            <Timer.Minutes />:
            <Timer.Seconds />
          </Timer>
        </span>
      );
    }
  };

  const getStartTimeTemplate = (record: ILiveData) => {
    if (record.startTime) {
      return <span className="tag is-link is-light">{record.startTime}</span>;
    }
  };

  const projectTemplate = (record: ILiveData) => {
    return <span className="tag  is-dark">{record.projectName}</span>;
  };

  const activityTemplate = (record: ILiveData) => {
    return <span className="tag  is-dark">{record.activity}</span>;
  };

  const nameTemplate = (record: ILiveData) => {
    return <span className="tag  is-warning">{record.userName}</span>;
  };

  const locationTemplate = (record: ILiveData) => {
    return <span className="tag  is-light">{record.location}</span>;
  };

  const positionTemplate = (record: ILiveData) => {
    return <span className="tag  is-light">{record.position}</span>;
  };

  const departmentTemplate = (record: ILiveData) => {
    return <span className="tag  is-light">{record.department}</span>;
  };

  const timeLineTeplate = (record: ILiveData) => {
    return (
      <p className="has-text-centered" onClick={HandleTimeLineClick}>
        <i className="fas fa-user-clock"></i>
      </p>
    );
  };

  const HandleTimeLineClose = () => {
    setIsTimeLineModalActive(false);
  };

  const HandleTimeLineClick = () => {
    setIsTimeLineModalActive(true);
  };
  //is-info is-light
  return (
    <div className={props.className}>
      {isTimeLineModalActive && (
        <TimeLineComponent onClose={HandleTimeLineClose} />
      )}
      <p className="has-text-centered heading-info-text-primary ">
        Aktywnych Użytkowników ({data.length})
      </p>
      <div className="control-section">
        <GridComponent
          dataSource={data}
          ref={(grid) => (gridInstance = grid)}
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
          height="700px"
          pageSettings={{ pageCount: 3, pageSizes: true }}
          allowExcelExport={true}
        >
          <ColumnsDirective>
            <ColumnDirective
              field="userName"
              headerText="Pracownik"
              template={nameTemplate}
              width="120"
            />
            <ColumnDirective
              field="position"
              headerText="Tytuł"
              template={positionTemplate}
              width="150"
            />
            <ColumnDirective
              field="location"
              headerText="Lokalizacja"
              template={locationTemplate}
              width="150"
            />
            <ColumnDirective
              field="department"
              headerText="Dzial"
              template={departmentTemplate}
              width="130"
            />
            <ColumnDirective
              field="projectName"
              headerText="Projekt"
              template={projectTemplate}
              width="120"
            />
            <ColumnDirective
              field="activity"
              template={activityTemplate}
              headerText="Aktywnosc"
              width="120"
            />

            <ColumnDirective
              field="startTime"
              headerText="Rozpoczecie"
              template={getStartTimeTemplate}
              width="120"
            />
            <ColumnDirective
              field="totalSeconds"
              headerText="Czas Aktywnosc"
              template={getActivityDurationTemplate}
              width="120"
            />
            <ColumnDirective
              field="quality"
              headerText="Oś Czasu"
              template={timeLineTeplate}
              width="120"
            />
          </ColumnsDirective>
          <Inject
            services={[Filter, Page, Sort, Resize, Reorder, ColumnMenu, Group]}
          />
        </GridComponent>
      </div>
    </div>
  );
};

export const LivePanel = styled(Component)`
  height: 100%;
  .tag {
    width: 100%;
    font-size: 1.6rem !important;
  }

  .fa-user-clock {
    font-size: 2rem;
    text-align: center;

    &:hover {
      cursor: pointer;
    }
  }
`;
export default LivePanel;
