import TeamSelect from "../UtilityComponets/TeamSelect";
import UserSettingsImage from "./UserSettingsImage";
import UserSetting from "./UserSetting";

import { useState, useEffect } from "react";


export default function UserSettingsPanel({userId, currentProfilepic, setCurrentProfilepic}){
  const [selectedTeam, setSelectedTeam ] = useState()

  //   useEffect(()=>{
  //     console.log(selectedTeam)

  // },[selectedTeam])


const favPitchingStat = {
  ERA : "Earned Run Average",
  xERA : "Expected Earned Run Average",
  FIP : "Fielding Independent Pitching",
  xFIP : "Expected Fielding Independent Pitching",
  SIERA : "Skills Interactive ERA",
}

  return (
    <div className="WrapperUserSettingsPanel">
      <h2 id="SettingsWrapperHeader">SETTINGS</h2>
      <UserSettingsImage
          userId={userId}
          currentProfilepic={currentProfilepic}
          setCurrentProfilepic={setCurrentProfilepic}
        />

      {/* <TeamSelect selectedTeam={selectedTeam} setSelectedTeam={setSelectedTeam}/> */}

      {/* <UserSetting settingCategory={"Pitching Value"} settingOptionsObject={favPitchingStat} /> */}

        
    </div>
  )
  
}