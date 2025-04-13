import { useState } from "react";

import Roster from "./Roster";
import TeamSelect from "../UtilityComponents/TeamSelect";
import RosterTypeSelect from "../UtilityComponents/RosterTypeSelect";
import Standings from "./Standings";
import { useUser } from "../Context/UserContext"

function TeamMap() {
  const {user} = useUser();
  const [selectedTeam, setSelectedTeam] = useState(() => {
    if (user && user.favorite_team !==null){
      return user.favorite_team
    }
    else {
      return 121
    }
  });
  const [teamLogo, setTeamLogo] = useState(() => {
    if (user && user.favorite_team !==null){
      return user.favorite_team
    }
      return 121
  });
  const [selectedRoster, setSelectedRoster] = useState("40Man");

  const TeamImageSrc = `./api/${teamLogo}.svg`;

  return (
    <div className="WrapperTeamMap">
      <div className="RosterGroup">
        <div id="selectDropDowns">
          <TeamSelect
            selectedTeam={selectedTeam}
            setSelectedTeam={setSelectedTeam}
            setTeamLogo={setTeamLogo}
          />
          <RosterTypeSelect setSelectedRoster={setSelectedRoster} />
        </div>
        <h1 id="RosterTitle">Roster</h1>
        <div className="TeamElementGroupings">
        <div className="WrapperTeamMapRoster">
          <Roster selectedTeam={selectedTeam} selectedRoster={selectedRoster} />
        </div>
        <Standings selectedTeam={selectedTeam}/>



        </div>
      </div>
    </div>
  );
}

export default TeamMap;
