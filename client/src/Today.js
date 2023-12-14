import { useEffect, useState } from "react";
import TodaysGame from "./TodaysGame";
import LeaugeSelect from "./UtilityComponets/LeaugeSelect";

function Today({ user }) {
  const currentDate = new Date();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  const year = currentDate.getFullYear();
  const formattedDate = `${month}/${day}/${year}`;

  const [selectedSportId, setSelectedSportId] = useState("17");
  const [gameData, setGameData] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  function handleCollapseShow() {
    setIsCollapsed((isCollapsed) => !isCollapsed);
  }

  // useEffect(() => {
  //   fetch(
  //     `https://statsapi.mlb.com/api/v1/schedule?date=${formattedDate}&sportId=${selectedSportId}&hydrate=probablePitcher(note)&fields=dates,date,games,gamePk,gameDate,status,abstractGameState,teams,away,home,isWinner,leagueRecord,losses,pct,wins,score,team,id,name,probablePitcher,id,fullName,note`
  //   )
  //     .then((resp) => resp.json())
  //     .then((statcastRESP) => setGameData(statcastRESP));
  // }, [selectedSportId]);
  useEffect(() => {
    fetch(
      `https://statsapi.mlb.com/api/v1/schedule?date=${formattedDate}&sportId=${selectedSportId}&hydrate=probablePitcher(note)`
    )
      .then((resp) => resp.json())
      .then((statcastRESP) => setGameData(statcastRESP));
  }, [selectedSportId]);

  // useEffect(() => {
  //   console.log(gameData);
  // }, [gameData]);

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
    return <h3>...loading</h3>;
  }

  if (!gameData.dates.length) {
    return (
      <div id="noGames">
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
      <div className="Alert">
        <h2 id="WS-Winner">
          🎉Congratulations to the Rangers, the 2023 World Series champions!🎉
        </h2>
        <div  className={`Collapser ${isCollapsed ? 'collapsed' : ''}`} onClick={handleCollapseShow}>
          <i className="fa-solid fa-caret-up" id="alertArrow" />
        <p id="Fall">
          Now that the MLB season is over, I have switched to displaying the
          Mexican, Australian, Dominican, and Venezuelan Winter Leagues. Please
          note that these leauges are experimental, the Dominican leauge will
          enjoy full pitch by pitch data but there is limited data available for
          other Leagues as Trackman, Hawkeye, and other tracking systems are not
          installed in these stadiums.
        </p>
        </div>
        {isCollapsed ? (
          <i
            onClick={handleCollapseShow}
            className="fa-solid fa-caret-up fa-rotate-180"
          ></i>
        ) : null}
      </div>
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
