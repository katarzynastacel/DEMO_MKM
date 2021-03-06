import {
  ColumnChooser,
  ColumnDirective,
  ColumnMenu,
  ColumnsDirective,
  Edit,
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
import Timer from "react-compound-timer";
import styled from "styled-components";
import { getTimeFromDate } from "../../../../helpers/timeHelper";

interface IComponentProps {
  className?: string;
}

interface ICurrentUserComputerInfo {
  id: number;
  machineUserName: string;
  companyName: string;
  machineName: string;
  myIP: string;
  status: string;
  spoffedName: string;
  userName: string;
  uniqueID: string;
  activeApp: string;
  time: string;
}

const pageOptions: PageSettingsModel = {
  pageSizes: ["10", "25", "50", "100", "200", "500"],
  pageSize: 50,
};

let filterSettings: any = { mode: "Immediate", type: "Excel" };

let toolbarOptions: any = ["Search", "ExcelExport", "CsvExport"];
let gridInstance: any;

let data: any = [
  {
    activeApp: "chrome - Platforma do zarządzania firmą online - Google Chrome",
    companyName: "MKM PROFESSIONALS",
    id: 7,
    machineName: "LAPTOP-NHNTSMAK",
    machineUserName: "Laptop173",
    myIP: "192.112.7.80",
    spoffedName: "Dział IT",
    status: "ONLINE",
    time: getTimeFromDate(),
    uniqueID: "fbf4fe192.168.0.60_7-2b22-499c-9",
    userName: "Jan Kowalski",
  },

  {
    activeApp:
      "chrome - Zenek Martyniuk (Akcent) - Przez Twe Oczy Zielone - YouTube",
    companyName: "MKM PROFESSIONALS",
    id: 7,
    machineName: "LAPTOP-SPOTI",
    machineUserName: "Laptop12",
    myIP: "192.178.0.60",
    spoffedName: "Dział IT",
    status: "ONLINE",
    time: getTimeFromDate(),
    uniqueID: "fbf4fe192.168.0.60_7-2b22-499c-9",
    userName: "Karol Kowalski",
  },

  {
    activeApp: "chrome - Facebook – log in or sign up - Google Chrome",
    companyName: "MKM PROFESSIONALS",
    id: 7,
    machineName: "LAPTOP-SPOTI",
    machineUserName: "Laptop07",
    myIP: "192.179.0.61",
    spoffedName: "Dział HR",
    status: "ONLINE",
    time: getTimeFromDate(),
    uniqueID: "fbf4fe192.168.0.60_7-2b22-499c-9",
    userName: "Maria Kowalska",
  },

  {
    activeApp: "",
    companyName: "MKM PROFESSIONALS",
    id: 7,
    machineName: "LAPTOP-SPOTI",
    machineUserName: "Laptop10",
    myIP: "192.179.0.30",
    spoffedName: "Dział HR",
    status: "OFFLINE",
    time: getTimeFromDate(),
    uniqueID: "fbf4fe192.168.0.60_7-2b22-499c-9",
    userName: "Justyna Kowalska",
  },
  {
    activeApp: "EXCEL - Raport - MKM Professionals (3) - Excel",
    companyName: "MKM PROFESSIONALS",
    id: 7,
    machineName: "LAPTOP-SPOTI",
    machineUserName: "Laptop09",
    myIP: "192.179.0.61",
    spoffedName: "Dział Projektanci",
    status: "ONLINE",
    time: getTimeFromDate(),
    uniqueID: "fbf4fe192.168.0.60_7-2b22-499c-9",
    userName: "Karolina Kowalska",
  },
  {
    activeApp:
      "chrome - World of Tanks—Free-to-Play Tank Action MMO. Google Chrome",
    companyName: "MKM PROFESSIONALS",
    id: 7,
    machineName: "LAPTOP-SPOTI",
    machineUserName: "Laptop67",
    myIP: "192.199.0.01",
    spoffedName: "Manager",
    status: "ONLINE",
    time: getTimeFromDate(),
    uniqueID: "fbf4fe192.168.0.60_7-2b22-499c-9",
    userName: "Kamil Kowalski",
  },
];

const Component: React.FunctionComponent<IComponentProps> = (
  props: IComponentProps
) => {
  const [activeComputers, setActiveComputers] = useState<
    ICurrentUserComputerInfo[]
  >(data);

  const [refreshRate, setRefreshRate] = useState(30000);

  const toolbarClick = () => {
    return (args: any) => {
      switch (args.item.text) {
        case "Excel Export":
          gridInstance.excelExport();
          break;
        case "CSV Export":
          gridInstance.csvExport();
          break;
      }
    };
  };

  const statusTemplate = (row: ICurrentUserComputerInfo) => {
    if (row.status === "ONLINE") {
      return <span className="tag is-success">ONLINE</span>;
    } else {
      return <span className="tag is-danger">OFFLINE</span>;
    }
  };

  const getActivityDuration = (time: string) => {
    var datetime_start = new Date();
    var datetime_now = new Date();

    let start: any = time.split(":");

    datetime_start.setHours(start[0], start[1], start[2]);

    var totalseconds: any =
      //@ts-ignore
      Math.abs(new Date(datetime_start) - new Date(datetime_now)) / 1000;

    return (
      //@ts-ignore
      <Timer
        formatValue={(value: any) => `${value < 10 ? `0${value}` : value}`}
        initialTime={totalseconds * 1000}
        direction="forward"
      >
        <Timer.Hours />:
        <Timer.Minutes />:
        <Timer.Seconds />
      </Timer>
    );
  };

  const ActivityTemplate = (rowData: ICurrentUserComputerInfo) => {
    if (!rowData.time) {
      return <p></p>;
    }

    if (!rowData.activeApp) {
      return <p></p>;
    }

    return (
      <div className="control">
        <div className="tags has-addons">
          <span className="tag is-dark">
            {getActivityDuration(rowData.time)}
          </span>
          <span className="tag is-info">{rowData.activeApp}</span>
        </div>
      </div>
    );
  };

  const HandleClick = () => {
    alert("Opcja dostępna będzie po zarejestrowaniu");
  };

  return (
    <div className={props.className}>
      <div className="options-container">
        {true && (
          <button onClick={HandleClick} className="button is-info ">
            <i className="fas fa-wifi"></i> Connection reset{" "}
            <i className="fas fa-wifi"></i>
          </button>
        )}
        <br />

        <div>
          <label className="label">
            <i className="fas fa-sync-alt"></i>{" "}
            {`Sychronizacja co ${refreshRate / 1000} sekund `}
          </label>
        </div>
      </div>

      <GridComponent
        dataSource={activeComputers}
        filterSettings={filterSettings}
        toolbar={toolbarOptions}
        ref={(grid) => (gridInstance = grid)}
        allowFiltering={true}
        allowResizing={true}
        editSettings={{ allowEditing: false }}
        allowPaging={true}
        pageSettings={pageOptions}
        allowSorting={true}
        allowGrouping={true}
        showColumnMenu={true}
        allowExcelExport={true}
        allowPdfExport={true}
        // recordDoubleClick={HandleRowClick}
        toolbarClick={toolbarClick()}
        height="700px"
      >
        <ColumnsDirective>
          {/*   <ColumnDirective type="checkbox" width="50"></ColumnDirective> */}
          <ColumnDirective
            field="id"
            headerText="ID"
            isPrimaryKey={true}
            visible={false}
            width="120"
          />

          <ColumnDirective
            field="userName"
            allowEditing={true}
            headerText="Pracownik"
            width="110"
          />

          <ColumnDirective
            field="spoffedName"
            allowEditing={true}
            headerText="Twoja Nazwa"
            width="110"
          />

          <ColumnDirective
            template={statusTemplate}
            field="status"
            headerText="Status"
            allowEditing={false}
            width="110"
          />
          <ColumnDirective
            field="activeApp"
            allowEditing={false}
            template={ActivityTemplate}
            headerText="Aktywność Teraz"
            width="350"
          />

          <ColumnDirective
            allowEditing={false}
            field="myIP"
            headerText="Device IP"
            width="112"
          />
          <ColumnDirective
            field="machineName"
            headerText="Nazwa Urzadzenia"
            allowEditing={false}
            width="112"
          />
          <ColumnDirective
            field="machineUserName"
            allowEditing={false}
            headerText="Nazwa Uzytkownika"
            width="112"
          />
        </ColumnsDirective>
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
            Edit,
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
    </div>
  );
};

export const ConnectedUsers = styled(Component)`
  .button {
    font-size: 1.6rem !important;
  }

  .license-key-container {
    margin-top: 25px;
    .input {
      opacity: 0;
    }
  }

  .download-software {
    font-size: 13rem;
    text-align: center;
    margin-top: 2rem;
    a {
      font-size: 5rem;
    }
    &:hover {
      cursor: pointer;
    }
  }

  .tag {
    font-size: 1.4rem !important;
  }

  .fa-copy {
    margin-left: 25px;
    &:hover {
      cursor: pointer;
    }
  }

  .options-container {
    display: flex;
    justify-content: space-between;
    margin: 0 20px;
  }

  .hover-delete {
    font-size: 16px;
    &:hover {
      cursor: pointer;
    }
  }
`;
