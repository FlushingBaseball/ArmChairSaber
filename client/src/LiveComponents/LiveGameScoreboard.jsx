function LiveGameScoreBoard({ ...dataLiveGame }) {
  return (
    <div className="LiveGameScoreBoard">
      <div className="scoreHeader">
        <div className="team">
          <img
            alt="team logo"
            className="glanceLogo"
            src={`/api/team_logo_images/${dataLiveGame.gameData.teams.home.id}.svg`}
          ></img>
          <span className="teamNameSpan">
            {dataLiveGame.gameData.teams.home.name}
          </span>
          <span className="RecordSpan">{`Record ${dataLiveGame.gameData.teams.home.record.wins} - ${dataLiveGame.gameData.teams.home.record.losses}`}</span>
        </div>
      </div>

      <div className="bigOldScoreNums">
        <span className="scoreNum">
          {dataLiveGame.liveData.linescore.teams.home.runs}
        </span>
        <span className="scoreNum"> - </span>
        <span className="scoreNum">
          {dataLiveGame.liveData.linescore.teams.away.runs}
        </span>
      </div>

      <div className="scoreHeader">
        <div className="team">
          <img
            className="glanceLogo"
            alt=""
            src={`/api/team_logo_images/${dataLiveGame.gameData.teams.away.id}.svg`}
          ></img>
          <span className="teamNameSpan">
            {dataLiveGame.gameData.teams.away.name}
          </span>
          <span className="RecordSpan">{`Record ${dataLiveGame.gameData.teams.away.record.wins} - ${dataLiveGame.gameData.teams.away.record.losses}`}</span>
        </div>
      </div>
    </div>
  );
}

export default LiveGameScoreBoard;
