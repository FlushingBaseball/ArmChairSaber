import { useState } from "react"

export default function Collapse (){

const [isCollapsed, setIsCollapsed] = useState(false);

function handleCollapseShow(){
  setIsCollapsed((isCollapsed)=> !isCollapsed)
}

  return (
    <div className="ShownDiv">
    <div className={`WrapperCollapse ${isCollapsed ? 'collapsed' : ''}`} onClick={handleCollapseShow}>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi laborum, sed amet omnis voluptas aliquid aperiam, perspiciatis cupiditate quo veniam, voluptatem voluptatibus est animi reprehenderit totam sequi inventore doloribus a cum expedita. Laborum vitae voluptate debitis perspiciatis nobis ea labore, dicta dolore, numquam distinctio fugit optio expedita ducimus tempora voluptas!</p>
        {console.log(isCollapsed)}
    </div>
        {isCollapsed ? <i onClick={handleCollapseShow} className="fa-solid fa-caret-up fa-rotate-180"></i> : null}

    </div>
  )
}