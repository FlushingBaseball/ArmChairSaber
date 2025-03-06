import { Link } from "react-router-dom";
import { useState } from "react";

import PredictionGroup from "../PredictionGroup";
import BatLoader from "../UtilityComponents/BatLoader"
import { handlePlayerImageError, handleTeamLogoError } from "../UtilityFunctions/UtilityFunctions";

 
function TodaysGame({ gamePk, teams, game, status, user, selectedSportId }) {
  const [predictedWinner, setPredictedWinner] = useState("");

  /**
   * Timezone problem to be sorted later
   * After midnight users may lose games as a late game in California can go past midnight est
   * the new date would create a new fetch with the new date and they wouldn't be able to click it
   * 
   * fetch all games still live and add it to the array prob the best way to do it
   */

  //  game time for local display
  const localGameStartTime = new Date(game.gameDate).toLocaleTimeString([], {hour: "numeric", minute: "2-digit", timeZoneName:"short"});
  



  /**
   * if selected sport equals 1   let homeTeamImageSrc = `https://www.mlbstatic.com/team-logos/${teams.home.team.id}.svg`;
   * src = homeTeamImageSRC
   * if selected sport !=1 ,,,
   */

/**
 * If there's no probable pitcher announced for a game set the image to a default
 */
let homePitcherImageSrc = teams.home.probablePitcher
  ? `https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/${teams.home.probablePitcher.id}/headshot/silo/current`
  : "/Images/default-batter.svg";
  let awayPitcherImageSrc = teams.away.probablePitcher
    ? `https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/${teams.away.probablePitcher.id}/headshot/silo/current`
    : "/Images/default-batter.svg";


  let homeTeamLogoSrc = `https://www.mlbstatic.com/team-logos/${teams.home.team.id}.svg`;
  let awayTeamLogoSrc = `https://www.mlbstatic.com/team-logos/${teams.away.team.id}.svg`;


  /**
   * This may be causing problems, im trying to skip the calls to the mlb api for college
   * logos which wont be there. There's alot of college teams to it would be alot of calls
   * for no reason.
   */

  if (selectedSportId ==="22"){
    homeTeamLogoSrc = `/api/${teams.home.team.id}.svg`
    awayTeamLogoSrc = `/api/${teams.away.team.id}.svg`
  }

     /**
         * May need to delete this or refactor, the onError function kind of handles this.
         * Moving all the front end local images to the backend, to remove from the build
     */
  // if (selectedSportId !== "1") {
  //   // console.log("got in condition")
  //   awayPitcherImageSrc = teams.away.probablePitcher
  //     ? `https://midfield.mlbstatic.com/v1/people/${teams.away.probablePitcher.id}/milb/100`
  //     : "/Images/default-batter.svg";
  //   homePitcherImageSrc = teams.home.probablePitcher
  //     ? `https://midfield.mlbstatic.com/v1/people/${teams.home.probablePitcher.id}/milb/100`
  //     : "/Images/default-batter.svg";
  // }


/**
 * If there's no teams to display yet just returning my loader
 */
  if (teams.home.team.id === undefined || teams.away.team.id === undefined) {
    return <BatLoader />
  }

  /**
   * Don't remember why status was important, don't tear down fences you don't know the 
   * purpose for and all that rn
   */
  // if (status === undefined) {
  //   return <BatLoader />
  // }



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
          src={homeTeamLogoSrc}
          onError={(e) => {handleTeamLogoError(e.target, teams.home.team.id,  teams.home.team.name)}}
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
            src={homePitcherImageSrc}
            onError={(e)=> {handlePlayerImageError(e.target, teams.home.probablePitcher.id )}}
          ></img>
        </div>
      </div>

       <div className="CenterWrapper">
         <span id="startTime" >{localGameStartTime}</span>
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
          src={awayTeamLogoSrc}
          onError={(e) => {handleTeamLogoError(e.target, teams.away.team.id, teams.away.team.name)}}
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
            src={awayPitcherImageSrc}
            onError={(e)=> {handlePlayerImageError(e.target, teams.away.probablePitcher.id )}}
          ></img>
        </div>
      </div>
    </div>
  );
}
export default TodaysGame;
