import React from "react";
import styled from "styled-components";

interface IComponent {
  className?: string;
  record: any;
  mode: any;
  onClose: () => void;
}
enum LocationType {
  WORKSTART = "WORKSTART",
  WORKEND = "WORKEND",
}

export const Component: React.FunctionComponent<IComponent> = (
  props: IComponent
) => {
  return (
    <div className={props.className}>
      <div className="modal is-active fadein ride-step5">
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <h1 className="modal-card-title has-text-primary">
              {props.mode == LocationType.WORKSTART && (
                //@ts-ignore
                <div>
                  <h1 className="has-text-centered is-uppercase has-text-primary has-text-weight-medium">
                    <i className="fas fa-map-marker-alt has-text-danger"></i>{" "}
                    Zlokalizowano ✓
                  </h1>
                </div>
              )}

              {props.mode == LocationType.WORKEND && (
                //@ts-ignore
                <div>
                  <h1 className="has-text-centered is-uppercase has-text-primary has-text-weight-medium">
                    <i className="fas fa-map-marker-alt has-text-danger"></i>{" "}
                    Zlokalizowano ✓
                  </h1>
                </div>
              )}
            </h1>
            <button
              onClick={props.onClose}
              className="delete"
              aria-label="close"
            ></button>
          </header>
          <section className="modal-card-body">
            {props.record && props.mode == LocationType.WORKSTART && (
              <div className="has-text-centered is-size-3">
                <p>
                  Użytkownik {props.record && props.record.user} rozpoczął pracę
                  o godzinie <br />
                  <small className="has-text-primary">
                    {props.record && props.record.workStartedAt}
                  </small>
                </p>

                {props.record.startAccuracy != -1 && (
                  <>
                    <br /> <br />
                    <p>
                      Zasięg dokładności do {props.record.startAccuracy} metrów
                    </p>
                  </>
                )}
              </div>
            )}
            {props.record && props.mode == LocationType.WORKEND && (
              <div className="has-text-centered is-size-3">
                <p>
                  Użytkownik {props.record && props.record.user} zakończył pracę
                  o godzinie <br />
                  <small className="has-text-primary">
                    {props.record && props.record.workfinishedAt}
                  </small>
                </p>
                {props.record.endAccuracy != -1 && (
                  <>
                    <br /> <br />
                    <p>
                      Zasięg dokładności do {props.record.endAccuracy} metrów
                    </p>
                  </>
                )}
              </div>
            )}

            {props.record && props.mode == LocationType.WORKSTART && (
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCxAmHiiMLtMHfwwsvNQfyV_xiGJdnf_e4&q=${
                  props.record && props.record.startLocation
                }`}
                width="800px"
                height="800px"
              ></iframe>
            )}

            {props.record && props.mode == LocationType.WORKEND && (
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCxAmHiiMLtMHfwwsvNQfyV_xiGJdnf_e4&q=${
                  props.record && props.record.finishLocation
                }`}
                width="800px"
                height="800px"
              ></iframe>
            )}
          </section>
          <footer className="modal-card-foot">
            <button onClick={props.onClose} className={`button is-primary`}>
              Zamknij
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};
//
export const LocationModal = styled(Component)`
  max-height: 50%;
`;
