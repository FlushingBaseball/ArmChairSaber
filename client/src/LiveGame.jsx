import { useEffect, useState } from "react";
import { useParams } from "react-router";

import LiveGameScoreBoard from "./LiveComponents/LiveGameScoreboard";
import LiveBases from "./LiveComponents/LiveBases";
import LiveCircles from "./LiveComponents/LiveCircles";
import PitcherVsBatter from "./LiveComponents/PitcherVsBatter";
import LiveBoxScore from "./LiveComponents/LiveBoxScore";
import LivePitchData from "./LiveComponents/LivePitchData";
import LivePitchDataVis from "./LiveComponents/LivePitchDataVis";
import BattingOrderAway from "./LiveComponents/BattingOrderAway";
import BattingOrderHome from "./LiveComponents/BattingOrderHome";
import GameWeather from "./LiveComponents/GameWeather";

import CurrentPlay from "./LiveComponents/CurrentPlay";
import ScoringPlay from "./LiveComponents/ScoringPlay";

function LiveGame() {
  const { gamePk } = useParams();
  const [dataLiveGame, setDataLiveGame] = useState(null);

  //Fetching new data every 10 seconds
  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://statsapi.mlb.com/api/v1.1/game/${gamePk}/feed/live`
      );
      const newData = await response.json();

      if (JSON.stringify(newData) !== JSON.stringify(dataLiveGame)) {
        setDataLiveGame(newData);
      }
    } catch (error) {
      console.error("error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000); // ten seconds = 10,000 milliseconds
    return () => clearInterval(interval);
  }, []);

  if (dataLiveGame === null) {
    return <h4>...Loading</h4>;
  }

  return (
    <div>
      {/* {console.log(dataLiveGame)} */}
      <div className="gameInfo">
        <LiveGameScoreBoard {...dataLiveGame} />
        <div className="atAGlance">
          <span className="glanceSpan">{`It is the ${dataLiveGame.liveData.linescore.inningState} of the ${dataLiveGame.liveData.linescore.currentInning}`}</span>
        </div>
        <div className="firstLiveRow">
          <LiveBases {...dataLiveGame} />
          <CurrentPlay {...dataLiveGame} />
          <LiveCircles {...dataLiveGame} />
        </div>
        <PitcherVsBatter {...dataLiveGame} />
        <div className="pitchComponents">
          <LivePitchData {...dataLiveGame} />
          <LivePitchDataVis {...dataLiveGame} />
        </div>
        <div className="bothLineups">
          <BattingOrderAway {...dataLiveGame} />
          <BattingOrderHome {...dataLiveGame} />
        </div>
        <LiveBoxScore {...dataLiveGame} />
        <GameWeather {...dataLiveGame} />

        <ScoringPlay {...dataLiveGame} />
      </div>
    </div>
  );
}

export default LiveGame;
