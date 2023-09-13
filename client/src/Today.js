import { useEffect, useState } from 'react';
import TodaysGame from './TodaysGame';

function Today({user}){
  
  const currentDate = new Date();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const year = currentDate.getFullYear();
  const formattedDate = `${month}/${day}/${year}`;

    const [selectedSportId, setSelectedSportId] = useState("1")
    const [gameData, setGameData] = useState(null)
   
    
    useEffect(()=>{
        fetch(`https://statsapi.mlb.com/api/v1/schedule?date=${formattedDate}&sportId=${selectedSportId}&hydrate=probablePitcher(note)&fields=dates,date,games,gamePk,gameDate,status,abstractGameState,teams,away,home,isWinner,leagueRecord,losses,pct,wins,score,team,id,name,probablePitcher,id,fullName,note`)

        // fetch(`https://statsapi.mlb.com/api/v1/schedule?date=${formattedDate}&sportId=${selectedSportId}&hydrate=liveLookin,story,event(game),broadcasts,game(content)`)
        .then(resp => resp.json())
        .then(statcastRESP => setGameData(statcastRESP) )
        .then(console.log(gameData))
      },[selectedSportId])  








/**
  * Used Afte Midnight for development because formattedDate changes
 */
 
// const yesterday ="08/24/2023"

// useEffect(()=>{
//   fetch(`https://statsapi.mlb.com/api/v1/schedule?date=${yesterday}&sportId=${selectedSportId}&hydrate=probablePitcher(note)&fields=dates,date,games,gamePk,gameDate,status,abstractGameState,teams,away,home,isWinner,leagueRecord,losses,pct,wins,score,team,id,name,probablePitcher,id,fullName,note`)
//   .then(resp => resp.json())
//   .then(statcastRESP => setGameData(statcastRESP) )
//   .then(console.log(gameData))
// },[selectedSportId])  



    function handlePredictionSubmit(event){
        console.log(event)
    }

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
              <button onClick={() => handleSportSelect("1")}>MLB</button>
              <button onClick={() => handleSportSelect("11")}>AAA</button>
              <button onClick={() => handleSportSelect("12")}>AA</button>
              <button onClick={() => handleSportSelect("13")}>A+</button>
              <button onClick={() => handleSportSelect("14")}>A</button>
              <button onClick={() => handleSportSelect("16")}>ROK</button>
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
              <button onClick={() => handleSportSelect("1")}>MLB</button>
              <button onClick={() => handleSportSelect("11")}>AAA</button>
              <button onClick={() => handleSportSelect("12")}>AA</button>
              <button onClick={() => handleSportSelect("13")}>A+</button>
              <button onClick={() => handleSportSelect("14")}>A</button>
              <button onClick={() => handleSportSelect("16")}>ROK</button>
          </div> 
      <div className='WrapperToday'>
        {console.log(gameData)}
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