import TeamSelect from "./UtilityComponets/TeamSelect";
import { useEffect, useState } from "react";

function AdvancedBatting() {
  const [fetchedGameData, setFetchedGameData] = useState("");
  const [selectedTeam, setSelectedTeam] = useState(136);
  const [teamLogo, setTeamLogo] = useState(136);
  const TeamImageSrc = `./Images/logos/${teamLogo}.svg`;

  useEffect(() => {
    fetch(
      `https://statsapi.mlb.com/api/v1/stats?stats=lastXGames&group=hitting&teamId=${selectedTeam}`
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
            alt={user.player.fullName}
            className={`batterImg10 Colors${teamLogo}`}
            src={`https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/${user.player.id}/headshot/silo/current`}
          ></img>
          <span className="ABSpanName">{user.player.fullName}</span>
          <span className="ABSpan">{`${user.stat.gamesPlayed} : Games Played`}</span>
          <span className="ABSpan">{`${user.stat.atBats} : At Bats`}</span>
          <span className="ABSpan">{`${user.stat.airOuts} : Air Outs`}</span>
          <span className="ABSpan">{`${user.stat.atBatsPerHomeRun} : At Bats Per Home Run`}</span>
          <span className="ABSpan">{`${user.stat.avg} : Average`}</span>
          <span className="ABSpan">{`${user.stat.babip} : Batting Average on balls in play`}</span>
          <span className="ABSpan">{`${user.stat.obp} : On Base Percentage`}</span>
          <span className="ABSpan">{`${user.stat.slg} : Slugging Percentage`}</span>
          <span className="ABSpan">{`${user.stat.ops} : On Base Plus Slugging`}</span>
          <span className="ABSpan">{`${user.stat.strikeOuts} : Strike outs`}</span>
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
          alt={`Team Logo`}
          src={TeamImageSrc}
        ></img>
        <h1 className="headerBat">Advanced Batting Metrics by team</h1>
        <h3 className="headerBat">Rolling Ten Day average</h3>
      </div>
      {mapPlayer()}
    </div>
  );
}

export default AdvancedBatting;
