import { useState } from "react"


export default function NoGamesToday(){

  const [isActive, setIsActive] = useState(null)
  
  function handlePanelClick(panelId){
    removeActiveClasses();
    setIsActive(panelId)
  }

  function removeActiveClasses(){
    setIsActive(null)
  }

  const panels = {
    
  }



  return(
    <div className="Wrapper-No-Games">
        
    </div>
  )
}