import { useEffect, useState } from 'react';
import TodaysGame from './TodaysGame';

function Today({user}){
  
  const currentDate = new Date();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const year = currentDate.getFullYear();
  const formattedDate = `${month}/${day}/${year}`;

    const [selectedSportId, setSelectedSportId] = useState("17")
    const [gameData, setGameData] = useState(null)
   
    
    useEffect(()=>{
        fetch(`https://statsapi.mlb.com/api/v1/schedule?date=${formattedDate}&sportId=${selectedSportId}&hydrate=probablePitcher(note)&fields=dates,date,games,gamePk,gameDate,status,abstractGameState,teams,away,home,isWinner,leagueRecord,losses,pct,wins,score,team,id,name,probablePitcher,id,fullName,note`)
        .then(resp => resp.json())
        .then(statcastRESP => setGameData(statcastRESP) )
      },[selectedSportId])  
      
      

      // useEffect(()=>{
      //   console.log(gameData)
      // },[gameData])



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




    function handleSportSelect(sportNum){
      setSelectedSportId(sportNum)
    }

    
    if (gameData ===null){
      return(
        <h3>...loading</h3>
      )
    }

    
    if (!gameData.dates.length){
      return (
        <div id="noGames">
          <div className='leaugeSelect'>
              <button className={`leaugeSelectButton ${selectedSportId === "17" ? 'activeSport' : null}`} onClick={() => handleSportSelect("17")}>AFL</button>
              <button className={`leaugeSelectButton ${selectedSportId === "1" ? 'activeSport' : null}`} onClick={() => handleSportSelect("1")}>MLB</button>
              <button className={`leaugeSelectButton ${selectedSportId === "11" ? 'activeSport' : null}`} onClick={() => handleSportSelect("11")}>AAA</button>
              <button className={`leaugeSelectButton ${selectedSportId === "12" ? 'activeSport' : null}`} onClick={() => handleSportSelect("12")}>AA</button>
              <button className={`leaugeSelectButton ${selectedSportId === "13" ? 'activeSport' : null}`} onClick={() => handleSportSelect("13")}>A+</button>
              <button className={`leaugeSelectButton ${selectedSportId === "14" ? 'activeSport' : null}`} onClick={() => handleSportSelect("14")}>A</button>
              <button className={`leaugeSelectButton ${selectedSportId === "16" ? 'activeSport' : null}`} onClick={() => handleSportSelect("16")}>ROK</button>
          </div> 
          <h1 id='noGameHeader'>There seems to be no games scheduled for </h1>
            <h2 id='noGameDate'> {formattedDate}</h2>
          <img id='noGameImage' src='/Images/empty2.jpg'></img>
        </div>
      )
    }
    




    return( 
    <div className='todayfilled'>
          <div className='leaugeSelect'>
              <button className={`leaugeSelectButton ${selectedSportId === "17" ? 'activeSport' : null}`} onClick={() => handleSportSelect("17")}>AFL</button>
              <button className={`leaugeSelectButton ${selectedSportId === "1" ? 'activeSport' : null}`} onClick={() => handleSportSelect("1")}>MLB</button>
              <button className={`leaugeSelectButton ${selectedSportId === "11" ? 'activeSport' : null}`} onClick={() => handleSportSelect("11")}>AAA</button>
              <button className={`leaugeSelectButton ${selectedSportId === "12" ? 'activeSport' : null}`} onClick={() => handleSportSelect("12")}>AA</button>
              <button className={`leaugeSelectButton ${selectedSportId === "13" ? 'activeSport' : null}`} onClick={() => handleSportSelect("13")}>A+</button>
              <button className={`leaugeSelectButton ${selectedSportId === "14" ? 'activeSport' : null}`} onClick={() => handleSportSelect("14")}>A</button>
              <button className={`leaugeSelectButton ${selectedSportId === "16" ? 'activeSport' : null}`} onClick={() => handleSportSelect("16")}>ROK</button>
          </div> 
      <div className="Alert">
        <h2 id='WS-Winner'>🎉Congratulations to the Rangers, the 2023 World Series champions!🎉</h2>
        <p id='Fall'>Now that the MLB season is over, I have switched to displaying the Mexican, Dominican, and Venezuelan Winter Leagues. Please note that these leauges are experimental, the Dominican leauge will enjoy full pitch by pitch data but there is limited data available for the Mexican and Venezuelan Leagues as Trackman, Hawkeye, and other tracking systems are not installed in these stadiums. 
        </p>
      </div>
      <div className='WrapperToday'>
         {gameData.dates[0].games.map((game)=>{
          return (
            <TodaysGame
              key={game.gamePk}
              game={game}
              {...game}
              user={user}
              selectedSportId={selectedSportId} />
             )
        })}
      </div>
    </div>
    )

}

export default Today