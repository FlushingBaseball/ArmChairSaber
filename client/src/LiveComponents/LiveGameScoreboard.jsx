function LiveGameScoreBoard({...dataLiveGame }) {

  return (
    <div className="LiveGameScoreBoard">
      <div className="scoreHeader">
        <div className="team">
          <img
            alt="team logo"
            className="glanceLogo"
            src={`https://www.mlbstatic.com/team-logos/${dataLiveGame.gameData.teams.home.id}.svg`}
            onError={(e) => {handleTeamLogoError(e.target, dataLiveGame.gameData.teams.home.team.id,  dataLiveGame.gameData.teams.home.team.name)}}
            />
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
            alt={`Team logo`}
            src={`https://www.mlbstatic.com/team-logos/${dataLiveGame.gameData.teams.away.id}.svg`}
            onError={(e) => {handleTeamLogoError(e.target, dataLiveGame.gameData.teams.away.team.id,  dataLiveGame.gameData.teams.away.team.name)}}
          />
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
