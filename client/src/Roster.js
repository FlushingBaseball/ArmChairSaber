import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";


function Roster({selectedTeam, selectedRoster}){

const [rosterData, setRosterData] = useState([])
const navigate = useNavigate();


useEffect(()=>{
  fetch(`https://statsapi.mlb.com/api/v1/teams/${selectedTeam}/roster/${selectedRoster}?hydrate=person(video,social)`)
  .then(resp => resp.json())
  .then(data =>{
    setRosterData(data.roster)  
  })
},[selectedTeam, selectedRoster])


if (!rosterData.length > 1){
  return (
    <h1>...loading</h1>
    )
  }
  
  function handleImageError(e){
    e.target.src = '/Images/default-batter.svg'
  }
  
  
 function handlePlayerClick(value, player){
  if (!player.position){
    return (null)
  }
      navigate(`/player/${String(value)}`)
 }
  
  function mapRoster(personArray){
    if (rosterData.length > 1){
        return personArray.map(player=> (
          <div className="WrapperPlayer" onClick={ () => handlePlayerClick(player.person.id, player)}>
            <img src= {selectedRoster != "coach"
            ?`https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/${player.person.id}/headshot/silo/current`
            :`https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/${player.person.id}/headshot/83/coach/current`
          }
          alt={player.person.fullName} id="playerPhoto"
          onError={handleImageError}
          />
          <span className="playerJerseyNum">#{player.jerseyNumber}&nbsp;</span> 
          <span className="playerName">{player.person.fullName}&nbsp;</span>
          <span className="playerPosition">{player.position ? player.position.name : ''} </span>&nbsp;
          <span id="playerAge">{`${player.person.currentAge} Years old`}</span>&nbsp;
          <span className="playerStatus ">{player.status ? player.status.description : ''} </span>&nbsp;
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
    {selectedRoster == 'coach'
     ? (mapRoster(rosterData) 
     ): (
    <>
      <div className="RosterGrouping">
        <h2 className="RosterCata">Infielders</h2>
        {mapRoster(infielders)}
      </div>
      <div className="RosterGrouping">
        <h2 className="RosterCata">Outfielders</h2>
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