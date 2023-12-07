import TeamSelect from "./UtilityComponets/TeamSelect";
// import GroupSelect from "./UtilityComponets/GroupSelect";
import { useEffect, useState } from "react";

function AdvancedBatting() {
  const [fetchedGameData, setFetchedGameData] = useState("");
  const [selectedTeam, setSelectedTeam] = useState(136);
  const [selectedGroup, setSelectedGroup] = useState('hitting')
  const [teamLogo, setTeamLogo] = useState(136);
  const TeamImageSrc = `./Images/logos/${teamLogo}.svg`;

  useEffect(() => {
    fetch(
      `https://statsapi.mlb.com/api/v1/stats?stats=lastXGames&group=${selectedGroup}&teamId=${selectedTeam}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        setFetchedGameData(data.stats[0].splits);
      });
  }, [selectedTeam,selectedGroup]);

  if (!fetchedGameData.length) {
    return <h1>Loading...</h1>;
  }

  function mapPlayer() {
    if (fetchedGameData.length > 1) {
      return fetchedGameData.map((user) => (
        <div key={user.player.id} className="batterCard">
          <img
            alt={user.player.fullName}
            className={`batterImg10 Colors${teamLogo}`}
            src={`https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/${user.player.id}/headshot/silo/current`}
          ></img>

          <span className="ABSpanName">{user.player.fullName}</span>
          <div className="bpStatWrapper">
            <span className="bpStatFeild">{`Games Played`}</span>
            <span className="bpStatDataSpan">{user.stat.gamesPlayed}</span>
          </div>
          <div className="bpStatWrapper">
            <span className="bpStatFeild">{`At Bats`}</span>
            <span className="bpStatDataSpan">{user.stat.atBats}</span>
          </div>
          <div className="bpStatWrapper">
            <span className="bpStatFeild">{`Air Outs`}</span>
            <span className="bpStatDataSpan">{user.stat.airOuts}</span>
          </div>
          <div className="bpStatWrapper">
            <span className="bpStatFeild">{`At Bats Per Home Run`}</span>
            <span className="bpStatDataSpan">{user.stat.atBatsPerHomeRun}</span>
          </div>
          <div className="bpStatWrapper">
            <span className="bpStatFeild">{`Average`}</span>
            <span className="bpStatDataSpan">{user.stat.avg}</span>
          </div>
          <div className="bpStatWrapper">
            <span className="bpStatFeild">{`Batting Average on balls in play`}</span>
            <span className="bpStatDataSpan">{user.stat.babip}</span>
          </div>
          <div className="bpStatWrapper">
            <span className="bpStatFeild">{`On Base Percentage`}</span>
            <span className="bpStatDataSpan">{user.stat.obp}</span>
          </div>
          <div className="bpStatWrapper">
            <span className="bpStatFeild">{`Slugging Percentage`}</span>
            <span className="bpStatDataSpan">{user.stat.slg}</span>
          </div>
          <div className="bpStatWrapper">
            <span className="bpStatFeild">{`On Base Plus Slugging`}</span>
            <span className="bpStatDataSpan">{user.stat.ops}</span>
          </div>
          <div className="bpStatWrapper">
            <span className="bpStatFeild">{`Strike outs`}</span>
            <span className="bpStatDataSpan">{user.stat.strikeOuts}</span>
          </div>
        </div>
      ));
    }
  }

  return (
    <div className="WrapperadvancedBatter">
      <TeamSelect
        selectedTeam={selectedTeam}
        setSelectedTeam={setSelectedTeam}
        setTeamLogo={setTeamLogo}
      />
      {/* <GroupSelect 
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
      /> */}
      <div className="displayWrap">
        <img
          className="batterTeamDisplay"
          alt={`Team Logo`}
          src={TeamImageSrc}
        ></img>
        <h1 className="headerBat">{`Advanced ${selectedGroup} Metrics by team`}</h1>
        <h3 className="headerBat">Rolling Ten Day average</h3>
      </div>
      {mapPlayer()}
    </div>
  );
}

export default AdvancedBatting;
