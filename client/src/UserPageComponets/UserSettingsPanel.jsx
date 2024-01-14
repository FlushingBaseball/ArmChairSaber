import TeamSelect from "../UtilityComponets/TeamSelect";
import UserSettingsImage from "./UserSettingsImage";
import { useState, useEffect } from "react";


export default function UserSettingsPanel({userId, currentProfilepic, setCurrentProfilepic}){
  const [selectedTeam, setSelectedTeam ] = useState()

  //   useEffect(()=>{
  //     console.log(selectedTeam)

  // },[selectedTeam])

  return (
    <div className="WrapperUserSettingsPanel">
      <UserSettingsImage
          userId={userId}
          currentProfilepic={currentProfilepic}
          setCurrentProfilepic={setCurrentProfilepic}
        />

      {/* <TeamSelect selectedTeam={selectedTeam} setSelectedTeam={setSelectedTeam}/> */}


      {/* <div className="Setting">
        <div className="SettingSpan"></div>
        <div className="radio">
          <label>
            <input name="favPitchingStat" type="radio" value="fip" checked={true} />
            ERA
          </label>
          <label>
            <input name="favPitchingStat" type="radio" value="fip" checked={true} />
            FIP
          </label>
          <label >
            <input name="favPitchingStat" type="radio" value="fip" checked={true} />
            SIERA
          </label>
        </div>
      </div> */}
        
    </div>
  )
  
}