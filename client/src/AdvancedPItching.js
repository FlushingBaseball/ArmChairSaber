import TeamSelect from "./UtilityComponets/TeamSelect";
import { useEffect, useState } from "react";

//wins
//wild ptiches
//walks per 9
//percentages of pitches that are strikes
//pitches per inning
// era over past 10 apperances
//batters faces
// ground outs to air outs
//undefined batters hit by pitches

function AdvancedPitching() {
  const [fetchedGameData, setFetchedGameData] = useState("");
  const [selectedTeam, setSelectedTeam] = useState(121);
  const [teamLogo, setTeamLogo] = useState(121);
  const TeamImageSrc = `./Images/logos/${teamLogo}.svg`;

  useEffect(() => {
    fetch(
      `https://statsapi.mlb.com/api/v1/stats?stats=lastXGames&group=pitching&teamId=${selectedTeam}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        setFetchedGameData(data.stats[0].splits);
      });
  }, [selectedTeam]);

  if (!fetchedGameData.length) {
    return <h1>Loading...</h1>;
  }

  function mapPlayer() {
    if (fetchedGameData.length > 1) {
      return fetchedGameData.map((user) => (
        <div key={user.player.id} className="batterCard">
          <img
            className={`batterImg10 Colors${teamLogo}`}
            alt={`Headshot of ${user.player.fullName}`}
            src={`https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/${user.player.id}/headshot/silo/current`}
          ></img>
          <span className="ABSpanName">{user.player.fullName}</span>
          <span className="ABSpan">{`${user.stat.wins} : Wins`}</span>
          <span className="ABSpan">{`${user.stat.wildPitches} : Wild Pitches`}</span>
          <span className="ABSpan">{`${user.stat.walksPer9Inn} : Walks Per 9 Innings `}</span>
          <span className="ABSpan">{`${user.stat.strikePercentage} : Percentage of Pitches that are strikes`}</span>
          <span className="ABSpan">{`${user.stat.pitchesPerInning} : Pitches Per Inning`}</span>
          <span className="ABSpan">{`${user.stat.era} :  ERA over the past 10 apperances`}</span>
          <span className="ABSpan">{`${user.stat.battersFaced} : Batters Faced`}</span>
          <span className="ABSpan">{`${user.stat.groundOutsToAirouts} : Ground outs to Air outs`}</span>
          <span className="ABSpan">{`${user.stat.hitByPich} : batters hit by pitches`}</span>
          <span className="ABSpan">{`${user.stat.hitsPer9Inn} : Hits per 9`}</span>
          <span className="ABSpan">{`${user.stat.whip} Walks and Hits per inning pitched`}</span>
          <span className="ABSpan">{`${user.stat.slg} Slugging against`}</span>
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
      <div className="displayWrap">
        <img
          className="batterTeamDisplay"
          alt={"Team Logo"}
          src={TeamImageSrc}
        ></img>
        <h1 className="headerBat">Advanced Pitching Metrics by team</h1>
        <h3 className="headerBat">Rolling Ten Day average</h3>
      </div>
      {mapPlayer()}
    </div>
  );
}

export default AdvancedPitching;
