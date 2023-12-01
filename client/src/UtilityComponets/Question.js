import { useState } from "react";
export default function Question ({question, text}){

  const [isCollapsed, setIsCollapsed] = useState(false);

  function handleCollapseShow() {
    setIsCollapsed((isCollapsed) => !isCollapsed);
  }

  return (

        <div className="WrapperQuestion">
          {console.log(isCollapsed)}
          <div className={`ShownHeader`} onClick={handleCollapseShow}>
            <h3 className="QuestionHeader">{question}</h3> &nbsp; <i className={`fa-solid fa-caret-up ${isCollapsed ? `fa-rotate-180` : null }`} id='alertArrow' />

          </div>
          {isCollapsed ? (
            <p
              className="Collapser"
            >{`${text}`}
            </p> 

        ) : null}
        </div>



  )
}
