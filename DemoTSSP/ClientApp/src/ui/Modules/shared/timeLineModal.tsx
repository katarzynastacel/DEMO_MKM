import React, { useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import styled from "styled-components";
interface IComponent {
  className?: string;
  onClose: () => void;
}
interface ITimeLineData {
  projectName: string;
  activity: string;
  startTime: string;
  endTime: string;
  total: string;
}

const Component: React.FunctionComponent<IComponent> = (props: IComponent) => {
  const [timeLineData] = useState<ITimeLineData[]>([
    {
      projectName: "Projekt X - 1743",
      activity: "Projektowanie",
      startTime: "08:00:00",
      endTime: "08:30:00",
      total: "00:30:00",
    },
    {
      projectName: "Projekt Y - 2243",
      activity: "Autocad",
      startTime: "08:30:37",
      endTime: "10:32:00",
      total: "02:32:37",
    },
    {
      projectName: "Projekt Y - 2243",
      activity: "Przerwa",
      startTime: "10:32:00",
      endTime: "11:00:00",
      total: "00:28",
    },
    {
      projectName: "Projekt Z",
      activity: "Delegacja",
      endTime: "17:30:00",
      startTime: "11:00:00",
      total: "06:30:00",
    },
  ]);

  const getTemplate = (index: number, data: ITimeLineData) => {
    if (index % 2) {
      return (
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{
            background: "#00d1b2",
            color: "#fff",
          }}
          contentArrowStyle={{
            borderRight: "#00d1b2",
          }}
          iconStyle={{ background: "#00d1b2", color: "#fff" }}
          icon={<i className="fas fa-user-clock"></i>}
        >
          <h3 className="vertical-timeline-element-title">{data.activity}</h3>
          <h4 className="vertical-timeline-element-subtitle">
            {data.projectName}
          </h4>
          <br />
          <h5 className="vertical-timeline-element-title">
            {data.startTime}- {data.endTime}
            <br />
            Czas Trwania: {data.total}
          </h5>
        </VerticalTimelineElement>
      );
    } else {
      return (
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{
            background: "rgb(33, 150, 243)",
            color: "#fff",
          }}
          contentArrowStyle={{
            borderRight: "7px solid  rgb(33, 150, 243)",
          }}
          iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          icon={<i className="fas fa-user-clock"></i>}
        >
          <h3 className="vertical-timeline-element-title">{data.activity}</h3>
          <h4 className="vertical-timeline-element-subtitle">
            {" "}
            {data.projectName}
          </h4>
          <br />
          <h4 className="vertical-timeline-element-title">
            {data.startTime}- {data.endTime}
            <br />
            Czas Trwania: {data.total}
          </h4>
        </VerticalTimelineElement>
      );
    }
  };

  return (
    <div className={`${props.className}`}>
      {" "}
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-card">
          <button
            onClick={props.onClose}
            className="delete"
            aria-label="close"
          ></button>
          <section className="modal-card-body">
            <div>
              <VerticalTimeline animate={true}>
                {timeLineData.map((record, index) => {
                  return getTemplate(index, record);
                })}
              </VerticalTimeline>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export const TimeLineComponent = styled(Component)`
  font-size: 1.6rem;
  .delete {
    align-self: flex-end;
    background: #00d1b2;
  }
  .modal-card-body {
    position: relative;
    background: #eee;
  }

  .modal-card {
    width: 70%;
    height: 80vh;
  }
`;
export default TimeLineComponent;
