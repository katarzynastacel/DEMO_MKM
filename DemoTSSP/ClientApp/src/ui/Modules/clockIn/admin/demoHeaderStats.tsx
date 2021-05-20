import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface IComponent {
  className?: string;
}

interface StatsData {
  finishedWork: number;
  inWork: number;
  numberOfUsers: number;
  onWay: number;
  totalActiveToday: number;
  companyName: string;
}

let defaultData: StatsData = {
  finishedWork: 0,
  inWork: 0,
  numberOfUsers: 0,
  onWay: 0,
  totalActiveToday: 0,
  companyName: "",
};

const Component: React.FunctionComponent<IComponent> = (props: IComponent) => {
  const [data, setData] = useState<StatsData>(defaultData);

  useEffect(() => {
    setData({
      finishedWork: 1,
      inWork: 3,
      numberOfUsers: 0,
      onWay: 2,
      totalActiveToday: 4,
      companyName: "",
    });

    setTimeout(() => {
      setData({
        finishedWork: 6,
        inWork: 6,
        numberOfUsers: 0,
        onWay: 0,
        totalActiveToday: 0,
        companyName: "",
      });
    }, 6000);

    setTimeout(() => {
      setData({
        finishedWork: 2,
        inWork: 2,
        numberOfUsers: 0,
        onWay: 2,
        totalActiveToday: 3,
        companyName: "",
      });
    }, 8000);

    setTimeout(() => {
      setData({
        finishedWork: 1,
        inWork: 1,
        numberOfUsers: 0,
        onWay: 4,
        totalActiveToday: 2,
        companyName: "",
      });
    }, 10000);

    setTimeout(() => {
      setData({
        finishedWork: 4,
        inWork: 1,
        numberOfUsers: 0,
        onWay: 1,
        totalActiveToday: 5,
        companyName: "",
      });
    }, 12000);

    setTimeout(() => {
      setData({
        finishedWork: 6,
        inWork: 0,
        numberOfUsers: 0,
        onWay: 0,
        totalActiveToday: 6,
        companyName: "",
      });
    }, 14000);
  }, []);

  return (
    <div className={props.className}>
      <div className="clockin-admin-header fadein ride-step1 ride-step2">
        <div className="clockin-admin-header-box1">
          <h1 className="admin-header-box-title"> Aktywnych Dzisiaj</h1>
          <p className="admin-header-box-number">{data.totalActiveToday}/6</p>
          <i className="fas fa-user-check admin-header-icon"></i>
        </div>
        <div className="clockin-admin-header-box2">
          <h1 className="admin-header-box-title">Zakończyło pracę</h1>
          <p className="admin-header-box-number">{data.finishedWork}/6</p>
          <i className="fas fa-business-time admin-header-icon"></i>
        </div>
        <div className="clockin-admin-header-box3">
          <h1 className="admin-header-box-title"> Pracuje</h1>
          <p className="admin-header-box-number">{data.inWork}/6</p>
          <i className="fas fa-laptop admin-header-icon"></i>
        </div>
        <div className="clockin-admin-header-box4">
          <h1 className="admin-header-box-title">Nieobecnych</h1>
          <p className="admin-header-box-number">{data.onWay}/6</p>
          <i className="fas fa-bed admin-header-icon"></i>
        </div>
      </div>
    </div>
  );
};

export const DEMO_HeaderStats = styled(Component)`
  .clockin-admin-header {
    background-color: white;
    display: flex;
    color: white;
    flex-wrap: wrap;

    .clockin-admin-header-box1 {
      padding: 8rem;
      margin: 2rem 2rem;
      flex: 1;
      background-color: #b2e0ff;
      position: relative;
      min-width: 25rem;
      @media screen and (max-width: 890px) {
        min-width: 45rem;
      }

      @media screen and (max-width: 780px) {
        min-width: 30rem;
      }

      &:hover {
        transform: translateY(-1rem);
        box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.4);
      }
    }

    .clockin-admin-header-box2 {
      padding: 8rem;
      justify-content: center;
      margin: 2rem 2rem;
      flex: 1;
      background-color: #74ffa5;
      position: relative;
      min-width: 25rem;
      @media screen and (max-width: 890px) {
        min-width: 45rem;
      }
      @media screen and (max-width: 780px) {
        min-width: 30rem;
      }
      &:hover {
        transform: translateY(-1rem);
        box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.4);
      }
    }

    .clockin-admin-header-box3 {
      padding: 8rem;
      justify-content: center;
      margin: 2rem 2rem;
      flex: 1;
      background-color: #ffc17e;
      position: relative;
      min-width: 25rem;
      @media screen and (max-width: 890px) {
        min-width: 45rem;
      }
      @media screen and (max-width: 780px) {
        min-width: 30rem;
      }
      &:hover {
        transform: translateY(-1rem);
        box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.4);
      }
    }

    .clockin-admin-header-box4 {
      padding: 8rem;
      justify-content: center;
      margin: 2rem 2rem;
      flex: 1;
      min-width: 25rem;
      background-color: #ff8484;
      position: relative;
      @media screen and (max-width: 890px) {
        min-width: 45rem;
      }
      @media screen and (max-width: 780px) {
        min-width: 30rem;
      }

      &:hover {
        transform: translateY(-1rem);
        box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.4);
      }
    }

    .admin-header-box-number {
      position: absolute;

      top: 0rem;
      left: 1rem;
      font-size: 5rem;
      letter-spacing: 5px;
      font-weight: 700;
    }

    .admin-header-box-title {
      font-size: 2.5rem;
      letter-spacing: 1px;
      text-transform: uppercase;
      position: absolute;

      top: 12rem;
      left: 1rem;
      font-weight: 700;
    }

    .admin-header-icon {
      position: absolute;
      top: 3rem;
      right: 6rem;
      font-size: 5rem;
      color: white;
      opacity: 0.9;
    }

    .admin-header-icon-show {
      position: absolute;
      bottom: 1rem;
      right: 1rem;
      font-size: 2rem;
      color: white;
      opacity: 1;

      &:hover {
        cursor: pointer;
        transform: scale(1.2);
      }
    }
  }
`;
export default DEMO_HeaderStats;
