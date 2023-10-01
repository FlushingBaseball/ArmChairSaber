
import { useState } from "react";

import Roster from "./Roster";
import TeamSelect from "./UtilityComponets/TeamSelect";
import RosterTypeSelect from "./UtilityComponets/RosterTypeSelect";

function TeamMap() {
  const [selectedTeam, setSelectedTeam] = useState(121);
  const [teamLogo, setTeamLogo] = useState(121)
  const [selectedRoster, setSelectedRoster] = useState('40Man')
  
  const TeamImageSrc=`./Images/logos/${teamLogo}.svg`;
  
  console.log("in Team Map, selectedRoster is", selectedRoster)
  return (
    <div className="WrapperTeamMap">
      <div className="RosterGroup">
        <div id="selectDropDowns">
          <TeamSelect 
              selectedTeam={selectedTeam}
              setSelectedTeam={setSelectedTeam}
              setTeamLogo={setTeamLogo}
          />
          <RosterTypeSelect
            setSelectedRoster={setSelectedRoster}
          />
        </div>
        <h1 id="RosterTitle">Roster</h1>
        <div className="WrapperTeamMapRoster">
        <Roster selectedTeam={selectedTeam} selectedRoster={selectedRoster}/>
        </div>
      </div>
    </div>
  );
}

export default TeamMap;




