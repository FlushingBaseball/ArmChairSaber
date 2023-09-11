import { useState, useEffect } from "react"


import Search from "../UtilityComponets/Search"

export default function PlayerPage(){

const  [searchPlayer, setSearchPlayer] = useState('');
const [fetchedPlayers, setFetchedPlayers] = useState('')

useEffect(()=>{
  fetch('/players')
  .then( (resp)=> resp.json())
  .then(data =>{
      setFetchedPlayers(data)
  })
},[])

  return (
    <div className="PlayerWrapper">
      <Search
       setSearchPlayer={setSearchPlayer}
       fetchedPlayers={fetchedPlayers}/>
    </div>
  )

}