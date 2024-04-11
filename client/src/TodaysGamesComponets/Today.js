import { useEffect, useState } from "react";
import TodaysGame from "./TodaysGame";
import LeaugeSelect from "../UtilityComponets/LeaugeSelect";
import SiteAlert from "../UtilityComponets/SiteAlert";
import BatLoader from "../UtilityComponets/BatLoader";

function Today({ user }) {
  const currentDate = new Date();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  const year = currentDate.getFullYear();
  const formattedDate = `${month}/${day}/${year}`;

  const [selectedSportId, setSelectedSportId] = useState("1");
  const [gameData, setGameData] = useState(null);

  
  useEffect(() => {
    fetch(
      `https://statsapi.mlb.com/api/v1/schedule?date=${formattedDate}&sportId=${selectedSportId}&hydrate=probablePitcher(note)`
      )
      .then((resp) => {
        if (!resp.ok) {
          throw new Error(`Failed to fetch API. Code: ${resp.status}`);
        }
        return resp.json();
      })
      .then((statcastRESP) => setGameData(statcastRESP))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    }, [selectedSportId, formattedDate]);
    

  // useEffect(() => {
  //   fetch(
  //     `https://statsapi.mlb.com/api/v1/schedule?date=${formattedDate}&sportId=${selectedSportId}&hydrate=probablePitcher(note)&fields=dates,date,games,gamePk,gameDate,status,abstractGameState,teams,away,home,isWinner,leagueRecord,losses,pct,wins,score,team,id,name,probablePitcher,id,fullName,note`
  //   )
  //     .then((resp) => resp.json())
  //     .then((statcastRESP) => setGameData(statcastRESP));
  // }, [selectedSportId]);

  useEffect(() => {
    console.log(gameData);
  }, [gameData]);

  /**
   * Used After Midnight in season for development because formattedDate changes
   */

  // const yesterday ="08/24/2023"

  // useEffect(()=>{
  //   fetch(`https://statsapi.mlb.com/api/v1/schedule?date=${yesterday}&sportId=${selectedSportId}&hydrate=probablePitcher(note)&fields=dates,date,games,gamePk,gameDate,status,abstractGameState,teams,away,home,isWinner,leagueRecord,losses,pct,wins,score,team,id,name,probablePitcher,id,fullName,note`)
  //   .then(resp => resp.json())
  //   .then(statcastRESP => setGameData(statcastRESP) )
  //   .then(console.log(gameData))
  // },[selectedSportId])

  function handleSportSelect(sportNum) {
    setSelectedSportId(sportNum);
  }

  if (gameData === null) {
    return <BatLoader />
  }

  if (!gameData.dates.length) {
    return (
      <div id="noGames">
        <SiteAlert 
          alertHeading={"Minor leauge seasons have begun!"}
          alertMessage={"Jackson Holliday watch might be over but there's still hundreds of prospects to get excited about!"}
        />
        <LeaugeSelect
          handleSportSelect={handleSportSelect}
          selectedSportId={selectedSportId}
        />
        <h1 id="noGameHeader">There seems to be no games scheduled for </h1>
        <h2 id="noGameDate"> {formattedDate}</h2>
        <img id="noGameImage" alt="Grounds crew members getting the field ready for games" src="/Images/spring-no-games.jpg"></img>
      </div>
    );
  }

  return (
    <div className="todayfilled">
      <LeaugeSelect
        handleSportSelect={handleSportSelect}
        selectedSportId={selectedSportId}
      />
      <SiteAlert 
        alertHeading={"😄 The regular season has started! 😄"}
        alertMessage={`Ten minutes before a game is set to begin, it will enter preview mode. Click LIVE GAME and from the first pitch onward, you can watch the game play out statistically.`}
      />
      <div className="WrapperToday">
        {gameData.dates[0].games.map((game) => {
          return (
            <TodaysGame
              key={game.gamePk}
              game={game}
              {...game}
              user={user}
              selectedSportId={selectedSportId}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Today;
