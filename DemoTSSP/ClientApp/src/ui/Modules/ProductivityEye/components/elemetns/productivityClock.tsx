import {
  AnnotationDirective,
  Annotations,
  AnnotationsDirective,
  AxesDirective,
  AxisDirective,
  CircularGaugeComponent,
  Inject,
  PointerDirective,
  PointersDirective,
  RangeDirective,
  RangesDirective,
} from "@syncfusion/ej2-react-circulargauge";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
interface IComponentProps {
  className?: string;
  value: number;
}

const Component: React.FunctionComponent<IComponentProps> = (
  props: IComponentProps
) => {
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const getColour = (value: number) => {
    if (value > 75) {
      return "#23c052";
    }

    if (value > 35) {
      return "#f1a008";
    } else {
      return "#d35465";
    }
  };
  return (
    <div className={props.className}>
      {" "}
      <CircularGaugeComponent
        style={{ display: "block" }}
        centerY="70%"
        width="350px"
        height="300px"
      >
        {/*@ts-ignore*/}
        <Inject services={[Annotations]} />
        {/*@ts-ignore*/}
        <AxesDirective>
          {/*@ts-ignore*/}
          <AxisDirective
            startAngle={300}
            endAngle={60}
            radius="80%"
            minimum={1}
            maximum={100}
            majorTicks={{
              width: 0,
            }}
            lineStyle={{ width: 0 }}
            minorTicks={{
              width: 0,
            }}
            labelStyle={{
              font: { size: "0px" },
            }}
          >
            {/*@ts-ignore*/}
            <AnnotationsDirective>
              {/*@ts-ignore*/}
              <AnnotationDirective
                content={`<div style="color:#666666;font-size:35px;">Productivity ${value} %</div>`}
                angle={0}
                radius="110%"
                zIndex="1"
              ></AnnotationDirective>
            </AnnotationsDirective>
            {/*@ts-ignore*/}
            <PointersDirective>
              {/*@ts-ignore*/}
              <PointerDirective
                type="RangeBar"
                value={value}
                radius="90%"
                color={getColour(value)}
                pointerWidth={30}
                animation={{
                  duration: 2300,
                }}
              />
              {/*@ts-ignore*/}
              <PointerDirective
                value={value}
                radius="90%"
                color="#424242"
                pointerWidth={9}
                cap={{ radius: 10, color: "#424242", border: { width: 0 } }}
                animation={{
                  duration: 2300,
                }}
              />
            </PointersDirective>
            {/*@ts-ignore*/}
            <RangesDirective>
              {/*@ts-ignore*/}
              <RangeDirective
                start={1}
                end={100}
                radius="90%"
                color="#E0E0E0"
                startWidth={30}
                endWidth={30}
              />
            </RangesDirective>
          </AxisDirective>
        </AxesDirective>
      </CircularGaugeComponent>
      <CircularGaugeComponent
        style={{ display: "none" }}
      ></CircularGaugeComponent>
    </div>
  );
};

export const ProductivityClock = styled(Component)``;
