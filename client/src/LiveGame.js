import { useEffect, useState, } from "react"
import { useParams } from "react-router"

import LiveGameScoreBoard from "./LiveComponets/LiveGameScoreboard"
import LiveBases from "./LiveComponets/LiveBases";
import LiveCircles from "./LiveComponets/LiveCircles";
import PitcherVsBatter from "./LiveComponets/PitcherVsBatter";
import LiveBoxScore from "./LiveComponets/LiveBoxScore";
import LivePitchData from "./LiveComponets/LivePitchData";
import LivePitchDataVis from "./LiveComponets/LivePitchDataVis";
import BattingOrderAway from "./LiveComponets/BattingOrderAway";
import BattingOrderHome from "./LiveComponets/BattingOrderHome";
import GameWeather from "./LiveComponets/GameWeather";

import CurrentPlay from "./LiveComponets/CurrentPlay";
import ScoringPlay from "./LiveComponets/ScoringPlay";

function LiveGame(){

const {gamePk} = useParams();
const [dataLiveGame, setDataLiveGame] = useState(null)

    useEffect(()=>{
        fetch(`https://statsapi.mlb.com/api/v1.1/game/${gamePk}/feed/live/`)
        .then(resp => resp.json())
        .then(gameRESP => setDataLiveGame(gameRESP))
    },[])



//     const fetchData = async () =>{
//         try {
//             const response = await fetch(`https://statsapi.mlb.com/api/v1.1/game/${gamePk}/feed/live`);
//             const newData = await response.json();

//             if (JSON.stringify(newData) !== JSON.stringify(dataLiveGame)){
//                 setDataLiveGame(newData)
//             }
//         }
//         catch (error){
//             console.error("error fetching data", error);
//         }
//     };


// useEffect(()=>{
//         fetchData();

//         const interval = setInterval(fetchData, 10000);

//         return () => clearInterval(interval)

// }, []);



if (dataLiveGame === null){
    return(<h4>...Loading</h4>)
}

    return(
        <div>
            
            {console.log(dataLiveGame)}
            {console.log('a fetch was made')}


            <div className="gameInfo">

                    <LiveGameScoreBoard {...dataLiveGame}/>
                <div className="atAGlance">
                    <span className="glanceSpan">{`It is the ${dataLiveGame.liveData.linescore.inningState} of the ${dataLiveGame.liveData.linescore.currentInning}`}</span>
                </div>
                <div className="firstLiveRow">
                    <LiveBases {...dataLiveGame}/>
                    <CurrentPlay {...dataLiveGame}/>
                    <LiveCircles {...dataLiveGame}/>
                </div>
                    <PitcherVsBatter {...dataLiveGame}/>
                <div  className="pitchComponets">
                    <LivePitchData {...dataLiveGame}/>
                    <LivePitchDataVis {...dataLiveGame} />
                </div>
                <div className="bothLineups">
                    <BattingOrderAway {...dataLiveGame}/>
                    <BattingOrderHome {...dataLiveGame}/>
                </div>
                    <LiveBoxScore {...dataLiveGame}/>
                    <GameWeather {...dataLiveGame}/>
                </div>

                <ScoringPlay {...dataLiveGame}/>


        </div>
    )
}

export default LiveGame