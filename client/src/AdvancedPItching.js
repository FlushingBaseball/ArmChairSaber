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
  const [selectedGroup, setSelectedGroup] = useState("pitching");
  const [teamLogo, setTeamLogo] = useState(121);
  const TeamImageSrc = `./Images/logos/${teamLogo}.svg`;

  useEffect(() => {
    fetch(
      `https://statsapi.mlb.com/api/v1/stats?stats=lastXGames&group=${selectedGroup}&teamId=${selectedTeam}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        setFetchedGameData(data.stats[0].splits);
      });
  }, [selectedTeam, selectedGroup]);

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
          <div className="bpStatWrapper">
            <span className="bpStatFeild">{`Wins`}</span>
            <span className="bpStatDataSpan">{user.stat.wins}</span>
          </div>
          <div className="bpStatWrapper">
            <span className="bpStatFeild">{`Wild Pitches`}</span>
            <span className="bpStatDataSpan">{user.stat.wildPitches}</span>
          </div>
          <div className="bpStatWrapper">
            <span className="bpStatFeild">{`Walks Per 9 Innings`}</span>
            <span className="bpStatDataSpan">{user.stat.walksPer9Inn}</span>
          </div>
          <div className="bpStatWrapper">
            <span className="bpStatFeild">{`% of Pitches that are strikes`}</span>
            <span className="bpStatDataSpan">{user.stat.strikePercentage}</span>
          </div>
          <div className="bpStatWrapper">
            <span className="bpStatFeild">{`Pitches Per Inning`}</span>
            <span className="bpStatDataSpan">{user.stat.pitchesPerInning}</span>
          </div>
          <div className="bpStatWrapper">
            <span className="bpStatFeild">{`ERA over the past 10 apperances`}</span>
            <span className="bpStatDataSpan">{user.stat.era}</span>
          </div>
          <div className="bpStatWrapper">
            <span className="bpStatFeild">{`Batters Faced`}</span>
            <span className="bpStatDataSpan">{user.stat.battersFaced}</span>
          </div>
          <div className="bpStatWrapper">
            <span className="bpStatFeild">{`Ground outs to Air outs`}</span>
            <span className="bpStatDataSpan">
              {user.stat.groundOutsToAirouts}
            </span>
          </div>
          <div className="bpStatWrapper">
            <span className="bpStatFeild">{`batters hit by pitches`}</span>
            <span className="bpStatDataSpan">{user.stat.hitByPich}</span>
          </div>
          <div className="bpStatWrapper">
            <span className="bpStatFeild">{`Hits per 9`}</span>
            <span className="bpStatDataSpan">{user.stat.hitsPer9Inn}</span>
          </div>
          <div className="bpStatWrapper">
            <span className="bpStatFeild">{`Walks and Hits per inning pitched`}</span>
            <span className="bpStatDataSpan">{user.stat.whip}</span>
          </div>
          <div className="bpStatWrapper">
            <span className="bpStatFeild">{`Slugging against`}</span>
            <span className="bpStatDataSpan">{user.stat.slg}</span>
          </div>
          <div className="bpStatWrapper">
            <span className="bpStatFeild">{`Batters Faced`}</span>
            <span className="bpStatDataSpan">{user.stat.battersFaced}</span>
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
