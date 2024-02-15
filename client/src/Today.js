import { useEffect, useState } from "react";
import TodaysGame from "./TodaysGame";
import LeaugeSelect from "./UtilityComponets/LeaugeSelect";
import SiteAlert from "./UtilityComponets/SiteAlert";
import BatLoader from "./UtilityComponets/BatLoader";

function Today({ user }) {
  const currentDate = new Date();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  const year = currentDate.getFullYear();
  const formattedDate = `${month}/${day}/${year}`;

  const [selectedSportId, setSelectedSportId] = useState("17");
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
    }, [selectedSportId]);
    

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
          alertHeading={"☹️ The Winter Leauges have ended ☹️"}
          alertMessage={"We're in that small period between the start of Spring training and the end of the Winter Leagues. Most spring training games will have limited pitch data available, as Trackman, Hawkeye, and other tracking systems are usually not active."}
        />
        <LeaugeSelect
          handleSportSelect={handleSportSelect}
          selectedSportId={selectedSportId}
        />
        <h1 id="noGameHeader">There seems to be no games scheduled for </h1>
        <h2 id="noGameDate"> {formattedDate}</h2>
        <img id="noGameImage" src="/Images/empty2.jpg"></img>
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
        alertHeading={"🎉Congratulations to the Rangers, the 2023 World Series champions!🎉"}
        alertMessage={`The Caribbean Series is in full swing! There may be limited pitch data available for some games that Trackman, Hawkeye, and other tracking systems are not installed for. There will be no games in the quiet period between the Series completion and Spring Training`}
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
