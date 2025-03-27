import { useEffect, useState } from "react";

import TodaysGame from "./TodaysGame";
import LeagueSelect from "../UtilityComponents/LeagueSelect";
import SiteAlert from "../UtilityComponents/SiteAlert";
import BatLoader from "../UtilityComponents/BatLoader";
import NoGamesToday from "../UtilityComponents/NoGamesToday";

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
    
    useEffect(() => {
      console.log(gameData);
    }, [gameData]);

  // useEffect(() => {
  //   fetch(
  //     `https://statsapi.mlb.com/api/v1/schedule?date=${formattedDate}&sportId=${selectedSportId}&hydrate=probablePitcher(note)&fields=dates,date,games,gamePk,gameDate,status,abstractGameState,teams,away,home,isWinner,leagueRecord,losses,pct,wins,score,team,id,name,probablePitcher,id,fullName,note`
  //   )
  //     .then((resp) => resp.json())
  //     .then((statcastRESP) => setGameData(statcastRESP));
  // }, [selectedSportId]);


  /**
   * Used After Midnight in season for development because formattedDate changes
   */
  // const yesterday ="02/24/2025"

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
        {selectedSportId == 22 ? <SiteAlert 
          alertHeading={"College is experimental"}
          alertMessage={"*Few games offer public data"}
        /> : null}
        <LeagueSelect
          handleSportSelect={handleSportSelect}
          selectedSportId={selectedSportId}
        />
        <NoGamesToday
          selectedSportId={selectedSportId}
          formattedDate={formattedDate}
        />
      </div>
    );
  }

  return (
    <div className="todayfilled">
      <LeagueSelect
        handleSportSelect={handleSportSelect}
        selectedSportId={selectedSportId}
      />
      <SiteAlert 
        alertHeading={"😄2025 opening week!😄"}
        alertMessage={`Ten minutes before a game is set to begin, it will enter preview mode. Click LIVE GAME and you can watch the game play out statistically.`}
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
