import { useState, useEffect } from "react"


function Roster(){

const [rosterData, setRosterData] = useState([])



//depthChart for everyone active for active prop etc?

useEffect(()=>{
  fetch(`https://statsapi.mlb.com/api/v1/teams/121/roster/depthChart&hydrate=hydrations`)
  .then(resp => resp.json())
  .then(data =>{
    setRosterData(data.roster)
    
  })
},[])

useEffect(()=>{
  console.log(rosterData)
},[rosterData])


if (!rosterData.length > 1){
  return (
    <h1>...loading</h1>
  )
}

function mapRoster(){

  if (rosterData.length > 1){
      console.log("roster length was greater than 1")


      return rosterData.map(player=> (
        <div className="WrapperPlayer">
          <img src={`https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/${player.person.id}/headshot/silo/current`} alt={player.person.fullName} id="playerPhoto"/>
        <div id="nameGroup">
         <span className="playerJerseyNum"># {player.jerseyNumber} &nbsp; </span> 
          <span className="playerName"> {player.person.fullName}</span>
         </div>
         <span className="playerPosition"> {player.position.type} </span>
         <span className="playerStatus"> {player.status.description} </span>

        </div>
      ))



    

  }

}

return (
<div className="WrapperRoster">
  <h1>Idk man</h1>
  
  {mapRoster()}

</div>
)

}

export default Roster