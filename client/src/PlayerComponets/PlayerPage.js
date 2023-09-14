import { useState, useEffect } from "react"


import Search from "../UtilityComponets/Search"
import PlayerCardBio from "./PlayerCardBio";
import PlayerStats from "./PlayerStats";

export default function PlayerPage(){

const  [searchPlayer, setSearchPlayer] = useState('592450');
const [fetchedPlayers, setFetchedPlayers] = useState('');
const [playerData, setPlayerData] = useState('');





useEffect(()=>{
  fetch('/players')
  .then( (resp)=> resp.json())
  .then(data =>{
      setFetchedPlayers(data)
  })
},[])


useEffect(()=>{
  // fetch(`https://baseballsavant.mlb.com/players-services/range?playerId=${searchPlayer}&season=2023`) // not the right endpoint
  // fetch(`https://baseballsavant.mlb.com/players-services/range?playerId=${searchPlayer}&season=2023`) 
  // fetch(`https://statsapi.mlb.com/api/v1/people/${searchPlayer}?hydrate=stats(group=[hitting]`)
  // fetch(`https://statsapi.mlb.com/api/v1/people/605151?hydrate=stats(group=[hitting,sabermetrics],type=[career,career])`)
  // https://statsapi.mlb.com/api/v1/people/605151?hydrate=stats(group=[hitting]
  // not the right endpoint
  // fetch(`  https://statsapi.mlb.com/api/v1/people/592450?&season=2023&hydrate=stats(group=[hitting,sabermetrics],type=[seasonAdvanced,season],season=2023)`)
  fetch(`https://statsapi.mlb.com/api/v1/people/${searchPlayer}?&season=2023&hydrate=stats(group=[sabermetrics],type=[seasonAdvanced,season],season=2023)`)
      .then((resp) => resp.json())
      .then(data => {setPlayerData(data)
      })
},[searchPlayer])



useEffect(()=>{
  console.log(searchPlayer)
  console.log(playerData)
},[searchPlayer,playerData])


  console.log(searchPlayer)

  return (
    <div className="PlayerWrapper">
      <Search
       setSearchPlayer={setSearchPlayer}
       fetchedPlayers={fetchedPlayers}/>
       <PlayerCardBio
        searchPlayer={searchPlayer}
        playerData={playerData}
    
         />
       <PlayerStats
         searchPlayer={searchPlayer}
         playerData={playerData}
         />
    </div>

  )

}