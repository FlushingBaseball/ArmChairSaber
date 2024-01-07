import TeamSelect from "./UtilityComponets/TeamSelect";
import GroupSelect from "./UtilityComponets/GroupSelect";
import { useEffect, useState } from "react";

function RollingMetrics() {
  const [fetchedGameData, setFetchedGameData] = useState("");
  const [selectedTeam, setSelectedTeam] = useState(136);
  const [selectedGroup, setSelectedGroup] = useState('hitting')
  const [teamLogo, setTeamLogo] = useState(136);
  const TeamImageSrc = `./Images/logos/${teamLogo}.svg`;

  useEffect(() => {
    fetch(
      `https://statsapi.mlb.com/api/v1/stats?stats=lastXGames&group=${selectedGroup}&teamId=${selectedTeam}&season=2023`
    )
      .then((resp) => resp.json())
      .then((data) => {
        setFetchedGameData(data.stats[0].splits);
      });
  }, [selectedTeam,selectedGroup]);


  // useEffect(()=>{
  //   console.log(fetchedGameData)
  // },[fetchedGameData])


  if (!fetchedGameData.length) {
    return <h1>Loading...</h1>;
  }


  function getStatValue(user, path){
    const keys = path.split('.');
    const value = keys.reduce((obj, key) => obj && obj[key], user);
    return value;
  }

const rollingHittingStatsToDisplay = {
   "Games Played": "stat.gamesPlayed",
   "At Bats" : "stat.atBats",
   "Air Outs" : "stat.airOuts",
   "At Bats Per Home Run": "stat.atBatsPerHomeRun",
   "Average" : "stat.avg",
   "Batting Average on balls in play" : "stat.babip",
   "On Base Percentage": "stat.obp",
   "Slugging Percentage": "stat.slg",
   "On Base Plus Slugging": "stat.ops",
   "Strike outs": "stat.strikeOuts"
}

const rollingPitchingStatsToDisplay={
  "Wins": "stat.wins",
  "Wild Pitches": "stat.wildPitches",
  "Walks Per 9 Innings": "stat.walksPer9Inn",
  "% of Pitches that are strikes": "stat.strikePercentage",
  "Pitches Per Inning": "stat.pitchesPerInning",
  "ERA over the past 10 apperances": "stat.era",
  "Batters Faced":"stat.battersFaced",
  "Ground outs to Air outs":"stat.groundOutsToAirouts",
  "batters hit by pitches":"stat.hitByPich",
  "Hits per 9":"stat.hitsPer9Inn",
  "Walks and Hits per inning pitched":"stat.whip",
  "Slugging against":"stat.slg",
  "Batters Faced":"stat.battersFaced",
}

const rollingStatsToDisplay = selectedGroup === "hitting" ? rollingHittingStatsToDisplay : rollingPitchingStatsToDisplay;



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
          {Object.entries(rollingStatsToDisplay).map(([key, path]) => (
            <div key={key + path + user.player.fullName} className="bpStatWrapper">
              <span className="bpStatFeild">{key}</span>
              <span className="bpStatDataSpan">{getStatValue(user, path)}</span>
            </div>
          ))}
        </div>
      ));
    }
  }

  return (
    <div className="WrapperadvancedBatter">
      <div className="WrapperSelect">
      <TeamSelect
        selectedTeam={selectedTeam}
        setSelectedTeam={setSelectedTeam}
        setTeamLogo={setTeamLogo}
      />
      <GroupSelect 
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
      />
      </div>
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

export default RollingMetrics;
