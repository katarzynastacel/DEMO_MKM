import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
interface IComponentProps {
  className?: string;
}

interface IResposne {
  licenseKey: string;
}

const Component: React.FunctionComponent<IComponentProps> = (
  props: IComponentProps
) => {
  const HandleClick = () => {
    alert("Registration Required");
  };

  return (
    <div className={props.className}>
      <div className="has-text-centered license-key-container">
        <p className="is-size-1">
          <b>License Key</b>
        </p>
        <p onClick={HandleClick} className="is-size-1">
          <span className="tag is-primary is-large">
            S429SFkV0496sk1cmoi4a355fdakRJIsori54HMK
          </span>
          <i className="far fa-copy"></i>
        </p>
      </div>

      <div>
        <p onClick={HandleClick} className="download-software has-text-info">
          <a>Download Cloud Eye 👁</a>
          <br />
          <i className="fas fa-cloud-download-alt"></i>
        </p>
      </div>
    </div>
  );
};

export const SoftwareDownloadComponent = styled(Component)`
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
    font-size: 2rem !important;
  }

  .fa-copy {
    margin-left: 25px;
    &:hover {
      cursor: pointer;
    }
  }
`;
