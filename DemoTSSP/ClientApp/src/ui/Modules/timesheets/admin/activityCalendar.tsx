import React, { useState } from "react";

import {
  TimelineViews,
  TimelineMonth,
  Agenda,
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  ResourcesDirective,
  ResourceDirective,
  Inject,
  Resize,
  DragAndDrop,
} from "@syncfusion/ej2-react-schedule";

import styled from "styled-components";
interface IComponent {
  className?: string;
}

const Component: React.FunctionComponent<IComponent> = (props: IComponent) => {
  const projectData: Object[] = [
    { text: "Warszawa", id: 1, color: "#cb6bb2" },
    { text: "Kraków", id: 2, color: "#a6e089" },
  ];
  const categoryData: Object[] = [
    { text: "Jan Kowalski", id: 1, groupId: 1, color: "#df5286" },
    { text: "Kasia Kowlska", id: 2, groupId: 2, color: "#7fa900" },
    { text: "Maja Brzyk", id: 3, groupId: 1, color: "#ea7a57" },
    { text: "Kamil Werski", id: 4, groupId: 2, color: "#5978ee" },
    { text: "John Smith", id: 5, groupId: 1, color: "#df5286" },
    { text: "Eli San", id: 6, groupId: 1, color: "#00bdae" },
  ];
  return (
    <div className={`${props.className}`}>
      <div className="schedule-control-section">
        <div className="col-lg-12 control-section">
          <div className="control-wrapper">
            <ScheduleComponent
              cssClass="timeline-resource-grouping"
              width="100%"
              height="650px"
              readOnly={true}
              selectedDate={new Date(2018, 3, 4, 9)}
              currentView="TimelineWeek"
              eventSettings={{
                dataSource: [
                  {
                    Id: 61,
                    Subject: "Testowanie",
                    StartTime: "2018-04-04T04:00:00.000Z",
                    EndTime: "2018-04-04T05:00:00.000Z",
                    IsAllDay: false,
                    ProjectId: 2,
                    TaskId: 2,
                  },
                  {
                    Id: 62,
                    Subject: "Automatyzacja",
                    StartTime: "2018-04-04T10:30:00.000Z",
                    EndTime: "2018-04-04T14:30:00.000Z",
                    IsAllDay: false,
                    ProjectId: 2,
                    TaskId: 1,
                  },
                  {
                    Id: 63,
                    Subject: "Selenium",
                    StartTime: "2018-04-04T03:30:00.000Z",
                    EndTime: "2018-04-04T05:00:00.000Z",
                    IsAllDay: false,
                    ProjectId: 1,
                    TaskId: 1,
                  },
                  {
                    Id: 64,
                    Subject: "Resolution-based testing",
                    StartTime: "2018-04-04T06:30:00.000Z",
                    EndTime: "2018-04-04T09:30:00.000Z",
                    IsAllDay: false,
                    ProjectId: 2,
                    TaskId: 2,
                  },
                  {
                    Id: 65,
                    Subject: "Test report Validation",
                    StartTime: "2018-04-04T09:30:00.000Z",
                    EndTime: "2018-04-04T12:30:00.000Z",
                    IsAllDay: false,
                    ProjectId: 1,
                    TaskId: 1,
                  },
                  {
                    Id: 66,
                    Subject: "Test case correction",
                    StartTime: "2018-04-04T08:30:00.000Z",
                    EndTime: "2018-04-04T10:30:00.000Z",
                    IsAllDay: false,
                    ProjectId: 1,
                    TaskId: 6,
                  },
                  {
                    Id: 67,
                    Subject: "Bug fixing",
                    StartTime: "2018-04-04T09:00:00.000Z",
                    EndTime: "2018-04-04T13:00:00.000Z",
                    IsAllDay: false,
                    ProjectId: 1,
                    TaskId: 3,
                  },
                  {
                    Id: 68,
                    Subject: "Run test cases",
                    StartTime: "2018-04-04T12:00:00.000Z",
                    EndTime: "2018-04-04T14:00:00.000Z",
                    IsAllDay: false,
                    ProjectId: 2,
                    TaskId: 4,
                  },
                  {
                    Id: 70,
                    Subject: "Bug Automation",
                    StartTime: "2018-04-04T10:30:00.000Z",
                    EndTime: "2018-04-04T14:30:00.000Z",
                    IsAllDay: false,
                    ProjectId: 2,
                    TaskId: 3,
                  },
                ],
              }}
              group={{ resources: ["Projects", "Categories"] }}
            >
              {/*@ts-ignore*/}
              <ResourcesDirective>
                {/*@ts-ignore*/}
                <ResourceDirective
                  field="ProjectId"
                  title="Choose Project"
                  name="Projects"
                  allowMultiple={false}
                  dataSource={projectData}
                  textField="text"
                  idField="id"
                  colorField="color"
                ></ResourceDirective>
                {/*@ts-ignore*/}
                <ResourceDirective
                  field="TaskId"
                  title="Category"
                  name="Categories"
                  allowMultiple={true}
                  dataSource={categoryData}
                  textField="text"
                  idField="id"
                  groupIDField="groupId"
                  colorField="color"
                ></ResourceDirective>
              </ResourcesDirective>
              {/*@ts-ignore*/}
              <ViewsDirective>
                {/*@ts-ignore*/}
                <ViewDirective option="TimelineDay" />
                {/*@ts-ignore*/}
                <ViewDirective option="TimelineWeek" />
                {/*@ts-ignore*/}
                <ViewDirective option="TimelineWorkWeek" />
                {/*@ts-ignore*/}
                <ViewDirective option="TimelineMonth" />
                {/*@ts-ignore*/}
                <ViewDirective option="Agenda" />
              </ViewsDirective>
              {/*@ts-ignore*/}
              <Inject
                services={[
                  TimelineViews,
                  TimelineMonth,
                  Agenda,
                  Resize,
                  DragAndDrop,
                ]}
              />
            </ScheduleComponent>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ActivityCalendar = styled(Component)``;
export default ActivityCalendar;
