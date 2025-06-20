import TeamSelect from "../UtilityComponents/TeamSelect";
import GroupSelect from "../UtilityComponents/GroupSelect";
import BatLoader from "../UtilityComponents/BatLoader"
import { useEffect, useState } from "react";
import { handlePlayerImageError, handleTeamLogoError } from "../UtilityFunctions/UtilityFunctions";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";


function RollingMetrics() {
  const [fetchedGameData, setFetchedGameData] = useState("");
  const {user} = useUser()
  const navigate = useNavigate();
  const [selectedTeam, setSelectedTeam] = useState(() => {
    if (user && user.favorite_team !==null){
      return user.favorite_team
    }
    else {
      return 121
    }
  });
  const [selectedGroup, setSelectedGroup] = useState('hitting')
  const [teamLogo, setTeamLogo] = useState(() => {
    if (user && user.favorite_team !==null){
      return user.favorite_team
    }
    else {
      return 121
    }
  });
  const TeamImageSrc = `/api/team_logo_images/${teamLogo}.svg`; 
  

  useEffect(() => {
    fetch(
      `https://statsapi.mlb.com/api/v1/stats?stats=lastXGames&group=${selectedGroup}&teamId=${selectedTeam}&season=2025`
    )
      .then((resp) => resp.json())
      .then((data) => {
        setFetchedGameData(data.stats[0].splits);
      });
  }, [selectedTeam,selectedGroup]);


  useEffect(()=>{
    console.log(fetchedGameData)
  },[fetchedGameData])

//change this to only display on failure of the request not just an empty request
  // if (!fetchedGameData.length) {
  //   return <BatLoader />
  // }


  function getStatValue(playerData, path){
    const keys = path.split('.');
    const value = keys.reduce((obj, key) => obj && obj[key], playerData);
    return value;
  }

const rollingHittingStatsToDisplay = {
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

function handleCardClick(playerId){
  if (!playerId){
    return null;
  }
  navigate(`/player/${String(playerId)}`)
}



  function mapPlayer() {
    if (fetchedGameData.length >= 1) {
      return fetchedGameData.map((playerData) => (
        <div key={playerData.player.id} className="batterCard">
          <img
            alt={playerData.player.fullName}
            className={`Rolling-Metrics-Player-Image Colors${teamLogo}`}
            src={`https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/${playerData.player.id}/headshot/silo/current`}
            onClick={()=> handleCardClick(playerData.player.id)}
          />
          <span className="ABSpanName">{playerData.player.fullName}</span>
          {Object.entries(rollingStatsToDisplay).map(([key, path]) => (
            <div key={key + path + playerData.player.fullName} className="bpStatWrapper">
              <span className="bpStatfield">{key}</span>
              <span className="bpStatDataSpan">{getStatValue(playerData, path)}</span>
            </div>
          ))}
        </div>
      ));
    }
    else {
      return <div className="No-Ten-Appearances">{`No one on the ${selectedGroup} staff has played in ten games yet`}</div>
    }
  }

  return (
    <div className="Wrapper-Rolling-Metrics">
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
        <span className="headerBat">{`Ten day rolling ${selectedGroup} metrics`}</span>
      </div>
      {mapPlayer()}
    </div>
  );
}

export default RollingMetrics;
