import { useState, useEffect } from "react"


function Roster({selectedTeam, selectedRoster}){

const [rosterData, setRosterData] = useState([])

//depthChart for everyone active for active prop etc?
// https://statsapi.mlb.com/api/v1/teams/109/roster/Active

console.log("before the call in Roster SelectedRoseter is", selectedRoster)


//Outfielder Pitcher Infielder



useEffect(()=>{
  // fetch(`http://statsapi.mlb.com/api/v1/teams/121/roster/Active?season=2023&hydrate=person(stats(group=[hitting,pitching],type=[sabermetrics,advanced])%3A%29`)
  fetch(`https://statsapi.mlb.com/api/v1/teams/${selectedTeam}/roster/${selectedRoster}?hydrate=hydrations`)
  .then(resp => resp.json())
  .then(data =>{
    console.log('Data is ', data)
    setRosterData(data.roster)
    
  })
},[selectedTeam, selectedRoster])

useEffect(()=>{
  console.log(rosterData)
},[rosterData])


if (!rosterData.length > 1){
  return (
    <h1>...loading</h1>
    )
  }
  
  function handleImageError(e){
    e.target.src = '/Images/default-batter.svg'
  }
  
  
 
  
  function mapRoster(personArray){
    if (rosterData.length > 1){
      console.log("roster length was greater than 1")
      

        return personArray.map(player=> (
          <div className="WrapperPlayer">
            <img src= {selectedRoster != "coach"
            ?`https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/${player.person.id}/headshot/silo/current`
            :`https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/${player.person.id}/headshot/83/coach/current`
          }
          alt={player.person.fullName} id="playerPhoto"
          onError={handleImageError}
          />
          <div id="nameGroup">
          <span className="playerJerseyNum">#{player.jerseyNumber}&nbsp;</span> 
            <span className="playerName">{player.person.fullName}&nbsp;</span>
          </div>
          <span className="playerPosition">{player.position ? player.position.type : ''} </span>
          <span className="playerStatus">{player.status ? player.status.description : ''} </span>
          <div className="CoachTitle">{player.title ? player.title : ''}</div>

          </div>
        ))
      }
}


const infielders = rosterData.filter(player => player.position && player.position.type === "Infielder");
const outfielders = rosterData.filter(player => player.position && player.position.type === "Outfielder");
const pitchers = rosterData.filter(player => player.position && player.position.type === "Pitcher");


return (
  <div className="WrapperRoster">
  <h1 id="RosterTitle">Roster</h1>
    {selectedRoster == 'coach'
     ? (mapRoster(rosterData) 
     ): (
    <>
      <div className="RosterGrouping">
        <h2 className="RosterCata">Infeilders</h2>
        {mapRoster(infielders)}
      </div>
      <div className="RosterGrouping">
        <h2 className="RosterCata">Outfeilders</h2>
        {mapRoster(outfielders)}
      </div>
      <div className="RosterGrouping">
        <h2 className="RosterCata">Pitchers</h2>
        {mapRoster(pitchers)}
      </div>
    </>
     )
    }
</div>
)

}

export default Roster