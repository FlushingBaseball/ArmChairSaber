import { Link } from "react-router-dom";
import { useState } from "react";
import PredictionGroup from "../PredictionGroup";
import { handlePlayerImageError, handleTeamLogoError } from "../UtilityFunctions/UtilityFunctions";

import BatLoader from "../UtilityComponets/BatLoader"

function TodaysGame({ gamePk, teams, game, status, user, selectedSportId }) {
  console.log("teams below")
  console.log(teams)
  console.log("game below")
  console.log(game)
  console.log("gamepk below")
  console.log(gamePk)
  const [predictedWinner, setPredictedWinner] = useState("");
  // const gameDate = new Date(game.gameDate)
  // const timeZoneOffset = new Date().getTimezoneOffset();
  // const localTime = new Date(gameDate.getTime() - (timeZoneOffset * 6000));
  // console.log("this is gameDate", gameDate)
  // console.log("this is timeZoneOffset", timeZoneOffset)
  // console.log("this is localTime", localTime)
  // console.log(selectedSportId)


  /**
   * if selected sport equals 1   let homeTeamImageSrc = `https://www.mlbstatic.com/team-logos/${teams.home.team.id}.svg`;
   * src = homeTeamImageSRC
   * if selected sport !=1 

   */


  let awayImageSrc = teams.away.probablePitcher
    ? `https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/${teams.away.probablePitcher.id}/headshot/silo/current`
    : "/Images/default-batter.svg";
  let homeImageSrc = teams.home.probablePitcher
    ? `https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/${teams.home.probablePitcher.id}/headshot/silo/current`
    : "/Images/default-batter.svg";

  let homeTeamImageSrc = `https://www.mlbstatic.com/team-logos/${teams.home.team.id}.svg`;
  let awayTeamImageSrc = `https://www.mlbstatic.com/team-logos/${teams.away.team.id}.svg`;

  if (selectedSportId ==="22"){
    console.log('in selected sport is 22')
    homeTeamImageSrc = `/api/${teams.home.team.id}.svg`
    awayTeamImageSrc = `/api/${teams.away.team.id}.svg`
  }
     /**
         * May need to delete this or refactor, the onError function kind of handles this.
         * Moving all the front end local images to the backend, to remove from the build
     */
  if (selectedSportId !== "1") {
    // console.log("got in condition")
    awayImageSrc = teams.away.probablePitcher
      ? `https://midfield.mlbstatic.com/v1/people/${teams.away.probablePitcher.id}/milb/100`
      : "/Images/default-batter.svg";
    homeImageSrc = teams.home.probablePitcher
      ? `https://midfield.mlbstatic.com/v1/people/${teams.home.probablePitcher.id}/milb/100`
      : "/Images/default-batter.svg";
  }


  // If college just default to the backend for now because the api has no college logos.

  if (teams.home.team.id === undefined || teams.away.team.id === undefined) {
    return <BatLoader />
  }
  if (status === undefined) {
    return <BatLoader />
  }
  // https://www.mlbstatic.com/team-logos/541.svg
  /*
            Old way of grabbing the id then serving a local file based on matching local filename with team id
            this was done because the endpoint for team logos hadn't been found, Depending on packsize may be expanded as fall back for lower leagues.
            Looks like its needed for South American Winter leagues.
          */
  // const homeTeamImageSrc=`./Images/logos/${teams.home.team.id}.svg`;
  // const awayTeamImageSrc=`./Images/logos/${teams.away.team.id}.svg`;

//2024-02-24T18:05:00Z convert this to est start time and display it


  return (
    <div className="game">
      <div
        className={`teamInfo ${
          predictedWinner === teams.home.team.id ? "predictedWinner" : " "
        }`}
      >
        <img
          className="teamGameLogo"
          alt={teams.home.team.name}
          src={homeTeamImageSrc}
          onError={(e) => {handleTeamLogoError(e.target, teams.home.team.id)}}
        ></img>
        <h4 className="teamName">Home: {teams.home.team.name} </h4>
        <div className="pitcherInfo">
          <span className="pitcherName">
            {teams.home.probablePitcher !== undefined
              ? teams.home.probablePitcher.fullName
              : "Not Announced"}
          </span>
          <img
            alt="headshot of pitcher"
            className={
              selectedSportId === "1"
                ? `probMLBPitcherPhoto Colors${teams.home.team.id}`
                : "nonMlbPitcher"
            }
            src={homeImageSrc}
            onError={(e)=> {handlePlayerImageError(e.target, teams.home.probablePitcher.id )}}
          ></img>
        </div>
      </div>

      <div className="CenterWrapper">
         {/* <span>{game.gameDate}</span> */}
        {status.abstractGameState === "Final" && (
          <span id="gameCompleteSpan">Game is Complete</span>
        )}

        {status.abstractGameState === "Live" && (
          <Link className="liveLink" to={`/TodaysGame/${gamePk}`}>
            {" "}
            Click Live game!
          </Link>
        )}

        {status.abstractGameState === "Live" ||
        status.abstractGameState === "Final" ? (
          <div>
            <span className="todayLiveScore">{teams.home.score}</span>{" "}
            <span className="todayLiveScore">-</span>{" "}
            <span className="todayLiveScore">{teams.away.score}</span>
          </div>
        ) : null}

        {status.abstractGameState === "Preview" && (
          <PredictionGroup
            game={game}
            user={user}
            predictedWinner={predictedWinner}
            setPredictedWinner={setPredictedWinner}
          />
        )}
      </div>

      <div
        className={`teamInfo ${
          predictedWinner === teams.away.team.id ? "predictedWinner" : " "
        }`}
      >
        <img
          className={`teamGameLogo`}
          alt={teams.away.team.name}
          src={awayTeamImageSrc}
          onError={(e) => {handleTeamLogoError(e.target, teams.away.team.id)}}
        ></img>
        <h4 className="teamName">Away: {teams.away.team.name} </h4>
        <div className="pitcherInfo">
          <span className="pitcherName">
            {teams.away.probablePitcher !== undefined
              ? teams.away.probablePitcher.fullName
              : "Not Announced"}
          </span>
          <img
            alt="headshot of pitcher"
            className={
              selectedSportId === "1"
                ? `probMLBPitcherPhoto Colors${teams.away.team.id}`
                : "nonMlbPitcher"
            }
            src={awayImageSrc}
            onError={(e)=> {handlePlayerImageError(e.target, teams.away.probablePitcher.id )}}
          ></img>
        </div>
      </div>
    </div>
  );
}
export default TodaysGame;
