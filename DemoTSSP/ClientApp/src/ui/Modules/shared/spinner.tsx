import React from "react";
import styled from "styled-components";

interface ISpinnerProps {
  className?: string;
  label: string;
}

const SpinnerComponent: React.FunctionComponent<ISpinnerProps> = (
  props: ISpinnerProps
) => {
  return (
    <div className={` ${props.className}`}>
      <div className="loaderr">
        <div className="inner one"></div>
        <div className="inner two"></div>
        <div className="inner three"></div>
      </div>
      <p className="has-text-centered has-text-primary"> {props.label}</p>
    </div>
  );
};

export const Spinner = styled(SpinnerComponent)`
  position: relative;
  width: 300px;
  height: 300px;
  font-size: 2rem;
  font-weight: 700;
  margin: 0 auto;
  .loaderr {
    position: absolute;
    top: calc(50% - 50px);
    left: calc(50% - 50px);
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  .inner {
    position: absolute;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .inner.one {
    left: 0%;
    top: 0%;
    animation: rotate-one 1s linear infinite;
    border-bottom: 3px solid #00d1b2;
  }

  .inner.two {
    right: 0%;
    top: 0%;
    animation: rotate-two 1s linear infinite;
    border-right: 3px solid #00d1b2;
  }

  .inner.three {
    right: 0%;
    bottom: 0%;
    animation: rotate-three 1s linear infinite;
    border-top: 3px solid #00d1b2;
  }

  @keyframes rotate-one {
    0% {
      transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
    }
    100% {
      transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
    }
  }

  @keyframes rotate-two {
    0% {
      transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
    }
    100% {
      transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
    }
  }

  @keyframes rotate-three {
    0% {
      transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
    }
    100% {
      transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
    }
  }
`;
