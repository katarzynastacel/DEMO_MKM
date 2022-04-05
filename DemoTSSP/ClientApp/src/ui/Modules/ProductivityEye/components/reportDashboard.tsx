import React, { useContext, useState, useEffect, lazy } from "react";
import styled from "styled-components";

import { ProductivityClock } from "./elemetns/productivityClock";
import productive from "../icons/productive.svg";
import unproductive from "../icons/unproductive.svg";
import notallowed from "../icons/notallowed.svg";
import lock from "../icons/lock.svg";
import Timer from "react-compound-timer";

import { UserProductivityModal } from "./userProductivityModal";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  AccumulationLegend,
  PieSeries,
  AccumulationTooltip,
  IAccLoadedEventArgs,
  Inject,
  AccumulationTheme,
  AccumulationDataLabel,
} from "@syncfusion/ej2-react-charts";
import { SocialMediaDetails, IReportMode } from "./socialMediaDetails";
import { MouseKeyboardDetails } from "./mouseKeyboardDetails";
interface IComponentProps {
  className?: string;
}

interface IReportData {
  usersProductivityReport: IUserProductivityRecord[];
  headerStatsReport: IHeaderStatsResponse;
  top10Applications: ITop10Apps[];
  top10PopularWebsites: ITop10PopularWebsites[];
  mostUsedSocialMedia: IMostTimeSpendInSocialMedia[];
}

interface IMostTimeSpendInSocialMedia {
  totalSeconds: number;
  websiteName: string;
  mkmID: string;
  name: string;
}

export interface ITop10Apps {
  name: string;
  totalSeconds: number;
}

export interface ITop10PopularWebsites {
  name: string;
  totalSeconds: number;
}
export interface IHeaderStatsResponse {
  overallProductivity: number;
  totalLockedScreenSeconds: number;
  totalProductiveSeconds: number;
  totalUnallowedWebsiteSeconds: number;
  totalUnproductiveSeconds: number;
}
interface IUserProductivityRecord {
  name: string;
  overallProductivity: number;
  totalProductiveSeconds: number;
  totalUnproductiveSeconds: number;
  mkmID: string;
}
const Component: React.FunctionComponent<IComponentProps> = (
  props: IComponentProps
) => {
  const [overallProductivity] = useState<any>(74);
  const [totalProductiveSeconds, setTotalProductiveSeconds] = useState<any>(
    16392
  );
  const [totalUnproductiveSeconds, setTotalUnproductiveSeconds] = useState<any>(
    3685
  );
  const [totalLockedScreenSeconds, setTotalLockedScreenSeconds] = useState<any>(
    1305
  );
  const [
    totalUnallowedWebsiteSeconds,
    setTotalUnallowedWebsiteSeconds,
  ] = useState<any>(307);
  const [usersData, setUsersData] = useState<IUserProductivityRecord[]>([
    {
      overallProductivity: 91,
      name: "John Smith",
      totalUnproductiveSeconds: 1510,
      totalProductiveSeconds: 27300,
      mkmID: "ec1926192.168.0.60_5-dd75-46a7-8",
    },
    {
      overallProductivity: 88,
      name: "Sarah Williams",
      totalUnproductiveSeconds: 3616,
      totalProductiveSeconds: 32965,
      mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
    },
    {
      overallProductivity: 83,
      name: "James Jones",
      totalUnproductiveSeconds: 2010,
      totalProductiveSeconds: 20320,
      mkmID: "ec1926192.168.0.60_5-dd75-46a7-8",
    },

    {
      overallProductivity: 49,
      name: "William Taylor",
      totalUnproductiveSeconds: 7900,
      totalProductiveSeconds: 15600,
      mkmID: "ec1926192.168.0.60_5-dd75-46a7-8",
    },

    {
      overallProductivity: 40,
      name: "Richard Brown",
      totalUnproductiveSeconds: 10000,
      totalProductiveSeconds: 8000,
      mkmID: "ec1926192.168.0.60_5-dd75-46a7-8",
    },
    {
      overallProductivity: 23,
      name: "Margaret Wilson",
      totalUnproductiveSeconds: 15000,
      totalProductiveSeconds: 5000,
      mkmID: "ec1926192.168.0.60_5-dd75-46a7-8",
    },
  ]);
  const [top10Apps, setTop10Apps] = useState<ITop10Apps[]>([
    {
      totalSeconds: 21884,
      name: "chrome ",
    },
    {
      totalSeconds: 17511,
      name: "Autocad ",
    },
    {
      totalSeconds: 9800,
      name: "Excel ",
    },
    {
      totalSeconds: 7200,
      name: "Teams ",
    },
    {
      totalSeconds: 4500,
      name: "PDF Viewer ",
    },
    {
      totalSeconds: 4120,
      name: "Adobe",
    },
    {
      totalSeconds: 4320,
      name: "Dev-env",
    },
    {
      totalSeconds: 2700,
      name: "Paint",
    },
    {
      totalSeconds: 2400,
      name: "snippingtool",
    },
    {
      totalSeconds: 567,
      name: "searchapp",
    },
  ]);
  const [top10PopularWebsites, setTop10PopularWebsites] = useState<
    ITop10PopularWebsites[]
  >([
    {
      totalSeconds: 3620,
      name: "Youtube",
    },
    {
      totalSeconds: 2910,
      name: "Facebook",
    },
    {
      totalSeconds: 2200,
      name: "Twitter",
    },
    {
      totalSeconds: 1800,
      name: "Instagram",
    },
    {
      totalSeconds: 1673,
      name: "TikTok",
    },
    {
      totalSeconds: 582,
      name: "WeChat",
    },
    {
      totalSeconds: 433,
      name: "eBay",
    },
    {
      totalSeconds: 6,
      name: "BBC News",
    },
    {
      totalSeconds: 5,
      name: "Twitch",
    },
    {
      totalSeconds: 4,
      name: "Pinterest",
    },
  ]);
  const [mostUsedSocialMedia, setMostUsedSocialMedia] = useState<
    IMostTimeSpendInSocialMedia[]
  >([
    {
      totalSeconds: 2900,
      websiteName: "Youtube",
      mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
      name: "Richard Brown",
    },
    {
      totalSeconds: 2750,
      websiteName: "Facebook",
      mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
      name: "Sarah Williams",
    },
    {
      totalSeconds: 750,
      websiteName: "Twitter",
      mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
      name: "Sarah Williams",
    },
    {
      totalSeconds: 1000,
      websiteName: "Instagram",
      mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
      name: "Sarah Williams",
    },
    {
      totalSeconds: 499,
      websiteName: "TikTok",
      mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
      name: "William Taylor",
    },
    {
      totalSeconds: 582,
      websiteName: "WeChat",
      mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
      name: "William Taylor",
    },
    {
      totalSeconds: 200,
      websiteName: "Ebay",
      mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
      name: "Margaret Wilson",
    },
    {
      totalSeconds: 6,
      websiteName: "BBC News",
      mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
      name: "William Taylor",
    },
    {
      totalSeconds: 5,
      websiteName: "Twitch",
      mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
      name: "Richard Brown",
    },
    {
      totalSeconds: 4,
      websiteName: "Pinterest",
      mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
      name: "William Taylor",
    },
  ]);
  const [selectedUser, setSelectedUser] = useState<IUserProductivityRecord>();
  const [availableReload, setAvailableReload] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalTittleToRender, setModalTittleToRender] = useState("");
  const [selectedReportMode, setSelectedReportMode] = useState<IReportMode>();
  const [top10InactiveMouse, setTop10InactiveMouse] = useState<any[]>([
    {
      userName: "Margaret Wilson",
      startTimeLabel: "07:40:09",
      totalSeconds: 2300,
      mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
    },
    {
      userName: "Sarah Williams",
      startTimeLabel: "12:21:09",
      totalSeconds: 2111,
      mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
    },
    {
      userName: "Richard Brown",
      startTimeLabel: "14:22:11",
      totalSeconds: 2100,
      mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
    },
    {
      userName: "William Taylor",
      startTimeLabel: "15:22:56",
      totalSeconds: 1824,
      mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
    },
    {
      userName: "James Jones ",
      startTimeLabel: "13:12:50",
      totalSeconds: 1799,
      mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
    },
    {
      userName: "James Jones ",
      startTimeLabel: "11:22:11",
      totalSeconds: 1700,
      mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
    },
    {
      userName: "Richard Brown",
      startTimeLabel: "09:35:01",
      totalSeconds: 1540,
      mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
    },

    {
      userName: "Margaret Wilson",
      startTimeLabel: "16:00:41",
      totalSeconds: 1200,
      mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
    },
    {
      userName: "Richard Brown",
      startTimeLabel: "12:00:09",
      totalSeconds: 999,
      mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
    },
  ]);
  const [top10InactiveKeyboard, setTop10InactiveKeyboard] = useState<any[]>([
    {
      userName: "Richard Brown",
      startTimeLabel: "07:40:09",
      totalSeconds: 3921,
      mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
    },
    {
      userName: "Sarah Williams",
      startTimeLabel: "12:21:09",
      totalSeconds: 3300,
      mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
    },
    {
      userName: "Margaret Wilson",
      startTimeLabel: "09:35:01",
      totalSeconds: 2940,
      mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
    },
    {
      userName: "Richard Brown",
      startTimeLabel: "14:22:11",
      totalSeconds: 2100,
      mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
    },
    {
      userName: "William Taylor",
      startTimeLabel: "15:22:56",
      totalSeconds: 1824,
      mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
    },
    {
      userName: "William Taylor",
      startTimeLabel: "16:00:41",
      totalSeconds: 1200,
      mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
    },
    {
      userName: "Richard Brown",
      startTimeLabel: "12:00:09",
      totalSeconds: 999,
      mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
    },
    {
      userName: "Margaret Wilson",
      startTimeLabel: "13:12:50",
      totalSeconds: 754,
      mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
    },
    {
      userName: "Richard Brown",
      startTimeLabel: "11:22:11",
      totalSeconds: 360,
      mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
    },
  ]);
  const [mouseKeyboardActivity, setMouseKeyboardActivity] = useState<any[]>([
    {
      mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
      userName: "William Taylor",
      mouseClickCounter: 12100,
      keyboardClickCounter: 9121,
      totalSecondsMouseIdle: 14308,
      totalSecondsKeyboardIdle: 9834,
      mouseIdleEvents: [
        {
          startTimeLabel: "05:44:20",
          totalSeconds: 3272,
        },
        {
          startTimeLabel: "06:38:52",
          totalSeconds: 2900,
        },
        {
          startTimeLabel: "07:59:15",
          totalSeconds: 2605,
        },
        {
          startTimeLabel: "09:48:27",
          totalSeconds: 2155,
        },
        {
          startTimeLabel: "10:24:34",
          totalSeconds: 979,
        },
        {
          startTimeLabel: "10:40:54",
          totalSeconds: 659,
        },
        {
          startTimeLabel: "10:51:59",
          totalSeconds: 643,
        },
        {
          startTimeLabel: "12:45:48",
          totalSeconds: 500,
        },
        {
          startTimeLabel: "14:03:29",
          totalSeconds: 400,
        },
        {
          startTimeLabel: "18:58:54",
          totalSeconds: 195,
        },
      ],
      keyboardIdleEvents: [
        {
          startTimeLabel: "12:45:49",
          totalSeconds: 3771,
        },
        {
          startTimeLabel: "13:48:42",
          totalSeconds: 2100,
        },
        {
          startTimeLabel: "09:28:46",
          totalSeconds: 1400,
        },
        {
          startTimeLabel: "08:54:46",
          totalSeconds: 816,
        },
        {
          startTimeLabel: "08:45:38",
          totalSeconds: 548,
        },

        {
          startTimeLabel: "09:08:23",
          totalSeconds: 533,
        },
        {
          startTimeLabel: "12:39:43",
          totalSeconds: 365,
        },
        {
          startTimeLabel: "09:17:17",
          totalSeconds: 301,
        },
      ],
    },
    {
      mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
      userName: "Sarah Williams",
      mouseClickCounter: 9200,
      keyboardClickCounter: 7100,
      totalSecondsMouseIdle: 2800,
      totalSecondsKeyboardIdle: 2300,
      mouseIdleEvents: [
        {
          startTimeLabel: "05:44:20",
          totalSeconds: 3272,
        },
        {
          startTimeLabel: "06:38:52",
          totalSeconds: 4822,
        },
        {
          startTimeLabel: "07:59:15",
          totalSeconds: 2605,
        },
        {
          startTimeLabel: "09:48:27",
          totalSeconds: 2155,
        },
        {
          startTimeLabel: "10:24:34",
          totalSeconds: 979,
        },
        {
          startTimeLabel: "10:40:54",
          totalSeconds: 659,
        },
        {
          startTimeLabel: "10:51:59",
          totalSeconds: 6453,
        },
        {
          startTimeLabel: "12:45:48",
          totalSeconds: 3770,
        },
        {
          startTimeLabel: "14:03:29",
          totalSeconds: 17071,
        },
        {
          startTimeLabel: "18:58:54",
          totalSeconds: 6748,
        },
      ],
      keyboardIdleEvents: [
        {
          startTimeLabel: "08:45:38",
          totalSeconds: 548,
        },
        {
          startTimeLabel: "08:54:46",
          totalSeconds: 816,
        },
        {
          startTimeLabel: "09:08:23",
          totalSeconds: 533,
        },
        {
          startTimeLabel: "09:17:17",
          totalSeconds: 301,
        },
        {
          startTimeLabel: "09:28:46",
          totalSeconds: 11448,
        },
        {
          startTimeLabel: "12:39:43",
          totalSeconds: 365,
        },
        {
          startTimeLabel: "12:45:49",
          totalSeconds: 3771,
        },
        {
          startTimeLabel: "13:48:42",
          totalSeconds: 18076,
        },
      ],
    },
    {
      mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
      userName: "James Jones",
      mouseClickCounter: 8100,
      keyboardClickCounter: 9300,
      totalSecondsMouseIdle: 2433,
      totalSecondsKeyboardIdle: 1120,
      mouseIdleEvents: [
        {
          startTimeLabel: "05:44:20",
          totalSeconds: 3272,
        },
        {
          startTimeLabel: "06:38:52",
          totalSeconds: 4822,
        },
        {
          startTimeLabel: "07:59:15",
          totalSeconds: 2605,
        },
        {
          startTimeLabel: "09:48:27",
          totalSeconds: 2155,
        },
        {
          startTimeLabel: "10:24:34",
          totalSeconds: 979,
        },
        {
          startTimeLabel: "10:40:54",
          totalSeconds: 659,
        },
        {
          startTimeLabel: "10:51:59",
          totalSeconds: 6453,
        },
        {
          startTimeLabel: "12:45:48",
          totalSeconds: 3770,
        },
        {
          startTimeLabel: "14:03:29",
          totalSeconds: 17071,
        },
        {
          startTimeLabel: "18:58:54",
          totalSeconds: 6748,
        },
      ],
      keyboardIdleEvents: [
        {
          startTimeLabel: "08:45:38",
          totalSeconds: 548,
        },
        {
          startTimeLabel: "08:54:46",
          totalSeconds: 816,
        },
        {
          startTimeLabel: "09:08:23",
          totalSeconds: 533,
        },
        {
          startTimeLabel: "09:17:17",
          totalSeconds: 301,
        },
        {
          startTimeLabel: "09:28:46",
          totalSeconds: 11448,
        },
        {
          startTimeLabel: "12:39:43",
          totalSeconds: 365,
        },
        {
          startTimeLabel: "12:45:49",
          totalSeconds: 3771,
        },
        {
          startTimeLabel: "13:48:42",
          totalSeconds: 18076,
        },
      ],
    },
    {
      mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
      userName: "John Smith",
      mouseClickCounter: 7000,
      keyboardClickCounter: 11002,
      totalSecondsMouseIdle: 1900,
      totalSecondsKeyboardIdle: 2100,
      mouseIdleEvents: [
        {
          startTimeLabel: "05:44:20",
          totalSeconds: 3272,
        },
        {
          startTimeLabel: "06:38:52",
          totalSeconds: 4822,
        },
        {
          startTimeLabel: "07:59:15",
          totalSeconds: 2605,
        },
        {
          startTimeLabel: "09:48:27",
          totalSeconds: 2155,
        },
        {
          startTimeLabel: "10:24:34",
          totalSeconds: 979,
        },
        {
          startTimeLabel: "10:40:54",
          totalSeconds: 659,
        },
        {
          startTimeLabel: "10:51:59",
          totalSeconds: 6453,
        },
        {
          startTimeLabel: "12:45:48",
          totalSeconds: 3770,
        },
        {
          startTimeLabel: "14:03:29",
          totalSeconds: 17071,
        },
        {
          startTimeLabel: "18:58:54",
          totalSeconds: 6748,
        },
      ],
      keyboardIdleEvents: [
        {
          startTimeLabel: "08:45:38",
          totalSeconds: 548,
        },
        {
          startTimeLabel: "08:54:46",
          totalSeconds: 816,
        },
        {
          startTimeLabel: "09:08:23",
          totalSeconds: 533,
        },
        {
          startTimeLabel: "09:17:17",
          totalSeconds: 301,
        },
        {
          startTimeLabel: "09:28:46",
          totalSeconds: 11448,
        },
        {
          startTimeLabel: "12:39:43",
          totalSeconds: 365,
        },
        {
          startTimeLabel: "12:45:49",
          totalSeconds: 3771,
        },
        {
          startTimeLabel: "13:48:42",
          totalSeconds: 18076,
        },
      ],
    },
    {
      mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
      userName: "Richard Brown",
      mouseClickCounter: 5405,
      keyboardClickCounter: 7657,
      totalSecondsMouseIdle: 2900,
      totalSecondsKeyboardIdle: 1100,
      mouseIdleEvents: [
        {
          startTimeLabel: "05:44:20",
          totalSeconds: 3272,
        },
        {
          startTimeLabel: "06:38:52",
          totalSeconds: 4822,
        },
        {
          startTimeLabel: "07:59:15",
          totalSeconds: 2605,
        },
        {
          startTimeLabel: "09:48:27",
          totalSeconds: 2155,
        },
        {
          startTimeLabel: "10:24:34",
          totalSeconds: 979,
        },
        {
          startTimeLabel: "10:40:54",
          totalSeconds: 659,
        },
        {
          startTimeLabel: "10:51:59",
          totalSeconds: 6453,
        },
        {
          startTimeLabel: "12:45:48",
          totalSeconds: 3770,
        },
        {
          startTimeLabel: "14:03:29",
          totalSeconds: 17071,
        },
        {
          startTimeLabel: "18:58:54",
          totalSeconds: 6748,
        },
      ],
      keyboardIdleEvents: [
        {
          startTimeLabel: "08:45:38",
          totalSeconds: 548,
        },
        {
          startTimeLabel: "08:54:46",
          totalSeconds: 816,
        },
        {
          startTimeLabel: "09:08:23",
          totalSeconds: 533,
        },
        {
          startTimeLabel: "09:17:17",
          totalSeconds: 301,
        },
        {
          startTimeLabel: "09:28:46",
          totalSeconds: 11448,
        },
        {
          startTimeLabel: "12:39:43",
          totalSeconds: 365,
        },
        {
          startTimeLabel: "12:45:49",
          totalSeconds: 3771,
        },
        {
          startTimeLabel: "13:48:42",
          totalSeconds: 18076,
        },
      ],
    },

    {
      mkmID: "fbf0fe192.168.0.60_7-2b22-499c-9",
      userName: "Margaret Wilson",
      mouseClickCounter: 3400,
      keyboardClickCounter: 4357,
      totalSecondsMouseIdle: 1095,
      totalSecondsKeyboardIdle: 928,
      mouseIdleEvents: [
        {
          startTimeLabel: "05:44:20",
          totalSeconds: 3272,
        },
        {
          startTimeLabel: "06:38:52",
          totalSeconds: 4822,
        },
        {
          startTimeLabel: "07:59:15",
          totalSeconds: 2605,
        },
        {
          startTimeLabel: "09:48:27",
          totalSeconds: 2155,
        },
        {
          startTimeLabel: "10:24:34",
          totalSeconds: 979,
        },
        {
          startTimeLabel: "10:40:54",
          totalSeconds: 659,
        },
        {
          startTimeLabel: "10:51:59",
          totalSeconds: 6453,
        },
        {
          startTimeLabel: "12:45:48",
          totalSeconds: 3770,
        },
        {
          startTimeLabel: "14:03:29",
          totalSeconds: 17071,
        },
        {
          startTimeLabel: "18:58:54",
          totalSeconds: 6748,
        },
      ],
      keyboardIdleEvents: [
        {
          startTimeLabel: "08:45:38",
          totalSeconds: 548,
        },
        {
          startTimeLabel: "08:54:46",
          totalSeconds: 816,
        },
        {
          startTimeLabel: "09:08:23",
          totalSeconds: 533,
        },
        {
          startTimeLabel: "09:17:17",
          totalSeconds: 301,
        },
        {
          startTimeLabel: "09:28:46",
          totalSeconds: 11448,
        },
        {
          startTimeLabel: "12:39:43",
          totalSeconds: 365,
        },
        {
          startTimeLabel: "12:45:49",
          totalSeconds: 3771,
        },
        {
          startTimeLabel: "13:48:42",
          totalSeconds: 18076,
        },
      ],
    },
  ]);
  const [
    recordForMouseKeyboardActiviy,
    setRecordForMouseKeyboardActiviy,
  ] = useState<any>();
  let interval: any;

  const HandleUnallowedAppsClick = () => {
    setModalTittleToRender("Forbidden Phrases");
    setSelectedReportMode(IReportMode.UnallowedWebsites);
  };

  const HandleLockedScreenClick = () => {
    setModalTittleToRender("Locked Screen");
    setSelectedReportMode(IReportMode.LockedScreen);
  };

  const handleShowKeyboardMouseActivity = (mkmID: string, index: number) => {
    return () => {
      let record = mouseKeyboardActivity.find((x) => x.mkmID === mkmID);

      if (record) {
        if (index > 0) {
          return;
        }
        setRecordForMouseKeyboardActiviy(record);
      }
    };
  };

  const handleCloseKeyboardMouseActivity = () => {
    setRecordForMouseKeyboardActiviy(undefined);
  };

  const getProductivityTemplate = (value: number) => {
    let color = "is-success";
    if (value < 35) {
      color = "is-danger";
    }
    if (value > 35) {
      color = "is-warning";
    }
    if (value > 75) {
      color = "is-success";
    }

    return (
      <div className="has-text-centered">
        <p>
          {value} %
          <progress
            className={`progress ${color}`}
            value={value}
            max="100"
          ></progress>
        </p>
      </div>
    );
  };

  const getKeyboardTemplate = (keyboardClicks: number) => {
    return (
      <div className="control">
        <div className="tags has-addons">
          <span className="tag is-dark">{keyboardClicks}</span>
        </div>
      </div>
    );
  };

  const getMouseTemplate = (mouseClick: number) => {
    return (
      <div className="control">
        <div className="tags has-addons">
          <span className="tag is-dark">{mouseClick}</span>
        </div>
      </div>
    );
  };

  const getNameTemplate = (name: string, index: number) => {
    if (index == 0) {
      return (
        <p>
          <span style={{ color: "#ebcc34" }}>
            1) <i className="fas fa-crown"></i>
          </span>{" "}
          {name}
        </p>
      );
    }

    if (index == 1) {
      return (
        <p>
          <span style={{ color: "#c5c5c5" }}>
            2) <i className="fas fa-crown"></i>
          </span>{" "}
          {name}
        </p>
      );
    }

    if (index == 0) {
      return (
        <p>
          <span style={{ color: "#5f3b3b" }}>
            3) <i className="fas fa-crown"></i>
          </span>{" "}
          {name}
        </p>
      );
    }
    return <p>{name}</p>;
  };

  const handleUserRecordClick = (
    selectedUser: IUserProductivityRecord,
    index: number
  ) => {
    return () => {
      if (index > 0) {
        return;
      }
      setSelectedUser(selectedUser);
    };
  };
  const handleUserModalClose = () => {
    setSelectedUser(undefined);
  };

  const OnShowSocialMediaInfoModalClose = () => {
    setSelectedReportMode(undefined);
    setModalTittleToRender("");
  };

  const HandleShowSocialMediaDetails = (modalTittle: string, index: number) => {
    return () => {
      if (index > 0) {
        return;
      }
      setSelectedReportMode(IReportMode.SocialMedia);
      setModalTittleToRender(modalTittle);
    };
  };
  return (
    <div className={props.className}>
      {selectedUser && (
        <UserProductivityModal
          selectedDate={selectedDate}
          mkmID={selectedUser.mkmID}
          onClose={handleUserModalClose}
          userName={selectedUser.name}
        />
      )}

      {recordForMouseKeyboardActiviy && (
        <MouseKeyboardDetails
          record={recordForMouseKeyboardActiviy}
          onClose={handleCloseKeyboardMouseActivity}
          average={{
            averageMouse: 7534,
            averageKeyboard: 7484,
          }}
        />
      )}

      {selectedReportMode && (
        <SocialMediaDetails
          reportMode={selectedReportMode}
          name={modalTittleToRender}
          onClose={OnShowSocialMediaInfoModalClose}
        />
      )}

      <div className="date-container">
        <DatePickerComponent
          showClearButton={false}
          width={300}
          format="dd/MM/yyyy"
          value={selectedDate}
        />
      </div>

      <div className="refresh-container">
        <button disabled={!availableReload} className="button is-info">
          <i className="fas fa-sync"></i>
        </button>
      </div>
      <div className="layout-container">
        <div className="header-stats-main">
          <div className="header-stats">
            <div className="header-stat-box box">
              <p>Productive Time</p>
              <div className="icon-time-container">
                <div>
                  <img
                    width="100px"
                    height="100px"
                    alt="clock in image"
                    className="module-image"
                    src={productive}
                  />
                </div>
                <div>
                  {totalProductiveSeconds > 0 && (
                    //@ts-ignore
                    <Timer
                      formatValue={(value: any) =>
                        `${value < 10 ? `0${value}` : value}`
                      }
                      initialTime={totalProductiveSeconds * 1000}
                      startImmediately={false}
                    >
                      <Timer.Days />:
                      <Timer.Hours />:
                      <Timer.Minutes />:
                      <Timer.Seconds />
                    </Timer>
                  )}
                </div>
              </div>
            </div>
            <div
              onClick={HandleUnallowedAppsClick}
              className="header-stat-box box tr-click-user"
            >
              <p>Forbidden Phrases</p>
              <div className="icon-time-container">
                <button className="button is-info">Click me</button>
                <div>
                  <img
                    width="100px"
                    height="100px"
                    alt="clock in image"
                    className="module-image"
                    src={notallowed}
                  />
                </div>
                <div>
                  {totalUnallowedWebsiteSeconds > 0 && (
                    //@ts-ignore
                    <Timer
                      formatValue={(value: any) =>
                        `${value < 10 ? `0${value}` : value}`
                      }
                      initialTime={totalUnallowedWebsiteSeconds * 1000}
                      startImmediately={false}
                    >
                      <Timer.Days />:
                      <Timer.Hours />:
                      <Timer.Minutes />:
                      <Timer.Seconds />
                    </Timer>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="productivity-clock-stat box">
            <ProductivityClock value={overallProductivity} />
          </div>

          <div className="header-stats">
            <div className="header-stat-box box">
              <p>Unproductive Time</p>
              <div className="icon-time-container">
                <div>
                  <img
                    width="100px"
                    height="100px"
                    alt="clock in image"
                    className="module-image"
                    src={unproductive}
                  />
                </div>
                <div>
                  {totalUnproductiveSeconds > 0 && (
                    //@ts-ignore
                    <Timer
                      formatValue={(value: any) =>
                        `${value < 10 ? `0${value}` : value}`
                      }
                      initialTime={totalUnproductiveSeconds * 1000}
                      startImmediately={false}
                    >
                      <Timer.Days />:
                      <Timer.Hours />:
                      <Timer.Minutes />:
                      <Timer.Seconds />
                    </Timer>
                  )}
                </div>
              </div>
            </div>
            <div
              onClick={HandleLockedScreenClick}
              className="header-stat-box box tr-click-user"
            >
              <p>Locked Screen</p>
              <div className="icon-time-container">
                <button className="button is-info">Click me</button>
                <div>
                  <img
                    width="100px"
                    height="100px"
                    alt="clock in image"
                    className="module-image"
                    src={lock}
                  />
                </div>
                <div>
                  {totalLockedScreenSeconds > 0 && (
                    //@ts-ignore
                    <Timer
                      formatValue={(value: any) =>
                        `${value < 10 ? `0${value}` : value}`
                      }
                      initialTime={totalLockedScreenSeconds * 1000}
                      startImmediately={false}
                    >
                      <Timer.Days />:
                      <Timer.Hours />:
                      <Timer.Minutes />:
                      <Timer.Seconds />
                    </Timer>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lower-stats-main">
          <div className="lower-stat-side-panel box">
            <p className="lower-panel-header-text ">
              <b>TOP APPLICATIONS</b>
            </p>
            <hr />

            <table className="table is-fullwidth is-striped">
              <thead className="head">
                <th className="th">Position</th>
                <th className="th">Application</th>
                <th className="th">Time</th>
              </thead>
              <tbody className="tbody">
                {top10Apps.map((r, index) => {
                  return (
                    <tr className="tr">
                      <td className="td">
                        <b>{index + 1}</b>
                      </td>
                      <td className="td">{r.name}</td>
                      <td className="td">
                        <div>
                          {r.totalSeconds > 0 && (
                            <span className="tag is-info is-light">
                              {/*//@ts-ignore */}
                              <Timer
                                formatValue={(value: any) =>
                                  `${value < 10 ? `0${value}` : value}`
                                }
                                initialTime={r.totalSeconds * 1000}
                                startImmediately={false}
                              >
                                <Timer.Hours />:
                                <Timer.Minutes />:
                                <Timer.Seconds />
                              </Timer>
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="lower-stat-mid-panel box">
            <p className="lower-panel-header-text ">
              <b>EMPLOYEE PRODUCTIVITY</b>
            </p>
            <hr />

            <table className="table is-fullwidth">
              <thead className="head">
                <th className="th">Employee</th>
                <th className="th">Productive Time</th>
                <th className="th">Unproductive Time</th>
                <th className="th">Productivity</th>
                <th className="th"></th>
              </thead>
              <tbody className="tbody">
                {usersData.map((r, index) => {
                  return (
                    <tr
                      onClick={handleUserRecordClick(r, index)}
                      className="tr tr-click-user"
                    >
                      <td className="td">{getNameTemplate(r.name, index)}</td>
                      <td className="td">
                        <div>
                          {r.totalProductiveSeconds > 0 && (
                            <span className="tag is-success is-light">
                              {/*@ts-ignore */}
                              <Timer
                                formatValue={(value: any) =>
                                  `${value < 10 ? `0${value}` : value}`
                                }
                                initialTime={r.totalProductiveSeconds * 1000}
                                startImmediately={false}
                              >
                                <Timer.Hours />:
                                <Timer.Minutes />:
                                <Timer.Seconds />
                              </Timer>
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="td">
                        <div>
                          {r.totalUnproductiveSeconds > 0 && (
                            <span className="tag is-light is-danger">
                              {/*@ts-ignore */}
                              <Timer
                                formatValue={(value: any) =>
                                  `${value < 10 ? `0${value}` : value}`
                                }
                                initialTime={r.totalUnproductiveSeconds * 1000}
                                startImmediately={false}
                              >
                                <Timer.Hours />:
                                <Timer.Minutes />:
                                <Timer.Seconds />
                              </Timer>
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="td has-text-centered">
                        {getProductivityTemplate(r.overallProductivity)}
                      </td>
                      {index === 0 ? (
                        <td className="td">
                          <button className="button is-info">Click me</button>
                        </td>
                      ) : (
                        <td className="td">
                          <p></p>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="lower-stat-side-panel box">
            <p className="lower-panel-header-text ">
              <b>Social Media</b>
            </p>
            <hr />

            <table className="table is-fullwidth is-striped is-hoverable">
              <thead className="head">
                <th className="th">Position</th>
                <th className="th">Website</th>
                <th className="th">Time</th>
                <th className="th"></th>
              </thead>
              <tbody className="tbody">
                {top10PopularWebsites.map((r, index) => {
                  return (
                    <tr
                      onClick={HandleShowSocialMediaDetails(r.name, index)}
                      className="tr tr-click-user"
                    >
                      <td className="td">
                        <b>{index + 1}</b>
                      </td>
                      <td className="td">{r.name}</td>
                      <td className="td">
                        <div>
                          {r.totalSeconds > 0 && (
                            <span className="tag is-info is-light">
                              {/*@ts-ignore */}
                              <Timer
                                formatValue={(value: any) =>
                                  `${value < 10 ? `0${value}` : value}`
                                }
                                initialTime={r.totalSeconds * 1000}
                                startImmediately={false}
                              >
                                <Timer.Hours />:
                                <Timer.Minutes />:
                                <Timer.Seconds />
                              </Timer>
                            </span>
                          )}
                        </div>
                      </td>
                      {index === 0 ? (
                        <td className="td">
                          <button className="button is-info">Click me</button>
                        </td>
                      ) : (
                        <td className="td">
                          <p></p>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/*  ddddddddddddddddddddddddddddddddddddddddddddddddddddddddd*/}

        <div className="lower-stats-main">
          <div className="lower-stat-side-panel box">
            <div className="apps-chart">
              {top10Apps.length > 0 && (
                <AccumulationChartComponent
                  id="apps-chart-unique456a2333324"
                  title="Applications"
                  legendSettings={{ visible: true }}
                  enableSmartLabels={true}
                  width={"100%"}
                  height={"100%"}
                  center={{ x: "50%", y: "50%" }}
                  //@ts-ignore
                  tooltip={{
                    enable: true,
                    //@ts-ignore
                    format: "${point.x}",
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
                      dataSource={top10Apps}
                      name="Aplikacja"
                      xName="name"
                      yName="totalSeconds"
                      explode={true}
                      explodeOffset="10%"
                      explodeIndex={0}
                      dataLabel={{
                        visible: true,
                        position: "Outside",
                        name: "name",
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
          <div className="lower-stat-mid-panel box">
            <p className="lower-panel-header-text ">
              <b>LONGEST TIME IN SOCIAL MEDIA</b>
            </p>
            <hr />

            <table className="table is-fullwidth">
              <thead className="head">
                <th className="th">Website</th>
                <th className="th">Employee</th>

                <th className="th">Total</th>
                <th className="th"></th>
              </thead>
              <tbody className="tbody">
                {mostUsedSocialMedia.map((r, index) => {
                  return (
                    <tr
                      onClick={HandleShowSocialMediaDetails(
                        r.websiteName,
                        index
                      )}
                      className="tr tr-click-user"
                    >
                      <td className="td">{r.websiteName}</td>
                      <td className="td">{r.name}</td>

                      <td className="td">
                        <div>
                          {r.totalSeconds > 0 && (
                            <span className="tag is-success is-light">
                              {/*@ts-ignore */}
                              <Timer
                                formatValue={(value: any) =>
                                  `${value < 10 ? `0${value}` : value}`
                                }
                                initialTime={r.totalSeconds * 1000}
                                startImmediately={false}
                              >
                                <Timer.Hours />:
                                <Timer.Minutes />:
                                <Timer.Seconds />
                              </Timer>
                            </span>
                          )}
                        </div>
                      </td>
                      {index === 0 ? (
                        <td className="td">
                          <button className="button is-info">Click me</button>
                        </td>
                      ) : (
                        <td className="td">
                          <p></p>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="lower-stat-side-panel box">
            <div className="social-media-chart">
              {top10Apps.length > 0 && (
                <AccumulationChartComponent
                  id="apps-chart-unique95445553a24"
                  title="Social Media"
                  legendSettings={{ visible: true }}
                  enableSmartLabels={true}
                  width={"100%"}
                  height={"100%"}
                  center={{ x: "50%", y: "50%" }}
                  //@ts-ignore
                  tooltip={{
                    enable: true,
                    //@ts-ignore
                    format: "${point.x}",
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
                      dataSource={top10PopularWebsites}
                      name="Strona"
                      xName="name"
                      yName="totalSeconds"
                      explode={true}
                      explodeOffset="10%"
                      explodeIndex={0}
                      dataLabel={{
                        visible: true,
                        position: "Outside",
                        name: "name",
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
        </div>

        {/**** MOUSE & KEYBOARD */}
        <div className="lower-stats-main">
          <div className="lower-stat-side-panel box">
            <div className="tags has-addons">
              <span className="tag  is-large is-dark">
                AVERAGE KEYBOARD CLICKS
                <i className="fas fa-keyboard add-margin"></i>
              </span>
              <span className="tag is-large is-primary">{7484}</span>
            </div>
            <hr />

            <p className="lower-panel-header-text ">
              <b>
                LONGEST INACTIVE KEYBOARD
                <i className="fas fa-keyboard"></i>
              </b>
            </p>
            <hr />
            <table className="table is-fullwidth is-striped">
              <thead className="head">
                <th></th>
                <th className="th">Employee</th>
                <th className="th">Time</th>
                <th className="th">Duration time</th>
                <th className="th"></th>
              </thead>
              <tbody className="tbody">
                {top10InactiveKeyboard.map((r, index) => {
                  return (
                    <tr
                      onClick={handleShowKeyboardMouseActivity(r.mkmID, index)}
                      className="tr tr-click-user"
                      key={index}
                    >
                      <td className="td">
                        <b>{index + 1}</b>
                      </td>
                      <td className="td">{r.userName}</td>
                      <td className="td">{r.startTimeLabel}</td>
                      <td className="td">
                        <div>
                          {r.totalSeconds > 0 && (
                            <span className="tag is-info is-light">
                              {/*@ts-ignore}*/}
                              <Timer
                                formatValue={(value: any) =>
                                  `${value < 10 ? `0${value}` : value}`
                                }
                                initialTime={r.totalSeconds * 1000}
                                startImmediately={false}
                              >
                                <Timer.Hours />:
                                <Timer.Minutes />:
                                <Timer.Seconds />
                              </Timer>
                            </span>
                          )}
                        </div>
                      </td>
                      {index === 0 ? (
                        <td className="td">
                          <button className="button is-info">Click me</button>
                        </td>
                      ) : (
                        <td className="td">
                          <p></p>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="lower-stat-mid-panel box">
            <div className="lower-panel-header-text has-text-centered ">
              <div className="has-text-centered">
                <b>ACTIVITY STATISTICS</b>
              </div>
            </div>
            <hr />

            <table className="table is-fullwidth">
              <thead className="head">
                <th className="th">Employee</th>
                <th className="th">
                  <i className="fas fa-keyboard"></i> Clicks
                </th>
                <th className="th">
                  <i className="fas fa-keyboard"></i> Lack of activity
                </th>
                <th className="th">
                  <i className="fas fa-mouse-pointer"></i> Clicks
                </th>
                <th className="th">
                  <i className="fas fa-mouse-pointer"></i> Lack of activity
                </th>
                <th className="th"></th>
              </thead>
              <tbody className="tbody">
                {mouseKeyboardActivity.map((r, index) => {
                  return (
                    <tr
                      key={index}
                      onClick={handleShowKeyboardMouseActivity(r.mkmID, index)}
                      className="tr tr-click-user"
                    >
                      <td className="td">{r.userName}</td>
                      <td className="td">
                        {getKeyboardTemplate(r.keyboardClickCounter)}
                      </td>
                      <td className="td">
                        <div>
                          {r.totalSecondsKeyboardIdle > 0 && (
                            <span className="tag is-light is-danger">
                              {/*@ts-ignore}*/}

                              <Timer
                                formatValue={(value: any) =>
                                  `${value < 10 ? `0${value}` : value}`
                                }
                                initialTime={r.totalSecondsKeyboardIdle * 1000}
                                startImmediately={false}
                              >
                                <Timer.Hours />:
                                <Timer.Minutes />:
                                <Timer.Seconds />
                              </Timer>
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="td">
                        {getMouseTemplate(r.mouseClickCounter)}
                      </td>
                      <td className="td">
                        <div>
                          {r.totalSecondsMouseIdle > 0 && (
                            <span className="tag is-light is-danger">
                              {/*@ts-ignore}*/}
                              <Timer
                                formatValue={(value: any) =>
                                  `${value < 10 ? `0${value}` : value}`
                                }
                                initialTime={r.totalSecondsMouseIdle * 1000}
                                startImmediately={false}
                              >
                                <Timer.Hours />:
                                <Timer.Minutes />:
                                <Timer.Seconds />
                              </Timer>
                            </span>
                          )}
                        </div>
                      </td>
                      {index === 0 ? (
                        <td className="td">
                          <button className="button is-info">Click me</button>
                        </td>
                      ) : (
                        <td className="td">
                          <p></p>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="lower-stat-side-panel box">
            <div className="tags has-addons">
              <span className="tag  is-large is-dark">
                AVERAGE MOUSE CLICKS
                <i className="fas fa-mouse-pointer add-margin"></i>
              </span>
              <span className="tag is-large is-primary">{7534}</span>
            </div>
            <hr />
            <p className="lower-panel-header-text ">
              <b>
                LONGEST INACTIVE MOUSE
                <i className="fas fa-mouse-pointer"></i>
              </b>
            </p>
            <hr />

            <table className="table is-fullwidth is-striped">
              <thead className="head">
                <th></th>
                <th className="th">Employee</th>
                <th className="th">Time</th>
                <th className="th">Duration time</th>
                <th className="th"></th>
              </thead>
              <tbody className="tbody">
                {top10InactiveMouse.map((r, index) => {
                  return (
                    <tr
                      onClick={handleShowKeyboardMouseActivity(r.mkmID, index)}
                      key={index}
                      className="tr tr-click-user"
                    >
                      <td className="td">
                        <b>{index + 1}</b>
                      </td>
                      <td className="td">{r.userName}</td>
                      <td className="td">{r.startTimeLabel}</td>
                      <td className="td">
                        <div>
                          {r.totalSeconds > 0 && (
                            <span className="tag is-info is-light">
                              {/*@ts-ignore}*/}
                              <Timer
                                formatValue={(value: any) =>
                                  `${value < 10 ? `0${value}` : value}`
                                }
                                initialTime={r.totalSeconds * 1000}
                                startImmediately={false}
                              >
                                <Timer.Hours />:
                                <Timer.Minutes />:
                                <Timer.Seconds />
                              </Timer>
                            </span>
                          )}
                        </div>
                      </td>
                      {index === 0 ? (
                        <td className="td">
                          <button className="button is-info">Click me</button>
                        </td>
                      ) : (
                        <td className="td">
                          <p></p>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ReportDashboard = styled(Component)`
  .layout-container {
    min-height: 90vh;
    max-height: 90vh;
  }

  .header-stats-main {
    display: flex;
    flex-wrap: wrap;
  }

  .tr-click-user {
    &:hover {
      cursor: pointer;
      background-color: lightgray;
    }
  }

  .productivity-clock-stat {
    display: flex;
    justify-content: center;
    flex: 3;
    margin: 5px;
  }

  .header-stats {
    display: flex;
    min-height: 15vh;
    flex: 2;
    flex-direction: column;
    .header-stat-box {
      display: flex;
      flex-direction: column;
      flex: 1;
      margin: 5px;
      max-height: 160px;
      min-height: 160px;
      text-align: center;
      color: #666666;
      font-size: 25px;
      .icon-time-container {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        font-weight: 700;
      }
    }
  }

  .lower-stats-main {
    display: flex;
    flex-wrap: wrap;
    min-height: 55vh;

    .lower-panel-header-text {
      color: #666666;
      font-size: 20px;
      font-weight: 700;
      text-transform: uppercase;
    }
    .lower-stat-side-panel {
      flex: 8;
      margin: 5px;
    }

    .lower-stat-mid-panel {
      flex: 12.9;
      padding: 12px;
      margin: 5px;
    }
  }

  .tag {
    font-size: 1.4rem;
  }

  .refresh-container {
    display: flex;
    justify-content: flex-end;
    justify-content: space-between;
    margin: 0 20px;
    align-items: flex-end;
    flex-direction: column;
    margin-right: 10px;
  }

  .date-container {
    display: flex;
    justify-content: center;
  }

  .box {
    min-width: 250px;
  }

  .add-margin {
    margin: 5px;
  }

  .tag {
    font-size: 1.2rem !important;
  }
  .fa-mouse-pointer {
    margin-left: 10px !important;
  }
`;
