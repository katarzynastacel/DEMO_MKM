import { TimePickerComponent } from "@syncfusion/ej2-react-calendars";
import React from "react";
import styled from "styled-components";

interface IComponentProps {
  className?: string;
  record: any;
  onClose: () => void;
}

const Component: React.FunctionComponent<IComponentProps> = (
  props: IComponentProps
) => {
  return (
    <div className={props.className}>
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title has-text-info is-size-2">
              {" "}
              <i className="fas fa-pen"></i> {props.record.user}{" "}
            </p>
            <button
              onClick={props.onClose}
              className="delete"
              aria-label="close"
            ></button>
          </header>
          <section className="modal-card-body">
            <br />

            <>
              <label className="label">Godzina rozpoczęcia pracy</label>
              <div className="control-pane format">
                <div className="control-section">
                  <div className="timepicker-control-section">
                    <TimePickerComponent
                      placeholder="Wybierz godzinę rozpoczęcia pracy"
                      step={1}
                      format={"HH:mm:ss"}
                      showClearButton={false}
                      allowEdit={false}
                      value={new Date()}
                    ></TimePickerComponent>
                  </div>
                </div>
              </div>
            </>

            <br />
            <br />

            <>
              <label className="label">Godzina zakończenia pracy</label>
              <div className="control-pane format">
                <div className="control-section">
                  <div className="timepicker-control-section">
                    <TimePickerComponent
                      placeholder="Wybierz godzinę zakończenia pracy"
                      step={1}
                      format={"HH:mm:ss"}
                      showClearButton={false}
                      allowEdit={false}
                      value={new Date()}
                    ></TimePickerComponent>
                  </div>
                </div>
              </div>
            </>

            <br />
            <br />
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success">Zapisz</button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export const EditStartEndTimeAdminModal = styled(Component)`
  .modal-card {
    width: 60%;
    height: auto;
  }
  .modal-card-body {
    position: relative;

    .delete {
      position: absolute;
      top: 5px;
      right: 5px;
    }
  }
`;
