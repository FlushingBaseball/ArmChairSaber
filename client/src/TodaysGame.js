import {Link } from "react-router-dom"
import {useState} from "react"

import PredictionGroup from "./PredictionGroup"

function TodaysGame({gamePk, teams, game, status, user, selectedSportId}) {
  
  const [predictedWinner, setPredictedWinner] = useState('');
  
  let awayImageSrc = teams.away.probablePitcher ? `https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/${teams.away.probablePitcher.id}/headshot/silo/current` : '/Images/default-batter.svg'
  let homeImageSrc = teams.home.probablePitcher ? `https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/${teams.home.probablePitcher.id}/headshot/silo/current` : '/Images/default-batter.svg'

  
  let homeTeamImageSrc=`https://www.mlbstatic.com/team-logos/${teams.home.team.id}.svg`;
  let awayTeamImageSrc=`https://www.mlbstatic.com/team-logos/${teams.away.team.id}.svg`;


if (selectedSportId!=="1"){
   awayImageSrc = teams.away.probablePitcher ? `https://midfield.mlbstatic.com/v1/people/${teams.away.probablePitcher.id}/milb/100` : '/Images/default-batter.svg'
   homeImageSrc = teams.home.probablePitcher ? `https://midfield.mlbstatic.com/v1/people/${teams.home.probablePitcher.id}/milb/100` : '/Images/default-batter.svg'
  
   homeTeamImageSrc=`./Images/logos/${teams.home.team.id}.svg`;
   awayTeamImageSrc=`./Images/logos/${teams.away.team.id}.svg`;


}


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
            this was done because the endpoint for team logos hadn't been found, Depending on packsize may be expanded as fall back for lower leauges.
            Looks like its needed for South American Winter Leauges.
          */
              // const homeTeamImageSrc=`./Images/logos/${teams.home.team.id}.svg`;
              // const awayTeamImageSrc=`./Images/logos/${teams.away.team.id}.svg`;


          
          
          return (
            <div className="game">       
              <div className={`teamInfo ${predictedWinner === teams.home.team.id ? 'predictedWinner' : ' '}`}>
                 <img className="teamGameLogo" alt={teams.home.team.name} src={homeTeamImageSrc}></img>
                 <h4 className="teamName">Home: {teams.home.team.name} </h4>
                 <div className="pitcherInfo">
                    <span  className="pitcherName">{teams.home.probablePitcher !== undefined? teams.home.probablePitcher.fullName : "Not Announced"}</span>
                    <img className={selectedSportId === "1" ? `probMLBPitcherPhoto Colors${teams.home.team.id}` : 'nonMlbPitcher'} src={homeImageSrc}></img>
                 </div>
              </div>
            <div className="CenterWrapper">
              {status.abstractGameState === "Final" && <span id="gameCompleteSpan">Game is Complete</span>}
              {status.abstractGameState === "Live" && <Link className="liveLink" to={`/TodaysGame/${gamePk}`}> Click Live game!</Link>}
              {status.abstractGameState === 'Live' || status.abstractGameState ==="Final" ? (<div><span className="todayLiveScore">{teams.home.score}</span> <span  className="todayLiveScore">-</span> <span  className="todayLiveScore">{teams.away.score}</span></div> ) : null}
            {status.abstractGameState === "Preview" && <PredictionGroup game={game} user={user} predictedWinner={predictedWinner} setPredictedWinner={setPredictedWinner} />}
            </div>
        
            <div className={`teamInfo ${predictedWinner === teams.away.team.id ? 'predictedWinner' : ' '}`}>
                <img className={`teamGameLogo`} alt={teams.away.team.name} src={awayTeamImageSrc}></img>
                <h4 className="teamName">Away: {teams.away.team.name} </h4>
                <div className="pitcherInfo">
                    <span className="pitcherName">{teams.away.probablePitcher !== undefined? teams.away.probablePitcher.fullName : "Not Announced"}</span>
                    <img className={selectedSportId === "1" ? `probMLBPitcherPhoto Colors${teams.away.team.id}` : 'nonMlbPitcher'} src={awayImageSrc}></img>
                </div>
            </div>  
        </div>
    )
}
export default TodaysGame


