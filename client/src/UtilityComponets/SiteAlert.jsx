import { useState } from "react";

export default function SiteAlert({alertHeading, alertMessage}) {

  const [isCollapsed, setIsCollapsed] = useState(false);



   function handleCollapseShow() {
    setIsCollapsed((isCollapsed) => !isCollapsed);
  }


  return (
    <div className="Alert">
      <h2 id="WS-Winner">
        {alertHeading}
      </h2>
      <div
        className={`Collapser ${isCollapsed ? "collapsed" : ""}`}
        onClick={handleCollapseShow}
      >
        <i className="fa-solid fa-caret-up" id="alertArrow" />
        <p id="Fall">
          {alertMessage}
        </p>
      </div>
      {isCollapsed ? (
        <i
          onClick={handleCollapseShow}
          className="fa-solid fa-caret-up fa-rotate-180"
        ></i>
      ) : null}
    </div>
  );
}
