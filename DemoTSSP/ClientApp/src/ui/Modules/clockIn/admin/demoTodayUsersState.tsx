import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";

import { Spinner } from "../../shared/spinner";
import { LocationModal } from "./locationMap";

import { EditStartEndTimeAdminModal } from "./editStartEndTimeAdmin";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
interface IComponent {
  className?: string;
  currentStep: number;
}

export interface ITableData {
  id: number;
  finishLocation: string;
  startLocation: string;
  status: string;
  totaWorkTime: string;
  user: string;
  workStartedAt: string;
  workfinishedAt: string;
  totalTimeOnBreak: string;
  endOfTheDayComment: string;
  startAccuracy: number;
  endAccuracy: number;
}

interface IResponse {
  data: ITableData[];
  companyName: string;
}

enum EmployeeStatus {
  IN_WORK = "IN_WORK",
  FINISHED = "FINISHED",
  NOT_IN_WORK = "NOT_IN_WORK",
  HOLIDAY = "HOLIDAY",
}

export enum LocationType {
  WORKSTART = "WORKSTART",
  WORKEND = "WORKEND",
}

export const Component: React.FunctionComponent<IComponent> = (
  props: IComponent
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationType>();
  const [selectedRecord, setSelectedRecord] = useState<ITableData>();
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [isEditTimeModalActive, setIsEditTimeModalActive] = useState(false);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [data, setData] = useState<ITableData[]>([
    {
      id: 1,
      finishLocation: "-",
      startLocation: "-",
      status: "NOT_IN_WORK",
      totaWorkTime: "-",
      user: "Jan Kowalski",
      workStartedAt: "-",
      workfinishedAt: "-",
      totalTimeOnBreak: "-",
      endOfTheDayComment: "",
      startAccuracy: 50,
      endAccuracy: 50,
    },

    {
      id: 2,
      finishLocation: "-",
      startLocation: "-",
      status: "NOT_IN_WORK",
      totaWorkTime: "-",
      user: "Karol Kowalski",
      workStartedAt: "-",
      workfinishedAt: "-",
      totalTimeOnBreak: "-",
      endOfTheDayComment: "",
      startAccuracy: 50,
      endAccuracy: 50,
    },

    {
      id: 3,
      finishLocation: "-",
      startLocation: "-",
      status: "NOT_IN_WORK",
      totaWorkTime: "-",
      user: "Barbara Kowalska",
      workStartedAt: "-",
      workfinishedAt: "-",
      totalTimeOnBreak: "-",
      endOfTheDayComment: "",
      startAccuracy: 50,
      endAccuracy: 50,
    },
    {
      id: 4,
      finishLocation: "-",
      startLocation: "-",
      status: "NOT_IN_WORK",
      totaWorkTime: "-",
      user: "Maja Kowalska",
      workStartedAt: "-",
      workfinishedAt: "-",
      totalTimeOnBreak: "-",
      endOfTheDayComment: "",
      startAccuracy: 50,
      endAccuracy: 50,
    },
    {
      id: 5,
      finishLocation: "-",
      startLocation: "-",
      status: "NOT_IN_WORK",
      totaWorkTime: "-",
      user: "Mateusz Kowalski",
      workStartedAt: "-",
      workfinishedAt: "-",
      totalTimeOnBreak: "-",
      endOfTheDayComment: "",
      startAccuracy: 50,
      endAccuracy: 50,
    },
    {
      id: 6,
      finishLocation: "-",
      startLocation: "-",
      status: "NOT_IN_WORK",
      totaWorkTime: "-",
      user: "Agnieszka Kowalska",
      workStartedAt: "-",
      workfinishedAt: "-",
      totalTimeOnBreak: "-",
      endOfTheDayComment: "",
      startAccuracy: 50,
      endAccuracy: 50,
    },
  ]);

  useEffect(() => {
    setTimeout(() => {
      setData([
        {
          id: 1,
          finishLocation: "-",
          startLocation: "demo location",
          status: "IN_WORK",
          totaWorkTime: "-",
          user: "Jan Kowalski",
          workStartedAt: "7:25:00",
          workfinishedAt: "-",
          totalTimeOnBreak: "-",
          endOfTheDayComment: "",
          startAccuracy: 50,
          endAccuracy: 50,
        },

        {
          id: 2,
          finishLocation: "-",
          startLocation: "-",
          status: "NOT_IN_WORK",
          totaWorkTime: "-",
          user: "Karol Kowalski",
          workStartedAt: "-",
          workfinishedAt: "-",
          totalTimeOnBreak: "-",
          endOfTheDayComment: "",
          startAccuracy: 50,
          endAccuracy: 50,
        },

        {
          id: 4,
          finishLocation: "-",
          startLocation: "demo location",
          status: "IN_WORK",
          totaWorkTime: "-",
          user: "Maja Kowalski",
          workStartedAt: "8:00:00",
          workfinishedAt: "-",
          totalTimeOnBreak: "-",
          endOfTheDayComment: "",
          startAccuracy: 50,
          endAccuracy: 50,
        },
        {
          id: 5,
          finishLocation: "-",
          startLocation: "-",
          status: "NOT_IN_WORK",
          totaWorkTime: "-",
          user: "Mateusz Kowalski",
          workStartedAt: "-",
          workfinishedAt: "-",
          totalTimeOnBreak: "-",
          endOfTheDayComment: "",
          startAccuracy: 50,
          endAccuracy: 50,
        },
        {
          id: 6,
          finishLocation: "-",
          startLocation: "-",
          status: "NOT_IN_WORK",
          totaWorkTime: "-",
          user: "Agnieszka Kowalska",
          workStartedAt: "-",
          workfinishedAt: "-",
          totalTimeOnBreak: "-",
          endOfTheDayComment: "",
          startAccuracy: 50,
          endAccuracy: 50,
        },
      ]);
    }, 11000);

    setTimeout(() => {
      setData([
        {
          id: 1,
          finishLocation: "-",
          startLocation: "demo location",
          status: "IN_WORK",
          totaWorkTime: "-",
          user: "Jan Kowalski",
          workStartedAt: "7:25:00",
          workfinishedAt: "-",
          totalTimeOnBreak: "-",
          endOfTheDayComment: "",
          startAccuracy: 50,
          endAccuracy: 50,
        },

        {
          id: 2,
          finishLocation: "-",
          startLocation: "-",
          status: "HOLIDAY",
          totaWorkTime: "-",
          user: "Karol Kowalski",
          workStartedAt: "-",
          workfinishedAt: "-",
          totalTimeOnBreak: "-",
          endOfTheDayComment: "",
          startAccuracy: 50,
          endAccuracy: 50,
        },

        {
          id: 4,
          finishLocation: "-",
          startLocation: "demo location",
          status: "IN_WORK",
          totaWorkTime: "-",
          user: "Maja Kowalski",
          workStartedAt: "8:00:00",
          workfinishedAt: "-",
          totalTimeOnBreak: "-",
          endOfTheDayComment: "",
          startAccuracy: 50,
          endAccuracy: 50,
        },
        {
          id: 5,
          finishLocation: "-",
          startLocation: "-",
          status: "NOT_IN_WORK",
          totaWorkTime: "-",
          user: "Mateusz Kowalski",
          workStartedAt: "-",
          workfinishedAt: "-",
          totalTimeOnBreak: "-",
          endOfTheDayComment: "",
          startAccuracy: 50,
          endAccuracy: 50,
        },
        {
          id: 6,
          finishLocation: "-",
          startLocation: "-",
          status: "NOT_IN_WORK",
          totaWorkTime: "-",
          user: "Agnieszka Kowalska",
          workStartedAt: "-",
          workfinishedAt: "-",
          totalTimeOnBreak: "-",
          endOfTheDayComment: "",
          startAccuracy: 50,
          endAccuracy: 50,
        },
      ]);
    }, 13000);
    setTimeout(() => {
      setData([
        {
          id: 1,
          finishLocation: "-",
          startLocation: "demo location",
          status: "IN_WORK",
          totaWorkTime: "-",
          user: "Jan Kowalski",
          workStartedAt: "7:25:00",
          workfinishedAt: "-",
          totalTimeOnBreak: "-",
          endOfTheDayComment: "",
          startAccuracy: 50,
          endAccuracy: 50,
        },

        {
          id: 2,
          finishLocation: "-",
          startLocation: "-",
          status: "HOLIDAY",
          totaWorkTime: "-",
          user: "Karol Kowalski",
          workStartedAt: "-",
          workfinishedAt: "-",
          totalTimeOnBreak: "-",
          endOfTheDayComment: "",
          startAccuracy: 50,
          endAccuracy: 50,
        },

        {
          id: 4,
          finishLocation: "-",
          startLocation: "demo location",
          status: "IN_WORK",
          totaWorkTime: "-",
          user: "Maja Kowalski",
          workStartedAt: "8:00:00",
          workfinishedAt: "-",
          totalTimeOnBreak: "-",
          endOfTheDayComment: "",
          startAccuracy: 50,
          endAccuracy: 50,
        },
        {
          id: 5,
          /*    finishLocation: "52.229, 21.0122",
                startLocation: "52.2297, 21.0122", */
          finishLocation: "-",
          startLocation: "demo location",
          status: "IN_WORK",
          totaWorkTime: "-",
          user: "Mateusz Kowalski",
          workStartedAt: "09:12:23",
          workfinishedAt: "-",
          totalTimeOnBreak: "-",
          endOfTheDayComment: "",
          startAccuracy: 50,
          endAccuracy: 50,
        },
        {
          id: 6,
          /*    finishLocation: "52.229, 21.0122",
                startLocation: "52.2297, 21.0122", */
          finishLocation: "-",
          startLocation: "-",
          status: "NOT_IN_WORK",
          totaWorkTime: "-",
          user: "Agnieszka Kowalska",
          workStartedAt: "-",
          workfinishedAt: "-",
          totalTimeOnBreak: "-",
          endOfTheDayComment: "",
          startAccuracy: 50,
          endAccuracy: 50,
        },
      ]);
    }, 15000);

    setTimeout(() => {
      setData([
        {
          id: 1,
          /*    finishLocation: "52.229, 21.0122",
              startLocation: "52.2297, 21.0122", */
          finishLocation: "-",
          startLocation: "demo location",
          status: "FINISHED",
          totaWorkTime: "08:00:00",
          user: "Jan Kowalski",
          workStartedAt: "7:30:00",
          workfinishedAt: "14:30:00",
          totalTimeOnBreak: "-",
          endOfTheDayComment:
            "What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s ",
          startAccuracy: 50,
          endAccuracy: 50,
        },

        {
          id: 2,
          /*    finishLocation: "52.229, 21.0122",
                startLocation: "52.2297, 21.0122", */
          finishLocation: "-",
          startLocation: "-",
          status: "HOLIDAY",
          totaWorkTime: "-",
          user: "Karol Kowalski",
          workStartedAt: "-",
          workfinishedAt: "-",
          totalTimeOnBreak: "-",
          endOfTheDayComment: "",
          startAccuracy: 50,
          endAccuracy: 50,
        },
        {
          id: 4,
          /*    finishLocation: "52.229, 21.0122",
                startLocation: "52.2297, 21.0122", */
          finishLocation: "-",
          startLocation: "demo location",
          status: "IN_WORK",
          totaWorkTime: "-",
          user: "Maja Kowalski",
          workStartedAt: "8:00:00",
          workfinishedAt: "-",
          totalTimeOnBreak: "-",
          endOfTheDayComment: "",
          startAccuracy: 50,
          endAccuracy: 50,
        },
        {
          id: 5,
          /*    finishLocation: "52.229, 21.0122",
                  startLocation: "52.2297, 21.0122", */
          finishLocation: "-",
          startLocation: "demo location",
          status: "IN_WORK",
          totaWorkTime: "-",
          user: "Mateusz Kowalski",
          workStartedAt: "09:12:23",
          workfinishedAt: "-",
          totalTimeOnBreak: "-",
          endOfTheDayComment: "",
          startAccuracy: 50,
          endAccuracy: 50,
        },
        {
          id: 6,
          /*    finishLocation: "52.229, 21.0122",
                  startLocation: "52.2297, 21.0122", */
          finishLocation: "-",
          startLocation: "-",
          status: "NOT_IN_WORK",
          totaWorkTime: "-",
          user: "Agnieszka Kowalska",
          workStartedAt: "-",
          workfinishedAt: "-",
          totalTimeOnBreak: "-",
          endOfTheDayComment: "",
          startAccuracy: 50,
          endAccuracy: 50,
        },
      ]);
    }, 16000);

    setTimeout(() => {
      setData([
        {
          id: 1,
          /*    finishLocation: "52.229, 21.0122",
                startLocation: "52.2297, 21.0122", */
          finishLocation: "-",
          startLocation: "demo location",
          status: "FINISHED",
          totaWorkTime: "08:00:00",
          user: "Jan Kowalski",
          workStartedAt: "7:30:00",
          workfinishedAt: "14:30:00",
          totalTimeOnBreak: "-",
          endOfTheDayComment: "",
          startAccuracy: 50,
          endAccuracy: 50,
        },

        {
          id: 2,
          /*    finishLocation: "52.229, 21.0122",
                  startLocation: "52.2297, 21.0122", */
          finishLocation: "-",
          startLocation: "-",
          status: "HOLIDAY",
          totaWorkTime: "-",
          user: "Karol Kowalski",
          workStartedAt: "-",
          workfinishedAt: "-",
          totalTimeOnBreak: "-",
          endOfTheDayComment: "",
          startAccuracy: 50,
          endAccuracy: 50,
        },

        {
          id: 3,
          /*    finishLocation: "52.229, 21.0122",
                  startLocation: "52.2297, 21.0122", */
          finishLocation: "-",
          startLocation: "-",
          status: "NOT_IN_WORK",
          totaWorkTime: "-",
          user: "Barbara Kowalska",
          workStartedAt: "-",
          workfinishedAt: "-",
          totalTimeOnBreak: "-",
          endOfTheDayComment: "",
          startAccuracy: 50,
          endAccuracy: 50,
        },
        {
          id: 4,
          /*    finishLocation: "52.229, 21.0122",
                  startLocation: "52.2297, 21.0122", */
          finishLocation: "demo location",
          startLocation: "demo location",
          status: "FINISHED",
          totaWorkTime: "04:50:30",
          user: "Maja Kowalski",
          workStartedAt: "8:00:23",
          workfinishedAt: "12:50:12",
          totalTimeOnBreak: "-",
          endOfTheDayComment: "",
          startAccuracy: 50,
          endAccuracy: 50,
        },
        {
          id: 5,
          /*    finishLocation: "52.229, 21.0122",
                    startLocation: "52.2297, 21.0122", */
          finishLocation: "-",
          startLocation: "demo location",
          status: "IN_WORK",
          totaWorkTime: "-",
          user: "Mateusz Kowalski",
          workStartedAt: "09:12:23",
          workfinishedAt: "-",
          totalTimeOnBreak: "-",
          endOfTheDayComment: "",
          startAccuracy: 50,
          endAccuracy: 50,
        },
        {
          id: 6,
          /*    finishLocation: "52.229, 21.0122",
                    startLocation: "52.2297, 21.0122", */
          finishLocation: "-",
          startLocation: "-",
          status: "NOT_IN_WORK",
          totaWorkTime: "-",
          user: "Agnieszka Kowalska",
          workStartedAt: "-",
          workfinishedAt: "-",
          totalTimeOnBreak: "-",
          endOfTheDayComment: "",
          startAccuracy: 50,
          endAccuracy: 50,
        },
      ]);
    }, 17000);

    setTimeout(() => {
      setData([
        {
          id: 1,
          /*    finishLocation: "52.229, 21.0122",
                  startLocation: "52.2297, 21.0122", */
          finishLocation: "-",
          startLocation: "demo location",
          status: "FINISHED",
          totaWorkTime: "08:00:00",
          user: "Jan Kowalski",
          workStartedAt: "7:30:00",
          workfinishedAt: "14:30:00",
          totalTimeOnBreak: "-",
          endOfTheDayComment: "Demo!",
          startAccuracy: 50,
          endAccuracy: 50,
        },

        {
          id: 2,
          /*    finishLocation: "52.229, 21.0122",
                    startLocation: "52.2297, 21.0122", */
          finishLocation: "-",
          startLocation: "-",
          status: "HOLIDAY",
          totaWorkTime: "-",
          user: "Karol Kowalski",
          workStartedAt: "-",
          workfinishedAt: "-",
          totalTimeOnBreak: "-",
          endOfTheDayComment: "",
          startAccuracy: 50,
          endAccuracy: 50,
        },
        {
          id: 4,
          /*    finishLocation: "52.229, 21.0122",
                    startLocation: "52.2297, 21.0122", */
          finishLocation: "demo location",
          startLocation: "demo location",
          status: "FINISHED",
          totaWorkTime: "04:50:30",
          user: "Maja Kowalski",
          workStartedAt: "8:00:23",
          workfinishedAt: "12:50:12",
          totalTimeOnBreak: "-",
          endOfTheDayComment: "",
          startAccuracy: 50,
          endAccuracy: 50,
        },
        {
          id: 5,
          /*    finishLocation: "52.229, 21.0122",
                      startLocation: "52.2297, 21.0122", */
          finishLocation: "demo location",
          startLocation: "demo location",
          status: "FINISHED",
          totaWorkTime: "03:20:26",
          user: "Maja Kowalski",
          workStartedAt: "9:00:20",
          workfinishedAt: "12:20:11",
          totalTimeOnBreak: "-",
          endOfTheDayComment: "",
          startAccuracy: 50,
          endAccuracy: 50,
        },
        {
          id: 6,
          /*    finishLocation: "52.229, 21.0122",
                      startLocation: "52.2297, 21.0122", */
          finishLocation: "-",
          startLocation: "-",
          status: "NOT_IN_WORK",
          totaWorkTime: "-",
          user: "Agnieszka Kowalska",
          workStartedAt: "-",
          workfinishedAt: "-",
          totalTimeOnBreak: "-",
          endOfTheDayComment: "",
          startAccuracy: 50,
          endAccuracy: 50,
        },
      ]);
    }, 19000);

    setTimeout(() => {
      setData([
        {
          id: 1,
          /*    finishLocation: "52.229, 21.0122",
                    startLocation: "52.2297, 21.0122", */
          finishLocation: "-",
          startLocation: "demo location",
          status: "FINISHED",
          totaWorkTime: "08:00:00",
          user: "Jan Kowalski",
          workStartedAt: "7:30:00",
          workfinishedAt: "14:30:00",
          totalTimeOnBreak: "-",
          endOfTheDayComment: "Demo!",
          startAccuracy: 50,
          endAccuracy: 50,
        },

        {
          id: 2,
          /*    finishLocation: "52.229, 21.0122",
                      startLocation: "52.2297, 21.0122", */
          finishLocation: "-",
          startLocation: "-",
          status: "HOLIDAY",
          totaWorkTime: "-",
          user: "Karol Kowalski",
          workStartedAt: "-",
          workfinishedAt: "-",
          totalTimeOnBreak: "-",
          endOfTheDayComment: "",
          startAccuracy: 50,
          endAccuracy: 50,
        },

        {
          id: 4,
          /*    finishLocation: "52.229, 21.0122",
                      startLocation: "52.2297, 21.0122", */
          finishLocation: "demo location",
          startLocation: "demo location",
          status: "FINISHED",
          totaWorkTime: "04:50:30",
          user: "Maja Kowalski",
          workStartedAt: "8:00:23",
          workfinishedAt: "12:50:12",
          totalTimeOnBreak: "-",
          endOfTheDayComment: "",
          startAccuracy: 50,
          endAccuracy: 50,
        },
        {
          id: 5,
          /*    finishLocation: "52.229, 21.0122",
                        startLocation: "52.2297, 21.0122", */
          finishLocation: "demo location",
          startLocation: "demo location",
          status: "FINISHED",
          totaWorkTime: "03:20:26",
          user: "Maja Kowalski",
          workStartedAt: "9:00:20",
          workfinishedAt: "12:20:11",
          totalTimeOnBreak: "-",
          endOfTheDayComment: "",
          startAccuracy: 50,
          endAccuracy: 50,
        },
        {
          id: 6,
          /*    finishLocation: "52.229, 21.0122",
                        startLocation: "52.2297, 21.0122", */
          finishLocation: "-",
          startLocation: "demo",
          status: "IN_WORK",
          totaWorkTime: "-",
          user: "Agnieszka Kowalska",
          workStartedAt: "16:40:00",
          workfinishedAt: "-",
          totalTimeOnBreak: "-",
          endOfTheDayComment: "",
          startAccuracy: 50,
          endAccuracy: 50,
        },
      ]);
    }, 21000);
  }, []);

  useEffect(() => {
    if (props.currentStep === 4 || props.currentStep === 5) {
      HandleStartLocationClick();
    } else {
      setShowLocationModal(false);
    }
  }, [props.currentStep]);

  const getStatusTemplate = (value: string) => {
    switch (value) {
      case EmployeeStatus.FINISHED:
        return <div className="clockin-filter-box2">Zakończył Prace</div>;

      case EmployeeStatus.IN_WORK:
        return <div className="clockin-filter-box3">Pracuje</div>;

      case EmployeeStatus.NOT_IN_WORK:
        return <div className="clockin-filter-box4">Nieobecny</div>;

      case EmployeeStatus.HOLIDAY:
        return <div className="clockin-filter-box5">Urlop</div>;
    }
  };

  const HandleRecordChange = (record: ITableData) => {
    setSelectedRecord(record);
  };

  const HandleLocationChange = (locationMode: LocationType) => {
    setSelectedLocation(locationMode);
  };

  const HandleStartLocationClick = () => {
    HandleLocationChange(LocationType.WORKSTART);
    HandleRecordChange({
      id: 1,
      finishLocation: "-",
      startLocation: "52.229, 21.0122",
      status: "IN_WORK",
      totaWorkTime: "-",
      user: "Jan Kowalski",
      workStartedAt: "7:25:00",
      workfinishedAt: "-",
      totalTimeOnBreak: "-",
      endOfTheDayComment: "",
      startAccuracy: 25,
      endAccuracy: 50,
    });

    setShowLocationModal(true);
  };

  const HandleLocationModalClose = () => {
    setShowLocationModal(false);
  };

  const HandleRowEdit = (record: any) => {
    return () => {
      setSelectedRecord(record);
      setIsEditTimeModalActive(true);
    };
  };

  const HandleEditTimeModalClose = () => {
    setSelectedRecord(undefined);
    setIsEditTimeModalActive(false);
  };
  return (
    <div className={props.className}>
      {showLocationModal && (
        <LocationModal
          mode={selectedLocation}
          onClose={HandleLocationModalClose}
          record={selectedRecord}
        />
      )}

      {isEditTimeModalActive && selectedRecord && (
        <EditStartEndTimeAdminModal
          onClose={HandleEditTimeModalClose}
          record={selectedRecord}
        />
      )}
      <div>
        <div className="ride-step4">
          {true && (
            <div className="has-text-centered">
              <label className="label">Zmień Datę</label>
              <div className="control-pane">
                <div className="control-section">
                  <div id="template">
                    <DatePickerComponent
                      showClearButton={false}
                      width={300}
                      format="dd/MM/yyyy"
                      value={selectedDate}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="filters fadein ">
            <div className="clock-in-filter-text">
              <p>Filter</p>
            </div>

            <div className="clockin-filter-box2">
              <i className="fas fa-business-time filter-icon"></i>
            </div>
            <div className="clockin-filter-box3">
              <i className="fas fa-laptop filter-icon"></i>
            </div>
            <div className="clockin-filter-box4">
              <i className="fas fa-bed filter-icon"></i>
            </div>

            <div className="clear-filter">
              <i className="fas fa-times"></i>
            </div>
          </div>
          <br />
          <div className="search-by-name is-pulled-right">
            <br /> <br /> <br />
            <input
              className="input search"
              placeholder="Znajdź Pracownika"
            ></input>
          </div>
        </div>
        <br /> <br />
        {isLoading && <Spinner label="Przygotowywanie danych..." />}
        <div className="table-wrapper">
          {!isLoading && (
            <table className="table is-striped is-hoverable fadein ride-step3">
              <thead className="thead">
                <tr className="tr">
                  <th className="th">
                    <i className="far fa-user"></i> Pracownik
                  </th>
                  <th className="th">
                    <i className="far fa-address-card"></i> Status
                  </th>
                  <th className="th">
                    <i className="far fa-clock"></i> Rozpoczęcie
                  </th>
                  <th className="th">
                    <i className="fas fa-street-view"></i> Lokalizacja
                  </th>
                  <th className="th">
                    <i className="far fa-clock"></i> Zakończenie
                  </th>
                  <th className="th">
                    <i className="fas fa-street-view"></i> Lokalizacja
                  </th>
                  <th className="th">
                    <i className="far fa-clock"></i> Przepracowano
                  </th>
                  <th className="th">
                    <i className="far fa-clock"></i> W tym przerwy
                  </th>
                  <th className="th">
                    <i className="far fa-clock"></i> Komentarz
                  </th>
                  <th className="th">
                    <i className="fas fa-pen"></i> Edit
                  </th>
                </tr>
              </thead>
              <tbody className="tbody ">
                {data &&
                  data.map((record, index) => {
                    return (
                      <tr key={index} className="tr">
                        <td className="td">{record.user}</td>
                        <td className="td">
                          {getStatusTemplate(record.status)}
                        </td>
                        <td className="td">{record.workStartedAt}</td>

                        {record.workStartedAt != "-" ? (
                          <td className={`td ${record.id === 3 ? "" : ""}`}>
                            <div
                              onClick={HandleStartLocationClick}
                              id={record.id.toString()}
                            >
                              <i className="fas fa-map-marker-alt has-text-danger is-size-3 location-icon"></i>
                            </div>
                          </td>
                        ) : (
                          <td>-</td>
                        )}

                        <td className="td">{record.workfinishedAt}</td>

                        {record.workfinishedAt != "-" ? (
                          <td className="td">
                            <div id={record.id.toString()}>
                              <i className="fas fa-map-marker-alt has-text-danger is-size-3 location-icon"></i>
                            </div>
                          </td>
                        ) : (
                          <td>-</td>
                        )}

                        <td className="td">{record.totaWorkTime}</td>
                        <td className="td">{record.totalTimeOnBreak}</td>
                        <td className="td">
                          {record.endOfTheDayComment &&
                          record.endOfTheDayComment.length > 0 ? (
                            <textarea
                              value={record.endOfTheDayComment}
                              className="textarea"
                            ></textarea>
                          ) : (
                            ""
                          )}
                        </td>
                        <td className="td">
                          {!(
                            record.workfinishedAt === "-" &&
                            record.workStartedAt === "-"
                          ) && (
                            <p
                              onClick={HandleRowEdit(record)}
                              className="has-text-info edit-container"
                            >
                              <i className="fas fa-pen"></i>
                            </p>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export const DEMO_UsersStateTodayTable = styled(Component)`
  .table-wrapper {
    font-size: 1.6rem;
    max-width: 100%;
    overflow: auto !important;
  }
  .edit-container {
    .fa-pen {
      &:hover {
        cursor: pointer;
      }
    }
  }
  .textarea {
    font-size: 1.6rem;
  }

  .ride-step4 {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  .search-by-name {
    width: 27.5rem;
    margin-right: 5.6rem;
    margin-top: -1rem;
    display: flex;
    align-self: flex-end;
    @media screen and (max-width: 500px) {
      margin-right: 0px;
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

    .location-icon {
      &:hover {
        cursor: pointer;
        transform: scale(1.35);
      }
    }

    .clockin-filter-box2 {
      padding: 1.2rem;
      display: block;
      background-color: #46ef81;
      border-radius: 3px;
      color: white;
      font-weight: 700;
    }

    .clockin-filter-box3 {
      padding: 1.2rem;
      display: block;
      background-color: #ffc17e;
      border-radius: 3px;
      color: white;
      font-weight: 700;
    }

    .clockin-filter-box4 {
      padding: 1.2rem;
      display: block;
      background-color: #ff6e6e;
      border-radius: 3px;
      color: white;
      font-weight: 700;
    }
    .clockin-filter-box5 {
      padding: 1.2rem;
      display: block;
      background-color: #b2e0ff;
      border-radius: 3px;
      color: white;
      font-weight: 700;
    }
  }

  .filters {
    margin-right: 5rem;
    display: flex;
    justify-content: flex-end;

    @media screen and (max-width: 500px) {
      margin-right: 0px;
    }

    .clock-in-filter-text {
      font-style: italic;
      text-transform: uppercase;
      letter-spacing: 1px;
      align-self: center;
      font-size: 1.6rem;
      font-weight: 400;
      margin-right: 1.5rem;
    }

    .clear-filter {
      padding: 1rem;

      margin: 1rem 0.7rem;

      position: relative;

      &:hover {
        cursor: pointer;
        color: red;
      }
    }

    .clockin-filter-box2 {
      padding: 1rem;

      margin: 1rem 0.7rem;

      background-color: #46ef81;

      &:hover {
        transform: translateY(-0.6rem);
        box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.4);
        cursor: pointer;
      }
    }

    .clockin-filter-box3 {
      padding: 1rem;

      margin: 1rem 0.7rem;

      background-color: #ffc17e;

      &:hover {
        transform: translateY(-0.6rem);
        box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.4);
        cursor: pointer;
      }
    }

    .clockin-filter-box4 {
      padding: 1rem;

      margin: 1rem 0.7rem;

      background-color: #ff6e6e;

      &:hover {
        transform: translateY(-0.6rem);
        box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.4);
        cursor: pointer;
      }
    }

    .filter-icon {
      font-size: 1.6rem;
      color: white;
      opacity: 0.4;
    }
  }
`;

export default DEMO_UsersStateTodayTable;
