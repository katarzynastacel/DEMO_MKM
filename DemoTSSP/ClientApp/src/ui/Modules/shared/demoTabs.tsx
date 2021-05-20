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
        <li className={props.currentActive === 1 ? "is-active" : ""}>
          <a>Obecność</a>
        </li>
        <li>
          <a>Godziny Pracy</a>
        </li>
        <li>
          <a>Koszty</a>
        </li>
        <li>
          <a>Urlop</a>
        </li>
        <li>
          <a>CRM</a>
        </li>
        <li className={props.currentActive === 6 ? "is-active" : ""}>
          <a> Admin/Obecności</a>
        </li>
        <li>
          <a>Admin/Godziny Pracy</a>
        </li>
        <li>
          <a>Admin/Koszty</a>
        </li>
        <li>
          <a> Admin/Urlopy</a>
        </li>
        <li>
          <a>Admin/CRM </a>
        </li>
        <li>
          <a>Ustawienia</a>
        </li>
        <li>
          <a> Płatności</a>
        </li>
      </ul>
    </div>
  );
};
export default DemoTabs;
