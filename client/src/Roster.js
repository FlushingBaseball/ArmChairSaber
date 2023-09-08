import { useState, useEffect } from "react"


export default function Roster(){

const [rosterData, setRosterData] = useState('none')



//depthChart for everyone active for active prop etc?

useEffect(()=>{
  fetch(`https://statsapi.mlb.com/api/v1/teams/147/roster/depthChart`)
  .then(resp => resp.json())
  .then(data =>{
    console.log('roster data should be below')
    console.log(data)
    setRosterData(data)
    
  })
},[])


function mapRoster(rosterData){

  if (rosterData.length > 1){
    return rosterData.map((player) => {
      <div className="WrapperPlayer">
        <img
         src={`https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/${player.person.id}/headshot/silo/current`}
          alt={player.person.fullName} id="playerPhoto"
           />
        <div id="nameGroup">
          <span className="playerJerseyNum">{player.jerseyNumber}</span>
          <span className="playerName">{player.person.fullName}</span>
        </div>
        <span className="playerPosition">{player.position.type}</span>
        <span className="playerStatus">{player.status.description}</span>
  
      </div>
    })
  }
  else{
    return (
      <h1>...loading</h1>
    )
  }




}

return (

<div className="WrapperRoster">
  <h1>Roster will go here</h1>

{mapRoster()}

</div>
)

}