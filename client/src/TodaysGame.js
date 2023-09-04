import {Link } from "react-router-dom"
import {useState} from "react"

import PredictionGroup from "./PredictionGroup"

function TodaysGame({gamePk, teams, game, status, user}) {

const [predictedWinner, setPredictedWinner] = useState('');


  const awayImageSrc = teams.away.probablePitcher ? `https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/${teams.away.probablePitcher.id}/headshot/silo/current` : '/Images/default-batter.svg'
  const homeImageSrc = teams.home.probablePitcher ? `https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/${teams.home.probablePitcher.id}/headshot/silo/current` : '/Images/default-batter.svg'

  if (teams.home.team.id  ===undefined || teams.away.team.id ===undefined ){
      return(
        <h3>...loading</h3>
        )
      }
  if (status ===undefined ){
          return(
            <h3>...loading</h3>
            )
           }


          /*
            Old way of grabbing the id then serving a local file based on matching local filename with team id
            this was done because the endpoint for team logos hadn't been found, Depending on packsize may be expanded as fall back for lower leauges
          */
              // const homeTeamImageSrc=`./Images/logos/${teams.home.team.id}.svg`;
              // const awayTeamImageSrc=`./Images/logos/${teams.away.team.id}.svg`;


          const homeTeamImageSrc=`https://www.mlbstatic.com/team-logos/${teams.home.team.id}.svg`;
          const awayTeamImageSrc=`https://www.mlbstatic.com/team-logos/${teams.away.team.id}.svg`;
          
          
          
          return (
            <div className="game">       
              <div className={`teamInfo ${predictedWinner == teams.home.team.id ? 'predictedWinner' : ' '}`}>
                 <img className="teamGameLogo" alt={teams.home.team.name} src={homeTeamImageSrc}></img>
                 <h4 className="teamName">Home: {teams.home.team.name} </h4>
                 <div className="pitcherInfo">
                    <span  className="pitcherName">{teams.home.probablePitcher !== undefined? teams.home.probablePitcher.fullName : "unkown"}</span>
                    <img className="probPitcherPhoto" src={homeImageSrc}></img>
                 </div>
              </div>

            {status.abstractGameState === 'Live' || status.abstractGameState ==="Final" ? (<div><span className="todayLiveScore">{teams.home.score}</span> <span  className="todayLiveScore">-</span> <span  className="todayLiveScore">{teams.away.score}</span></div> ) : null}
        
            <div className={`teamInfo ${predictedWinner == teams.away.team.id ? 'predictedWinner' : ' '}`}>
                <img className="teamGameLogo" alt={teams.away.team.name} src={awayTeamImageSrc}></img>
                <h4 className="teamName">Away: {teams.away.team.name} </h4>
                <div className="pitcherInfo">
                    <span className="pitcherName">{teams.away.probablePitcher !== undefined? teams.away.probablePitcher.fullName : "unkown"}</span>
                    <img className="probPitcherPhoto" src={awayImageSrc}></img>
                </div>
            </div> 

            {status.abstractGameState === "Preview" && <PredictionGroup game={game} user={user} predictedWinner={predictedWinner} setPredictedWinner={setPredictedWinner} />}
            {status.abstractGameState === "Live" && <Link className="liveLink" to={`/TodaysGame/${gamePk}`}> Click Live game!</Link>}
            {status.abstractGameState === "Final" && <span>Game is Complete</span>}
        </div>
    )
}
export default TodaysGame


