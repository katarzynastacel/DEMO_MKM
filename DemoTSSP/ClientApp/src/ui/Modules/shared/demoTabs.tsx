import React from "react";

interface IComponent {
  className?: string;
  currentActive: number;
}

export const DemoTabs: React.FunctionComponent<IComponent> = (
  props: IComponent
) => {
  return (
    <div className="tabs is-centered">
      <ul>
        <li className={props.currentActive === 8 ? "is-active" : ""}>
          <a>Agata Business Services</a>
        </li>
      </ul>
    </div>
  );
};
export default DemoTabs;
