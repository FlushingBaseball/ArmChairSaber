import { handleImageError } from "../UtilityFunctions/UtilityFunctions";

function PitcherVsBatter({ ...dataLiveGame }) {
  return (
    <div className="WrapperPitcherVsBatter">
      <div className="matchup">
        <div className="PitcherVsBatter">
          <span>{`Pitching: `}</span>
          <span>
            {dataLiveGame.liveData.plays.currentPlay.matchup.pitcher.fullName}
          </span>
          <img
            className="vsImage"
            src={`https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/${dataLiveGame.liveData.plays.currentPlay.matchup.pitcher.id}/headshot/silo/current`}
            alt={dataLiveGame.liveData.plays.currentPlay.matchup.pitcher.fullName}
            onError={(e)=> handleImageError(e.target, dataLiveGame.liveData.plays.currentPlay.matchup.pitcher.id)}
          ></img>
        </div>
        <div className="vs-text-container">
          <span id="VS">VS</span>
        </div>

        <div className="PitcherVsBatter">
          <span>{`Batting: `}</span>
          <span>{dataLiveGame.liveData.linescore.offense.batter.fullName}</span>
          <img
            className="vsImage"
            src={`https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/${dataLiveGame.liveData.linescore.offense.batter.id}/headshot/silo/current`}
            onError={(e) => handleImageError(e.target, dataLiveGame.liveData.linescore.offense.batter.id)}
            alt={dataLiveGame.liveData.linescore.offense.batter.fullName}
          ></img>
        </div>
      </div>

      <div className="onDeckDiv">
        <span>{`On Deck: `}</span>
        <span>{dataLiveGame.liveData.linescore.offense.inHole.fullName}</span>
        <img
          className="OnDeck"
          src={`https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/${dataLiveGame.liveData.linescore.offense.inHole.id}/headshot/silo/current`}
          alt={`On deck batter ${dataLiveGame.liveData.linescore.offense.inHole.fullName}`}
          onError={(e)=> handleImageError(e.target, dataLiveGame.liveData.linescore.offense.inHole.id)}
        ></img>
      </div>
    </div>
  );
}

export default PitcherVsBatter;
